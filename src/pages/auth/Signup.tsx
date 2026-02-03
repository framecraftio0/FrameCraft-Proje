import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Users, Mail, Lock, Eye, EyeOff, Loader2, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import AuthLayout from '@/components/auth/AuthLayout'

export default function Signup() {
    const [name, setName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [agreeToTerms, setAgreeToTerms] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { signUpWithEmail, signInWithGoogle } = useAuth()
    const [showEmailVerification, setShowEmailVerification] = useState(false)

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

        // Validation
        if (!isPasswordValid) {
            setError('Şifre gereksinimleri karşılanmıyor!')
            return
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor!')
            return
        }

        if (!agreeToTerms) {
            setError('Kullanım şartlarını kabul etmelisiniz!')
            return
        }

        setIsLoading(true)

        try {
            await signUpWithEmail(name, email, password, businessName)
            // Show email verification message
            setShowEmailVerification(true)
        } catch (err: any) {
            setError(err.message || 'Kayıt başarısız!')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignup = async () => {
        setError('')
        setIsLoading(true)
        try {
            await signInWithGoogle()
            // OAuth will redirect automatically
        } catch (err: any) {
            setError(err.message || 'Google ile kayıt başarısız!')
            setIsLoading(false)
        }
    }

    // Show email verification success screen
    if (showEmailVerification) {
        return (
            <AuthLayout title="Email Doğrulama" subtitle="Hesabınız oluşturuldu!">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Email Adresinizi Doğrulayın</h3>
                    <p className="text-gray-600">
                        Kayıt işleminiz başarılı! <strong>{email}</strong> adresine bir doğrulama emaili gönderdik.
                    </p>
                    <p className="text-sm text-gray-500">
                        Lütfen emailinizi kontrol edin ve doğrulama linkine tıklayın.
                    </p>
                    <div className="pt-4">
                        <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                            ← Giriş Sayfasına Dön
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout title="Kayıt Ol" subtitle="Ücretsiz hesap oluşturun">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="Ad Soyad"
                            required
                        />
                    </div>
                </div>

                {/* Business Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        İşletme Adı
                    </label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                            placeholder="Şirket / Marka Adı"
                            required
                        />
                    </div>
                </div>

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

                {/* Terms Agreement */}
                <label className="flex items-start gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        required
                    />
                    <span className="text-sm text-gray-700">
                        <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                            Kullanım Şartlarını
                        </a>{' '}
                        ve{' '}
                        <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                            Gizlilik Politikasını
                        </a>{' '}
                        kabul ediyorum
                    </span>
                </label>

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
                            Hesap Oluşturuluyor...
                        </>
                    ) : (
                        'Hesap Oluştur'
                    )}
                </button>

                {/* Google OAuth Divider */}
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
                    onClick={handleGoogleSignup}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google ile Kayıt Ol
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600">
                    Zaten hesabınız var mı?{' '}
                    <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                        Giriş Yapın
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
