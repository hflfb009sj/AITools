import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg2)', padding: '48px 20px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 40 }}>
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, textDecoration: 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={14} color="white" />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: '#e8e8f0' }}>
                AI<span style={{ color: '#7c3aed' }}>Tools</span>
              </span>
            </Link>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>The most comprehensive AI tools directory, curated daily.</p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, marginBottom: 14, color: 'var(--text)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Directory</h4>
            {[
              { href: '/categories', label: 'Categories' },
              { href: '/?sort=popular', label: 'Popular' },
              { href: '/?pricing=Free', label: 'Free Tools' },
              { href: '/?featured=true', label: 'Featured' },
              { href: '/submit', label: 'Submit a Tool' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, marginBottom: 14, color: 'var(--text)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Company</h4>
            {[
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 11, marginBottom: 14, color: 'var(--text)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Legal</h4>
            {[
              { href: '/privacy-policy', label: 'Privacy Policy' },
              { href: '/terms-of-service', label: 'Terms of Service' },
              { href: '/disclaimer', label: 'Disclaimer' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>© {new Date().getFullYear()} AI Tools Directory. All rights reserved.</p>
          <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
            Some links are affiliate links.{' '}
            <Link href="/disclaimer" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Learn more</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
