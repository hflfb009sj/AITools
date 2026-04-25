import Link from "next/link";
import { Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(8,8,16,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="36" height="36" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="s" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#60a5fa"/>
                <stop offset="100%" stopColor="#0f172a"/>
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="46" fill="url(#s)" stroke="#3b82f6" strokeWidth="1"/>
            <ellipse cx="50" cy="50" rx="46" ry="12" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
            <ellipse cx="50" cy="50" rx="12" ry="46" fill="none" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 3" opacity="0.4"/>
            <circle cx="36" cy="36" r="10" fill="white" opacity="0.15"/>
            <circle cx="72" cy="25" r="3" fill="#fbbf24"/>
            <circle cx="25" cy="68" r="2" fill="#fbbf24"/>
            <circle cx="78" cy="65" r="2.5" fill="#fbbf24"/>
          </svg>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#e8e8f0', letterSpacing: '-0.02em' }}>
            AI<span style={{ color: '#f59e0b' }}>Tools</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { href: '/categories', label: 'Categories' },
            { href: '/?sort=popular', label: 'Popular' },
            { href: '/?pricing=Free', label: 'Free' },
            { href: '/about', label: 'About' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '6px 14px', fontSize: 13, fontWeight: 500,
              color: 'rgba(232,232,240,0.55)', borderRadius: 8,
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Submit Button */}
        <Link href="/submit" style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 16px',
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          borderRadius: 9, fontSize: 13, fontWeight: 600,
          color: 'white', fontFamily: 'Syne, sans-serif',
          boxShadow: '0 0 20px rgba(124,58,237,0.3)',
          textDecoration: 'none',
        }}>
          <Plus size={14} strokeWidth={2.5} />
          Submit Tool
        </Link>

      </div>
    </nav>
  );
}
