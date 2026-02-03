import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Please add them to .env file.')
}

export const supabase = createClient<Database>(
    supabaseUrl || '',
    supabaseAnonKey || '',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    }
)

// Helper functions for common operations
export const supabaseHelpers = {
    // Check if user is authenticated
    async isAuthenticated() {
        const { data: { session } } = await supabase.auth.getSession()
        return !!session
    },

    // Get current user
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser()
        return user
    },

    // Get user profile
    async getUserProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) throw error
        return data
    },

    // Check if user is admin
    async isAdmin(userId: string) {
        const profile = await this.getUserProfile(userId)
        // You can add an is_admin field to profiles table or check email against admin list
        return profile?.email?.endsWith('@framecraftai.com') || false
    },
}
