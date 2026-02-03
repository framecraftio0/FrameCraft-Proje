import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
    subtitle?: string
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
                    {subtitle && <p className="text-gray-600">{subtitle}</p>}
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
