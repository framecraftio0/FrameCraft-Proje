import { Link } from 'react-router-dom'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsOfService() {
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
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Kullanım Şartları</h1>
                    <p className="text-gray-600 mb-8">
                        Son Güncelleme: 31 Ocak 2026
                    </p>

                    <div className="prose prose-lg max-w-none space-y-8">
                        {/* 1. Genel Şartlar */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Genel Şartlar</h2>
                            <p className="text-gray-700 leading-relaxed">
                                FrameCraftAI ("Hizmet") kullanarak, aşağıdaki kullanım şartlarını ("Şartlar") kabul etmiş olursunuz.
                                Bu şartları kabul etmiyorsanız, lütfen hizmeti kullanmayın.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Bu şartları zaman zaman güncelleme hakkımızı saklı tutarız. Önemli değişiklikler olduğunda
                                sizi bilgilendireceğiz.
                            </p>
                        </section>

                        {/* 2. Hesap Oluşturma */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Hesap Oluşturma ve Güvenlik</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                FrameCraftAI'yi kullanmak için bir hesap oluşturmanız gerekmektedir. Hesabınızı oluştururken:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Doğru ve güncel bilgiler sağlamalısınız</li>
                                <li>18 yaşından büyük olmalısınız</li>
                                <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz</li>
                                <li>Hesabınızı başkalarıyla paylaşmamalısınız</li>
                                <li>Hesabınızda yetkisiz bir erişim olduğunu düşünüyorsanız hemen bize bildirmelisiniz</li>
                            </ul>
                        </section>

                        {/* 3. Kullanım Kuralları */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Kabul Edilebilir Kullanım</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Hizmetimizi kullanırken aşağıdaki faaliyetlerde <strong>bulunamazsınız</strong>:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Yasa dışı veya zararlı içerik oluşturma veya paylaşma</li>
                                <li>Başkalarının telif haklarını ihlal etme</li>
                                <li>Kötü amaçlı yazılım veya virüs yükleme</li>
                                <li>Hizmeti suistimal etme veya kötüye kullanma</li>
                                <li>Spam veya istenmeyen içerik gönderme</li>
                                <li>Başkalarının kişisel bilgilerini izinsiz toplama</li>
                                <li>Sistemi manipüle etmeye veya hackle meye çalışma</li>
                            </ul>
                        </section>

                        {/* 4. İçerik ve Mülkiyet */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. İçerik ve Fikri Mülkiyet</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Sizin İçeriğiniz:</strong> Hizmeti kullanarak oluşturduğunuz web siteleri ve içerikler ("Kullanıcı İçeriği")
                                size aittir. Ancak, bize bu içeriği barındırma, işleme ve görüntüleme için gerekli lisansları vermiş olursunuz.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Bizim İçeriğimiz:</strong> FrameCraftAI platformu, logosu, tasarımı, bileşenleri ve diğer tüm
                                materyaller bizim fikri mülkiyetimizdir ve telif hakkı yasaları ile korunmaktadır.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>AI Üretilen İçerik:</strong> Yapay zeka ile oluşturulan içerikler sizin kullanımınız içindir.
                                Ancak, bu içeriklerin benzersizliğini garanti edemeyiz.
                            </p>
                        </section>

                        {/* 5. Abonelik ve Ödeme */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Abonelik ve Ödeme Şartları</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Ücretsiz Plan:</strong> Sınırlı özelliklerle ücretsiz kullanım sunuyoruz.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Ücretli Planlar:</strong> Ücretli planlara abone olursanız:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Aylık veya yıllık olarak faturalandırılırsınız</li>
                                <li>Otomatik yenileme yapılır (iptal edilene kadar)</li>
                                <li>İptal etmek istediğinizde hesap ayarlarınızdan yapabilirsiniz</li>
                                <li>İade politikamız: İlk 14 gün içinde tam iade</li>
                            </ul>
                        </section>

                        {/* 6. Hizmet Seviyesi */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Hizmet Seviyesi ve Kesintiler</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hizmeti kesintisiz ve hatasız sağlamak için çaba gösteririz, ancak garanti edemeyiz.
                                Bakım, güncelleme veya teknik sorunlar nedeniyle hizmet geçici olarak kullanılamayabilir.
                            </p>
                        </section>

                        {/* 7. Sorumluluk Reddi */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Sorumluluk Reddi</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hizmet "olduğu gibi" sağlanmaktadır. FrameCraftAI, hizmetin kullanımından kaynaklanan
                                herhangi bir doğrudan veya dolaylı zarardan sorumlu tutulamaz. Bu şunları içerir ancak
                                bunlarla sınırlı değildir:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                                <li>Veri kaybı</li>
                                <li>Gelir kaybı</li>
                                <li>İş kaybı</li>
                                <li>Üçüncü taraf hizmetlerden kaynaklanan sorunlar</li>
                            </ul>
                        </section>

                        {/* 8. Fesih */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Hesap Feshi</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>Sizin Tarafınızdan:</strong> Hesabınızı istediğiniz zaman kapatabilirsiniz.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Bizim Tarafımızdan:</strong> Bu şartları ihlal ederseniz, hesabınızı uyarı
                                vermeden askıya alabilir veya silebiliriz.
                            </p>
                        </section>

                        {/* 9. Değişiklikler */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Şartlarda Değişiklikler</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Bu kullanım şartlarını dilediğimiz zaman güncelleme hakkımızı saklı tutarız.
                                Önemli değişiklikler email yoluyla bildirilecektir. Değişikliklerden sonra hizmeti
                                kullanmaya devam ederseniz, yeni şartları kabul etmiş sayılırsınız.
                            </p>
                        </section>

                        {/* 10. İletişim */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">10. İletişim</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Bu şartlarla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
                            </p>
                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                <p className="text-gray-700">
                                    <strong>Email:</strong> legal@framecraftai.com<br />
                                    <strong>Adres:</strong> FrameCraftAI, İstanbul, Türkiye
                                </p>
                            </div>
                        </section>

                        {/* Kabul */}
                        <section className="border-t border-gray-200 pt-8">
                            <p className="text-gray-700 leading-relaxed italic">
                                Bu hizmeti kullanarak, yukarıdaki kullanım şartlarını okuduğunuzu, anladığınızı ve
                                kabul ettiğinizi beyan edersiniz.
                            </p>
                        </section>
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
                        <Link
                            to="/privacy"
                            className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                            Gizlilik Politikası →
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
