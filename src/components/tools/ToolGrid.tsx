import ToolCard from "./ToolCard";
import type { Tool } from "@/types";

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  if (!tools.length) return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
      <p style={{ fontSize: 16, fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>No tools found</p>
      <p style={{ fontSize: 13, marginTop: 6 }}>Try adjusting your filters or search query.</p>
    </div>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 16,
    }}>
      {tools.map((tool, i) => (
        <div key={tool.id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-fade-up">
          <ToolCard tool={tool} />
        </div>
      ))}
    </div>
  );
}
