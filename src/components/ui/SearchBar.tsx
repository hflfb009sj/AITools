"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('search') as HTMLInputElement).value.trim();
    if (q) router.push(`/?search=${encodeURIComponent(q)}`);
    else router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 560, margin: '0 auto' }}>
      <div style={{ position: 'relative' }}>
        <Search size={18} color="var(--text-dim)"
          style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          type="text" name="search"
          defaultValue={defaultValue}
          placeholder="Search AI tools..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', paddingLeft: 50, paddingRight: 130,
            paddingTop: 16, paddingBottom: 16,
            background: 'var(--bg2)',
            border: `1px solid ${focused ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 14, color: 'var(--text)', fontSize: 15,
            outline: 'none', transition: 'border-color 0.2s',
            boxShadow: focused ? '0 0 0 3px rgba(124,58,237,0.1)' : '0 4px 24px rgba(0,0,0,0.3)',
          }}
        />
        <button type="submit" style={{
          position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
          padding: '9px 20px', borderRadius: 10,
          background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
          color: 'white', fontWeight: 600, fontSize: 13,
          fontFamily: 'Syne, sans-serif', border: 'none', cursor: 'pointer',
          boxShadow: '0 0 20px rgba(124,58,237,0.4)',
        }}>
          Search
        </button>
      </div>
    </form>
  );
}
