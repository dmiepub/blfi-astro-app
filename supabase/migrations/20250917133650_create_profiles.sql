create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  country text not null,
  created_at timestamp with time zone default now()
);

create or replace view public.user_profiles as
select
  u.id,
  u.email,
  u.phone,
  u.created_at as user_created_at,
  p.name,
  p.country,
  p.created_at as profile_created_at
from auth.users u
join public.profiles p on u.id = p.id;