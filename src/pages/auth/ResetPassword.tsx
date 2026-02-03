import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, Eye, EyeOff, Loader2, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import AuthLayout from '@/components/auth/AuthLayout'

export default function ResetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const { updatePassword } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    // Check if we have a valid reset token
    useEffect(() => {
        const error = searchParams.get('error')
        const errorDescription = searchParams.get('error_description')

        if (error) {
            setError(errorDescription || 'Geçersiz veya süresi dolmuş link!')
        }
    }, [searchParams])

    // Password strength validation
    const passwordValidation = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
    }

    const isPasswordValid = Object.values(passwordValidation).every(Boolean)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!isPasswordValid) {
            setError('Şifre gereksinimleri karşılanmıyor!')
            return
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor!')
            return
        }

        setIsLoading(true)

        try {
            await updatePassword(password)
            setSuccess(true)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (err: any) {
            setError(err.message || 'Şifre güncellenemedi!')
        } finally {
            setIsLoading(false)
        }
    }

    // Success screen
    if (success) {
        return (
            <AuthLayout title="Şifre Değiştirildi" subtitle="Başarılı!">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Şifreniz Güncellendi!</h3>
                    <p className="text-gray-600">
                        Şifreniz başarıyla değiştirildi. Giriş sayfasına yönlendiriliyorsunuz...
                    </p>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout title="Yeni Şifre Belirle" subtitle="Güçlü bir şifre seçin">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yeni Şifre
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

                    {/* Password Requirements */}
                    {password && (
                        <div className="mt-2 space-y-1">
                            <PasswordRequirement met={passwordValidation.minLength} text="En az 8 karakter" />
                            <PasswordRequirement met={passwordValidation.hasUpperCase} text="Büyük harf (A-Z)" />
                            <PasswordRequirement met={passwordValidation.hasLowerCase} text="Küçük harf (a-z)" />
                            <PasswordRequirement met={passwordValidation.hasNumber} text="Rakam (0-9)" />
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre Tekrar
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {confirmPassword && confirmPassword !== password && (
                        <p className="mt-1 text-sm text-red-600">Şifreler eşleşmiyor</p>
                    )}
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

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !isPasswordValid}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Şifre Değiştiriliyor...
                        </>
                    ) : (
                        'Şifreyi Değiştir'
                    )}
                </button>
            </form>
        </AuthLayout>
    )
}

// Password Requirement Component
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            {met ? (
                <Check className="w-4 h-4 text-green-600" />
            ) : (
                <X className="w-4 h-4 text-gray-400" />
            )}
            <span className={met ? 'text-green-600' : 'text-gray-500'}>{text}</span>
        </div>
    )
}
