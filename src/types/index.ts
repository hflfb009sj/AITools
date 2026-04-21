export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  tool_count?: number;
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  website_url: string;
  affiliate_url?: string;
  short_description: string;
  description?: string;
  logo_url?: string;
  screenshots?: string[];
  category_id: string;
  category?: Category;
  pricing_type: PricingType;
  pricing_details?: Record<string, string | number>;
  features?: string[];
  tags?: string[];
  average_rating?: number;
  review_count?: number;
  view_count?: number;
  save_count?: number;
  click_count?: number;
  is_featured: boolean;
  is_verified: boolean;
  status: "pending" | "approved" | "rejected";
  submitter_email?: string;
  created_at: string;
  updated_at: string;
}

export type PricingType =
  | "Free"
  | "Freemium"
  | "Paid"
  | "Free Trial"
  | "Open Source"
  | "Contact for Pricing";

export interface Review {
  id: string;
  tool_id: string;
  user_id?: string;
  rating: number;
  title?: string;
  body?: string;
  helpful_count?: number;
  created_at: string;
}

export interface ToolFilters {
  category?: string;
  pricing?: PricingType;
  sort?: "newest" | "popular" | "rating" | "name";
  search?: string;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
