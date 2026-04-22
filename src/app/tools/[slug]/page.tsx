import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, getRelatedTools, incrementToolViews } from "@/lib/supabase";
import { formatNumber, formatDate } from "@/lib/utils";
import {
  Star, Eye, Heart, Tag, Calendar, Globe,
  ArrowLeft, CheckCircle, ArrowUpRight, Sparkles, Shield,
} from "lucide-react";

interface Props { params: { slug: string } }

function pricingBadgeStyle(p: string) {
  if (p === 'Free') return { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' };
  if (p === 'Freemium') return { background: 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.2)' };
  if (p === 'Paid') return { background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' };
  if (p === 'Open Source') return { background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.2)' };
  return { background: 'rgba(255,255,255,0.05)', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.1)' };
}

export async function generateMetadata({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.name} — AI Tools Directory`,
    description: tool.short_description,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();

  await incrementToolViews(tool.id);
  const relatedTools = await getRelatedTools(tool.id, tool.category_id, 3);
  const badgeStyle = pricingBadgeStyle(tool.pricing_type);

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: 'var(--bg)' }}>

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg2)', padding: '12px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none',
          }}>
            <ArrowLeft size={15} />
            Back to Directory
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Hero Card */}
            <div style={{
              background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
                pointerEvents: 'none',
              }} />

              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', position: 'relative' }}>
                <div style={{
                  width: 80, height: 80, borderRadius: 18, flexShrink: 0,
                  background: tool.logo_url ? 'transparent' : 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, fontWeight: 800, color: '#a78bfa',
                  fontFamily: 'Syne, sans-serif', overflow: 'hidden',
                }}>
                  {tool.logo_url
                    ? <img src={tool.logo_url} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : tool.name[0]
                  }
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                    <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
                      {tool.name}
                    </h1>
                    {tool.is_featured && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '3px 10px', borderRadius: 99,
                        background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                        border: '1px solid rgba(245,158,11,0.2)',
                        fontSize: 11, fontWeight: 700,
                      }}>
                        <Sparkles size={10} /> FEATURED
                      </span>
                    )}
                    {tool.is_verified && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '3px 10px', borderRadius: 99,
                        background: 'rgba(6,182,212,0.1)', color: '#06b6d4',
                        border: '1px solid rgba(6,182,212,0.2)',
                        fontSize: 11, fontWeight: 700,
                      }}>
                        <Shield size={10} /> VERIFIED
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                    {tool.short_description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ ...badgeStyle, padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
                      {tool.pricing_type}
                    </span>
                    {tool.category && (
                      <Link href={`/categories/${tool.category.slug}`} style={{
                        padding: '5px 14px', borderRadius: 99,
                        background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        fontSize: 12, fontWeight: 500, textDecoration: 'none',
                      }}>
                        {tool.category.icon} {tool.category.name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex', gap: 24, marginTop: 24, paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap',
              }}>
                {tool.average_rating && tool.average_rating > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{tool.average_rating.toFixed(1)}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>({tool.review_count} reviews)</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                  <Eye size={13} /><span style={{ fontSize: 12 }}>{formatNumber(tool.view_count || 0)} views</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                  <Heart size={13} /><span style={{ fontSize: 12 }}>{formatNumber(tool.save_count || 0)} saves</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
                  <Calendar size={13} /><span style={{ fontSize: 12 }}>Added {formatDate(tool.created_at)}</span>
                </div>
              </div>
            </div>

            {/* About */}
            {tool.description && (
              <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28 }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>About {tool.name}</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-wrap' }}>{tool.description}</p>
              </div>
            )}

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28 }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 18 }}>Key Features</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                  {tool.features.map((feature, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '12px 14px', borderRadius: 10,
                      background: 'rgba(124,58,237,0.05)',
                      border: '1px solid rgba(124,58,237,0.1)',
                    }}>
                      <CheckCircle size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tool.tags && tool.tags.length > 0 && (
              <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28 }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Tag size={17} /> Tags
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {tool.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '5px 14px', borderRadius: 99,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'var(--text-muted)', fontSize: 12,
                    }}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* CTA */}
            <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
              <a href={tool.affiliate_url || tool.website_url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '14px 20px',
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                borderRadius: 12, fontFamily: 'Syne, sans-serif',
                fontWeight: 700, fontSize: 15, color: 'white',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
                marginBottom: 10,
              }}>
                <Globe size={17} /> Visit {tool.name} <ArrowUpRight size={15} />
              </a>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center' }}>
                {tool.affiliate_url ? '🎁 Special deal available' : 'Opens in new tab'}
              </p>
            </div>

            {/* Info */}
            <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, marginBottom: 14, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Tool Info
              </h3>
              {[
                { label: 'Pricing', value: tool.pricing_type },
                { label: 'Category', value: tool.category ? `${tool.category.icon} ${tool.category.name}` : '—' },
                { label: 'Status', value: tool.is_verified ? '✅ Verified' : '⏳ Unverified' },
                { label: 'Added', value: formatDate(tool.created_at) },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>{value}</span>
                </div>
              ))}
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Related Tools
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {relatedTools.map(rel => (
                    <Link key={rel.id} href={`/tools/${rel.slug ?? ''}`} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, fontWeight: 800, color: '#a78bfa', overflow: 'hidden',
                      }}>
                        {rel.logo_url
                          ? <img src={rel.logo_url} alt={rel.name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : (rel.name?.[0] ?? '?')
                        }
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rel.name}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rel.short_description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 12, fontWeight: 700, marginBottom: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Share</h3>
              <a href={`https://twitter.com/intent/tweet?text=Check out ${tool.name}&url=https://yourdomain.com/tools/${tool.slug}`}
                target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '10px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500,
                }}>
                𝕏 Share on X
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
