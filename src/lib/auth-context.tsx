import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabase'
import type { User as SupabaseUser, Session } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Extended User interface with profile data
export interface User {
    id: string
    email: string
    name: string
    avatar?: string
    role: 'user' | 'admin'
    emailVerified: boolean
    phone?: string
    address?: string
    city?: string
    country?: string
    postalCode?: string
    bio?: string
    createdAt: string
}

// Auth context interface
interface AuthContextType {
    user: User | null
    session: Session | null
    isAuthenticated: boolean
    isLoading: boolean

    // Email/Password auth
    signInWithEmail: (email: string, password: string) => Promise<void>
    signUpWithEmail: (name: string, email: string, password: string, businessName: string) => Promise<void>

    // Google OAuth
    signInWithGoogle: () => Promise<void>

    // Session management
    logout: () => Promise<void>

    // Profile management
    updateProfile: (data: Partial<User>) => Promise<void>
    uploadAvatar: (file: File) => Promise<string>

    // Password management
    resetPassword: (email: string) => Promise<void>
    updatePassword: (newPassword: string) => Promise<void>

    // Email verification
    resendVerificationEmail: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Fetch user profile from database
    const fetchUserProfile = async (userId: string): Promise<Database['public']['Tables']['profiles']['Row'] | null> => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            console.error('Error fetching profile:', error)
            return null
        }

        return data
    }

    // Convert Supabase user to our User type
    const mapSupabaseUserToUser = async (supabaseUser: SupabaseUser): Promise<User> => {
        const profile = await fetchUserProfile(supabaseUser.id)

        return {
            id: supabaseUser.id,
            email: supabaseUser.email!,
            name: profile?.full_name || supabaseUser.user_metadata?.full_name || '',
            avatar: profile?.avatar_url || supabaseUser.user_metadata?.avatar_url,
            role: (profile?.role || 'user') as 'user' | 'admin',
            emailVerified: !!supabaseUser.email_confirmed_at,
            phone: profile?.phone || undefined,
            address: profile?.address || undefined,
            city: profile?.city || undefined,
            country: profile?.country || undefined,
            postalCode: profile?.postal_code || undefined,
            bio: profile?.bio || undefined,
            createdAt: supabaseUser.created_at,
        }
    }

    // Initialize auth state and listen for changes
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session?.user) {
                mapSupabaseUserToUser(session.user).then(setUser)
            }
            setIsLoading(false)
        })

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setSession(session)
                if (session?.user) {
                    const user = await mapSupabaseUserToUser(session.user)
                    setUser(user)
                } else {
                    setUser(null)
                }
                setIsLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    // Sign in with email and password
    const signInWithEmail = async (email: string, password: string) => {
        console.log('🔑 signInWithEmail called for:', email)
        console.log('🌐 Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
        console.log('🔐 Anon key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)

        try {
            console.log('⏳ Calling supabase.auth.signInWithPassword...')

            // Add timeout to prevent infinite hanging
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Supabase bağlantı zaman aşımı (30 saniye)')), 30000)
            })

            const signInPromise = supabase.auth.signInWithPassword({
                email,
                password,
            })

            const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as any

            console.log('📊 Supabase response:', { data: !!data, error: !!error })

            if (error) {
                console.error('❌ Supabase signIn error:', error)
                throw new Error(error.message)
            }

            console.log('✅ Sign in successful, user:', data.user?.email)
            console.log('📧 Email confirmed:', !!data.user?.email_confirmed_at)

            // Note: Removed email verification check - users can log in even if not verified
            // They'll see a warning in the profile page instead
        } catch (error: any) {
            console.error('💥 signInWithEmail error:', error)
            throw error
        }
    }

    // Sign up with email and password
    const signUpWithEmail = async (name: string, email: string, password: string, businessName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                    business_name: businessName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            throw new Error(error.message)
        }

        if (!data.user) {
            throw new Error('Kayıt işlemi başarısız oldu!')
        }

        // Note: User won't be logged in until they verify their email
    }

    // Sign in with Google OAuth
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            throw new Error(error.message)
        }
    }

    // Logout
    const logout = async () => {
        console.log('🚪 Logging out...')

        // Always clear local state first
        setUser(null)
        setSession(null)

        try {
            // Sign out with scope: 'global' to clear all sessions everywhere
            const { error } = await supabase.auth.signOut({ scope: 'global' })

            if (error) {
                console.error('❌ Supabase logout error:', error)
                console.error('Error details:', JSON.stringify(error, null, 2))
            } else {
                console.log('✅ Logged out successfully from Supabase')
            }
        } catch (error) {
            console.error('💥 Logout exception:', error)
        }

        // Force clear all storage
        try {
            localStorage.removeItem('supabase.auth.token')
            sessionStorage.clear()
            console.log('✅ Storage cleared')
        } catch (e) {
            console.error('Storage clear error:', e)
        }

        console.log('✅ Local session cleared')
    }

    // Update user profile
    const updateProfile = async (data: Partial<User>) => {
        if (!user) {
            throw new Error('Kullanıcı girişi yapılmamış!')
        }

        // Update profile in database
        const updateData: Database['public']['Tables']['profiles']['Update'] = {}

        if (data.name !== undefined) updateData.full_name = data.name
        if (data.phone !== undefined) updateData.phone = data.phone
        if (data.address !== undefined) updateData.address = data.address
        if (data.city !== undefined) updateData.city = data.city
        if (data.country !== undefined) updateData.country = data.country
        if (data.postalCode !== undefined) updateData.postal_code = data.postalCode
        if (data.bio !== undefined) updateData.bio = data.bio

        const { error } = await (supabase
            .from('profiles') as any)
            .update(updateData)
            .eq('id', user.id)

        if (error) {
            throw new Error(error.message)
        }

        // Update local user state
        setUser({ ...user, ...data })
    }

    // Upload avatar to Supabase storage
    const uploadAvatar = async (file: File): Promise<string> => {
        if (!user) {
            throw new Error('Kullanıcı girişi yapılmamış!')
        }

        const fileExt = file.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        // Upload file to storage
        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file, {
                upsert: true,
            })

        if (uploadError) {
            throw new Error(uploadError.message)
        }

        // Get public URL
        const { data } = supabase.storage
            .from('media')
            .getPublicUrl(filePath)

        const avatarUrl = data.publicUrl

        // Update profile with avatar URL
        await updateProfile({ avatar: avatarUrl })

        return avatarUrl
    }

    // Send password reset email
    const resetPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        })

        if (error) {
            throw new Error(error.message)
        }
    }

    // Update password (after reset link clicked)
    const updatePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        })

        if (error) {
            throw new Error(error.message)
        }
    }

    // Resend email verification
    const resendVerificationEmail = async () => {
        if (!user) {
            throw new Error('Kullanıcı girişi yapılmamış!')
        }

        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: user.email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            throw new Error(error.message)
        }
    }

    const value: AuthContextType = {
        user,
        session,
        isAuthenticated: !!user,
        isLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        updateProfile,
        uploadAvatar,
        resetPassword,
        updatePassword,
        resendVerificationEmail,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
