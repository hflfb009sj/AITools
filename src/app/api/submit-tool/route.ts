import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      slug,
      website_url,
      short_description,
      description,
      category_id,
      pricing_type,
      logo_url,
      tags,
      features,
      submitter_email,
    } = body;

    // Validation
    if (!name || !slug || !website_url || !short_description || !pricing_type) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, website_url, short_description, pricing_type" },
        { status: 400 }
      );
    }

    if (!/^https?:\/\/.+/.test(website_url)) {
      return NextResponse.json({ error: "Invalid website URL" }, { status: 400 });
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ error: "Slug must be lowercase alphanumeric with hyphens only" }, { status: 400 });
    }

    // Check slug uniqueness
    const { data: existing } = await supabase
      .from("tools")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json({ error: "A tool with this slug already exists" }, { status: 409 });
    }

    // Insert as pending review
    const { data, error } = await supabase
      .from("tools")
      .insert([
        {
          name,
          slug,
          website_url,
          short_description,
          description: description || null,
          category_id: category_id || null,
          pricing_type,
          logo_url: logo_url || null,
          tags: tags || [],
          features: features || [],
          submitter_email: submitter_email || null,
          status: "pending",
          is_featured: false,
          is_verified: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Database error: " + error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, tool: data }, { status: 201 });
  } catch (err: any) {
    console.error("Submit tool error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
