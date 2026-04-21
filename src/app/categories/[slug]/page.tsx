import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getToolsByCategory } from "@/lib/supabase";
import ToolGrid from "@/components/tools/ToolGrid";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: { slug: string };
  searchParams: { page?: string; pricing?: string; sort?: string };
}

export async function generateMetadata({ params }: Props) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} AI Tools — AI Tools Directory`,
    description: category.description || `Browse the best ${category.name} AI tools.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const page = parseInt(searchParams.page || "1");
  const { tools, total } = await getToolsByCategory(category.id, {
    page,
    pricing: searchParams.pricing,
    sort: searchParams.sort,
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/40">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
              {category.description && (
                <p className="text-gray-400 mt-1">{category.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{total} tools found</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {tools.length > 0 ? (
          <ToolGrid tools={tools} />
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p>No tools found in this category yet.</p>
            <Link href="/submit" className="text-violet-400 hover:underline mt-2 inline-block">
              Submit a tool →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
