import { Link } from 'react-router-dom'
import { Globe, ExternalLink, Trash2, Settings } from 'lucide-react'
import type { Website } from '@/types'

interface WebsiteCardProps {
    website: Website
    onDelete: (id: string, name: string) => void
}

export default function WebsiteCard({ website, onDelete }: WebsiteCardProps) {
    const formattedDate = new Date(website.updated_at).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    const statusColors = {
        draft: 'bg-gray-100 text-gray-700',
        published: 'bg-green-100 text-green-700',
        archived: 'bg-yellow-100 text-yellow-700'
    }

    const statusLabels = {
        draft: 'Taslak',
        published: 'Yayında',
        archived: 'Arşiv'
    }

    return (
        <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full">
            {/* Thumbnail */}
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                {website.og_image_url ? (
                    <img
                        src={website.og_image_url}
                        alt={website.site_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                        <Globe className="w-12 h-12 opacity-20" />
                    </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                        to={`/builder/${website.id}`}
                        className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors"
                    >
                        Düzenle
                    </Link>
                    {website.status === 'published' && (
                        <a
                            href={`https://${website.subdomain}.framecraftai.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                </div>

                <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[website.status]}`}>
                        {statusLabels[website.status]}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{website.site_name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <Globe className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{website.subdomain}.framecraftai.com</span>
                        </div>
                    </div>
                    {/* Updated menu implementation could go here, for now using direct buttons */}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span>{formattedDate}</span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                            to={`/websites/${website.id}/settings`}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-purple-600"
                            title="Ayarlar"
                        >
                            <Settings className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => onDelete(website.id, website.site_name)}
                            className="p-1.5 hover:bg-red-50 rounded text-gray-600 hover:text-red-600"
                            title="Sil"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
