import { supabase } from './supabase'
import type { Website, WebsiteComponent, Sitemap, GlobalStyles } from '@/types'

// Website Operations
export const websiteApi = {
    // Get all websites for the current user
    async getWebsites() {
        const { data, error } = await supabase
            .from('websites')
            .select('*')
            .order('updated_at', { ascending: false })

        if (error) throw error
        return data as Website[]
    },

    // Get a single website by ID
    async getWebsite(id: string) {
        const { data, error } = await supabase
            .from('websites')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data as Website
    },

    // Create a new website
    async createWebsite(data: {
        site_name: string
        subdomain: string
        user_id: string
        business_sector?: string
        sitemap?: Sitemap
        global_styles?: GlobalStyles
    }) {
        // Check subdomain availability first
        const isAvailable = await this.isSubdomainAvailable(data.subdomain)
        if (!isAvailable) {
            throw new Error(`"${data.subdomain}" subdomain'i zaten kullanılıyor. Lütfen başka bir isim deneyin.`)
        }

        // Default sitemap if not provided
        const defaultSitemap: Sitemap = {
            pages: [
                {
                    id: 'home',
                    name: 'Ana Sayfa',
                    path: '/',
                    components: []
                }
            ]
        }

        // Default styles if not provided
        const defaultStyles: GlobalStyles = {
            fontFamily: 'Inter',
            primaryColor: '#6366f1', // Indigo 500
            secondaryColor: '#ec4899', // Pink 500
        }

        const { data: newWebsite, error } = await supabase
            .from('websites')
            .insert({
                site_name: data.site_name,
                subdomain: data.subdomain,
                user_id: data.user_id,
                business_sector: data.business_sector,
                sitemap: (data.sitemap || defaultSitemap) as any,
                global_styles: (data.global_styles || defaultStyles) as any,
                status: 'draft',
                page_views: 0
            } as any)
            .select()
            .single()

        if (error) {
            console.error('Create website error:', error)
            throw new Error('Web sitesi oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.')
        }
        return newWebsite as Website
    },

    // Update website
    async updateWebsite(id: string, updates: Partial<Website>) {
        // Clean up the object to match database schema if needed
        // Clean up the object to match database schema if needed
        const updateData = updates as any

        const { data, error } = await supabase
            .from('websites')
            .update(updateData)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data as Website
    },

    // Delete website
    async deleteWebsite(id: string) {
        const { error } = await supabase
            .from('websites')
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    },

    // Check if subdomain is available
    async isSubdomainAvailable(subdomain: string) {
        const { count, error } = await supabase
            .from('websites')
            .select('id', { count: 'exact', head: true })
            .eq('subdomain', subdomain)

        if (error) throw error
        return count === 0
    }
}

// Component Template Operations
export const templateApi = {
    // Get all published templates
    async getTemplates(category?: string) {
        let query = supabase
            .from('component_templates')
            .select('*')
            .eq('is_published', true)

        if (category) {
            query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get template by slug
    async getTemplateBySlug(slug: string) {
        const { data, error } = await supabase
            .from('component_templates')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single()

        if (error) throw error
        return data
    }
}

// Website Component Operations
export const componentApi = {
    // Get components for a specific page of a website
    async getPageComponents(websiteId: string, pagePath: string) {
        const { data, error } = await supabase
            .from('website_components')
            .select('*, template:component_templates(*)')
            .eq('website_id', websiteId)
            .eq('page_path', pagePath)
            .order('section_order', { ascending: true })

        if (error) throw error
        return data as WebsiteComponent[]
    },

    // Add component to page
    async addComponent(data: {
        website_id: string
        template_id: string
        page_path: string
        section_order: number
        custom_content?: Record<string, any>
    }) {
        const { data: newComponent, error } = await supabase
            .from('website_components')
            .insert(data as any)
            .select('*, template:component_templates(*)')
            .single()

        if (error) throw error
        return newComponent as WebsiteComponent
    },

    // Update component
    async updateComponent(id: string, updates: Partial<WebsiteComponent>) {
        const updateData = updates as any

        const { data, error } = await supabase
            .from('website_components')
            .update(updateData)
            .eq('id', id)
            .select('*, template:component_templates(*)')
            .single()

        if (error) throw error
        return data as WebsiteComponent
    },

    // Delete component
    async deleteComponent(id: string) {
        const { error } = await supabase
            .from('website_components')
            .delete()
            .eq('id', id)

        if (error) throw error
        return true
    },

    // Reorder components
    async reorderComponents(_websiteId: string, _pagePath: string, orderedIds: string[]) {
        // This would ideally be a stored procedure or transaction
        // For simplicity, we'll update one by one for now (or optimize later)
        const updates = orderedIds.map((id, index) => ({
            id,
            section_order: index
        }))

        const { error } = await supabase
            .from('website_components')
            .upsert(updates as any) // Assuming we can upsert by ID

        if (error) throw error
        return true
    }
}
