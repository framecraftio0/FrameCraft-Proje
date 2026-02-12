/**
 * GitHub API Integration for Component Management
 * Uses backend proxy in production, fallback to direct API in development
 */

export interface GitHubFile {
    name: string;
    path: string;
    type: 'file' | 'dir';
    download_url?: string;
    size?: number;
}

export interface GitHubConfig {
    owner: string;
    repo: string;
    path: string;
    branch?: string;
    token?: string;
}

/**
 * Detect if we're running in local development or production
 */
function isLocalDev(): boolean {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}


/**
 * Fetch contents via backend proxy (production)
 */
async function fetchViaProxy(config: GitHubConfig): Promise<GitHubFile[]> {
    const { owner, repo, path, branch = 'main' } = config;

    const response = await fetch('/api/github/browse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner,
            repo,
            path,
            branch
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `API Error: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.error || 'Failed to fetch GitHub contents');
    }

    return data.files;
}

/**
 * Fetch contents directly from GitHub API (local dev fallback)
 */
async function fetchDirectly(config: GitHubConfig): Promise<GitHubFile[]> {
    const { owner, repo, path, branch = 'main', token } = config;

    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Repository or path not found');
        }
        if (response.status === 403) {
            throw new Error('Rate limit exceeded or access denied');
        }
        throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
}

/**
 * Fetch contents of a GitHub repository directory
 * Uses backend proxy in production, direct API in local dev
 */
export async function fetchGitHubContents(
    config: GitHubConfig
): Promise<GitHubFile[]> {
    try {
        // Try backend proxy first (works in production)
        if (!isLocalDev()) {
            return await fetchViaProxy(config);
        }

        // In local dev, try proxy but fallback to direct API
        try {
            return await fetchViaProxy(config);
        } catch (proxyError) {
            console.warn('Backend proxy not available, using direct GitHub API:', proxyError);
            return await fetchDirectly(config);
        }
    } catch (error) {
        console.error('GitHub fetch error:', error);
        throw error;
    }
}

/**
 * Fetch raw file content from GitHub
 * Uses backend proxy in production, direct fetch in local dev
 */
export async function fetchFileContent(downloadUrl: string): Promise<string> {
    try {
        // In production, use proxy
        if (!isLocalDev()) {
            const response = await fetch('/api/github/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: downloadUrl })
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(error.error || `Failed to fetch file: ${response.statusText}`);
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch file content');
            }

            return data.content;
        }

        // In local dev, fetch directly (no auth needed for public files)
        const response = await fetch(downloadUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        return response.text();
    } catch (error) {
        console.error('File content fetch error:', error);
        throw error;
    }
}

/**
 * Browse GitHub repository structure (recursive)
 */
export async function browseGitHubDirectory(
    config: GitHubConfig
): Promise<GitHubFile[]> {
    const contents = await fetchGitHubContents(config);

    // Filter for directories only for browsing
    return contents.filter(item => item.type === 'dir');
}

/**
 * Validate GitHub repository URL
 * Supports: https://github.com/owner/repo or owner/repo
 */
export function parseGitHubUrl(input: string): { owner: string; repo: string } | null {
    // Pattern 1: Full URL
    const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const urlMatch = input.match(urlPattern);

    if (urlMatch) {
        return {
            owner: urlMatch[1],
            repo: urlMatch[2].replace('.git', '')
        };
    }

    // Pattern 2: owner/repo
    const shortPattern = /^([^\/]+)\/([^\/]+)$/;
    const shortMatch = input.match(shortPattern);

    if (shortMatch) {
        return {
            owner: shortMatch[1],
            repo: shortMatch[2]
        };
    }

    return null;
}
