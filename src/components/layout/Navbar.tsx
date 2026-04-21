import Link from "next/link";
import { Zap, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(8,8,16,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={16} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 17, color: '#e8e8f0' }}>
            AI<span style={{ color: '#7c3aed' }}>Tools</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[
            { href: '/categories', label: 'Categories' },
            { href: '/?sort=popular', label: 'Popular' },
            { href: '/?pricing=Free', label: 'Free' },
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
