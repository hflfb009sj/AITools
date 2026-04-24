import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Tools Directory",
  description: "Privacy Policy for AI Tools Directory",
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: 'var(--bg)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 20px 80px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 48 }}>Last updated: January 1, 2025</p>
        {[
          { title: "1. Information We Collect", content: "We collect information you provide directly to us when you submit a tool, contact us, or interact with our website. This may include your name, email address, and any other information you choose to provide.\n\nWe also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed." },
          { title: "2. How We Use Your Information", content: "We use the information we collect to:\n• Operate and improve our website\n• Respond to your comments and questions\n• Send you technical notices and updates\n• Monitor and analyze usage patterns\n• Display relevant advertising through Google AdSense" },
          { title: "3. Cookies", content: "We use cookies and similar tracking technologies. Google AdSense uses cookies to serve ads based on your prior visits to our website. You may opt out of personalized advertising by visiting Google's Ads Settings." },
          { title: "4. Google AdSense", content: "We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your visits to this and other websites.\n\nYou can opt out at: https://www.google.com/settings/ads" },
          { title: "5. Affiliate Links", content: "AI Tools Directory participates in affiliate marketing programs. When you click on certain links and make a purchase, we may earn a commission at no additional cost to you." },
          { title: "6. Third-Party Links", content: "Our website contains links to third-party websites. We have no control over their content or privacy policies. We encourage you to review the privacy policy of every site you visit." },
          { title: "7. Data Security", content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction." },
          { title: "8. Children's Privacy", content: "Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13." },
          { title: "9. Changes to This Policy", content: "We may update this Privacy Policy from time to time. We will notify you of changes by posting the new policy on this page." },
          { title: "10. Contact Us", content: "If you have questions about this Privacy Policy, please contact us at:\nEmail: contact@aitoolsdirectory.com" },
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
