"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelector({ currentSort }: { currentSort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push("?" + params.toString());
  };

  return (
    <select value={currentSort} onChange={handleChange} style={{
      background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 9, padding: '7px 14px', fontSize: 13,
      color: 'var(--text-muted)', outline: 'none', cursor: 'pointer',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      <option value="newest">Newest</option>
      <option value="popular">Most Popular</option>
      <option value="rating">Top Rated</option>
      <option value="name">A–Z</option>
    </select>
  );
}
