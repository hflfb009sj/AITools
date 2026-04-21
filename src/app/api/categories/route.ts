import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from("categories")
    .select("*, tool_count:tools(count)")
    .order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const categories = (data || []).map((cat: any) => ({
    ...cat,
    tool_count: cat.tool_count?.[0]?.count ?? 0,
  }));

  return NextResponse.json({ categories });
}
