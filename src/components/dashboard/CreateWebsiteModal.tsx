import { useState } from 'react'
import { X, Loader2, Globe, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CreateWebsiteModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (name: string, subdomain: string) => Promise<void>
}

export default function CreateWebsiteModal({ isOpen, onClose, onCreate }: CreateWebsiteModalProps) {
    const [name, setName] = useState('')
    const [subdomain, setSubdomain] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Auto-generate subdomain from name
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        setName(newName)
        if (!subdomain || subdomain === name.toLowerCase().replace(/[^a-z0-9-]/g, '')) {
            setSubdomain(newName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !subdomain) return

        setIsLoading(true)
        setError('')

        try {
            await onCreate(name, subdomain)
            // Modal closed by parent on success usually, but we can reset form
            setName('')
            setSubdomain('')
        } catch (err: any) {
            console.error('Create site error:', err)
            setError(err.message || 'Web sitesi oluşturulamadı.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600" />

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Yeni Proje</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Web Sitesi Adı
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    placeholder="Örn: Kahve Dükkanım"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subdomain (Alt Alan Adı)
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={subdomain}
                                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                                        placeholder="kahve-dukkanim"
                                        className="w-full pl-10 pr-32 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 font-mono text-sm"
                                        required
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                                        .framecraftai.com
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 ml-1">
                                    Sadece küçük harfler, rakamlar ve tire (-) kullanabilirsiniz.
                                </p>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading || !name || !subdomain}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        'Oluştur'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
