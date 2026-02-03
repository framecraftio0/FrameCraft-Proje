import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function Terms() {
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
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Kullanım Şartları</h1>
                    <p className="text-gray-600 mb-8">Son Güncelleme: 1 Şubat 2026</p>

                    <div className="prose prose-gray max-w-none space-y-8">
                        {/* 1. Giriş */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Giriş</h2>
                            <p className="text-gray-700 leading-relaxed">
                                FrameCraftAI platformuna hoş geldiniz. Bu Kullanım Şartları, FrameCraftAI web sitesi ve hizmetlerinin
                                ("Hizmet") kullanımını düzenler. Hizmeti kullanarak, bu şartları kabul etmiş sayılırsınız. Şartları
                                kabul etmiyorsanız, lütfen Hizmeti kullanmayın.
                            </p>
                        </section>

                        {/* 2. Hesap Oluşturma */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Hesap Oluşturma ve Güvenlik</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                FrameCraftAI'da hesap oluşturarak:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>En az 18 yaşında olduğunuzu veya yasal vesayetiniz altında olduğunuzu onaylarsınız</li>
                                <li>Doğru, güncel ve eksiksiz bilgi sağlamayı kabul edersiniz</li>
                                <li>Hesap güvenliğinden sorumlu olduğunuzu kabul edersiniz</li>
                                <li>Hesabınızdaki tüm faaliyetlerden sorumlu olduğunuzu kabul edersiniz</li>
                                <li>Yetkisiz erişimi derhal bize bildirmeyi kabul edersiniz</li>
                            </ul>
                        </section>

                        {/* 3. Hizmet Kullanımı */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Hizmet Kullanımı</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.1 İzin Verilen Kullanım</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                FrameCraftAI'ı şu amaçlarla kullanabilirsiniz:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Kendi web sitelerinizi oluşturmak ve yayınlamak</li>
                                <li>Yapay zeka destekli içerik ve görsel üretimi yapmak</li>
                                <li>Figma tasarımlarınızı entegre etmek</li>
                                <li>Platform üzerinden müşterileriniz için web siteleri oluşturmak</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.2 Yasak Faaliyetler</h3>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Hizmeti kullanırken şunları yapamazsınız:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Yasadışı, zararlı veya saldırgan içerik oluşturmak</li>
                                <li>Başkalarının fikri mülkiyet haklarını ihlal etmek</li>
                                <li>Platformun güvenliğini tehlikeye atmak veya hacklemeye çalışmak</li>
                                <li>Botlar veya otomatik araçlar kullanarak sistemi suistimal etmek</li>
                                <li>Spam veya istenmeyen içerik yayınlamak</li>
                                <li>Başka kullanıcıların kimliğine bürünmek</li>
                                <li>Hizmeti tersine mühendislik yapmak</li>
                            </ul>
                        </section>

                        {/* 4. Fikri Mülkiyet */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Fikri Mülkiyet Hakları</h2>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 FrameCraftAI'ın Hakları</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Platform, tasarım, kod, logo, marka ve tüm içerik FrameCraftAI'ın mülkiyetindedir.
                                Lisans olmadan kopyalama, değiştirme veya dağıtma yasaktır.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.2 Kullanıcı İçeriği</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Platformda oluşturduğunuz web siteleri ve içerikler size aittir. Ancak, hizmeti sunabilmek
                                için bize bu içeriği depolama, işleme ve görüntüleme konusunda sınırlı bir lisans verirsiniz.
                            </p>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.3 Yapay Zeka Üretimi</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Yapay zeka tarafından oluşturulan içerik ve görseller, kullanım hakkı size aittir. Ancak,
                                benzer istekler için AI modellerimizi geliştirmede kullanabiliriz.
                            </p>
                        </section>

                        {/* 5. Abonelik ve Ödeme */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Abonelik ve Ödeme</h2>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Abonelik ücretleri fiyatlandırma sayfasında belirtilmiştir</li>
                                <li>Ödemeler aylık veya yıllık olarak otomatik olarak yenilenir</li>
                                <li>İptal için hesap ayarlarınızdan aboneliğinizi iptal edebilirsiniz</li>
                                <li>İptal edilen abonelikler dönem sonunda sona erer</li>
                                <li>İadeler, özel durumlar hariç, genellikle verilmez</li>
                                <li>Kredi kullanımı abonelik planınıza bağlıdır</li>
                            </ul>
                        </section>

                        {/* 6. Hizmet Sürekliliği */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Hizmet Sürekliliği ve Değişiklikler</h2>
                            <p className="text-gray-700 leading-relaxed">
                                FrameCraftAI, hizmeti iyileştirme, güncelleme veya değiştirme hakkını saklı tutar.
                                Önemli değişiklikler için kullanıcıları bilgilendiririz. Hizmette kesintiler yaşanabilir
                                ve bunlardan sorumlu tutulamayız.
                            </p>
                        </section>

                        {/* 7. Sorumluluk Reddi */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Sorumluluk Reddi ve Sınırlamaları</h2>
                            <p className="text-gray-700 leading-relaxed mb-3">
                                Hizmet "olduğu gibi" sunulmaktadır. FrameCraftAI:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>Kesintisiz veya hatasız hizmet garantisi vermez</li>
                                <li>Kullanıcı içeriğinin doğruluğundan sorumlu değildir</li>
                                <li>Üçüncü taraf hizmetlerden (Figma, N8N) sorumlu değildir</li>
                                <li>Veri kaybı veya yedekleme garantisi vermez</li>
                                <li>Yapay zeka çıktılarının kalitesini garanti etmez</li>
                            </ul>
                        </section>

                        {/* 8. Hesap İptali */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Hesap İptali ve Askıya Alma</h2>
                            <p className="text-gray-700 leading-relaxed">
                                FrameCraftAI, bu şartları ihlal eden hesapları önceden bildirimde bulunmaksızın askıya alma
                                veya iptal etme hakkını saklı tutar. Ciddi ihlallerde yasal işlem başlatılabilir.
                            </p>
                        </section>

                        {/* 9. Değişiklikler */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Kullanım Şartlarında Değişiklikler</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Bu Kullanım Şartlarını dilediğimiz zaman değiştirme hakkımız vardır. Önemli değişiklikler
                                için e-posta ile bildirim göndeririz. Değişikliklerden sonra Hizmeti kullanmaya devam
                                etmeniz, yeni şartları kabul ettiğiniz anlamına gelir.
                            </p>
                        </section>

                        {/* 10. İletişim */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. İletişim</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Kullanım Şartları hakkında sorularınız için:
                            </p>
                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                                <p className="text-gray-700">
                                    <strong>Email:</strong> <a href="mailto:support@framecraftai.com" className="text-purple-600 hover:text-purple-700">support@framecraftai.com</a>
                                </p>
                                <p className="text-gray-700 mt-2">
                                    <strong>Adres:</strong> FrameCraftAI, İstanbul, Türkiye
                                </p>
                            </div>
                        </section>

                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-500 text-center">
                                Bu Kullanım Şartlarını okuyup anladığınızı ve bunlara uymayı kabul ettiğinizi onaylıyorsunuz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
