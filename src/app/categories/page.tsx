import Link from "next/link";
import { getCategories } from "@/lib/supabase";
import { ArrowRight, Grid3X3 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories — AI Tools Directory",
  description: "Browse AI tools by category. Find the best tools for writing, coding, design, marketing, and more.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="border-b border-gray-800 bg-gray-900/40">
        <div className="max-w-6xl mx-auto px-4 py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-sm font-medium mb-4">
            <Grid3X3 className="w-4 h-4" />
            All Categories
          </div>
          <h1 className="text-4xl font-bold mb-3">Browse by Category</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Explore {categories.length} categories of AI tools, curated to help you find exactly what you need.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 hover:bg-gray-900/80 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{category.icon}</div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl font-semibold mb-1 group-hover:text-violet-400 transition-colors">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{category.description}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {category.tool_count ?? 0} tools
                </span>
                <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Grid3X3 className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No categories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
