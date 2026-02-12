import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GitHub API Proxy - Serverless Function
 * Handles GitHub API requests server-side to avoid rate limiting
 * and keep token secure
 */

interface GitHubBrowseRequest {
    owner: string;
    repo: string;
    path?: string;
    branch?: string;
}

interface GitHubFile {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string | null;
    type: 'file' | 'dir';
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { owner, repo, path = '', branch = 'main' } = req.body as GitHubBrowseRequest;

        // Validate required fields
        if (!owner || !repo) {
            return res.status(400).json({
                error: 'Missing required fields: owner and repo'
            });
        }

        // Get GitHub token from environment
        const token = process.env.GITHUB_TOKEN;

        if (!token) {
            console.error('GITHUB_TOKEN not configured');
            return res.status(500).json({
                error: 'GitHub token not configured on server'
            });
        }

        // Construct GitHub API URL
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

        console.log(`[GitHub Proxy] Fetching: ${apiUrl}`);

        // Fetch from GitHub API with token
        const response = await fetch(apiUrl, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'FrameCraftAI-Proxy'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[GitHub Proxy] Error ${response.status}: ${errorText}`);

            if (response.status === 404) {
                return res.status(404).json({
                    error: 'Repository or path not found',
                    details: `${owner}/${repo}/${path}`
                });
            }

            if (response.status === 403) {
                return res.status(403).json({
                    error: 'Rate limit exceeded or access forbidden',
                    details: errorText
                });
            }

            return res.status(response.status).json({
                error: 'GitHub API error',
                status: response.status,
                details: errorText
            });
        }

        const data: GitHubFile[] | GitHubFile = await response.json();

        // If single file, wrap in array
        const files = Array.isArray(data) ? data : [data];

        console.log(`[GitHub Proxy] Success: ${files.length} items found`);

        return res.status(200).json({
            success: true,
            files: files.map(file => ({
                name: file.name,
                path: file.path,
                sha: file.sha,
                size: file.size,
                url: file.url,
                html_url: file.html_url,
                git_url: file.git_url,
                download_url: file.download_url,
                type: file.type
            }))
        });

    } catch (error) {
        console.error('[GitHub Proxy] Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
