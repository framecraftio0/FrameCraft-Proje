/**
 * N8N Webhook Client
 * Handles all communication with N8N workflows for Hybrid Component Strategy
 */

const N8N_ENDPOINTS = {
    generateSite: import.meta.env.VITE_N8N_SITE_GENERATOR_URL || '',
    componentSync: import.meta.env.VITE_N8N_COMPONENT_SYNC_URL || '',
    improveText: import.meta.env.VITE_N8N_AI_IMPROVE_TEXT_URL || '',
    generateImage: import.meta.env.VITE_N8N_AI_GENERATE_IMAGE_URL || '',
    // Legacy endpoints (deprecated in new architecture)
    sitemap: import.meta.env.VITE_N8N_SITEMAP_WEBHOOK,
    websiteGen: import.meta.env.VITE_N8N_WEBSITE_GEN_WEBHOOK,
    imageGen: import.meta.env.VITE_N8N_IMAGE_GEN_WEBHOOK,
    vibeChat: import.meta.env.VITE_N8N_VIBE_CHAT_WEBHOOK,
}

interface BusinessInfo {
    user_id: string
    business_name: string
    business_sector: string
    description?: string
}

interface SitemapResponse {
    success: boolean
    website_id: string
    sitemap: any
    error?: string
}

interface WebsiteGenerationResponse {
    success: boolean
    website_id: string
    preview_url: string
    components_count: number
    pages_count: number
    error?: string
}

interface ImageGenerationRequest {
    user_id: string
    prompt: string
    width: number
    height: number
    style?: string
    count?: number
}

interface ImageGenerationResponse {
    success: boolean
    images: Array<{
        id: string
        url: string
        thumbnail: string
        width: number
        height: number
    }>
    credits_used: number
    credits_remaining: number
    error?: string
}

interface VibeChatRequest {
    user_id: string
    component_id: string
    message: string
    conversation_history?: Array<{ role: string; content: string }>
}

interface VibeChatResponse {
    success: boolean
    applied_changes: any
    updated_html: string
    ai_message: string
    error?: string
}

/**
 * Generate sitemap using AI
 */
export async function generateSitemap(businessInfo: BusinessInfo): Promise<SitemapResponse> {
    try {
        const response = await fetch(N8N_ENDPOINTS.sitemap, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(businessInfo),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error generating sitemap:', error)
        return {
            success: false,
            website_id: '',
            sitemap: null,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Generate complete website with AI
 */
export async function generateWebsite(websiteId: string): Promise<WebsiteGenerationResponse> {
    try {
        const response = await fetch(N8N_ENDPOINTS.websiteGen, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ website_id: websiteId }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error generating website:', error)
        return {
            success: false,
            website_id: websiteId,
            preview_url: '',
            components_count: 0,
            pages_count: 0,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Generate images using AI
 */
export async function generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
        const response = await fetch(N8N_ENDPOINTS.imageGen, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error generating image:', error)
        return {
            success: false,
            images: [],
            credits_used: 0,
            credits_remaining: 0,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Vibe coding chat - AI-assisted component editing
 */
export async function vibeCodingChat(request: VibeChatRequest): Promise<VibeChatResponse> {
    try {
        const response = await fetch(N8N_ENDPOINTS.vibeChat, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('Error in vibe chat:', error)
        return {
            success: false,
            applied_changes: null,
            updated_html: '',
            ai_message: 'Sorry, I encountered an error processing your request.',
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Check if N8N webhooks are configured
 */
export function areN8NWebhooksConfigured(): boolean {
    return !!(
        N8N_ENDPOINTS.sitemap &&
        N8N_ENDPOINTS.websiteGen &&
        N8N_ENDPOINTS.imageGen &&
        N8N_ENDPOINTS.vibeChat
    )
}

// ================================================
// NEW ARCHITECTURE - Hybrid Component Strategy
// ================================================

export interface GenerateSiteInput {
    user_id: string;
    business_name: string;
    business_sector: string;
    description: string;
    preferences?: {
        style?: string;
        targetAudience?: string;
        features?: string[];
        colorPreference?: string;
    };
}

export interface GenerateSiteOutput {
    success: boolean;
    website_id: string;
    subdomain: string;
    preview_url: string;
    stats: {
        total_pages: number;
        total_components: number;
        github_components: number;
        ai_components: number;
        generation_time_ms: number;
    };
    error?: string;
}

export interface ImproveTextInput {
    component_id: string;
    field_id: string;
    current_text: string;
    tone: 'professional' | 'casual' | 'persuasive' | 'friendly';
    max_length?: number;
}

export interface ImproveTextOutput {
    success: boolean;
    original: string;
    improved: string;
    error?: string;
}

export interface GenerateImageInput {
    user_id: string;
    prompt: string;
    width?: number;
    height?: number;
    style?: 'photography' | 'illustration' | '3d-render' | 'painting';
}

export interface GenerateImageOutput {
    success: boolean;
    imageUrl: string;
    thumbnailUrl?: string;
    error?: string;
}

/**
 * Generate a complete website using AI (NEW ARCHITECTURE)
 * Uses Hybrid Component Strategy: Premium GitHub components + AI-generated components
 * @param input - Business information and preferences
 * @returns Website generation result
 */
export async function generateSiteWithAI(input: GenerateSiteInput): Promise<GenerateSiteOutput> {
    if (!N8N_ENDPOINTS.generateSite) {
        throw new Error('N8N_SITE_GENERATOR_URL not configured. Please check your .env file.');
    }

    try {
        const response = await fetch(N8N_ENDPOINTS.generateSite, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`N8N error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to generate site:', error);
        throw error;
    }
}

/**
 * Improve text using AI
 * @param input - Text to improve and preferences
 * @returns Improved text
 */
export async function improveTextWithAI(input: ImproveTextInput): Promise<ImproveTextOutput> {
    if (!N8N_ENDPOINTS.improveText) {
        throw new Error('N8N_AI_IMPROVE_TEXT_URL not configured');
    }

    try {
        const response = await fetch(N8N_ENDPOINTS.improveText, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`N8N error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to improve text:', error);
        throw error;
    }
}

/**
 * Generate an image using AI
 * @param input - Image generation parameters
 * @returns Generated image URL
 */
export async function generateImageWithAI(input: GenerateImageInput): Promise<GenerateImageOutput> {
    if (!N8N_ENDPOINTS.generateImage) {
        throw new Error('N8N_AI_GENERATE_IMAGE_URL not configured');
    }

    try {
        const response = await fetch(N8N_ENDPOINTS.generateImage, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...input,
                width: input.width || 1920,
                height: input.height || 1080,
                style: input.style || 'photography',
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`N8N error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to generate image:', error);
        throw error;
    }
}

/**
 * Check if NEW N8N endpoints are configured
 */
export function areNewN8NEndpointsConfigured(): boolean {
    return Boolean(N8N_ENDPOINTS.generateSite && N8N_ENDPOINTS.improveText);
}

