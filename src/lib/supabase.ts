import { createClient } from "@supabase/supabase-js";
import type { Tool, Category } from "@/types";

export const supabase = createClient(
  "https://glueigcycfhciykbzgyu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdWVpZ2N5Y2ZoY2l5a2J6Z3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MjkxNDgsImV4cCI6MjA5MjIwNTE0OH0.sk7RUIQETkgnxScg3zTocyU7_QO-42xyaMahb-EhMjs"
);

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");
  if (error) { console.error("getCategories error:", error); return []; }
  return data ?? [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getTools(options: {
  page?: number;
  limit?: number;
  pricing?: string;
  sort?: string;
  search?: string;
  featured?: boolean;
} = {}): Promise<{ tools: Tool[]; total: number }> {
  const { pricing, sort = "newest", search, featured } = options;

  let query = supabase
    .from("tools")
    .select("*, category:categories(id, name, slug, icon)")
    .eq("status", "approved");

  if (pricing) query = query.eq("pricing_type", pricing);
  if (featured) query = query.eq("is_featured", true);
  if (search) {
    query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`);
  }

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
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) { console.error("getTools error:", error); return { tools: [], total: 0 }; }
  return { tools: data ?? [], total: data?.length ?? 0 };
}

export async function getFeaturedTools(limit = 6): Promise<Tool[]> {
  const { data, error } = await supabase
    .from("tools")
    .select("*, category:categories(id, name, slug, icon)")
    .eq("status", "approved")
    .eq("is_featured", true)
    .order("average_rating", { ascending: false })
    .limit(limit);
  if (error) { console.error("getFeaturedTools error:", error); return []; }
  return data ?? [];
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const { data } = await supabase
    .from("tools")
    .select("*, category:categories(id, name, slug, icon, description)")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();
  return data;
}

export async function getRelatedTools(
  toolId: string,
  categoryId: string,
  limit = 3
): Promise<Partial<Tool>[]> {
  const { data } = await supabase
    .from("tools")
    .select("id, name, slug, short_description, logo_url, pricing_type")
    .eq("status", "approved")
    .eq("category_id", categoryId)
    .neq("id", toolId)
    .limit(limit);
  return (data ?? []) as Tool[];
}

export async function getToolsByCategory(
  categoryId: string,
  options: { page?: number; pricing?: string; sort?: string } = {}
): Promise<{ tools: Tool[]; total: number }> {
  const { pricing, sort = "newest" } = options;

  let query = supabase
    .from("tools")
    .select("*, category:categories(id, name, slug, icon)")
    .eq("status", "approved")
    .eq("category_id", categoryId);

  if (pricing) query = query.eq("pricing_type", pricing);
  switch (sort) {
    case "rating":
      query = query.order("average_rating", { ascending: false });
      break;
    case "popular":
      query = query.order("view_count", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) return { tools: [], total: 0 };
  return { tools: data ?? [], total: data?.length ?? 0 };
}

export async function incrementToolViews(toolId: string): Promise<void> {
  await supabase.rpc("increment_view_count", { tool_id: toolId });
}
