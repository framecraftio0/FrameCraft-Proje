/**
 * Component File Parser
 * Parses component files from GitHub into a unified structure
 */

import { fetchFileContent, type GitHubFile } from './github';

export interface ParsedComponent {
    name: string;
    category: string;
    description?: string;
    html: string;
    css: string;
    js?: string;
    variables: Record<string, string>; // variable name -> description
    thumbnail?: string;
}

export interface ComponentConfig {
    name?: string;
    category?: string;
    description?: string;
    variables?: Record<string, string>;
    thumbnail?: string;
    dependencies?: string[];
}

/**
 * Parse component from GitHub directory
 * Expected structure:
 *   - index.html (required)
 *   - style.css (required)
 *   - script.js (optional)
 *   - config.json (optional but recommended)
 *   - thumbnail.png (optional)
 */
export async function parseComponentFromGitHub(
    files: GitHubFile[]
): Promise<ParsedComponent> {
    // Find required files
    const htmlFile = files.find(f =>
        f.name === 'index.html' || f.name === 'component.html' || f.name.endsWith('.html')
    );
    const cssFile = files.find(f =>
        f.name === 'style.css' || f.name === 'styles.css' || f.name.endsWith('.css')
    );
    const jsFile = files.find(f =>
        f.name === 'script.js' || f.name === 'index.js' || f.name.endsWith('.js')
    );
    const configFile = files.find(f => f.name === 'config.json');
    const thumbnailFile = files.find(f =>
        f.name === 'thumbnail.png' || f.name === 'preview.png' || f.name.endsWith('.png') || f.name.endsWith('.jpg')
    );

    if (!htmlFile || !cssFile) {
        throw new Error('Missing required files (HTML and CSS files are required)');
    }

    if (!htmlFile.download_url || !cssFile.download_url) {
        throw new Error('Files must have download URLs');
    }

    // Fetch file contents in parallel
    const [html, css, js, configText] = await Promise.all([
        fetchFileContent(htmlFile.download_url),
        fetchFileContent(cssFile.download_url),
        jsFile?.download_url ? fetchFileContent(jsFile.download_url) : Promise.resolve(''),
        configFile?.download_url ? fetchFileContent(configFile.download_url) : Promise.resolve('{}')
    ]);

    // Parse config
    let config: ComponentConfig = {};
    try {
        config = JSON.parse(configText || '{}');
    } catch (error) {
        console.warn('Failed to parse config.json, using defaults');
    }

    // Auto-detect variables from HTML if not in config
    const variables = config.variables || autoDetectVariables(html);

    return {
        name: config.name || 'Untitled Component',
        category: config.category || 'other',
        description: config.description,
        html,
        css,
        js: js || undefined,
        variables,
        thumbnail: thumbnailFile?.download_url
    };
}

/**
 * Auto-detect variables from HTML template
 * Looks for {{variableName}} patterns
 */
export function autoDetectVariables(html: string): Record<string, string> {
    const matches = html.match(/\{\{([^}]+)\}\}/g) || [];
    const uniqueVars = Array.from(new Set(
        matches.map(m => m.replace(/\{\{|\}\}/g, '').trim())
    ));

    const variables: Record<string, string> = {};
    uniqueVars.forEach(varName => {
        // Generate friendly description from variable name
        variables[varName] = varName
            .replace(/([A-Z])/g, ' $1') // camelCase to spaces
            .replace(/_/g, ' ') // snake_case to spaces
            .trim()
            .toLowerCase()
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
    });

    return variables;
}

/**
 * Validate component structure
 */
export function validateComponentStructure(files: GitHubFile[]): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} {
    const errors: string[] = [];
    const warnings: string[] = [];

    const hasHtml = files.some(f => f.name.endsWith('.html'));
    const hasCss = files.some(f => f.name.endsWith('.css'));
    const hasConfig = files.some(f => f.name === 'config.json');
    const hasThumbnail = files.some(f =>
        f.name.endsWith('.png') || f.name.endsWith('.jpg')
    );

    if (!hasHtml) {
        errors.push('No HTML file found');
    }

    if (!hasCss) {
        errors.push('No CSS file found');
    }

    if (!hasConfig) {
        warnings.push('No config.json found - metadata will be auto-generated');
    }

    if (!hasThumbnail) {
        warnings.push('No thumbnail image found - preview will be auto-generated');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}
