import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PricingType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.5) return "text-emerald-400";
  if (rating >= 4.0) return "text-green-400";
  if (rating >= 3.0) return "text-yellow-400";
  if (rating >= 2.0) return "text-orange-400";
  return "text-red-400";
}

export function getPricingBadgeColor(pricing: PricingType | string): string {
  switch (pricing) {
    case "Free":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Freemium":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Open Source":
      return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "Paid":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Free Trial":
      return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
