import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * GitHub File Content Proxy
 * Fetches raw file content from GitHub
 */

interface FileContentRequest {
    url: string;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { url } = req.body as FileContentRequest;

        if (!url) {
            return res.status(400).json({ error: 'Missing required field: url' });
        }

        // Only allow githubusercontent.com and github.com URLs
        if (!url.includes('githubusercontent.com') && !url.includes('github.com')) {
            return res.status(400).json({ error: 'Invalid URL domain' });
        }

        console.log(`[File Content Proxy] Fetching: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`[File Content Proxy] Error ${response.status}`);
            return res.status(response.status).json({
                error: 'Failed to fetch file content',
                status: response.status
            });
        }

        const content = await response.text();

        console.log(`[File Content Proxy] Success: ${content.length} bytes`);

        return res.status(200).json({
            success: true,
            content
        });

    } catch (error) {
        console.error('[File Content Proxy] Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
