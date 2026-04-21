import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, getRelatedTools, incrementToolViews } from "@/lib/supabase";
import { formatNumber, formatDate, getRatingColor, getPricingBadgeColor } from "@/lib/utils";
import { ExternalLink, Star, Eye, Heart, Tag, Calendar, Globe, ArrowLeft, CheckCircle } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.name} — AI Tools Directory`,
    description: tool.short_description,
    openGraph: {
      title: tool.name,
      description: tool.short_description,
      images: tool.logo_url ? [tool.logo_url] : [],
    },
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();

  await incrementToolViews(tool.id);

  const relatedTools = await getRelatedTools(tool.id, tool.category_id, 3);

  const ratingColor = getRatingColor(tool.average_rating || 0);
  const pricingColor = getPricingBadgeColor(tool.pricing_type);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tool Header */}
            <div className="flex gap-5 items-start">
              {tool.logo_url ? (
                <img
                  src={tool.logo_url}
                  alt={tool.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-gray-700 flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0 text-2xl font-bold">
                  {tool.name[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                  {tool.is_featured && (
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/30">
                      ⭐ Featured
                    </span>
                  )}
                  {tool.is_verified && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <p className="text-gray-300 text-lg mb-3">{tool.short_description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${pricingColor}`}>
                    {tool.pricing_type}
                  </span>
                  {tool.category && (
                    <Link
                      href={`/categories/${tool.category.slug}`}
                      className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                      {tool.category.icon} {tool.category.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-6 py-4 border-y border-gray-800">
              {tool.average_rating && tool.average_rating > 0 && (
                <div className="flex items-center gap-2">
                  <Star className={`w-5 h-5 ${ratingColor}`} />
                  <span className="font-semibold">{tool.average_rating.toFixed(1)}</span>
                  <span className="text-gray-500 text-sm">({tool.review_count} reviews)</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{formatNumber(tool.view_count || 0)} views</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{formatNumber(tool.save_count || 0)} saves</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Added {formatDate(tool.created_at)}</span>
              </div>
            </div>

            {/* Description */}
            {tool.description && (
              <div>
                <h2 className="text-xl font-semibold mb-3">About {tool.name}</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{tool.description}</p>
              </div>
            )}

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Tag className="w-5 h-5" /> Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {tool.screenshots && tool.screenshots.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tool.screenshots.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${tool.name} screenshot ${i + 1}`}
                      className="rounded-xl border border-gray-800 w-full object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <a
                href={tool.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold transition-colors mb-3"
              >
                <Globe className="w-5 h-5" />
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-gray-500 text-xs text-center">Opens in new tab</p>
            </div>

            {/* Pricing */}
            {tool.pricing_details && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="font-semibold mb-3">Pricing</h3>
                <div className="space-y-2">
                  {Object.entries(tool.pricing_details).map(([plan, price]) => (
                    <div key={plan} className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{plan}</span>
                      <span className="font-medium">{String(price)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-semibold">Info</h3>
              {tool.category && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Category</span>
                  <span>{tool.category.icon} {tool.category.name}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pricing</span>
                <span>{tool.pricing_type}</span>
              </div>
              {tool.affiliate_url && (
                <a
                  href={tool.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-violet-400 hover:text-violet-300 transition-colors pt-2 border-t border-gray-800"
                >
                  Get Special Deal →
                </a>
              )}
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <h3 className="font-semibold mb-4">Related Tools</h3>
                <div className="space-y-3">
                  {relatedTools.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/tools/${rel.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      {rel.logo_url ? (
                        <img src={rel.logo_url} alt={rel.name} className="w-9 h-9 rounded-lg object-cover border border-gray-700" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {rel.name[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium group-hover:text-violet-400 transition-colors truncate">{rel.name}</p>
                        <p className="text-xs text-gray-500 truncate">{rel.short_description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
