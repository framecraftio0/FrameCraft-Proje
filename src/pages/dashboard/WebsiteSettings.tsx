import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Trash2, Loader2, Globe, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { websiteApi } from '@/lib/api'
import type { Website } from '@/types'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function WebsiteSettings() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    useAuth()

    const [website, setWebsite] = useState<Website | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    // Form fields
    const [siteName, setSiteName] = useState('')
    const [subdomain, setSubdomain] = useState('')
    const [businessSector, setBusinessSector] = useState('')
    const [metaTitle, setMetaTitle] = useState('')
    const [metaDescription, setMetaDescription] = useState('')
    const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft')

    // Load website data - wrapped in useCallback to prevent infinite loop
    const loadWebsite = useCallback(async () => {
        if (!id) return

        try {
            setIsLoading(true)
            setError(null)

            console.log('🔍 Loading website:', id)
            const data = await websiteApi.getWebsite(id)
            console.log('✅ Website loaded:', data.site_name)

            setWebsite(data)

            // Populate form fields
            setSiteName(data.site_name)
            setSubdomain(data.subdomain)
            setBusinessSector(data.business_sector || '')
            setMetaTitle(data.meta_title || '')
            setMetaDescription(data.meta_description || '')
            setStatus(data.status)
        } catch (err: any) {
            console.error('❌ Failed to load website:', err)
            setError(err.message || 'Web sitesi bilgileri yüklenemedi.')
        } finally {
            setIsLoading(false)
        }
    }, [id])

    // Load website on mount
    useEffect(() => {
        if (!id) {
            navigate('/dashboard')
            return
        }
        loadWebsite()
    }, [id, navigate, loadWebsite])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!website || !id) return

        setIsSaving(true)
        setError(null)
        setSuccessMessage(null)

        try {
            await websiteApi.updateWebsite(id, {
                site_name: siteName,
                subdomain,
                business_sector: businessSector || undefined,
                meta_title: metaTitle || undefined,
                meta_description: metaDescription || undefined,
                status
            })

            setSuccessMessage('✅ Değişiklikler başarıyla kaydedildi!')

            // Reload website data
            await loadWebsite()
        } catch (err: any) {
            console.error('Failed to update website:', err)
            setError(err.message || 'Değişiklikler kaydedilirken bir hata oluştu.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!website || !id) return

        const confirmed = window.confirm(
            `"${website.site_name}" projesini kalıcı olarak silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`
        )

        if (!confirmed) return

        setIsDeleting(true)
        try {
            await websiteApi.deleteWebsite(id)
            alert('✅ Web sitesi başarıyla silindi.')
            navigate('/dashboard')
        } catch (err: any) {
            console.error('Failed to delete website:', err)
            setError('Web sitesi silinirken bir hata oluştu.')
            setIsDeleting(false)
        }
    }

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                </div>
            </DashboardLayout>
        )
    }

    if (!website) {
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Web Sitesi Bulunamadı</h2>
                    <p className="text-gray-600 mb-6">Bu web sitesine erişim yetkiniz yok veya silinmiş olabilir.</p>
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Dashboard'a Dön
                    </Link>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout
            title="Web Sitesi Ayarları"
            action={
                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Geri Dön
                </Link>
            }
        >
            <div className="max-w-3xl">
                {/* Success Message */}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {successMessage}
                    </motion.div>
                )}

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-2"
                    >
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </motion.div>
                )}

                {/* Settings Form */}
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Basic Info Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Web Sitesi Adı *
                                </label>
                                <input
                                    type="text"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subdomain *
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={subdomain}
                                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                        className="w-full pl-10 pr-32 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                                        required
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                                        .framecraftai.com
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    Subdomain değiştirirken dikkatli olun. Mevcut URL'ler çalışmayabilir.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    İşletme Sektörü
                                </label>
                                <input
                                    type="text"
                                    value={businessSector}
                                    onChange={(e) => setBusinessSector(e.target.value)}
                                    placeholder="Örn: Restoran, E-ticaret, Blog"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Durum
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="draft">Taslak</option>
                                    <option value="published">Yayında</option>
                                    <option value="archived">Arşiv</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    {status === 'draft' && '📝 Taslak - Web sitesi henüz yayınlanmadı'}
                                    {status === 'published' && '🌐 Yayında - Web sitesi erişilebilir'}
                                    {status === 'archived' && '📦 Arşiv - Web sitesi erişilemez'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Ayarları</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Başlık
                                </label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    placeholder={siteName}
                                    maxLength={60}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    {metaTitle.length}/60 karakter • Arama motorlarında görünen başlık
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Açıklama
                                </label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    placeholder="Web sitenizin kısa açıklaması..."
                                    maxLength={160}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    {metaDescription.length}/160 karakter • Arama sonuçlarında görünen açıklama
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isSaving || !siteName || !subdomain}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Değişiklikleri Kaydet
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Danger Zone */}
                <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-red-900 mb-2">Tehlikeli Bölge</h2>
                    <p className="text-sm text-red-700 mb-4">
                        Bu işlem geri alınamaz. Web siteniz ve tüm içeriği kalıcı olarak silinecek.
                    </p>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Siliniyor...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-5 h-5" />
                                Web Sitesini Sil
                            </>
                        )}
                    </button>
                </div>
            </div>
        </DashboardLayout>
    )
}
