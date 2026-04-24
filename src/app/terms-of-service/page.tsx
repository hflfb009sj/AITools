import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — AI Tools Directory",
  description: "Terms of Service for AI Tools Directory",
};

export default function TermsOfService() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: January 1, 2025</p>
        {[
          { title: "1. Acceptance of Terms", content: "By accessing and using AI Tools Directory, you accept and agree to be bound by these terms. If you do not agree, please do not use this service." },
          { title: "2. Use of the Website", content: "You agree to use this website only for lawful purposes. You must not:\n• Submit false or misleading information\n• Attempt unauthorized access to any part of the website\n• Use the website to transmit spam or malicious content\n• Reproduce our content without permission" },
          { title: "3. Tool Submissions", content: "By submitting a tool, you represent that the information is accurate and does not violate any laws. We reserve the right to reject or remove any submission at our discretion." },
          { title: "4. Intellectual Property", content: "Content on AI Tools Directory is owned by or licensed to us and protected by copyright law. Tool names and logos belong to their respective owners." },
          { title: "5. Disclaimer of Warranties", content: "AI Tools Directory is provided on an 'as is' basis without any warranties of any kind. We do not warrant that the website will be uninterrupted or error-free." },
          { title: "6. Limitation of Liability", content: "We shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service." },
          { title: "7. Affiliate Disclosure", content: "Some links on our website are affiliate links. We may earn a commission if you click and make a purchase. This is at no additional cost to you." },
          { title: "8. Changes to Terms", content: "We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of the new terms." },
          { title: "9. Contact", content: "For questions regarding these Terms, contact us at: contact@aitoolsdirectory.com" },
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
