import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Camera, Loader2, Check, MapPin, Phone, Globe, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'

export default function UserProfile() {
    const { user, updateProfile, uploadAvatar, logout } = useAuth()
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user?.name || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [address, setAddress] = useState(user?.address || '')
    const [city, setCity] = useState(user?.city || '')
    const [country, setCountry] = useState(user?.country || '')
    const [postalCode, setPostalCode] = useState(user?.postalCode || '')
    const [bio, setBio] = useState(user?.bio || '')
    const [isLoading, setIsLoading] = useState(false)
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSave = async () => {
        setIsLoading(true)
        setSuccessMessage('')
        setErrorMessage('')

        try {
            await updateProfile({
                name,
                phone,
                address,
                city,
                country,
                postalCode,
                bio
            })
            setSuccessMessage('Profil başarıyla güncellendi!')
            setIsEditing(false)

            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (error: any) {
            setErrorMessage(error.message || 'Profil güncellenemedi!')
            console.error('Profile update failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file
        if (!file.type.startsWith('image/')) {
            setErrorMessage('Lütfen bir resim dosyası seçin!')
            return
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            setErrorMessage('Dosya boyutu 5MB\'dan küçük olmalıdır!')
            return
        }

        setIsUploadingAvatar(true)
        setErrorMessage('')

        try {
            await uploadAvatar(file)
            setSuccessMessage('Profil fotoğrafı güncellendi!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (error: any) {
            setErrorMessage(error.message || 'Fotoğraf yüklenemedi!')
        } finally {
            setIsUploadingAvatar(false)
        }
    }

    const handleLogout = async () => {
        console.log('🚪 handleLogout called')
        try {
            console.log('⏳ Calling logout function...')
            await logout()
            console.log('✅ Logout successful, navigating to /')
            // Navigate after successful logout
            navigate('/')
        } catch (error) {
            console.error('❌ Logout error:', error)
            // Navigate anyway even if there's an error
            console.log('⚠️ Navigating to / despite error')
            navigate('/')
        }
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Profilim</h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Success Message */}
                    {successMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2"
                        >
                            <Check className="w-5 h-5" />
                            {successMessage}
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-700 px-4 py-3 rounded-lg"
                        >
                            {errorMessage}
                        </motion.div>
                    )}

                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative group">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                        {user.name[0]?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                <button
                                    onClick={handleAvatarClick}
                                    disabled={isUploadingAvatar}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    {isUploadingAvatar ? (
                                        <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
                                    ) : (
                                        <Camera className="w-4 h-4 text-gray-600" />
                                    )}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>
                            <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                    {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                                </span>
                                {user.emailVerified && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        Doğrulanmış
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Profil Bilgileri</h3>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    Ad Soyad
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.name}</p>
                                )}
                            </div>

                            {/* Email (read-only) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email Adresi
                                </label>
                                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">{user.email}</p>
                                <p className="text-xs text-gray-500 mt-1">Email adresi değiştirilemez</p>
                            </div>

                            {/* Phone (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Telefon <span className="text-gray-400 text-xs">(opsiyonel)</span>
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+90 555 123 45 67"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {user.phone || <span className="text-gray-400">Belirtilmemiş</span>}
                                    </p>
                                )}
                            </div>

                            {/* Address (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Adres <span className="text-gray-400 text-xs">(opsiyonel)</span>
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Sokak, Mahalle, No..."
                                        rows={2}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {user.address || <span className="text-gray-400">Belirtilmemiş</span>}
                                    </p>
                                )}
                            </div>

                            {/* City & Country & Postal Code (Optional) */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Şehir
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="İstanbul"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-sm">
                                            {user.city || <span className="text-gray-400">-</span>}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Globe className="w-3 h-3 inline mr-1" />
                                        Ülke
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            placeholder="Türkiye"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-sm">
                                            {user.country || <span className="text-gray-400">-</span>}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Posta Kodu
                                    </label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="34000"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        />
                                    ) : (
                                        <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800 text-sm">
                                            {user.postalCode || <span className="text-gray-400">-</span>}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bio (Optional) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hakkında <span className="text-gray-400 text-xs">(opsiyonel)</span>
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Kendinizden bahsedin..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                                    />
                                ) : (
                                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                        {user.bio || <span className="text-gray-400">Belirtilmemiş</span>}
                                    </p>
                                )}
                            </div>

                            {/* Account Created */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hesap Oluşturma Tarihi
                                </label>
                                <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                                    {new Date(user.createdAt).toLocaleDateString('tr-TR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-gray-200">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleSave}
                                            disabled={isLoading}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Kaydediliyor...
                                                </>
                                            ) : (
                                                'Değişiklikleri Kaydet'
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditing(false)
                                                // Reset values
                                                setName(user.name)
                                                setPhone(user.phone || '')
                                                setAddress(user.address || '')
                                                setCity(user.city || '')
                                                setCountry(user.country || '')
                                                setPostalCode(user.postalCode || '')
                                                setBio(user.bio || '')
                                                setErrorMessage('')
                                            }}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                                        >
                                            İptal
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                                    >
                                        Profili Düzenle
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Password Change Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Güvenlik
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Şifrenizi değiştirmek için şifre sıfırlama emaili gönderin.
                        </p>
                        <button
                            onClick={() => navigate('/forgot-password')}
                            className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                        >
                            Şifremi Değiştir
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all text-left"
                        >
                            <h4 className="font-semibold text-gray-800 mb-1">Dashboard</h4>
                            <p className="text-sm text-gray-600">Web sitelerim ve projeler</p>
                        </button>
                        <button
                            onClick={() => navigate('/settings')}
                            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-all text-left"
                        >
                            <h4 className="font-semibold text-gray-800 mb-1">Ayarlar</h4>
                            <p className="text-sm text-gray-600">Hesap ve güvenlik ayarları</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
