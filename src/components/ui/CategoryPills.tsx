"use client";
import Link from "next/link";
import type { Category } from "@/types";

export default function CategoryPills({ categories }: { categories: Category[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {categories.map(cat => (
        <Link key={cat.id} href={`/categories/${cat.slug}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 16px', borderRadius: 99,
            background: 'var(--bg2)', border: '1px solid var(--border)',
            fontSize: 13, fontWeight: 500, color: 'var(--text-muted)',
            transition: 'all 0.15s', whiteSpace: 'nowrap', textDecoration: 'none',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'rgba(124,58,237,0.4)';
            el.style.color = '#a78bfa';
            el.style.background = 'rgba(124,58,237,0.08)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = 'var(--border)';
            el.style.color = 'var(--text-muted)';
            el.style.background = 'var(--bg2)';
          }}
        >
          <span style={{ fontSize: 16 }}>{cat.icon}</span>
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
