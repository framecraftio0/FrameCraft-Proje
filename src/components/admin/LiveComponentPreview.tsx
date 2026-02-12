import { Suspense, lazy, useEffect, useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import '../temp/preview.css';

// Dynamically import the preview component
const DynamicPreview = lazy(() => import('../temp/PreviewComponent').catch(() => {
    // If import fails, return a fallback component
    return {
        default: () => (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">No preview component available</p>
            </div>
        )
    };
}));

export default function LiveComponentPreview() {
    const [key, setKey] = useState(0);
    const [hasComponent, setHasComponent] = useState(false);

    useEffect(() => {
        // Check if component code exists in localStorage
        const componentCode = localStorage.getItem('temp-preview-component');
        setHasComponent(!!componentCode);
    }, []);

    const handleRefresh = () => {
        // Force re-import by changing key
        setKey(prev => prev + 1);

        // Check again if component exists
        const componentCode = localStorage.getItem('temp-preview-component');
        setHasComponent(!!componentCode);
    };

    return (
        <div className="w-full h-full min-h-[500px] bg-white rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">
                    Live Preview
                </span>
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50"
                    title="Refresh preview"
                >
                    <RefreshCw size={14} />
                    Refresh
                </button>
            </div>

            {!hasComponent && (
                <div className="p-6 bg-yellow-50 border-b border-yellow-200">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                        <div>
                            <h4 className="text-sm font-semibold text-yellow-900 mb-1">Manual Setup Required</h4>
                            <p className="text-sm text-yellow-800 mb-2">
                                To see the live preview, copy the uploaded component to:
                            </p>
                            <code className="text-xs bg-yellow-100 px-2 py-1 rounded block font-mono">
                                src/components/temp/PreviewComponent.tsx
                            </code>
                            <p className="text-xs text-yellow-700 mt-2">
                                Then click Refresh to see your component with full React + Framer Motion support!
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-4">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">Loading component...</div>
                    </div>
                }>
                    <DynamicPreview key={key} />
                </Suspense>
            </div>
        </div>
    );
}
