/**
 * Component File Parser
 * Parses component files from GitHub into a unified structure
 * Supports both static HTML/CSS and React/Vite project structures
 */

import { fetchFileContent, browseGitHubDirectory, type GitHubFile, type GitHubConfig } from './github';

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
 * Supports two structures:
 * 1. Static: index.html + style.css (original)
 * 2. React/Vite: src/app/components/*.tsx + src/styles/*.css
 */
export async function parseComponentFromGitHub(
    files: GitHubFile[],
    githubConfig?: GitHubConfig
): Promise<ParsedComponent> {
    // Try to detect project structure
    const hasReactStructure = files.some(f =>
        f.type === 'dir' && f.name === 'src'
    );

    if (hasReactStructure && githubConfig) {
        return parseReactComponent(githubConfig);
    } else {
        return parseStaticComponent(files);
    }
}

/**
 * Parse static HTML/CSS component (original behavior)
 */
async function parseStaticComponent(files: GitHubFile[]): Promise<ParsedComponent> {
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
 * Parse React/Vite component structure
 * Looks for: src/app/components/*.tsx and src/styles/*.css
 */
async function parseReactComponent(config: GitHubConfig): Promise<ParsedComponent> {
    // Browse component directory

    const srcPath = (config.path && config.path.trim() !== '')
        ? `${config.path}/src`
        : 'src';


    const srcFiles = await browseGitHubDirectory({
        ...config,
        path: srcPath
    });

    // Find component files (.tsx, .jsx)
    let componentContent = '';
    let componentName = 'React Component';

    // Try multiple common component paths
    const commonComponentPaths = [
        'src/app/components',
        'src/components',
        'src/app',
        'src'
    ];

    for (const componentPath of commonComponentPaths) {
        try {
            // Properly handle empty path - empty string should be treated as root
            const fullPath = (config.path && config.path.trim() !== '')
                ? `${config.path}/${componentPath}`
                : componentPath;


            const componentFiles = await browseGitHubDirectory({
                ...config,
                path: fullPath
            });

            // Find the main component file (usually Hero.tsx, Component.tsx, or index.tsx)
            const mainComponent = componentFiles.find(f =>
                f.type === 'file' &&
                (f.name.endsWith('.tsx') || f.name.endsWith('.jsx')) &&
                !f.name.startsWith('index') && // Skip index files, usually just exports
                !f.path.includes('/ui/') && // Skip UI utility components
                !f.path.includes('/figma/') // Skip Figma-related files
            ) || componentFiles.find(f => f.name === 'index.tsx' || f.name === 'index.jsx');

            if (mainComponent && mainComponent.download_url) {
                componentContent = await fetchFileContent(mainComponent.download_url);
                componentName = mainComponent.name.replace(/\.(tsx|jsx)$/, '');
                break; // Found component, exit loop
            }
        } catch (error) {
            // Path doesn't exist, try next one
            continue;
        }
    }

    // Find CSS files in src/styles
    let cssContent = '';
    const stylesPath = srcFiles.find(f =>
        f.type === 'dir' && f.path.includes('styles')
    );

    if (stylesPath) {
        const styleFiles = await browseGitHubDirectory({
            ...config,
            path: stylesPath.path
        });

        // Combine all CSS files (theme.css, index.css, etc.)
        const cssFiles = styleFiles.filter(f =>
            f.type === 'file' && f.name.endsWith('.css')
        );

        const cssContents = await Promise.all(
            cssFiles
                .filter(f => f.download_url)
                .map(f => fetchFileContent(f.download_url!))
        );

        cssContent = cssContents.join('\n\n');
    }

    if (!componentContent) {
        throw new Error('No React component file found in src/app/components/');
    }

    if (!cssContent) {
        // If no CSS in styles folder, create basic CSS
        cssContent = '/* No CSS files found - using defaults */\n* { box-sizing: border-box; }\nbody { margin: 0; padding: 0; }';
    }

    // Convert React component to HTML representation
    const htmlContent = convertReactToHTML(componentContent, componentName);

    // Try to find config.json
    const rootFiles = await browseGitHubDirectory(config);
    const configFile = rootFiles.find(f => f.name === 'config.json');
    let componentConfig: ComponentConfig = {};

    if (configFile && configFile.download_url) {
        try {
            const configText = await fetchFileContent(configFile.download_url);
            componentConfig = JSON.parse(configText);
        } catch (error) {
            console.warn('Failed to parse config.json');
        }
    }

    // Auto-detect variables from React component
    const variables = componentConfig.variables || autoDetectReactVariables(componentContent);

    return {
        name: componentConfig.name || componentName,
        category: componentConfig.category || 'hero',
        description: componentConfig.description || `React component: ${componentName}`,
        html: htmlContent,
        css: cssContent,
        js: '', // React components don't need separate JS for our use case
        variables,
        thumbnail: componentConfig.thumbnail
    };
}

/**
 * Convert React component to HTML representation
 * Extracts JSX and attempts to convert to clean HTML
 */
function convertReactToHTML(reactCode: string, componentName: string): string {
    // This is a simplified conversion - for production you might want a proper parser
    // For now, we'll extract the JSX return statement

    // Try to find the return statement
    const returnMatch = reactCode.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*}/);

    if (returnMatch && returnMatch[1]) {
        let jsxContent = returnMatch[1].trim();

        // Basic JSX to HTML conversion
        jsxContent = jsxContent
            .replace(/className=/g, 'class=')
            .replace(/htmlFor=/g, 'for=')
            // Remove JSX expressions but keep the structure
            .replace(/\{[\s\S]*?\}/g, (match) => {
                // Keep simple variables as template placeholders
                if (match.includes('currentSlideData')) {
                    return '{{' + match.slice(1, -1).trim() + '}}';
                }
                return match;
            });

        return `<!-- ${componentName} Component -->\n${jsxContent}`;
    }

    // Fallback: return a placeholder
    return `<!-- React Component: ${componentName} -->
<div class="react-component">
    <p>This is a React component. Preview may not be fully accurate.</p>
    <p>Component: ${componentName}</p>
</div>`;
}

/**
 * Auto-detect variables from React component
 */
function autoDetectReactVariables(reactCode: string): Record<string, string> {
    const variables: Record<string, string> = {};

    // Look for common patterns like: title, description, buttonText, etc.
    const propMatches = reactCode.match(/\b(title|heading|description|text|label|buttonText|subtitle|name)\b/gi) || [];

    const uniqueProps = Array.from(new Set(propMatches.map(p => p.toLowerCase())));

    uniqueProps.forEach(prop => {
        variables[prop] = prop
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .replace(/^./, str => str.toUpperCase());
    });

    // If no variables found, add some defaults
    if (Object.keys(variables).length === 0) {
        variables['title'] = 'Title';
        variables['description'] = 'Description';
    }

    return variables;
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
 * Now supports both static and React structures
 */
export function validateComponentStructure(files: GitHubFile[]): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if it's a React project
    const hasSrcFolder = files.some(f => f.type === 'dir' && f.name === 'src');
    const hasPackageJson = files.some(f => f.name === 'package.json');

    if (hasSrcFolder && hasPackageJson) {
        // React/Vite project - validate that structure
        warnings.push('React/Vite project detected - will parse from src/');

        // For React projects, we'll validate during parsing
        // So we return valid=true here to allow the import to proceed
        return { valid: true, errors, warnings };
    }

    // Static component validation (original logic)
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
