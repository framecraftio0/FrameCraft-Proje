
const fs = require('fs');
const path = require('path');

const baseDir = 'c:/Users/LENOVO/.gemini/antigravity/scratch/framecraftai/framecraftai-components';
const dirs = [
    'heroes/hero-parallax-3d',
    'heroes/hero-video-overlay',
    'heroes/hero-split-animated',
    'features/features-scroll-reveal',
    'features/features-grid-hover',
    'galleries/gallery-masonry-scroll',
    'galleries/gallery-grid-lightbox',
    'pricing/pricing-cards-simple',
    'forms/contact-form-modern',
    'footers/footer-minimal'
];

dirs.forEach(dir => {
    const fullPath = path.join(baseDir, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created: ${fullPath}`);
    }
});
