import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — AI Tools Directory",
  description: "Disclaimer for AI Tools Directory",
};

export default function DisclaimerPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Disclaimer</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: January 1, 2025</p>
        {[
          { title: "General Information", content: "The information on AI Tools Directory is for general informational purposes only. We make no warranty regarding the accuracy, adequacy, or completeness of any information on the site." },
          { title: "Affiliate Disclaimer", content: "AI Tools Directory participates in affiliate programs. If you click on some links and make a purchase, we may earn a small commission at no extra cost to you. Our editorial opinions are not influenced by affiliate relationships." },
          { title: "External Links Disclaimer", content: "We do not guarantee the accuracy or completeness of any information on external websites linked from our site." },
          { title: "Professional Advice Disclaimer", content: "The content on AI Tools Directory is not intended to be a substitute for professional advice. Always seek qualified professional advice before making decisions based on information found here." },
          { title: "Errors and Omissions", content: "While we strive for accuracy, AI Tools Directory is not responsible for any errors or omissions in the information provided." },
          { title: "Fair Use", content: "This site may contain copyrighted material used for educational purposes about AI technology, which we believe constitutes fair use." },
          { title: "Contact", content: "Questions about this Disclaimer? Contact us at: contact@aitoolsdirectory.com" },
        ].map(({ title, content }) => (
          <div key={title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#a78bfa' }}>{title}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 14, whiteSpace: 'pre-line' }}>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
