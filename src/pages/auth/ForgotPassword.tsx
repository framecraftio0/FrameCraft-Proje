import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, AlertCircle, Loader2, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import AuthLayout from '@/components/auth/AuthLayout'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const { resetPassword } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            await resetPassword(email)
            setEmailSent(true)
        } catch (err: any) {
            setError(err.message || 'Şifre sıfırlama başarısız!')
        } finally {
            setIsLoading(false)
        }
    }

    // Success screen
    if (emailSent) {
        return (
            <AuthLayout title="Email Gönderildi" subtitle="Emailinizi kontrol edin">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Link Gönderildi!</h3>
                    <p className="text-gray-600">
                        <strong>{email}</strong> adresine şifre sıfırlama linki gönderdik.
                    </p>
                    <p className="text-sm text-gray-500">
                        Lütfen emailinizi kontrol edin ve linke tıklayarak yeni şifrenizi belirleyin.
                    </p>
                    <p className="text-xs text-gray-400">
                        Email gelmedi mi? Spam klasörünü kontrol edin.
                    </p>
                    <div className="pt-4 space-y-2">
                        <button
                            onClick={() => {
                                setEmailSent(false)
                                setEmail('')
                            }}
                            className="text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            ← Başka email ile dene
                        </button>
                        <br />
                        <Link to="/login" className="text-sm text-gray-600 hover:text-purple-600">
                            Giriş sayfasına dön
                        </Link>
                    </div>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout title="Şifremi Unuttum" subtitle="Şifrenizi sıfırlayın">
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Info */}
                <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                        Email adresinizi girin, size şifre sıfırlama linki gönderelim.
                    </p>
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
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Gönderiliyor...
                        </>
                    ) : (
                        'Şifre Sıfırlama Linki Gönder'
                    )}
                </button>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t border-gray-200">
                    <Link to="/login" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                        ← Giriş sayfasına dön
                    </Link>
                </div>
            </form>
        </AuthLayout>
    )
}
