import { useEffect, useRef, useState } from 'react';

interface ReactPreviewProps {
    componentCode: string;
    cssCode: string;
    variables?: Record<string, string>;
}

export function ReactPreview({ componentCode, cssCode, variables = {} }: ReactPreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        try {
            const doc = iframe.contentDocument;
            if (!doc) return;

            // Prepare the component code
            const processedCode = componentCode;

            // Note: Variable replacement in React components is complex
            // For now, we render the original component as-is
            // TODO: Implement proper variable injection

            // Create the preview document
            doc.open();
            doc.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React & ReactDOM from CDN -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Framer Motion from CDN -->
    <script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>
    
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        * {
            box-sizing: border-box;
        }
        
        /* Custom CSS from component */
        ${cssCode}
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="module">
        const { useState, useEffect, useRef, useCallback } = React;
        const { motion, AnimatePresence, useScroll, useTransform } = Motion;
        
        try {
            // Transform the component code to work in browser
            let componentCode = \`${processedCode.replace(/`/g, '\\`')}\`;
            
            // Remove imports (we're using CDN)
            componentCode = componentCode.replace(/^import.*from.*$/gm, '');
            
            // Remove export
            componentCode = componentCode.replace(/^export\\s+(function|const)/gm, '$1');
            
            // Extract component function
            const componentMatch = componentCode.match(/function\\s+(\\w+)\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*\\}/);
            
            if (componentMatch) {
                // Create component function
                const ComponentFunction = new Function(
                    'React', 'useState', 'useEffect', 'useRef', 'useCallback',
                    'motion', 'AnimatePresence', 'useScroll', 'useTransform',
                    componentCode + '; return ' + componentMatch[1] + ';'
                );
                
                const Component = ComponentFunction(
                    React, useState, useEffect, useRef, useCallback,
                    motion, AnimatePresence, useScroll, useTransform
                );
                
                // Render component
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(Component));
            } else {
                throw new Error('Could not find component function');
            }
        } catch (err) {
            document.getElementById('root').innerHTML = \`
                <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; margin: 20px;">
                    <h3 style="color: #c00; margin: 0 0 10px 0;">Preview Error</h3>
                    <p style="margin: 0; color: #600; font-family: monospace; font-size: 12px;">
                        \${err.message}
                    </p>
                    <p style="margin: 10px 0 0 0; color: #666; font-size: 12px;">
                        The component may use features not supported in preview mode.
                    </p>
                </div>
            \`;
            console.error('Preview error:', err);
        }
    </script>
</body>
</html>
            `);
            doc.close();
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to render preview');
            console.error('Preview setup error:', err);
        }
    }, [componentCode, cssCode, variables]);

    return (
        <div className="w-full h-full min-h-[600px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Live Preview (React + Framer Motion)
                </span>
                {error && (
                    <span className="text-xs text-red-600">
                        ⚠️ Preview Error
                    </span>
                )}
            </div>
            <iframe
                ref={iframeRef}
                className="w-full h-full min-h-[550px] border-none bg-white"
                title="Component Preview"
                sandbox="allow-scripts"
            />
        </div>
    );
}
