import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface EmptyStateProps {
    onCreateClick: () => void
}

export default function EmptyState({ onCreateClick }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-300"
        >
            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                <Plus className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">İlk Web Sitenizi Oluşturun</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
                Henüz hiç projeniz yok. Yapay zeka destekli araçlarımızla hayalinizdeki web sitesini dakikalar içinde oluşturmaya başlayın.
            </p>
            <button
                onClick={onCreateClick}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Yeni Proje Oluştur
            </button>
        </motion.div>
    )
}
