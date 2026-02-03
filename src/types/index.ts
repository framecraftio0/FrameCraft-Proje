/**
 * Application-level type definitions
 */

export interface User {
    id: string
    email: string
    full_name?: string
    business_name?: string
    business_sector?: string
    avatar_url?: string
    subscription_plan: 'free' | 'pro' | 'enterprise'
    subscription_status: 'active' | 'cancelled' | 'expired'
    credits_remaining: number
    created_at: string
    updated_at: string
}

export interface Website {
    id: string
    user_id: string
    site_name: string
    business_sector?: string
    custom_domain?: string
    subdomain: string
    sitemap: Sitemap
    global_styles: GlobalStyles
    custom_css?: string
    custom_js?: string
    meta_title?: string
    meta_description?: string
    og_image_url?: string
    favicon_url?: string
    status: 'draft' | 'published' | 'archived'
    published_at?: string
    last_published_at?: string
    page_views: number
    created_at: string
    updated_at: string
}

export interface Sitemap {
    pages: Page[]
}

export interface Page {
    id: string
    name: string
    path: string
    components: ComponentReference[]
}

export interface ComponentReference {
    template_slug: string
    content_hints?: Record<string, any>
}

export interface GlobalStyles {
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
    fontFamily?: string
}

export interface ComponentTemplate {
    id: string
    name: string
    slug: string
    category: ComponentCategory
    description?: string
    thumbnail_url: string
    preview_desktop_url?: string
    preview_tablet_url?: string
    preview_mobile_url?: string
    html_template: string
    css_template: string
    js_template?: string
    editable_fields: EditableFieldsConfig
    tags: string[]
    is_premium: boolean
    is_published: boolean
    usage_count: number
}

export type ComponentCategory =
    | 'heroes'
    | 'features'
    | 'galleries'
    | 'testimonials'
    | 'ctas'
    | 'forms'
    | 'footers'
    | 'headers'
    | 'pricing'
    | 'team'
    | 'faq'

export interface EditableFieldsConfig {
    fields: EditableField[]
}

export type EditableField =
    | TextField
    | ImageField
    | VideoField
    | ButtonField
    | ColorField

interface BaseField {
    id: string
    name: string
    selector: string
}

export interface TextField extends BaseField {
    type: 'text' | 'textarea' | 'heading'
    defaultValue: string
    validation?: {
        minLength?: number
        maxLength?: number
    }
    styles: {
        fontSize?: string
        fontWeight?: string
        color?: string
        fontFamily?: string
        textAlign?: 'left' | 'center' | 'right'
    }
}

export interface ImageField extends BaseField {
    type: 'image'
    dimensions: {
        width: number
        height: number
    }
    aspectRatio?: string
    defaultUrl?: string
}

export interface VideoField extends BaseField {
    type: 'video'
    videoTypes: ('youtube' | 'vimeo' | 'direct')[]
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    showControls?: boolean
}

export interface ButtonField extends BaseField {
    type: 'button'
    defaultText: string
    defaultLink: string
    styles: {
        bgColor?: string
        textColor?: string
        size?: 'sm' | 'md' | 'lg'
    }
}

export interface ColorField extends BaseField {
    type: 'color'
    defaultColor: string
}

export interface WebsiteComponent {
    id: string
    website_id: string
    template_id?: string
    page_path: string
    section_order: number
    custom_content: Record<string, any>
    custom_styles: Record<string, any>
    is_visible: boolean
    template?: ComponentTemplate
}

export interface MediaAsset {
    id: string
    user_id: string
    website_id?: string
    filename: string
    file_size: number
    file_type: string
    mime_type: string
    storage_path: string
    public_url: string
    thumbnail_url?: string
    width?: number
    height?: number
    duration?: number // for videos
    alt_text?: string
    source: 'upload' | 'ai-generated' | 'url'
    created_at: string
}

export interface AIGeneration {
    id: string
    user_id: string
    website_id?: string
    generation_type: 'sitemap' | 'content' | 'image' | 'chat'
    prompt: string
    result?: any
    status: 'pending' | 'completed' | 'failed'
    error_message?: string
    credits_used: number
    ai_model?: string
    created_at: string
}

export type DeviceType = 'desktop' | 'tablet' | 'mobile'

export interface BuilderState {
    website: Website | null
    selectedComponent: WebsiteComponent | null
    selectedDevice: DeviceType
    isDirty: boolean
    undoStack: any[]
    redoStack: any[]
}
