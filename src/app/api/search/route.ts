import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  const { data, error } = await supabase
    .from("tools")
    .select("id, name, slug, short_description, logo_url, pricing_type, category:categories(name, icon)")
    .eq("status", "approved")
    .or(`name.ilike.%${q}%,short_description.ilike.%${q}%,tags.cs.{${q.toLowerCase()}}`)
    .order("is_featured", { ascending: false })
    .order("average_rating", { ascending: false })
    .limit(8);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ results: data || [] });
}
