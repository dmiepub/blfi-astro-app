create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  name text not null,
  email text not null,
  country text not null,
  created_at timestamp with time zone default now()
);