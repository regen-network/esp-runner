CREATE TABLE job
(
  id bigserial,
  done boolean default false,
  outstanding_dependencies int,
  submitted_at timestamptz,
  runner_id text,
  runner_started_at timestamptz
);

CREATE TABLE job_dependency
(
  job_id bigserial references job,
  dep_id bigserial references job
);

-- See https://dba.stackexchange.com/a/69497
CREATE FUNCTION job_get_one(runner_id text) AS $$
$$ LANGUAGE SQL VOLATILE;
