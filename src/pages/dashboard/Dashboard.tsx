import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { websiteApi } from '@/lib/api'
import type { Website } from '@/types'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import WebsiteCard from '@/components/dashboard/WebsiteCard'
import EmptyState from '@/components/dashboard/EmptyState'

export default function Dashboard() {
    // const { user } = useAuth() // Removed unused
    const navigate = useNavigate()
    const [websites, setWebsites] = useState<Website[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    // Fetch websites on mount
    useEffect(() => {
        loadWebsites()
    }, [])

    const loadWebsites = async () => {
        try {
            const data = await websiteApi.getWebsites()
            setWebsites(data)
        } catch (error) {
            console.error('Failed to load websites:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteWebsite = async (id: string, name: string) => {
        if (!window.confirm(`"${name}" projesini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) {
            return
        }

        try {
            await websiteApi.deleteWebsite(id)
            setWebsites(websites.filter(site => site.id !== id))
        } catch (error) {
            console.error('Failed to delete website:', error)
            alert('Web sitesi silinirken bir hata oluştu.')
        }
    }

    const filteredWebsites = websites.filter(site =>
        site.site_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.subdomain.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout
            title="Projelerim"
            action={
                <button
                    onClick={() => navigate('/dashboard/websites/new')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Proje
                </button>
            }
        >
            {/* Search Bar (only if has websites) */}
            {websites.length > 0 && (
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Proje ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>
            )}

            {websites.length === 0 ? (
                <EmptyState onCreateClick={() => navigate('/dashboard/websites/new')} />
            ) : filteredWebsites.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500">Arama kriterlerine uygun proje bulunamadı.</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredWebsites.map((website) => (
                        <WebsiteCard
                            key={website.id}
                            website={website}
                            onDelete={handleDeleteWebsite}
                        />
                    ))}
                </motion.div>
            )}
        </DashboardLayout>
    )
}
