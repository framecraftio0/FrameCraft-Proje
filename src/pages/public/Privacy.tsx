import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, Shield, Lock, Eye, Database, UserCheck } from 'lucide-react'

export default function Privacy() {
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
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                FrameCraftAI
                            </span>
                        </Link>
                        <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-8 h-8 text-purple-600" />
                        <h1 className="text-4xl font-bold text-gray-800">Gizlilik Politikası</h1>
                    </div>
                    <p className="text-gray-600 mb-8">Son Güncelleme: 1 Şubat 2026</p>

                    <div className="prose prose-gray max-w-none space-y-8">
                        {/* Giriş */}
                        <section>
                            <p className="text-gray-700 leading-relaxed">
                                FrameCraftAI olarak gizliliğinizi ciddiye alıyoruz. Bu Gizlilik Politikası, kişisel
                                verilerinizi nasıl topladığımızı, kullandığımızı, sakladığımızı ve koruduğumuzu açıklar.
                                Hizmetimizi kullanarak, bu politikayı kabul etmiş olursunuz.
                            </p>
                        </section>

                        {/* 1. Topladığımız Bilgiler */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Database className="w-6 h-6 text-purple-600" />
                                1. Topladığımız Bilgiler
                            </h2>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">1.1 Hesap Bilgileri</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Hesap oluşturduğunuzda şu bilgileri toplarız:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Temel Bilgiler:</strong> İsim, e-posta adresi</li>
                                <li><strong>Opsiyonel Bilgiler:</strong> Telefon, adres, şehir, ülke, posta kodu, hakkında</li>
                                <li><strong>İş Bilgileri:</strong> İşletme adı, sektör (opsiyonel)</li>
                                <li><strong>Profil Fotoğrafı:</strong> Avatar/profil resmi (opsiyonel)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">1.2 Kullanım Verileri</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>IP adresi ve cihaz bilgileri</li>
                                <li>Tarayıcı türü ve dil tercihleri</li>
                                <li>Erişim zamanları ve süresi</li>
                                <li>Tıklanan sayfalar ve özellikler</li>
                                <li>Referans URL'leri</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">1.3 İçerik Verileri</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Oluşturduğunuz web siteleri ve içerikler</li>
                                <li>Yapay zekaya verdiğiniz promptlar ve talimatlar</li>
                                <li>Yüklediğiniz medya dosyaları (resim, video)</li>
                                <li>Figma entegrasyon verileri</li>
                                <li>Özelleştirme ve tasarım tercihleri</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">1.4 Ödeme Bilgileri</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Ödeme bilgileriniz güvenli ödeme sağlayıcılarımız (Stripe, vb.) tarafından işlenir.
                                Kredi kartı numaralarını saklamayız, sadece son 4 hane ve işlem geçmişini tutarız.
                            </p>
                        </section>

                        {/* 2. Bilgileri Nasıl Kullanıyoruz */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Eye className="w-6 h-6 text-purple-600" />
                                2. Bilgileri Nasıl Kullanıyoruz
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Topladığımız verileri şu amaçlarla kullanırız:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Hizmet Sağlama:</strong> Platformu çalıştırmak ve web sitelerinizi yayınlamak</li>
                                <li><strong>Kimlik Doğrulama:</strong> Hesap güvenliğini sağlamak</li>
                                <li><strong>AI Özellikleri:</strong> İçerik ve görsel üretimi için yapay zeka modellerini çalıştırmak</li>
                                <li><strong>Kişiselleştirme:</strong> Deneyiminizi kişiselleştirmek ve öneriler sunmak</li>
                                <li><strong>İletişim:</strong> Hesap bildirimleri, güncellemeler ve destek mesajları göndermek</li>
                                <li><strong>Geliştirme:</strong> Platfomı iyileştirmek ve yeni özellikler eklemek</li>
                                <li><strong>Güvenlik:</strong> Dolandırıcılığı tespit etmek ve önlemek</li>
                                <li><strong>Analitik:</strong> Kullanım istatistikleri ve performans analizi yapmak</li>
                                <li><strong>Yasal Yükümlülükler:</strong> Yasal gereklilikleri yerine getirmek</li>
                            </ul>
                        </section>

                        {/* 3. Bilgi Paylaşımı */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Bilgi Paylaşımı ve Üçüncü Taraflar</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Verilerinizi şu durumlarda üçüncü taraflarla paylaşabiliriz:
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.1 Hizmet Sağlayıcılar</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Supabase:</strong> Veritabanı ve kimlik doğrulama</li>
                                <li><strong>Google (Gemini AI):</strong> Yapay zeka içerik üretimi</li>
                                <li><strong>Figma:</strong> Tasarım entegrasyonu</li>
                                <li><strong>Vercel/Netlify:</strong> Hosting ve CDN</li>
                                <li><strong>Stripe:</strong> Ödeme işleme</li>
                                <li><strong>Email Servisleri:</strong> İletişim ve bildirimler</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.2 Yasal Gereklilikler</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Yasal zorunluluk, mahkeme kararı veya devlet talebi durumunda bilgilerinizi
                                yetkili makamlara açıklayabiliriz.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.3 İş Devri</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Şirket birleşmesi, satışı veya varlık devri durumunda, verileriniz devredilen
                                varlıklar arasında olabilir.
                            </p>
                        </section>

                        {/* 4. Veri Güvenliği */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Lock className="w-6 h-6 text-purple-600" />
                                4. Veri Güvenliği ve Saklama
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Verilerinizi korumak için şu önlemleri alıyoruz:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Şifreleme:</strong> Tüm veriler SSL/TLS ile şifrelenir</li>
                                <li><strong>Erişim Kontrolü:</strong> Sadece yetkili personel erişebilir</li>
                                <li><strong>Güvenli Sunucular:</strong> Endüstri standardı veri merkezleri</li>
                                <li><strong>Düzenli Yedekleme:</strong> Otomatik veri yedekleme sistemi</li>
                                <li><strong>Güvenlik Testleri:</strong> Düzenli penetrasyon testleri</li>
                                <li><strong>İki Faktörlü Doğrulama:</strong> Ekstra güvenlik katmanı</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                <strong>Saklama Süresi:</strong> Verilerinizi hesabınız aktif olduğu sürece ve
                                yasal yükümlülüklerimiz için gerekli olan süre boyunca saklarız.
                            </p>
                        </section>

                        {/* 5. Kullanıcı Hakları */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <UserCheck className="w-6 h-6 text-purple-600" />
                                5. Kullanıcı Hakları (KVKK/GDPR)
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Kişisel verilerinizle ilgili şu haklara sahipsiniz:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Erişim Hakkı:</strong> Hangi verilerinizi sakladığımızı öğrenebilirsiniz</li>
                                <li><strong>Düzeltme Hakkı:</strong> Yanlış bilgilerinizi düzeltebilirsiniz</li>
                                <li><strong>Silme Hakkı:</strong> Hesabınızı ve verilerinizi silebilirsiniz</li>
                                <li><strong>Veri Taşınabilirliği:</strong> Verilerinizi indirebilirsiniz</li>
                                <li><strong>İtiraz Hakkı:</strong> Veri işlemeye itiraz edebilirsiniz</li>
                                <li><strong>Onay Geri Çekme:</strong> Verdiğiniz izinleri geri çekebilirsiniz</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Bu haklarınızı kullanmak için <a href="mailto:privacy@framecraftai.com" className="text-purple-600 hover:text-purple-700">privacy@framecraftai.com</a> adresine başvurabilirsiniz.
                            </p>
                        </section>

                        {/* 6. Çerezler */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Çerezler (Cookies) ve İzleme</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Web sitemizde şu türde çerezler kullanıyoruz:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li><strong>Gerekli Çerezler:</strong> Platformun çalışması için zorunlu</li>
                                <li><strong>Oturum Çerezleri:</strong> Kimlik doğrulama ve güvenlik</li>
                                <li><strong>Tercih Çerezleri:</strong> Dil ve tema ayarları</li>
                                <li><strong>Analitik Çerezler:</strong> Google Analytics (anonim)</li>
                                <li><strong>Performans Çerezleri:</strong> Site performansını ölçme</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Tarayıcı ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz, ancak bu
                                bazı özelliklerin çalışmamasına neden olabilir.
                            </p>
                        </section>

                        {/* 7. Çocukların Gizliliği */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Çocukların Gizliliği</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hizmetimiz 18 yaş altı çocuklara yönelik değildir. Bilerek 18 yaş altı çocuklardan
                                kişisel bilgi toplamıyoruz. Eğer bir ebeveyn veya vasi olarak çocuğunuzun bize bilgi
                                verdiğini fark ederseniz, lütfen bizimle iletişime geçin.
                            </p>
                        </section>

                        {/* 8. Uluslararası Veri Transferi */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Uluslararası Veri Transferi</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Verileriniz Türkiye dışındaki sunucularda (AB, ABD) işlenebilir. Bu transferler
                                sırasında GDPR ve KVKK standartlarına uygun güvenlik önlemleri alınır. Hizmeti
                                kullanarak bu transferlere onay vermiş olursunuz.
                            </p>
                        </section>

                        {/* 9. Değişiklikler */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Gizlilik Politikası Değişiklikleri</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler için
                                e-posta veya platform üzerinden bildirim göndeririz. Değişikliklerin yürürlüğe
                                girmesinden sonra hizmeti kullanmaya devam etmeniz, yeni politikayı kabul ettiğiniz
                                anlamına gelir.
                            </p>
                        </section>

                        {/* 10. İletişim */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. İletişim ve Veri Sorumlusu</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Gizlilik konularında sorularınız veya talepleriniz için:
                            </p>
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                                <p className="text-gray-700 mb-2">
                                    <strong>Veri Sorumlusu:</strong> FrameCraftAI
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Email:</strong> <a href="mailto:privacy@framecraftai.com" className="text-purple-600 hover:text-purple-700">privacy@framecraftai.com</a>
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong>Destek:</strong> <a href="mailto:support@framecraftai.com" className="text-purple-600 hover:text-purple-700">support@framecraftai.com</a>
                                </p>
                                <p className="text-gray-700">
                                    <strong>Adres:</strong> FrameCraftAI, İstanbul, Türkiye
                                </p>
                            </div>
                        </section>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-center">
                                Bu Gizlilik Politikasını okuyup anladığınızı ve kişisel verilerinizin bu şekilde
                                işlenmesini kabul ettiğinizi onaylıyorsunuz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
