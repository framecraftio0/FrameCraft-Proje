import { useState, useCallback } from 'react';
import { Upload, FolderOpen, FileCode, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
    path: string;
    name: string;
    content: string;
    type: 'component' | 'style' | 'other';
}

interface FolderUploadProps {
    onComponentParsed: (component: {
        name: string;
        category: string;
        html: string;
        css: string;
        js?: string;
        variables: Record<string, string>;
    }) => void;
}

export function FolderUpload({ onComponentParsed }: FolderUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const readFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    };

    const isComponentFile = (file: File): boolean => {
        return /\.(tsx|jsx)$/.test(file.name) &&
            !file.name.includes('test') &&
            !file.name.includes('.spec') &&
            !file.name.includes('App.tsx') &&
            !file.name.includes('main.tsx');
    };

    const isCSSFile = (file: File): boolean => {
        return /\.css$/.test(file.name);
    };

    const handleFiles = async (fileList: FileList) => {
        setIsProcessing(true);
        setError(null);

        try {
            const files: UploadedFile[] = [];

            for (const file of Array.from(fileList)) {
                if (isComponentFile(file) || isCSSFile(file)) {
                    const content = await readFile(file);
                    files.push({
                        path: (file as any).webkitRelativePath || file.name,
                        name: file.name,
                        content,
                        type: isComponentFile(file) ? 'component' : 'style'
                    });
                }
            }

            if (files.length === 0) {
                setError('No component or CSS files found in the uploaded folder');
                setIsProcessing(false);
                return;
            }

            setUploadedFiles(files);
            await parseAndSubmit(files);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to read files');
            setIsProcessing(false);
        }
    };

    const parseAndSubmit = async (files: UploadedFile[]) => {
        try {
            // Find main component file
            const componentFiles = files.filter(f => f.type === 'component');

            if (componentFiles.length === 0) {
                throw new Error('No React component files (.tsx or .jsx) found');
            }

            // Use the first component file (or the one named Hero, Component, etc.)
            const mainComponent = componentFiles.find(f =>
                f.name === 'Hero.tsx' ||
                f.name === 'Component.tsx' ||
                f.name === 'index.tsx'
            ) || componentFiles[0];

            // Aggregate CSS
            const cssFiles = files.filter(f => f.type === 'style');
            const cssContent = cssFiles.map(f => f.content).join('\n\n');

            // Simple React to HTML conversion
            const htmlContent = convertReactToHTML(mainComponent.content);

            // Extract variables
            const variables = detectVariables(mainComponent.content);

            const componentName = mainComponent.name.replace(/\.(tsx|jsx)$/, '');

            onComponentParsed({
                name: componentName,
                category: 'Hero', // Default category, user can change later
                html: htmlContent,
                css: cssContent,
                variables
            });

            setIsProcessing(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to parse component');
            setIsProcessing(false);
        }
    };

    const convertReactToHTML = (reactCode: string): string => {
        // Remove imports
        let html = reactCode.replace(/^import.*from.*$/gm, '');

        // Find the main return statement JSX
        const returnMatch = reactCode.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*\}[^}]*$/);
        if (returnMatch) {
            html = returnMatch[1];
        } else {
            // Fallback: try to find JSX in the function body
            const jsxMatch = reactCode.match(/<[\s\S]+>/);
            if (jsxMatch) {
                html = jsxMatch[0];
            }
        }

        // Remove React-specific attributes and convert to HTML
        html = html
            // Convert className to class
            .replace(/className=/g, 'class=')
            // Remove motion. prefix (framer-motion)
            .replace(/<motion\.(\w+)/g, '<$1')
            .replace(/<\/motion\.(\w+)/g, '</$1')
            // Remove AnimatePresence wrapper
            .replace(/<AnimatePresence[^>]*>/g, '')
            .replace(/<\/AnimatePresence>/g, '')
            // Convert self-closing tags to proper HTML
            .replace(/<(\w+)([^>]*)\s*\/>/g, '<$1$2></$1>')
            // Remove JSX expressions in attributes (keep simple ones)
            .replace(/\{\`([^`]+)\`\}/g, '$1')  // Template literals
            .replace(/\{(['"])([^'"]+)\1\}/g, '$2')  // String literals
            // Remove TypeScript annotations
            .replace(/<(\w+)\s+[\w\s]*:\s*[\w<>[\]|]+\s*=/g, '<$1 ')
            // Remove event handlers
            .replace(/\s+on[A-Z]\w*=\{[^}]+\}/g, '')
            // Remove ref attributes
            .replace(/\s+ref=\{[^}]+\}/g, '')
            // Remove complex JSX expressions (keep content placeholders)
            .replace(/\{currentSlideData\.(\w+)\}/g, '{{$1}}')
            .replace(/\{(\w+)\.(\w+)\}/g, '{{$1_$2}}')
            .replace(/\{(\w+)\}/g, '{{$1}}')
            // Clean up multiple spaces
            .replace(/\s+/g, ' ')
            // Trim
            .trim();

        // If we couldn't extract proper HTML, return a basic structure
        if (!html || html.length < 20) {
            html = '<div class="component-preview"><p>Component preview unavailable - use manual editing</p></div>';
        }

        return html;
    };

    const detectVariables = (reactCode: string): Record<string, string> => {
        const variables: Record<string, string> = {};

        // Detect slides/data arrays
        const slidesMatch = reactCode.match(/const\s+slides[^=]*=\s*\[([\s\S]*?)\];/);
        if (slidesMatch) {
            // Extract first slide data as defaults
            const firstSlide = slidesMatch[1].match(/\{\s*id:\s*\d+,?\s*([\s\S]*?)\}/);
            if (firstSlide) {
                // Extract properties from first slide
                const props = firstSlide[1].matchAll(/(\w+):\s*['"`]([^'"`]+)['"`]/g);
                for (const match of props) {
                    variables[match[1]] = match[2];
                }
            }
        }

        // Detect simple const declarations
        const constMatches = reactCode.matchAll(/const\s+(\w+)\s*=\s*['"`]([^'"`]+)['"`]/g);
        for (const match of constMatches) {
            if (!['Hero', 'Component', 'App'].includes(match[1])) {
                variables[match[1]] = match[2];
            }
        }

        // Detect string literals in JSX (headings, paragraphs)
        const textMatches = reactCode.matchAll(/>([A-Z][a-zA-Z\s]{5,50})</g);
        for (const match of textMatches) {
            const text = match[1].trim();
            if (text && !text.includes('{') && !text.includes('(') && !text.startsWith('<')) {
                const varName = text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 30);
                variables[varName] = text;
            }
        }

        // If no variables detected, add some defaults
        if (Object.keys(variables).length === 0) {
            variables['title'] = 'Component Title';
            variables['description'] = ' Component description';
        }

        return variables;
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFiles(files);
        }
    };

    return (
        <div className="space-y-6">
            {/* Drop Zone */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                    relative rounded-lg border-2 border-dashed p-12 text-center transition-all
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                    }
                `}
            >
                <input
                    type="file"
                    id="folder-upload"
                    className="hidden"
                    // @ts-ignore - webkitdirectory is not in the types but works in browsers
                    webkitdirectory="true"
                    directory="true"
                    multiple
                    onChange={handleFileInput}
                />

                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <FolderOpen
                            size={48}
                            className={isDragging ? 'text-blue-500' : 'text-gray-400'}
                        />
                    </motion.div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Drop Component Folder Here
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            or click the button below to browse
                        </p>
                    </div>

                    <label
                        htmlFor="folder-upload"
                        className="cursor-pointer rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                        <Upload className="inline-block mr-2 h-4 w-4" />
                        Select Folder
                    </label>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Supported: React/Vite component folders with .tsx, .jsx, and .css files
                    </p>
                </div>
            </div>

            {/* Error Display */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-lg bg-red-50 dark:bg-red-950/20 p-4 border border-red-200 dark:border-red-800"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-red-800 dark:text-red-400">
                                    Upload Error
                                </h4>
                                <p className="mt-1 text-sm text-red-700 dark:text-red-500">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* File List */}
            <AnimatePresence>
                {uploadedFiles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="rounded-lg bg-gray-50 dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500" />
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                Files Detected ({uploadedFiles.length})
                            </h4>
                        </div>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {uploadedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {file.type === 'component' ? (
                                        <FileCode className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    ) : (
                                        <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    )}
                                    <span className="flex-1 font-mono text-xs truncate">
                                        {file.path}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {(file.content.length / 1024).toFixed(1)} KB
                                    </span>
                                </div>
                            ))}
                        </div>

                        {isProcessing && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600" />
                                Parsing component...
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
