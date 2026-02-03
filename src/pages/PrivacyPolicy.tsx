import { Link } from 'react-router-dom'
import { Sparkles, ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                FrameCraftAI
                            </span>
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Shield className="w-10 h-10 text-purple-600" />
                        <h1 className="text-4xl font-bold text-gray-800">Gizlilik Politikası</h1>
                    </div>
                    <p className="text-gray-600 mb-8">
                        Son Güncelleme: 31 Ocak 2026
                    </p>

                    {/* Summary Cards */}
                    <div className="grid md:grid-cols-3 gap-4 mb-12">
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <Eye className="w-6 h-6 text-purple-600 mb-2" />
                            <h3 className="font-semibold text-gray-800">Şeffaflık</h3>
                            <p className="text-sm text-gray-600">Verilerinizi nasıl kullandığımızı açıkça belirtiyoruz</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <Lock className="w-6 h-6 text-blue-600 mb-2" />
                            <h3 className="font-semibold text-gray-800">Güvenlik</h3>
                            <p className="text-sm text-gray-600">Verileriniz şifrelenerek korunur</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <Database className="w-6 h-6 text-green-600 mb-2" />
                            <h3 className="font-semibold text-gray-800">Kontrol</h3>
                            <p className="text-sm text-gray-600">Verileriniz üzerinde tam kontrolünüz var</p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none space-y-8">
                        {/* 1. Giriş */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Giriş</h2>
                            <p className="text-gray-700 leading-relaxed">
                                FrameCraftAI ("Biz", "Bizim") olarak gizliliğinize önem veriyoruz. Bu gizlilik politikası,
                                hizmetlerimizi kullanırken kişisel bilgilerinizi nasıl topladığımızı, kullandığımızı,
                                koruduğumuzu ve paylaştığımızı açıklar.
                            </p>
                        </section>

                        {/* 2. Toplanan Bilgiler */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Topladığımız Bilgiler</h2>

                            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1. Sizin Sağladığınız Bilgiler</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Hesap Bilgileri:</strong> Ad, email adresi, şifre</li>
                                <li><strong>Profil Bilgileri:</strong> İşletme adı, sektör, avatar</li>
                                <li><strong>İçerik:</strong> Oluşturduğunuz web siteleri, metinler, görseller</li>
                                <li><strong>Ödeme Bilgileri:</strong> Kredi kartı bilgileri (üçüncü taraf işlemci aracılığıyla)</li>
                                <li><strong>İletişim:</strong> Destek talepleri, geri bildirimler</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2. Otomatik Toplanan Bilgiler</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Kullanım Verileri:</strong> Sayfa görüntülemeleri, tıklamalar, özellik kullanımı</li>
                                <li><strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü, işletim sistemi</li>
                                <li><strong>Çerezler:</strong> Oturum bilgileri, tercihler</li>
                                <li><strong>Log Verileri:</strong> Erişim zamanları, hatalar</li>
                            </ul>
                        </section>

                        {/* 3. Bilgilerin Kullanımı */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Bilgilerinizi Nasıl Kullanırız</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Hizmet Sağlama:</strong> Hesabınızı yönetme, web sitelerinizi barındırma</li>
                                <li><strong>İyileştirme:</strong> Ürünü geliştirme, yeni özellikler ekleme</li>
                                <li><strong>Kişiselleştirme:</strong> Size özel öneriler sunma</li>
                                <li><strong>İletişim:</strong> Önemli güncellemeler, duyurular</li>
                                <li><strong>Güvenlik:</strong> Dolandırıcılığı önleme, güvenlik sağlama</li>
                                <li><strong>Analitik:</strong> Kullanım istatistikleri, performans ölçümü</li>
                                <li><strong>Yasal Yükümlülükler:</strong> Yasal gereklilikleri yerine getirme</li>
                            </ul>
                        </section>

                        {/* 4. AI ve Veri İşleme */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Yapay Zeka ve Veri İşleme</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>AI Hizmetleri:</strong> AI ile içerik üretmek için girdiğiniz bilgiler:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Üçüncü taraf AI sağlayıcılarına (Google Gemini) gönderilir</li>
                                <li>Yalnızca size özel içerik oluşturmak için kullanılır</li>
                                <li>AI modelleri eğitmek için kullanılmaz</li>
                                <li>İşlendikten sonra AI sağlayıcı tarafından saklanmaz</li>
                            </ul>
                        </section>

                        {/* 5. Bilgi Paylaşımı */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Bilgilerinizi Kimlerle Paylaşırız</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Bilgilerinizi satmayız. Aşağıdaki durumlarda paylaşabiliriz:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Hizmet Sağlayıcılar:</strong> Hosting, email, ödeme işlemcileri</li>
                                <li><strong>AI Sağlayıcılar:</strong> Google Gemini, Nano Banana (sadece içerik üretimi için)</li>
                                <li><strong>Analitik Araçlar:</strong> Google Analytics (anonim kullanım verileri)</li>
                                <li><strong>Yasal Zorunluluk:</strong> Yasal talepler, mahkeme kararları</li>
                                <li><strong>İş Transferi:</strong> Şirket satışı veya birleşme durumunda</li>
                            </ul>
                        </section>

                        {/* 6. Veri Güvenliği */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Veri Güvenliği</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Verilerinizi korumak için aşağıdaki önlemleri alıyoruz:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Şifreleme:</strong> SSL/TLS şifrelemesi ile veri aktarımı</li>
                                <li><strong>Şifre Koruması:</strong> Bcrypt ile hash'lenmiş şifreler</li>
                                <li><strong>Erişim Kontrolü:</strong> Sınırlı personel erişimi</li>
                                <li><strong>Güvenlik Duvarları:</strong> Network güvenliği</li>
                                <li><strong>Düzenli Yedekleme:</strong> Veri kaybını önleme</li>
                                <li><strong>Güvenlik Testleri:</strong> Düzenli penetrasyon testleri</li>
                            </ul>
                        </section>

                        {/* 7. Haklarınız */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Haklarınız (KVKK/GDPR)</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Erişim Hakkı:</strong> Hangi verilerimizin olduğunu öğrenme</li>
                                <li><strong>Düzeltme Hakkı:</strong> Yanlış bilgileri düzeltme</li>
                                <li><strong>Silme Hakkı:</strong> Verilerinizin silinmesini talep etme</li>
                                <li><strong>İtiraz Hakkı:</strong> Veri işlemeye itiraz etme</li>
                                <li><strong>Taşınabilirlik Hakkı:</strong> Verilerinizi başka bir hizmete aktarma</li>
                                <li><strong>Sınırlama Hakkı:</strong> Veri işlemenin sınırlanmasını isteme</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Bu haklarınızı kullanmak için <strong>privacy@framecraftai.com</strong> adresinden
                                bizimle iletişime geçebilirsiniz.
                            </p>
                        </section>

                        {/* 8. Çerezler */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Çerezler (Cookies)</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Aşağıdaki çerez türlerini kullanıyoruz:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Zorunlu Çerezler:</strong> Giriş oturumu, güvenlik (devre dışı bırakılamaz)</li>
                                <li><strong>Fonksiyonel Çerezler:</strong> Dil tercihi, tema</li>
                                <li><strong>Analitik Çerezler:</strong> Google Analytics (reddedebilirsiniz)</li>
                                <li><strong>Pazarlama Çerezleri:</strong> Şu an kullanmıyoruz</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
                            </p>
                        </section>

                        {/* 9. Veri Saklama */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Veri Saklama Süresi</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Hesap Verileri:</strong> Hesabınızı silene kadar</li>
                                <li><strong>Web Siteleri:</strong> Silene kadar veya hesap kapatıldıktan 30 gün sonra</li>
                                <li><strong>Log Verileri:</strong> 90 gün</li>
                                <li><strong>Ödeme Kayıtları:</strong> Yasal gerekliliklere göre 7 yıl</li>
                                <li><strong>Pazarlama İzinleri:</strong> İptal edene kadar</li>
                            </ul>
                        </section>

                        {/* 10. Çocukların Gizliliği */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Çocukların Gizliliği</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hizmetimiz 18 yaşın altındaki kullanıcılar için tasarlanmamıştır. Bilerek 18 yaşın
                                altındaki kişilerden veri toplamıyoruz. Eğer bir çocuğun verilerini topladığımızı
                                fark ederseniz, lütfen bize bildirin.
                            </p>
                        </section>

                        {/* 11. Uluslararası Veri Transferi */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Uluslararası Veri Transferi</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Verileriniz Türkiye'de saklanır. Ancak, bazı hizmet sağlayıcılarımız (örn. Google Cloud)
                                uluslararası sunucular kullanabilir. Bu transferler, uygun güvenlik önlemleri ile yapılır.
                            </p>
                        </section>

                        {/* 12. Değişiklikler */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Politika Değişiklikleri</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler email
                                yoluyla bildirilecektir. Son güncelleme tarihi sayfanın üstünde belirtilmiştir.
                            </p>
                        </section>

                        {/* 13. İletişim */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Bizimle İletişime Geçin</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Gizlilik politikamız veya verilerinizle ilgili sorularınız için:
                            </p>
                            <div className="p-6 bg-purple-50 rounded-lg">
                                <p className="text-gray-700">
                                    <strong>Email:</strong> privacy@framecraftai.com<br />
                                    <strong>Veri Koruma Sorumlusu:</strong> dpo@framecraftai.com<br />
                                    <strong>Adres:</strong> FrameCraftAI, İstanbul, Türkiye<br />
                                    <strong>Telefon:</strong> +90 (XXX) XXX XX XX
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                        <Link
                            to="/terms"
                            className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                            ← Kullanım Şartları
                        </Link>
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-purple-600 font-medium"
                        >
                            Ana Sayfaya Dön
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
