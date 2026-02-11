import { useEffect, useRef } from 'react';

interface LivePreviewProps {
    html: string;
    css: string;
    variables?: Record<string, string>;
}

export default function LivePreview({ html, css, variables = {} }: LivePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Replace variables in HTML: {{title}} -> "My Title"
    const processedHtml = html.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        return variables[key.trim()] || match;
    });

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const doc = iframe.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        /* Base reset */
                        body { margin: 0; font-family: sans-serif; }
                        * { box-sizing: border-box; }
                        ${css}
                    </style>
                </head>
                <body>
                    ${processedHtml}
                </body>
            </html>
        `);
        doc.close();
    }, [html, css, variables]);

    return (
        <div className="w-full h-full min-h-[300px] border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wide">
                Live Preview
            </div>
            <iframe
                ref={iframeRef}
                className="w-full h-full min-h-[300px] border-none"
                title="Component Preview"
                sandbox="allow-scripts" // Security: restrict actions
            />
        </div>
    );
}
