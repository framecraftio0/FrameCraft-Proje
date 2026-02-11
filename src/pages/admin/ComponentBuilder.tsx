import React, { useState } from 'react';
import { Save, ArrowLeft, RefreshCw, FileCode, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CodeEditor from '@/components/admin/CodeEditor';
import LivePreview from '@/components/admin/LivePreview';
import GitHubBrowser from '@/components/admin/GitHubBrowser';
import { templateApi } from '@/lib/api';

export default function ComponentBuilder() {
    const navigate = useNavigate();
    const [sourceMode, setSourceMode] = useState<'manual' | 'github'>('manual');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Hero');
    const [html, setHtml] = useState('<div class="my-component">\n  <h1>{{title}}</h1>\n  <p>{{description}}</p>\n</div>');
    const [css, setCss] = useState('.my-component {\n  padding: 20px;\n  background: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n}');
    const [variables, setVariables] = useState<string[]>([]);
    const [testValues, setTestValues] = useState<Record<string, string>>({
        title: 'Örnek Başlık',
        description: 'Bu bir örnek açıklama metnidir.'
    });
    const [isSaving, setIsSaving] = useState(false);

    // Auto-detect variables in HTML
    React.useEffect(() => {
        const matches = html.match(/\{\{([^}]+)\}\}/g) || [];
        const uniqueVars = Array.from(new Set(matches.map(m => m.replace(/\{\{|\}\}/g, '').trim())));
        setVariables(uniqueVars);
    }, [html]);

    const handleSave = async () => {
        if (!name) return alert('Lütfen bileşen adı giriniz.');

        setIsSaving(true);
        try {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            await templateApi.createTemplate({
                name,
                slug,
                category,
                html_template: html,
                css_template: css,
                editable_fields: { fields: variables }
            });

            alert('Bileşen başarıyla kaydedildi!');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            alert('Kaydetme hatası: ' + (error as any).message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleGitHubImport = (component: {
        name: string;
        category: string;
        html: string;
        css: string;
        js?: string;
        variables: Record<string, string>;
    }) => {
        // Pre-fill form with GitHub component data
        setName(component.name);
        setCategory(component.category);
        setHtml(component.html);
        setCss(component.css);

        // Set test values from variable descriptions
        const newTestValues: Record<string, string> = {};
        Object.entries(component.variables).forEach(([key, description]) => {
            newTestValues[key] = description; // Use description as placeholder
        });
        setTestValues(newTestValues);

        // Switch to manual mode to review
        setSourceMode('manual');
    };

    return (
        <DashboardLayout
            title="Bileşen Oluşturucu"
            action={
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {isSaving ? <RefreshCw className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                    Kaydet
                </button>
            }
        >
            <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4" />
                Admin Paneline Dön
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
                {/* Left Column: Source Selection & Editors */}
                <div className="flex flex-col gap-6 overflow-y-auto">
                    {/* Source Mode Tabs */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex border-b border-gray-200">
                            <button
                                onClick={() => setSourceMode('manual')}
                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${sourceMode === 'manual'
                                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <FileCode size={16} />
                                Manuel Kod
                            </button>
                            <button
                                onClick={() => setSourceMode('github')}
                                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${sourceMode === 'github'
                                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <Github size={16} />
                                GitHub Import
                            </button>
                        </div>

                        <div className="p-6">
                            {sourceMode === 'manual' ? (
                                <>
                                    {/* Metadata */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bileşen Adı</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                                placeholder="Örn: Modern Hero"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                            <select
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                                className="w-full px-3 py-2 border rounded-lg"
                                            >
                                                <option value="Hero">Hero</option>
                                                <option value="Features">Features</option>
                                                <option value="Pricing">Pricing</option>
                                                <option value="Testimonials">Testimonials</option>
                                                <option value="Footer">Footer</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <GitHubBrowser onComponentSelect={handleGitHubImport} />
                            )}
                        </div>
                    </div>

                    {/* Editors */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">HTML (Değişkenler: {'{{değişken}}'})</h3>
                        <CodeEditor
                            language="html"
                            value={html}
                            onChange={setHtml}
                        />

                        <h3 className="font-medium text-gray-900">CSS</h3>
                        <CodeEditor
                            language="css"
                            value={css}
                            onChange={setCss}
                        />
                    </div>
                </div>

                {/* Right Column: Preview & Variables */}
                <div className="flex flex-col gap-6">
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div className="p-4 border-b bg-gray-50 font-medium text-sm flex justify-between">
                            Canlı Önizleme
                            <span className="text-gray-500 text-xs font-normal">Değişkenler test verisi ile gösteriliyor</span>
                        </div>
                        <div className="flex-1 p-4 bg-gray-100">
                            <LivePreview html={html} css={css} variables={testValues} />
                        </div>
                    </div>

                    {/* Detected Variables Panel */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Algılanan Değişkenler
                        </h3>

                        {variables.length === 0 ? (
                            <p className="text-gray-500 text-sm">HTML içinde henüz değişken bulunamadı. Örn: {'{{title}}'}</p>
                        ) : (
                            <div className="grid gap-3">
                                {variables.map(v => (
                                    <div key={v} className="flex items-center gap-3">
                                        <code className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{`{{${v}}}`}</code>
                                        <input
                                            type="text"
                                            value={testValues[v] || ''}
                                            onChange={(e) => setTestValues({ ...testValues, [v]: e.target.value })}
                                            className="flex-1 px-2 py-1 text-sm border rounded"
                                            placeholder="Test verisi gir..."
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
