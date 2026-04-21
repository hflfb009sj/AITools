import Link from "next/link";
import { TrendingUp, Star, ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedTools, getCategories, getTools } from "@/lib/supabase";
import ToolGrid from "@/components/tools/ToolGrid";
import SortSelector from "@/components/tools/SortSelector";
import CategoryPills from "@/components/ui/CategoryPills";
import SearchBar from "@/components/ui/SearchBar";

export default async function HomePage({ searchParams }: {
  searchParams: { search?: string; pricing?: string; sort?: string; page?: string; featured?: string };
}) {
  const currentSort = searchParams.sort || "newest";
  const hasFilters = searchParams.search || searchParams.pricing || searchParams.featured;

  const [featuredTools, categories, { tools, total }] = await Promise.all([
    getFeaturedTools(6),
    getCategories(),
    getTools({
      search: searchParams.search,
      pricing: searchParams.pricing,
      sort: currentSort,
      page: parseInt(searchParams.page || "1"),
      featured: searchParams.featured === "true",
    }),
  ]);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56 }}>

      {/* Hero */}
      {!hasFilters && (
        <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 20px 70px' }}>
          <div style={{
            position: 'absolute', top: -100, left: '20%', width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, right: '10%', width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
            borderRadius: '50%', pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="animate-fade-up" style={{ marginBottom: 24 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 16px', borderRadius: 99,
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.25)',
                fontSize: 12, fontWeight: 600, color: '#a78bfa',
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                <Sparkles size={12} />
                {total}+ AI Tools Curated
              </span>
            </div>

            <h1 className="animate-fade-up-1" style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 20,
            }}>
              Discover the Best<br />
              <span className="gradient-text">AI Tools</span> for Every Task
            </h1>

            <p className="animate-fade-up-2" style={{
              fontSize: 17, color: 'var(--text-muted)', maxWidth: 520,
              margin: '0 auto 36px', lineHeight: 1.7,
            }}>
              Curated directory of AI tools for writing, coding, design, video, and productivity.
            </p>

            <div className="animate-fade-up-3">
              <SearchBar defaultValue={searchParams.search} />
            </div>
          </div>
        </section>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 80px' }}>

        {/* Categories */}
        {!hasFilters && categories.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>Browse Categories</h2>
              <Link href="/categories" style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 13, color: '#7c3aed', fontWeight: 500, textDecoration: 'none',
              }}>
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <CategoryPills categories={categories} />
          </section>
        )}

        {/* Featured */}
        {!hasFilters && featuredTools.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Star size={18} fill="#f59e0b" color="#f59e0b" />
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>Featured Tools</h2>
            </div>
            <ToolGrid tools={featuredTools} />
          </section>
        )}

        {/* All Tools */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={18} color="#7c3aed" />
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700 }}>
                {hasFilters ? `Results (${total})` : `All Tools (${total})`}
              </h2>
            </div>
            <SortSelector currentSort={currentSort} />
          </div>
          <ToolGrid tools={tools} />
        </section>

      </div>
    </div>
  );
}
