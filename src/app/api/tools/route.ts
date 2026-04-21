import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category");
  const pricing = searchParams.get("pricing");
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");

  const offset = (page - 1) * limit;

  let query = supabase
    .from("tools")
    .select(
      `
      *,
      category:categories(id, name, slug, icon)
    `,
      { count: "exact" }
    )
    .eq("status", "approved");

  if (category) query = query.eq("categories.slug", category);
  if (pricing) query = query.eq("pricing_type", pricing);
  if (featured === "true") query = query.eq("is_featured", true);
  if (search) {
    query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%,tags.cs.{${search}}`);
  }

  // Sorting
  switch (sort) {
    case "rating":
      query = query.order("average_rating", { ascending: false });
      break;
    case "popular":
      query = query.order("view_count", { ascending: false });
      break;
    case "name":
      query = query.order("name", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    tools: data || [],
    total: count || 0,
    page,
    limit,
    pages: Math.ceil((count || 0) / limit),
  });
}
