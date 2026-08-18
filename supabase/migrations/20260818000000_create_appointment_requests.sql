create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  reason text not null,
  preferred_date date,
  preferred_time text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'declined')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.appointment_requests enable row level security;

create policy "Anyone can submit an appointment request"
  on public.appointment_requests for insert
  to anon, authenticated
  with check (status = 'pending');

-- Requests are intentionally not readable by the public. Review and update them
-- from the Supabase dashboard using an authenticated owner account.
