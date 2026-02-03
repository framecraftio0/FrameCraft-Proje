/**
 * Database type definitions
 * This file will be auto-generated from Supabase schema when you set up the database
 * For now, this is a placeholder with basic structure
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    business_name: string | null
                    business_sector: string | null
                    avatar_url: string | null
                    phone: string | null
                    address: string | null
                    city: string | null
                    country: string | null
                    postal_code: string | null
                    bio: string | null
                    email_verified: boolean
                    role: string
                    subscription_plan: string
                    subscription_status: string
                    credits_remaining: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    business_name?: string | null
                    business_sector?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    address?: string | null
                    city?: string | null
                    country?: string | null
                    postal_code?: string | null
                    bio?: string | null
                    email_verified?: boolean
                    role?: string
                    subscription_plan?: string
                    subscription_status?: string
                    credits_remaining?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    business_name?: string | null
                    business_sector?: string | null
                    avatar_url?: string | null
                    phone?: string | null
                    address?: string | null
                    city?: string | null
                    country?: string | null
                    postal_code?: string | null
                    bio?: string | null
                    email_verified?: boolean
                    role?: string
                    subscription_plan?: string
                    subscription_status?: string
                    credits_remaining?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            component_templates: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    category: string
                    description: string | null
                    figma_component_id: string | null
                    figma_file_key: string | null
                    figma_node_id: string | null
                    thumbnail_url: string
                    preview_desktop_url: string | null
                    preview_tablet_url: string | null
                    preview_mobile_url: string | null
                    html_template: string
                    css_template: string
                    js_template: string | null
                    editable_fields: Json
                    tags: string[]
                    is_premium: boolean
                    is_published: boolean
                    usage_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    category: string
                    description?: string | null
                    figma_component_id?: string | null
                    figma_file_key?: string | null
                    figma_node_id?: string | null
                    thumbnail_url: string
                    preview_desktop_url?: string | null
                    preview_tablet_url?: string | null
                    preview_mobile_url?: string | null
                    html_template: string
                    css_template: string
                    js_template?: string | null
                    editable_fields?: Json
                    tags?: string[]
                    is_premium?: boolean
                    is_published?: boolean
                    usage_count?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: Partial<Database['public']['Tables']['component_templates']['Insert']>
            }
            websites: {
                Row: {
                    id: string
                    user_id: string
                    site_name: string
                    business_sector: string | null
                    custom_domain: string | null
                    subdomain: string
                    sitemap: Json
                    global_styles: Json
                    custom_css: string | null
                    custom_js: string | null
                    meta_title: string | null
                    meta_description: string | null
                    og_image_url: string | null
                    favicon_url: string | null
                    google_analytics_id: string | null
                    facebook_pixel_id: string | null
                    status: string
                    published_at: string | null
                    last_published_at: string | null
                    page_views: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    site_name: string
                    business_sector?: string | null
                    custom_domain?: string | null
                    subdomain: string
                    sitemap?: Json
                    global_styles?: Json
                    custom_css?: string | null
                    custom_js?: string | null
                    meta_title?: string | null
                    meta_description?: string | null
                    og_image_url?: string | null
                    favicon_url?: string | null
                    google_analytics_id?: string | null
                    facebook_pixel_id?: string | null
                    status?: string
                    published_at?: string | null
                    last_published_at?: string | null
                    page_views?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: Partial<Database['public']['Tables']['websites']['Insert']>
            }
            website_components: {
                Row: {
                    id: string
                    website_id: string
                    template_id: string | null
                    page_path: string
                    section_order: number
                    custom_content: Json
                    custom_styles: Json
                    is_visible: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    website_id: string
                    template_id?: string | null
                    page_path: string
                    section_order: number
                    custom_content?: Json
                    custom_styles?: Json
                    is_visible?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: Partial<Database['public']['Tables']['website_components']['Insert']>
            }
            ai_generations: {
                Row: {
                    id: string
                    user_id: string
                    website_id: string | null
                    generation_type: string
                    prompt: string
                    parameters: Json
                    result: Json | null
                    status: string
                    error_message: string | null
                    credits_used: number
                    ai_model: string | null
                    processing_time_ms: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    website_id?: string | null
                    generation_type: string
                    prompt: string
                    parameters?: Json
                    result?: Json | null
                    status?: string
                    error_message?: string | null
                    credits_used?: number
                    ai_model?: string | null
                    processing_time_ms?: number | null
                    created_at?: string
                }
                Update: Partial<Database['public']['Tables']['ai_generations']['Insert']>
            }
            media_assets: {
                Row: {
                    id: string
                    user_id: string
                    website_id: string | null
                    filename: string
                    file_size: number
                    file_type: string
                    mime_type: string
                    storage_path: string
                    public_url: string
                    thumbnail_url: string | null
                    width: number | null
                    height: number | null
                    duration: number | null
                    alt_text: string | null
                    source: string
                    ai_generation_id: string | null
                    used_in_components: string[]
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    website_id?: string | null
                    filename: string
                    file_size: number
                    file_type: string
                    mime_type: string
                    storage_path: string
                    public_url: string
                    thumbnail_url?: string | null
                    width?: number | null
                    height?: number | null
                    duration?: number | null
                    alt_text?: string | null
                    source?: string
                    ai_generation_id?: string | null
                    used_in_components?: string[]
                    created_at?: string
                }
                Update: Partial<Database['public']['Tables']['media_assets']['Insert']>
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
