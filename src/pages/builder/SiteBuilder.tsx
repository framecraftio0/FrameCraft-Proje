import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { websiteApi, componentApi } from '@/lib/api';
import type { Website, WebsiteComponent } from '@/types';

export default function SiteBuilder() {
    const { id } = useParams<{ id: string }>();
    const [website, setWebsite] = useState<Website | null>(null);
    const [components, setComponents] = useState<WebsiteComponent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        loadData(id);
    }, [id]);

    const loadData = async (websiteId: string) => {
        try {
            const [site, comps] = await Promise.all([
                websiteApi.getWebsite(websiteId),
                componentApi.getPageComponents(websiteId, '/') // Default to home page
            ]);
            setWebsite(site);
            setComponents(comps);
        } catch (err) {
            console.error(err);
            setError('Failed to load website data');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (error || !website) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-600">
                <AlertCircle className="w-10 h-10 mb-2" />
                <p>{error || 'Website not found'}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Toolbar (Placeholder) */}
            <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center px-4 justify-between shadow-sm">
                <div className="font-semibold text-gray-800">{website.site_name}</div>
                <div className="text-sm text-gray-500">Builder Mode</div>
            </div>

            {/* Canvas */}
            <div className="pt-14">
                {components.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p>No components added yet.</p>
                        <p className="text-sm">Go to Admin {'>'} Components to create some templates.</p>
                    </div>
                ) : (
                    components.map((comp) => (
                        <RenderedComponent key={comp.id} component={comp} />
                    ))
                )}
            </div>
        </div>
    );
}

// Helper to render a single component
function RenderedComponent({ component }: { component: WebsiteComponent }) {
    if (!component.template) return null;

    const { html_template, css_template } = component.template;
    const variables = component.custom_content || {};

    // 1. Replace variables in HTML
    const processedHtml = html_template.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        return variables[key.trim()] || match; // Keep match if no value found? Or empty?
    });

    // 2. Encapsulate CSS to avoid global bleeding (using specific ID or class scoping would be better, but basic style tag works for now)
    // A better approach for production is ShadowDOM, but for simplicity here we just render styled div.

    return (
        <div className="relative group">
            <style dangerouslySetInnerHTML={{ __html: css_template }} />
            <div dangerouslySetInnerHTML={{ __html: processedHtml }} />

            {/* Hover actions (Edit/Delete) could go here */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 pointer-events-none transition-colors" />
        </div>
    );
}
