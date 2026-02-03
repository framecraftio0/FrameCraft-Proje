import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        // Hard-coded authentication
        if (username === 'Alper' && password === 'alper123') {
            // Store auth in localStorage
            localStorage.setItem('adminAuth', 'true')
            navigate('/admin')
        } else {
            setError('Kullanıcı adı veya şifre hatalı!')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            FrameCraftAI
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Paneli</h1>
                    <p className="text-gray-600">Giriş yapın</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kullanıcı Adı
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Kullanıcı adınızı girin"
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
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Şifrenizi girin"
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
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                            Giriş Yap
                        </button>
                    </form>

                    {/* Hint */}
                    <div className="mt-6 p-4 bg-purple-50 rounded-lg text-sm text-gray-600">
                        <p className="font-medium text-purple-700 mb-1">Test Hesabı:</p>
                        <p>Kullanıcı Adı: <span className="font-mono font-semibold">Alper</span></p>
                        <p>Şifre: <span className="font-mono font-semibold">alper123</span></p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                        ← Ana Sayfaya Dön
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
