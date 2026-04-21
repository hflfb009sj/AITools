"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/supabase";
import { Send, CheckCircle, AlertCircle, Plus, X } from "lucide-react";

const PRICING_TYPES = ["Free", "Freemium", "Paid", "Free Trial", "Open Source", "Contact for Pricing"];

interface FormData {
  name: string;
  slug: string;
  website_url: string;
  short_description: string;
  description: string;
  category_id: string;
  pricing_type: string;
  logo_url: string;
  tags: string[];
  features: string[];
  submitter_email: string;
}

export default function SubmitPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const [form, setForm] = useState<FormData>({
    name: "",
    slug: "",
    website_url: "",
    short_description: "",
    description: "",
    category_id: "",
    pricing_type: "Free",
    logo_url: "",
    tags: [],
    features: [],
    submitter_email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") } : {}),
    }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag) && form.tags.length < 10) {
      setForm((p) => ({ ...p, tags: [...p.tags, tag] }));
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setForm((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));

  const addFeature = () => {
    const f = featureInput.trim();
    if (f && !form.features.includes(f) && form.features.length < 10) {
      setForm((p) => ({ ...p, features: [...p.features, f] }));
      setFeatureInput("");
    }
  };

  const removeFeature = (f: string) => setForm((p) => ({ ...p, features: p.features.filter((x) => x !== f) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Tool Submitted!</h1>
          <p className="text-gray-400 mb-6">
            Thank you! Your tool submission is under review. We'll notify you once it's approved.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition-colors"
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Submit a Tool</h1>
          <p className="text-gray-400">
            Know a great AI tool? Share it with our community. All submissions are reviewed before publishing.
          </p>
        </div>

        {status === "error" && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-6 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Basic Information</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Tool Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. ChatGPT"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">URL Slug *</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                placeholder="e.g. chatgpt"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <p className="text-xs text-gray-600 mt-1">Will be used in the URL: /tools/{form.slug || "your-tool"}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Website URL *</label>
              <input
                type="url"
                name="website_url"
                value={form.website_url}
                onChange={handleChange}
                required
                placeholder="https://example.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Logo URL</label>
              <input
                type="url"
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Description</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Short Description * (max 160 chars)</label>
              <input
                type="text"
                name="short_description"
                value={form.short_description}
                onChange={handleChange}
                required
                maxLength={160}
                placeholder="One-line summary of the tool"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <p className="text-xs text-gray-600 mt-1">{form.short_description.length}/160</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe what the tool does, who it's for, and what makes it unique..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Category & Pricing */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Category & Pricing</h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Pricing Type *</label>
              <select
                name="pricing_type"
                value={form.pricing_type}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500 transition-colors"
              >
                {PRICING_TYPES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Tags (max 10)</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add a tag and press Enter"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Key Features (max 10)</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                placeholder="Add a feature and press Enter"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {form.features.length > 0 && (
              <ul className="space-y-2">
                {form.features.map((f) => (
                  <li key={f} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-300">
                    {f}
                    <button type="button" onClick={() => removeFeature(f)} className="hover:text-red-400 ml-2">
                      <X className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-semibold text-lg mb-4">Contact (Optional)</h2>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Your Email</label>
              <input
                type="email"
                name="submitter_email"
                value={form.submitter_email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
              <p className="text-xs text-gray-600 mt-1">We'll notify you when your tool is approved.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-colors"
          >
            {status === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Tool
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
