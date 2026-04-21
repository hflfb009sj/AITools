import Link from "next/link";
import { ExternalLink, Star, Eye, ArrowUpRight } from "lucide-react";
import type { Tool } from "@/types";
import { formatNumber } from "@/lib/utils";

function pricingBadgeClass(p: string) {
  if (p === 'Free') return 'badge-free';
  if (p === 'Freemium') return 'badge-freemium';
  if (p === 'Paid') return 'badge-paid';
  if (p === 'Open Source') return 'badge-opensource';
  if (p === 'Free Trial') return 'badge-trial';
  return 'badge-default';
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="card-hover group" style={{
      background: 'var(--bg2)',
      borderRadius: 16,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.06), transparent 70%)',
        opacity: 0, transition: 'opacity 0.3s',
        pointerEvents: 'none',
      }} className="group-hover:opacity-100" />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: tool.logo_url ? 'transparent' : 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 700, color: '#a78bfa',
          fontFamily: 'Syne, sans-serif',
          overflow: 'hidden',
        }}>
          {tool.logo_url
            ? <img src={tool.logo_url} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : tool.name[0]
          }
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <h3 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15,
              color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              transition: 'color 0.15s',
            }} className="group-hover:text-violet-300">
              {tool.name}
            </h3>
            {tool.is_featured && <span style={{ fontSize: 11 }}>⭐</span>}
          </div>
          <span className={`${pricingBadgeClass(tool.pricing_type)}`} style={{
            fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
            display: 'inline-block', letterSpacing: '0.02em',
          }}>
            {tool.pricing_type}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="line-clamp-2" style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6, flex: 1 }}>
        {tool.short_description}
      </p>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: '2px 8px', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--text-dim)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>#{tag}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {tool.average_rating && tool.average_rating > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Star size={12} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b' }}>
                {tool.average_rating.toFixed(1)}
              </span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Eye size={12} color="var(--text-dim)" />
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              {formatNumber(tool.view_count || 0)}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Link href={`/tools/${tool.slug}`} style={{
            fontSize: 12, color: 'var(--text-muted)', padding: '4px 10px',
            borderRadius: 7, border: '1px solid rgba(255,255,255,0.07)',
            transition: 'all 0.15s',
          }}>
            Details
          </Link>
          <a href={tool.website_url} target="_blank" rel="noopener noreferrer"
            className="glow-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 12, fontWeight: 600, padding: '5px 12px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: 'white', transition: 'all 0.15s',
              boxShadow: '0 2px 12px rgba(124,58,237,0.3)',
            }}>
            Visit <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
