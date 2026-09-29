export const OUTBOX_LEASE_SECONDS = 120;
export const OUTBOX_MAX_ATTEMPTS = 6;

// Durable marker in the existing last_error column. Expiry after send-start is
// uncertain delivery, never permission to blindly send again.
export const NOTIFICATION_SEND_STARTED = 'sos103:notification-send-started';
export const OUTBOX_RETRY_SECONDS = 60;

export const CLAIM_OUTBOX_JOBS_SQL = `
  with reviewed as (
    update intake_outbox_jobs
    set status = 'manual_review', lease_token = null, leased_until = null,
        last_error = 'Recovery requires review: exhausted attempts or uncertain delivery', updated_at = now()
    where job_type = $1 and (
      (status = 'leased' and leased_until <= clock_timestamp()
        and (attempts >= $3 or (job_type = 'notification' and last_error = '${NOTIFICATION_SEND_STARTED}')))
      or (status in ('pending', 'retryable') and attempts >= $3)
    )
    returning job_id
  )
  update intake_outbox_jobs job
  set
    status = 'leased',
    lease_token = gen_random_uuid(),
    leased_until = now() + make_interval(secs => $2::int),
    attempts = attempts + 1,
    updated_at = now()
  where job.job_id in (
    select job_id
    from intake_outbox_jobs
    where
      job_type = $1
      and attempts < $3
      and (
        status = 'pending'
        or (status = 'leased' and leased_until <= clock_timestamp()
          and not (job_type = 'notification' and last_error is not distinct from '${NOTIFICATION_SEND_STARTED}'))
        or (status = 'retryable' and next_attempt_at <= now())
      )
    order by created_at
    for update skip locked
    limit $4
  )
  returning *
`;

export const MARK_OUTBOX_RETRY_SQL = `
  update intake_outbox_jobs
  set
    status = case when attempts >= $3 then 'manual_review' else 'retryable' end,
    last_error = $2,
    next_attempt_at = case
      when attempts >= $3 then next_attempt_at
      else now() + (($4 || ' seconds')::interval)
    end,
    leased_until = null,
    lease_token = null,
    updated_at = now()
  where job_id = $1 and lease_token = $5
    and status = 'leased' and leased_until > clock_timestamp()
`;

export const MARK_OUTBOX_DONE_SQL = `
  update intake_outbox_jobs
  set
    status = 'done',
    leased_until = null,
    lease_token = null,
    updated_at = now()
  where job_id = $1 and lease_token = $2
    and status = 'leased' and leased_until > clock_timestamp()
`;

// Same claim contract for request dispatch, restricted to its saved job.
export const CLAIM_NOTIFICATION_JOB_SQL = CLAIM_OUTBOX_JOBS_SQL.replace(
  'where job_type = $1 and (', 'where job_type = $1 and job_id = $5::uuid and (',
).replace('job_type = $1\n      and attempts', 'job_type = $1 and job_id = $5::uuid\n      and attempts');

export const START_NOTIFICATION_SEND_SQL = `
  update intake_outbox_jobs
  set last_error = '${NOTIFICATION_SEND_STARTED}', updated_at = now()
  where job_id = $1 and job_type = 'notification' and status = 'leased'
    and lease_token = $2 and leased_until > clock_timestamp()
    and last_error is distinct from '${NOTIFICATION_SEND_STARTED}'
`;
