/**
 * GitHub API Integration for Component Management
 * Enables fetching component files from GitHub repositories
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
 * Fetch contents of a GitHub repository directory
 */
export async function fetchGitHubContents(
    config: GitHubConfig
): Promise<GitHubFile[]> {
    const { owner, repo, path, branch = 'main', token } = config;

    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Repository or path not found');
            }
            if (response.status === 403) {
                throw new Error('Rate limit exceeded or access denied. Try adding a GitHub token.');
            }
            throw new Error(`GitHub API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error('GitHub fetch error:', error);
        throw error;
    }
}

/**
 * Fetch raw file content from GitHub
 */
export async function fetchFileContent(downloadUrl: string): Promise<string> {
    const response = await fetch(downloadUrl);

    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    return response.text();
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
