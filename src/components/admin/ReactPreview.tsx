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
    <div id="error-display" style="display: none; padding: 20px; background: #fee; border: 2px solid #c00; border-radius: 8px; margin: 20px; font-family: monospace;"></div>
    
    <script>
        function showError(title, message, details) {
            const errorDiv = document.getElementById('error-display');
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = \`
                <h3 style="color: #c00; margin: 0 0 10px 0; font-size: 18px;">\${title}</h3>
                <p style="margin: 0 0 10px 0; color: #600; font-size: 14px;">\${message}</p>
                <pre style="margin: 0; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 4px; font-size: 11px; overflow: auto; max-height: 200px;">\${details}</pre>
            \`;
            console.error(title, message, details);
        }

        // Wait for all CDN libs to load
        let checkCount = 0;
        const checkInterval = setInterval(() => {
            checkCount++;
            
            if (checkCount > 50) { // 5 seconds timeout
                clearInterval(checkInterval);
                showError(
                    'CDN Loading Timeout',
                    'React, ReactDOM, or Framer Motion failed to load',
                    'Check your internet connection or firewall settings'
                );
                return;
            }
            
            if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined' && typeof Motion !== 'undefined') {
                clearInterval(checkInterval);
                initComponent();
            }
        }, 100);

        function initComponent() {
            try {
                const { useState, useEffect, useRef, useCallback } = React;
                const { motion, AnimatePresence, useScroll, useTransform } = Motion;
                
                // Component code
                let componentCode = \`${processedCode.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
                
                console.log('Original component code length:', componentCode.length);
                
                // Remove imports (we're using CDN)
                componentCode = componentCode.replace(/^import.*from.*$/gm, '');
                
                // Remove export
                componentCode = componentCode.replace(/^export\\s+(function|const|default)/gm, '$1');
                componentCode = componentCode.replace(/export\\s+default\\s+/g, '');
                
                console.log('Processed code:', componentCode.substring(0, 200) + '...');
                
                // Try multiple extraction patterns
                let componentMatch = componentCode.match(/(?:function|const)\\s+(\\w+)\\s*=?\\s*(?:\\(.*?\\)|\\([\\s\\S]*?\\))\\s*(?:=>\\s*)?\\{[\\s\\S]*?\\n\\}/);
                
                if (!componentMatch) {
                    // Try finding default export function
                    componentMatch = componentCode.match(/function\\s+(\\w+)\\s*\\([^)]*\\)/);
                }
                
                if (!componentMatch) {
                    // Try arrow function
                    componentMatch = componentCode.match(/const\\s+(\\w+)\\s*=\\s*\\([^)]*\\)\\s*=>/);
                }
                
                if (componentMatch) {
                    const componentName = componentMatch[1];
                    console.log('Found component:', componentName);
                    
                    try {
                        // Create component function with all necessary imports
                        const ComponentFunction = new Function(
                            'React', 'useState', 'useEffect', 'useRef', 'useCallback',
                            'motion', 'AnimatePresence', 'useScroll', 'useTransform',
                            componentCode + '; return ' + componentName + ';'
                        );
                        
                        const Component = ComponentFunction(
                            React, useState, useEffect, useRef, useCallback,
                            motion, AnimatePresence, useScroll, useTransform
                        );
                        
                        console.log('Component created successfully');
                        
                        // Render component
                        const root = ReactDOM.createRoot(document.getElementById('root'));
                        root.render(React.createElement(Component));
                        
                        console.log('Component rendered');
                    } catch (execError) {
                        showError(
                            'Component Execution Error',
                            'Failed to create or render component',
                            execError.message + '\\n\\nComponent Name: ' + componentName + '\\n\\nStack: ' + execError.stack
                        );
                    }
                } else {
                    showError(
                        'Component Parsing Error',
                        'Could not find component function in code',
                        'Tried multiple patterns but none matched.\\n\\nCode preview:\\n' + componentCode.substring(0, 500)
                    );
                }
            } catch (err) {
                showError(
                    'Initialization Error',
                    err.message,
                    err.stack || 'No stack trace available'
                );
            }
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
