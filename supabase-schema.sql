-- ─────────────────────────────────────────
-- AI Tools Directory — Supabase Schema
-- ─────────────────────────────────────────

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─── Categories ──────────────────────────
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text default '🤖',
  created_at timestamptz default now()
);

-- ─── Tools ───────────────────────────────
create table if not exists tools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  website_url text not null,
  affiliate_url text,
  short_description text not null,
  description text,
  logo_url text,
  screenshots text[],
  category_id uuid references categories(id) on delete set null,
  pricing_type text not null check (pricing_type in ('Free','Freemium','Paid','Free Trial','Open Source','Contact for Pricing')),
  pricing_details jsonb,
  features text[],
  tags text[],
  average_rating numeric(3,2) default 0,
  review_count int default 0,
  view_count int default 0,
  save_count int default 0,
  click_count int default 0,
  is_featured boolean default false,
  is_verified boolean default false,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  submitter_email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Reviews ─────────────────────────────
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  tool_id uuid references tools(id) on delete cascade,
  user_id uuid,
  rating int check (rating between 1 and 5),
  title text,
  body text,
  helpful_count int default 0,
  created_at timestamptz default now()
);

-- ─── Indexes ─────────────────────────────
create index if not exists tools_status_idx on tools(status);
create index if not exists tools_category_idx on tools(category_id);
create index if not exists tools_slug_idx on tools(slug);
create index if not exists tools_featured_idx on tools(is_featured);
create index if not exists tools_rating_idx on tools(average_rating desc);

-- ─── Function: increment view count ──────
create or replace function increment_view_count(tool_id uuid)
returns void as $$
  update tools set view_count = view_count + 1 where id = tool_id;
$$ language sql;

-- ─── Seed: Categories ─────────────────────
insert into categories (name, slug, description, icon) values
  ('Writing & Content', 'writing-content', 'AI tools for writing, copywriting, and content creation', '✍️'),
  ('Image Generation', 'image-generation', 'Generate and edit images with AI', '🎨'),
  ('Coding & Dev', 'coding-dev', 'AI-powered coding assistants and developer tools', '💻'),
  ('Video & Audio', 'video-audio', 'AI tools for video creation and audio production', '🎬'),
  ('Productivity', 'productivity', 'Automate workflows and boost your productivity', '⚡'),
  ('Marketing', 'marketing', 'AI tools for SEO, ads, and marketing automation', '📈'),
  ('Research & Analysis', 'research-analysis', 'Summarize, analyze, and research with AI', '🔬'),
  ('Chatbots & Assistants', 'chatbots-assistants', 'Conversational AI and intelligent assistants', '💬'),
  ('Design & UI', 'design-ui', 'AI design tools and UI generators', '🖌️'),
  ('Data & Analytics', 'data-analytics', 'Data processing and analytics powered by AI', '📊')
on conflict do nothing;

-- ─── Seed: Tools ──────────────────────────
insert into tools (name, slug, website_url, short_description, description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'ChatGPT', 'chatgpt', 'https://chat.openai.com',
  'The world''s most popular AI chatbot by OpenAI.',
  'ChatGPT is a large language model by OpenAI capable of natural conversation, writing, coding, analysis and more.',
  'Freemium', true, true, 'approved', 4.8, 5240, 98000,
  array['chatbot','gpt','openai','writing','coding'],
  array['Natural language conversations','Code generation','Image analysis (GPT-4V)','Plugin ecosystem','API access'],
  (select id from categories where slug = 'chatbots-assistants')
where not exists (select 1 from tools where slug = 'chatgpt');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'Midjourney', 'midjourney', 'https://midjourney.com',
  'Generate stunning AI art and images from text prompts.',
  'Paid', true, true, 'approved', 4.7, 3100, 72000,
  array['image generation','art','design','creative'],
  array['Photorealistic image generation','Multiple art styles','Discord integration','Upscaling & variations','Community gallery'],
  (select id from categories where slug = 'image-generation')
where not exists (select 1 from tools where slug = 'midjourney');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'GitHub Copilot', 'github-copilot', 'https://github.com/features/copilot',
  'AI pair programmer that suggests code right in your editor.',
  'Paid', true, true, 'approved', 4.6, 2800, 65000,
  array['coding','github','ide','autocomplete'],
  array['Context-aware code suggestions','Multi-language support','IDE integrations','Chat interface','Test generation'],
  (select id from categories where slug = 'coding-dev')
where not exists (select 1 from tools where slug = 'github-copilot');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'Notion AI', 'notion-ai', 'https://notion.so',
  'AI writing and productivity features built right into Notion.',
  'Freemium', false, true, 'approved', 4.4, 1900, 45000,
  array['productivity','writing','notes','workspace'],
  array['AI writing assistant','Summarize pages','Action item extraction','Q&A on your docs','Translation'],
  (select id from categories where slug = 'productivity')
where not exists (select 1 from tools where slug = 'notion-ai');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'Runway', 'runway', 'https://runwayml.com',
  'Professional AI video generation and editing tools.',
  'Freemium', true, true, 'approved', 4.5, 1400, 38000,
  array['video','generation','editing','creative'],
  array['Text-to-video generation','AI video editing','Background removal','Motion tracking','Green screen'],
  (select id from categories where slug = 'video-audio')
where not exists (select 1 from tools where slug = 'runway');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'Jasper', 'jasper', 'https://jasper.ai',
  'AI writing assistant for marketing teams and content creators.',
  'Paid', false, true, 'approved', 4.3, 2200, 41000,
  array['writing','marketing','copywriting','content'],
  array['50+ content templates','Brand voice settings','SEO mode','Team collaboration','Plagiarism checker'],
  (select id from categories where slug = 'writing-content')
where not exists (select 1 from tools where slug = 'jasper');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'Perplexity AI', 'perplexity-ai', 'https://perplexity.ai',
  'AI-powered search engine with cited, real-time answers.',
  'Freemium', true, true, 'approved', 4.6, 1800, 52000,
  array['search','research','citations','ai'],
  array['Real-time web search','Cited sources','Follow-up questions','File uploads','API access'],
  (select id from categories where slug = 'research-analysis')
where not exists (select 1 from tools where slug = 'perplexity-ai');

insert into tools (name, slug, website_url, short_description, pricing_type, is_featured, is_verified, status, average_rating, review_count, view_count, tags, features, category_id)
select
  'DALL-E 3', 'dall-e-3', 'https://openai.com/dall-e-3',
  'OpenAI''s most capable text-to-image model.',
  'Freemium', false, true, 'approved', 4.5, 2100, 48000,
  array['image generation','openai','art','creative'],
  array['High-quality image generation','Natural language understanding','Safety features','API access','ChatGPT integration'],
  (select id from categories where slug = 'image-generation')
where not exists (select 1 from tools where slug = 'dall-e-3');
