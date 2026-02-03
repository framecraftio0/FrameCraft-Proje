import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    Sparkles,
    TrendingUp,
    Globe,
    Image,
    Activity
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Profile {
    id: string
    email: string
    full_name: string | null
    business_name: string | null
    role: string
    created_at: string
}

export default function AdminDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        // Check if user is authenticated
        const isAuth = localStorage.getItem('adminAuth')
        if (!isAuth) {
            navigate('/admin/login')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('adminAuth')
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    FrameCraftAI Admin
                                </h1>
                                <p className="text-sm text-gray-500">Yönetim Paneli</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">Hoş geldiniz, Alper</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm font-medium">Çıkış</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
                    <nav className="p-4 space-y-2">
                        <NavItem
                            icon={<LayoutDashboard className="w-5 h-5" />}
                            label="Genel Bakış"
                            active={activeTab === 'overview'}
                            onClick={() => setActiveTab('overview')}
                        />
                        <NavItem
                            icon={<Users className="w-5 h-5" />}
                            label="Kullanıcılar"
                            active={activeTab === 'users'}
                            onClick={() => setActiveTab('users')}
                        />
                        <NavItem
                            icon={<Globe className="w-5 h-5" />}
                            label="Web Siteleri"
                            active={activeTab === 'websites'}
                            onClick={() => setActiveTab('websites')}
                        />
                        <NavItem
                            icon={<FileText className="w-5 h-5" />}
                            label="Bileşenler"
                            active={activeTab === 'components'}
                            onClick={() => setActiveTab('components')}
                        />
                        <NavItem
                            icon={<Image className="w-5 h-5" />}
                            label="Medya"
                            active={activeTab === 'media'}
                            onClick={() => setActiveTab('media')}
                        />
                        <NavItem
                            icon={<Activity className="w-5 h-5" />}
                            label="Aktivite"
                            active={activeTab === 'activity'}
                            onClick={() => setActiveTab('activity')}
                        />
                        <NavItem
                            icon={<Settings className="w-5 h-5" />}
                            label="Ayarlar"
                            active={activeTab === 'settings'}
                            onClick={() => setActiveTab('settings')}
                        />
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {activeTab === 'overview' && <OverviewContent />}
                    {activeTab === 'users' && <UsersContent />}
                    {activeTab === 'websites' && <WebsitesContent />}
                    {activeTab === 'components' && <ComponentsContent />}
                    {activeTab === 'media' && <MediaContent />}
                    {activeTab === 'activity' && <ActivityContent />}
                    {activeTab === 'settings' && <SettingsContent />}
                </main>
            </div>
        </div>
    )
}

// Navigation Item Component
function NavItem({ icon, label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    )
}

// Overview Content
function OverviewContent() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Genel Bakış</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Toplam Kullanıcı"
                    value="1,234"
                    change="+12%"
                    icon={<Users className="w-6 h-6" />}
                    color="purple"
                />
                <StatCard
                    title="Aktif Web Siteleri"
                    value="856"
                    change="+8%"
                    icon={<Globe className="w-6 h-6" />}
                    color="blue"
                />
                <StatCard
                    title="Yapay Zeka Kullanımı"
                    value="12.5K"
                    change="+24%"
                    icon={<Sparkles className="w-6 h-6" />}
                    color="purple"
                />
                <StatCard
                    title="Toplam Gelir"
                    value="₺45.2K"
                    change="+15%"
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="blue"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                    <ActivityItem
                        user="Ahmet Yılmaz"
                        action="yeni bir web sitesi oluşturdu"
                        time="5 dakika önce"
                    />
                    <ActivityItem
                        user="Ayşe Demir"
                        action="web sitesini yayınladı"
                        time="15 dakika önce"
                    />
                    <ActivityItem
                        user="Mehmet Kaya"
                        action="10 görsel oluşturdu"
                        time="1 saat önce"
                    />
                </div>
            </div>
        </div>
    )
}

