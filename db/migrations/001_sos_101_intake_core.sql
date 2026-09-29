create extension if not exists pgcrypto;

create table if not exists intake_source_events (
  source_event_id uuid primary key default gen_random_uuid(),
  client_submission_token text not null unique,
  payload_hash text not null,
  received_at_utc timestamptz not null default now(),
  submission_intent text not null check (
    submission_intent in ('service_inquiry', 'giveaway_estimate', 'giveaway_opt_in')
  ),
  source_channel text not null,
  source_detail text not null,
  landing_page_path text,
  referrer_host text,
  attribution jsonb not null default '{}'::jsonb,
  contact_name text,
  contact_email text not null,
  contact_phone text,
  contact_phone_digits text,
  preferred_contact_method text not null check (preferred_contact_method in ('text', 'phone', 'email')),
  service_address text,
  service_city text,
  service_state text,
  service_zip_code text,
  property_fields jsonb not null default '{}'::jsonb,
  customer_message text,
  notification_status text not null default 'pending',
  projection_status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists intake_opportunities (
  opportunity_id uuid primary key default gen_random_uuid(),
  origin_event_id uuid not null unique references intake_source_events(source_event_id) on delete restrict,
  pipeline_stage text not null check (pipeline_stage in ('new', 'giveaway_only')),
  owner_role text not null check (owner_role in ('Jason')),
  backup_role text not null check (backup_role in ('Kristen')),
  next_action text not null,
  next_action_due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists intake_outbox_jobs (
  job_id uuid primary key default gen_random_uuid(),
  source_event_id uuid not null references intake_source_events(source_event_id) on delete restrict,
  opportunity_id uuid references intake_opportunities(opportunity_id) on delete restrict,
  job_type text not null check (job_type in ('notification', 'drive_projection')),
  status text not null check (
    status in ('pending', 'leased', 'retryable', 'accepted', 'ambiguous', 'failed', 'manual_review', 'done')
  ),
  attempts integer not null default 0,
  lease_token uuid,
  leased_until timestamptz,
  next_attempt_at timestamptz not null default now(),
  provider_message_id text,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists intake_outbox_jobs_event_type_unique
  on intake_outbox_jobs(source_event_id, job_type);

create index if not exists intake_outbox_jobs_claim_idx
  on intake_outbox_jobs(job_type, status, next_attempt_at, leased_until, created_at);

create table if not exists intake_drive_projection_state (
  opportunity_id uuid primary key references intake_opportunities(opportunity_id) on delete restrict,
  source_event_id uuid not null references intake_source_events(source_event_id) on delete restrict,
  target_row_id text,
  row_hash text not null,
  last_synced_at timestamptz,
  sync_status text not null default 'pending' check (
    sync_status in ('pending', 'synced', 'retryable', 'manual_review')
  ),
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
