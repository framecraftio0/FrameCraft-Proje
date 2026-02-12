/**
 * GitHub API Integration for Component Management
 * Uses backend proxy to avoid rate limiting and keep token secure
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
    token?: string; // Not used anymore, kept for backward compatibility
}

/**
 * Fetch contents of a GitHub repository directory via backend proxy
 */
export async function fetchGitHubContents(
    config: GitHubConfig
): Promise<GitHubFile[]> {
    const { owner, repo, path, branch = 'main' } = config;

    try {
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
            const error = await response.json();
            throw new Error(error.error || `API Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Failed to fetch GitHub contents');
        }

        return data.files;
    } catch (error) {
        console.error('GitHub fetch error:', error);
        throw error;
    }
}

/**
 * Fetch raw file content from GitHub via backend proxy
 */
export async function fetchFileContent(downloadUrl: string): Promise<string> {
    try {
        const response = await fetch('/api/github/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: downloadUrl })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `Failed to fetch file: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Failed to fetch file content');
        }

        return data.content;
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
