import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Yükleniyor...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
