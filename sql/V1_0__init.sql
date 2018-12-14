CREATE TABLE job
(
  id text,
  git_url text,
  input jsonb,
  done boolean default false,
  deps jsonb,
  pending_deps int,
  output_url text,
  submitted_at timestamptz,
  runner_id text,
  runner_started_at timestamptz,
  progress text,
  last_heartbeat timestamptz
);

CREATE TABLE job_dependency
(
  job_id text references job,
  dep_id text references job
);

-- See https://dba.stackexchange.com/a/69497
CREATE FUNCTION job_get_one(runner_id text) AS $$
$$ LANGUAGE SQL VOLATILE;

CREATE FUNCTION job_heartbeat(job_id text, progress text) AS $$
  UPDATE job SET last_heartbeat = now(), progress = job_heartbeat.progress WHERE id = job_id;
$$ LANGUAGE SQL VOLATILE;

CREATE FUNCTION job_report_preemption(job_id text, output_url text) AS $$
  UPDATE job SET output_url = job_report_preemption.output_url WHERE id = job_id;
$$ LANGUAGE SQL VOLATILE;

CREATE FUNCTION job_report_completion(job_id text, output_url text) AS $$
  BEGIN
    UPDATE job
    SET done = true, output_url = job_report_completion.output_url
    WHERE id = job_id;
    UPDATE job SET pending_deps = pending_deps - 1
    WHERE id IN (SELECT job_id FROM job_dependency WHERE dep_id = job_id);
  end;
$$ LANGUAGE plpgsql VOLATILE;

CREATE TABLE docker_image
(
  git_url text not null primary key,
  image_url text
);
