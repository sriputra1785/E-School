-- รันใน Supabase > SQL Editor
create table if not exists students (
  id bigint generated always as identity primary key,
  full_name text not null,
  class_name text,
  created_at timestamptz default now()
);
create table if not exists attendance (
  id bigint generated always as identity primary key,
  student_id bigint references students(id) on delete cascade,
  att_date date not null default current_date,
  status text check (status in ('มา','ขาด','ลา','สาย')),
  created_at timestamptz default now(),
  unique (student_id, att_date)
);

alter table students   enable row level security;
alter table attendance enable row level security;

-- ทดสอบ: ให้ผู้ใช้ที่ล็อกอินทำได้ทุกอย่าง (ปรับตามบทบาทจริงภายหลัง)
create policy "auth all students"   on students   for all to authenticated using (true) with check (true);
create policy "auth all attendance" on attendance for all to authenticated using (true) with check (true);
