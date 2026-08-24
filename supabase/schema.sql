-- Supabaseの SQL Editor にこのファイルの内容を貼り付けて実行してください。
-- サンプルテーブル: LINEのuserIdごとにデータを分離する最小構成。

create table if not exists sample_items (
  id bigint generated always as identity primary key,
  line_user_id text not null,
  title text not null,
  created_at timestamptz not null default now()
);

alter table sample_items enable row level security;

-- このテンプレートではanon keyをそのまま使い、行の作成者(line_user_id)に依らず
-- 全員が読み書きできる設計にしています（ハッカソン用の最小構成のため）。
-- 本番運用や「自分のデータだけ見せたい」場合は、Supabase Authと連携するか、
-- line_user_id をリクエストヘッダ等で検証する仕組みに置き換えてください。
create policy "allow anon read" on sample_items
  for select using (true);

create policy "allow anon insert" on sample_items
  for insert with check (true);
