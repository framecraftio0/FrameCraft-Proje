import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Settings,
    User,
    LogOut,
    Menu,
    X,
    Sparkles,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'

interface DashboardLayoutProps {
    children: React.ReactNode
    title?: string
    action?: React.ReactNode
}

export default function DashboardLayout({ children, title, action }: DashboardLayoutProps) {
    const { user, logout } = useAuth()
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navigation = [
        { name: 'Projelerim', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Ayarlar', href: '/settings', icon: Settings },
        { name: 'Profil', href: '/profile', icon: User },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            FrameCraftAI
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const active = isActive(item.href)
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                                    ? 'bg-purple-50 text-purple-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${active ? 'text-purple-600' : 'text-gray-400'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 mb-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs">
                            {user?.name?.[0].toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20 px-4 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">FrameCraftAI</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        />
                        <motion.aside
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-40 md:hidden flex flex-col"
                        >
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="font-bold text-lg text-gray-800">Menü</h2>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="flex-1 p-4 space-y-1">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.href)
                                            ? 'bg-purple-50 text-purple-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="p-4 border-t border-gray-100">
                                <button
                                    onClick={() => logout()}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Çıkış Yap
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen pt-16 md:pt-0">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    {(title || action) && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            {title && (
                                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                            )}
                            {action && (
                                <div>{action}</div>
                            )}
                        </div>
                    )}

                    {children}
                </div>
            </main>
        </div>
    )
}
