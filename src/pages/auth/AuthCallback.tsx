import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function AuthCallback() {
    const navigate = useNavigate()
    const { isAuthenticated, isLoading, user } = useAuth()
    const [hasChecked, setHasChecked] = useState(false)

    useEffect(() => {
        console.log('🔄 AuthCallback - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user:', user)

        // Give some time for the session to be established (especially for OAuth)
        const checkAuth = async () => {
            // Wait a bit for Supabase to process the OAuth callback
            await new Promise(resolve => setTimeout(resolve, 1000))

            if (!isLoading && !hasChecked) {
                setHasChecked(true)
                console.log('✅ AuthCallback - Final check - isAuthenticated:', isAuthenticated)

                if (isAuthenticated) {
                    console.log('✅ Redirecting to /profile')
                    navigate('/profile', { replace: true })
                } else {
                    console.log('❌ Not authenticated, redirecting to /login')
                    navigate('/login', { replace: true })
                }
            }
        }

        if (!isLoading) {
            checkAuth()
        }
    }, [isAuthenticated, isLoading, navigate, hasChecked, user])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Giriş yapılıyor...</p>
                <p className="text-sm text-gray-400 mt-2">Lütfen bekleyin</p>
                {isLoading && <p className="text-xs text-gray-300 mt-4">Loading auth state...</p>}
                {!isLoading && <p className="text-xs text-gray-300 mt-4">Checking authentication...</p>}
            </div>
        </div>
    )
}
