import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import AuthLayout from '@/components/auth/AuthLayout'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { signInWithEmail, signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('📧 Login form submitted', { email })
        setError('')
        setIsLoading(true)

        try {
            console.log('🔐 Calling signInWithEmail...')
            await signInWithEmail(email, password)
            console.log('✅ signInWithEmail successful, navigating to /dashboard')
            navigate('/dashboard')
        } catch (err: any) {
            console.error('❌ Login error:', err)
            setError(err.message || 'Giriş başarısız!')
        } finally {
            console.log('🏁 Login process finished, setting isLoading to false')
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setError('')
        setIsLoading(true)
        try {
            await signInWithGoogle()
            // OAuth will redirect automatically
        } catch (err: any) {
            setError(err.message || 'Google ile giriş başarısız!')
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout title="Giriş Yap" subtitle="Hesabınıza giriş yapın">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Adresi
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="ornek@email.com"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">Beni Hatırla</span>
                    </label>
                    <Link
                        to="/forgot-password"
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                        Şifremi Unuttum
                    </Link>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Google OAuth */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">veya</span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google ile Giriş Yap
                </button>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Giriş Yapılıyor...
                        </>
                    ) : (
                        'Giriş Yap'
                    )}
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-gray-600">
                    Hesabınız yok mu?{' '}
                    <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Kayıt Olun
                    </Link>
                </p>

                {/* Back to Home */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <Link to="/" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                        ← Ana Sayfaya Dön
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}
