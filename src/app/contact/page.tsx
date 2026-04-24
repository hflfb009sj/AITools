"use client";
import { useState } from "react";
import { Send, Mail, CheckCircle, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  };

  if (status === "success") return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Message Sent!</h2>
        <p style={{ color: 'var(--text-muted)' }}>We'll get back to you within 24-48 hours.</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: 56, background: 'var(--bg)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 20px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <MessageSquare size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 40, fontWeight: 800, marginBottom: 10 }}>Contact Us</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>Have a question or want to work together? We'd love to hear from you.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mail size={20} color="#a78bfa" />
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</p>
              <p style={{ fontSize: 13, fontWeight: 600 }}>contact@aitoolsdirectory.com</p>
            </div>
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle size={20} color="#10b981" />
            <div>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Response Time</p>
              <p style={{ fontSize: 13, fontWeight: 600 }}>Within 24-48 hours</p>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 36 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { name: 'name', label: 'Your Name', placeholder: 'John Doe', type: 'text' },
                { name: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email' },
              ].map(({ name, label, placeholder, type }) => (
                <div key={name}>
                  <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                  <input type={type} required placeholder={placeholder}
                    value={form[name as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                    style={{ width: '100%', padding: '11px 14px', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: 'var(--text)', fontSize: 14, outline: 'none' }} />
                </div>
              ))}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject</label>
              <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required
                style={{ width: '100%', padding: '11px 14px', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: 'var(--text)', fontSize: 14, outline: 'none' }}>
                <option value="">Select a subject...</option>
                <option value="general">General Inquiry</option>
                <option value="tool-submission">Tool Submission</option>
                <option value="advertising">Advertising / Sponsorship</option>
                <option value="affiliate">Affiliate Partnership</option>
                <option value="bug">Report a Bug</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</label>
              <textarea required rows={5} placeholder="Tell us more..."
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                style={{ width: '100%', padding: '11px 14px', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: 'var(--text)', fontSize: 14, outline: 'none', resize: 'vertical' }} />
            </div>

            <button type="submit" disabled={status === 'loading'} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              borderRadius: 12, color: 'white', fontFamily: 'Syne, sans-serif',
              fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
              opacity: status === 'loading' ? 0.7 : 1,
            }}>
              {status === 'loading' ? 'Sending...' : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
