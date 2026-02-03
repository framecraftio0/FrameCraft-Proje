import { ArrowRight, Sparkles, Palette, Zap, Code2, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'

export default function Landing() {
    const navigate = useNavigate()
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
            {/* Header */}
            <header className="container mx-auto px-6 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            FrameCraftAI
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    {user?.name}
                                </button>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                                >
                                    Çıkış
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/admin/login')}
                                    className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                                >
                                    Admin Girişi
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors"
                                >
                                    Giriş Yap
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                                >
                                    Başlayın
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-6 text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        Yapay Zeka Destekli Web Site Oluşturucu
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                        Muhteşem Web Siteleri{' '}
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Yapay Zeka ile
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Yapay zeka destekli içerik üretimi, önceden tasarlanmış güzel bileşenler ve
                        sezgisel görsel editör ile dakikalar içinde profesyonel web siteleri oluşturun.
                    </p>


                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/signup')}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-xl transition-all group"
                        >
                            Ücretsiz Başlayın
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-300 transition-all">
                            Demo İzleyin
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <FeatureCard
                        icon={<Sparkles className="w-8 h-8 text-purple-600" />}
                        title="Yapay Zeka İçerik Üretimi"
                        description="Yapay zekanın tüm web siteniz için saniyeler içinde ilgi çekici içerikler oluşturmasına izin verin"
                    />
                    <FeatureCard
                        icon={<Palette className="w-8 h-8 text-blue-600" />}
                        title="Güzel Bileşenler"
                        description="Profesyonelce tasarlanmış, özelleştirilebilir yüzlerce bileşen arasından seçim yapın"
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-purple-600" />}
                        title="Görsel Editör"
                        description="Sezgisel görsel arayüz ile sürükle, bırak ve özelleştir"
                    />
                    <FeatureCard
                        icon={<Code2 className="w-8 h-8 text-blue-600" />}
                        title="Vibe Kodlama"
                        description="Doğal dil kullanarak herhangi bir bileşeni değiştirmek için yapay zeka ile sohbet edin"
                    />
                    <FeatureCard
                        icon={<Sparkles className="w-8 h-8 text-purple-600" />}
                        title="Yapay Zeka Görsel Üretimi"
                        description="Markanıza mükemmel şekilde uyan özel görseller oluşturun"
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-blue-600" />}
                        title="Anında Yayınlama"
                        description="Sitenizi tek tıkla yayınlayın ve özel bir domain alın"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">
                        Hayalinizdeki Web Sitesini Oluşturmaya Hazır mısınız?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        FrameCraftAI ile muhteşem web siteleri oluşturan binlerce yaratıcıya katılın
                    </p>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                    >
                        Ücretsiz Başlayın
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-12 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">FrameCraftAI</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/terms')}
                            className="text-sm hover:text-purple-600 transition-colors"
                        >
                            Kullanım Şartları
                        </button>
                        <button
                            onClick={() => navigate('/privacy')}
                            className="text-sm hover:text-purple-600 transition-colors"
                        >
                            Gizlilik Politikası
                        </button>
                    </div>
                    <p className="text-sm">© 2026 FrameCraftAI. Tüm hakları saklıdır.</p>
                </div>
            </footer>
        </div>
    )
}

interface FeatureCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all cursor-pointer"
        >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </motion.div>
    )
}
