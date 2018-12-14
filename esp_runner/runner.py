import os
import psycopg2
import psycopg2.pool
import concurrent.futures
import multiprocessing
import time
import platform
from typing import Optional


class Runner:
    postgres_url: str
    runner_id: str
    pg_pool: psycopg2.pool.ThreadedConnectionPool

    def __init__(self, postgres_url, runner_id):
        self.postgres_url = postgres_url
        self.runner_id = runner_id

    def get_job(self) -> Optional[dict]:
        conn = self.pg_pool.getconn()
        try:
            cur = conn.cursor()
            cur.execute("SELECT job_get_one(%s)", (self.runner_id,))
            if cur.rowcount < 1:
                return None
            else:
                res = cur.fetchone()
                return res[0]
        finally:
            self.pg_pool.putconn(conn)

    def run_job(self, job):
        pass

    def start(self):
        self.pg_pool = psycopg2.pool.ThreadedConnectionPool(1, 4, self.postgres_url)
        executor = concurrent.futures.ThreadPoolExecutor(max_workers=multiprocessing.cpu_count() * 5)
        while True:
            job = self.get_job()
            if job is None:
                time.sleep(1)
            else:
                executor.submit(self.run_job, job)


def main():
    postgres_url = os.environ.get('POSTGRES_URL')
    if postgres_url is None:
        raise Exception("POSTGRES_URL is undefined")
    runner = Runner(postgres_url, os.getenv("RUNNER_ID", platform.node()))
    runner.start()
