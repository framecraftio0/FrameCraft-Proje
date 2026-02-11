import { useState } from 'react';
import { Folder, Github, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import {
    fetchGitHubContents,
    browseGitHubDirectory,
    parseGitHubUrl,
    type GitHubFile
} from '@/lib/github';
import {
    parseComponentFromGitHub,
    validateComponentStructure
} from '@/lib/componentParser';

interface GitHubBrowserProps {
    onComponentSelect: (component: {
        name: string;
        category: string;
        html: string;
        css: string;
        js?: string;
        variables: Record<string, string>;
    }) => void;
}

export default function GitHubBrowser({ onComponentSelect }: GitHubBrowserProps) {
    const [repoUrl, setRepoUrl] = useState('');
    const [token, setToken] = useState('');
    const [currentPath, setCurrentPath] = useState('');
    const [branch, setBranch] = useState('main');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [folders, setFolders] = useState<GitHubFile[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<GitHubFile | null>(null);
    const [validation, setValidation] = useState<{ errors: string[]; warnings: string[] } | null>(null);

    const handleBrowse = async () => {
        setError('');
        setFolders([]);

        const parsed = parseGitHubUrl(repoUrl);
        if (!parsed) {
            setError('Invalid GitHub URL. Use format: https://github.com/owner/repo or owner/repo');
            return;
        }

        setIsLoading(true);

        try {
            const dirs = await browseGitHubDirectory({
                owner: parsed.owner,
                repo: parsed.repo,
                path: currentPath,
                branch,
                token: token || undefined
            });

            setFolders(dirs);

            if (dirs.length === 0) {
                setError('No folders found in this path');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to browse repository');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectFolder = async (folder: GitHubFile) => {
        setSelectedFolder(folder);
        setValidation(null);
        setError('');

        const parsed = parseGitHubUrl(repoUrl);
        if (!parsed) return;

        setIsLoading(true);

        try {
            // Fetch folder contents
            const files = await fetchGitHubContents({
                owner: parsed.owner,
                repo: parsed.repo,
                path: folder.path,
                branch,
                token: token || undefined
            });

            // Validate structure
            const validationResult = validateComponentStructure(files);
            setValidation({
                errors: validationResult.errors,
                warnings: validationResult.warnings
            });

            if (!validationResult.valid) {
                return;
            }

            // Parse component
            const component = await parseComponentFromGitHub(files, {
                owner: parsed.owner,
                repo: parsed.repo,
                path: folder.path,
                branch,
                token: token || undefined
            });

            // Return to parent
            onComponentSelect(component);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load component');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* GitHub Configuration */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Github size={16} />
                    GitHub Repository
                </div>

                <div>
                    <label className="block text-xs text-gray-600 mb-1">Repository URL</label>
                    <input
                        type="text"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="framecraftio0/FrameCraft-Components or full URL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Branch</label>
                        <input
                            type="text"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="main"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-600 mb-1">
                            Path (optional)
                        </label>
                        <input
                            type="text"
                            value={currentPath}
                            onChange={(e) => setCurrentPath(e.target.value)}
                            placeholder="components/"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-600 mb-1">
                        GitHub Token (optional, for private repos)
                    </label>
                    <input
                        type="password"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="ghp_..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Get token from: Settings → Developer settings → Personal access tokens
                    </p>
                </div>

                <button
                    onClick={handleBrowse}
                    disabled={isLoading || !repoUrl}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Loading...
                        </>
                    ) : (
                        <>
                            <Folder size={16} />
                            Browse Repository
                        </>
                    )}
                </button>
            </div>

            {/* Error Display */}
            {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                    <AlertCircle size={16} className="text-red-600 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {/* Folders List */}
            {folders.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-700">
                            Select Component Folder
                        </h4>
                        <button
                            onClick={() => handleSelectFolder({
                                name: currentPath || 'root',
                                path: currentPath || '',
                                type: 'dir'
                            })}
                            disabled={isLoading}
                            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-md transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                            <CheckCircle size={12} />
                            Use Current Directory
                        </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {folders.map((folder) => (
                            <button
                                key={folder.path}
                                onClick={() => handleSelectFolder(folder)}
                                disabled={isLoading}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedFolder?.path === folder.path
                                    ? 'bg-blue-50 border-2 border-blue-500'
                                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                                    } disabled:opacity-50`}
                            >
                                <div className="flex items-center gap-2">
                                    <Folder size={16} className="text-blue-600" />
                                    <span className="font-medium">{folder.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Validation Results */}
            {validation && (
                <div className="space-y-2">
                    {validation.errors.length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={16} className="text-red-600" />
                                <span className="text-sm font-semibold text-red-700">Errors:</span>
                            </div>
                            <ul className="text-xs text-red-600 list-disc list-inside space-y-1">
                                {validation.errors.map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {validation.warnings.length > 0 && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={16} className="text-yellow-600" />
                                <span className="text-sm font-semibold text-yellow-700">Warnings:</span>
                            </div>
                            <ul className="text-xs text-yellow-600 list-disc list-inside space-y-1">
                                {validation.warnings.map((warn, i) => (
                                    <li key={i}>{warn}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {validation.errors.length === 0 && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                            <CheckCircle size={16} className="text-green-600" />
                            <p className="text-sm text-green-700 font-medium">
                                Component loaded successfully!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