// Stat Card Component
function StatCard({ title, value, change, icon, color }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${color === 'purple' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                    <div className={color === 'purple' ? 'text-purple-600' : 'text-blue-600'}>
                        {icon}
                    </div>
                </div>
                <span className="text-sm font-medium text-green-600">{change}</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </motion.div>
    )
}

// Activity Item
function ActivityItem({ user, action, time }: any) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user[0]}
            </div>
            <div className="flex-1">
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">{user}</span> {action}
                </p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    )
}

// Placeholder Contents for other tabs
function UsersContent() {
    const [users, setUsers] = useState<Profile[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        console.log('🔄 Starting direct fetchUsers...')
        setIsLoading(true)
        setFetchError(null)

        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
            const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase Config (URL/Key) eksik! Lütfen .env dosyasını kontrol edin.')
            }

            // Using direct standard FETCH to bypass any Supabase-js client interceptors/timeouts
            const response = await fetch(`${supabaseUrl}/rest/v1/profiles?select=*&order=created_at.desc`, {
                method: 'GET',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                }
            })

            console.log('📡 Fetch status:', response.status)

            if (!response.ok) {
                const errorText = await response.text()
                let errorMsg = `HTTP Error: ${response.status}`
                try {
                    const errorJson = JSON.parse(errorText)
                    errorMsg = errorJson.message || errorJson.error || errorMsg
                } catch (e) { /* ignore json parse error */ }

                throw new Error(errorMsg)
            }

            const data = await response.json()
            console.log('✅ Users fetched:', data?.length)
            setUsers(data || [])

        } catch (error: any) {
            console.error('❌ Direct fetch error:', error)
            setFetchError(error.message || 'Veri çekilemedi. Bağlantı hatası.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Kullanıcılar yükleniyor...</p>
            </div>
        )
    }

    if (fetchError) {
        return (
            <div className="p-8 text-center">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl inline-block mb-6 max-w-lg border border-red-100 shadow-sm">
                    <p className="font-bold text-lg mb-2">Veriler Yüklenemedi</p>
                    <p className="text-gray-700 mb-4">{fetchError}</p>
                    <div className="text-xs text-left bg-white p-3 rounded border border-red-100 font-mono text-gray-500">
                        Bu hata genellikle AdBlocker, Güvenlik Duvarı veya zayıf internet bağlantısından kaynaklanır.
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => fetchUsers()}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
                    >
                        Tekrar Dene
                    </button>
                    <button
                        onClick={() => {
                            window.open(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/profiles?select=*`, '_blank')
                        }}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium ml-4"
                    >
                        API'yi Tarayıcıda Aç
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Kullanıcı Yönetimi</h2>
                <div className="text-sm text-gray-500">
                    Toplam {users.length} kullanıcı
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                {user.business_name?.[0]?.toUpperCase() || user.full_name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 truncate">
                                    {user.business_name || 'İsimsiz İşletme'}
                                </h3>
                                <p className="text-sm text-gray-600 truncate">{user.full_name || 'İsimsiz Kullanıcı'}</p>
                                <p className="text-xs text-gray-400 mt-1 truncate">{user.email}</p>
                                <div className="flex mt-2 gap-2">
                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100">
                                        {user.role}
                                    </span>
                                    <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function WebsitesContent() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Web Siteleri</h2>
            <p className="text-gray-600">Tüm web siteleri ve durumları burada görünecek.</p>
        </div>
    )
}

function ComponentsContent() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bileşen Şablonları</h2>
            <p className="text-gray-600">Figma bileşenleri yönetimi burada olacak.</p>
        </div>
    )
}

function MediaContent() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Medya Kütüphanesi</h2>
            <p className="text-gray-600">Tüm medya dosyaları burada görünecek.</p>
        </div>
    )
}

function ActivityContent() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Aktivite Günlüğü</h2>
            <p className="text-gray-600">Detaylı aktivite kayıtları burada görünecek.</p>
        </div>
    )
}

function SettingsContent() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sistem Ayarları</h2>
            <p className="text-gray-600">API anahtarları ve sistem yapılandırması burada olacak.</p>
        </div>
    )
}
