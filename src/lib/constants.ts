// ========================================
// Business Sectors for AI Site Generation
// ========================================

export const BUSINESS_SECTORS = [
    // Professional Services
    { value: 'law', label: 'Law Firm / Legal Services', category: 'Professional Services' },
    { value: 'accounting', label: 'Accounting / Finance', category: 'Professional Services' },
    { value: 'consulting', label: 'Business Consulting', category: 'Professional Services' },
    { value: 'marketing-agency', label: 'Marketing Agency', category: 'Professional Services' },
    { value: 'design-agency', label: 'Design Agency', category: 'Professional Services' },

    // Healthcare & Wellness
    { value: 'clinic', label: 'Medical Clinic', category: 'Healthcare & Wellness' },
    { value: 'dental', label: 'Dental Clinic', category: 'Healthcare & Wellness' },
    { value: 'spa', label: 'Spa & Wellness', category: 'Healthcare & Wellness' },
    { value: 'yoga', label: 'Yoga Studio', category: 'Healthcare & Wellness' },
    { value: 'fitness', label: 'Gym / Fitness Center', category: 'Healthcare & Wellness' },
    { value: 'therapy', label: 'Therapy / Counseling', category: 'Healthcare & Wellness' },

    // Food & Beverage
    { value: 'restaurant', label: 'Restaurant', category: 'Food & Beverage' },
    { value: 'cafe', label: 'Cafe / Coffee Shop', category: 'Food & Beverage' },
    { value: 'bakery', label: 'Bakery', category: 'Food & Beverage' },
    { value: 'bar', label: 'Bar / Pub', category: 'Food & Beverage' },
    { value: 'catering', label: 'Catering Service', category: 'Food & Beverage' },

    // Retail & E-commerce
    { value: 'fashion', label: 'Fashion / Clothing Store', category: 'Retail & E-commerce' },
    { value: 'jewelry', label: 'Jewelry Store', category: 'Retail & E-commerce' },
    { value: 'electronics', label: 'Electronics Store', category: 'Retail & E-commerce' },
    { value: 'bookstore', label: 'Bookstore', category: 'Retail & E-commerce' },
    { value: 'florist', label: 'Florist', category: 'Retail & E-commerce' },

    // Beauty & Personal Care
    { value: 'salon', label: 'Hair Salon', category: 'Beauty & Personal Care' },
    { value: 'barbershop', label: 'Barbershop', category: 'Beauty & Personal Care' },
    { value: 'beauty-salon', label: 'Beauty Salon', category: 'Beauty & Personal Care' },
    { value: 'nail-salon', label: 'Nail Salon', category: 'Beauty & Personal Care' },

    // Creative & Arts
    { value: 'photography', label: 'Photography Studio', category: 'Creative & Arts' },
    { value: 'videography', label: 'Videography / Video Production', category: 'Creative & Arts' },
    { value: 'music', label: 'Music Studio / School', category: 'Creative & Arts' },
    { value: 'gallery', label: 'Art Gallery', category: 'Creative & Arts' },

    // Education
    { value: 'school', label: 'School / Educational Institution', category: 'Education' },
    { value: 'tutoring', label: 'Tutoring Services', category: 'Education' },
    { value: 'language-school', label: 'Language School', category: 'Education' },
    { value: 'online-course', label: 'Online Courses', category: 'Education' },

    // Real Estate & Construction
    { value: 'real-estate', label: 'Real Estate Agency', category: 'Real Estate & Construction' },
    { value: 'construction', label: 'Construction Company', category: 'Real Estate & Construction' },
    { value: 'interior-design', label: 'Interior Design', category: 'Real Estate & Construction' },
    { value: 'architecture', label: 'Architecture Firm', category: 'Real Estate & Construction' },

    // Travel & Hospitality
    { value: 'hotel', label: 'Hotel / Resort', category: 'Travel & Hospitality' },
    { value: 'travel-agency', label: 'Travel Agency', category: 'Travel & Hospitality' },
    { value: 'tour-operator', label: 'Tour Operator', category: 'Travel & Hospitality' },
    { value: 'event-venue', label: 'Event Venue', category: 'Travel & Hospitality' },

    // Technology
    { value: 'software', label: 'Software Company / SaaS', category: 'Technology' },
    { value: 'it-services', label: 'IT Services', category: 'Technology' },
    { value: 'web-development', label: 'Web Development Agency', category: 'Technology' },
    { value: 'app-development', label: 'App Development', category: 'Technology' },

    // Other
    { value: 'general', label: 'General Business', category: 'Other' },
    { value: 'non-profit', label: 'Non-Profit Organization', category: 'Other' },
    { value: 'personal-blog', label: 'Personal Blog / Portfolio', category: 'Other' },
    { value: 'other', label: 'Other', category: 'Other' },
] as const;

export type BusinessSectorValue = typeof BUSINESS_SECTORS[number]['value'];

// Group sectors by category for select dropdown
export const getSectorsByCategory = () => {
    const grouped: Record<string, any[]> = {};

    (BUSINESS_SECTORS as any).forEach((sector: any) => {
        if (!grouped[sector.category]) {
            grouped[sector.category] = [];
        }
        grouped[sector.category].push(sector);
    });

    return grouped;
};

// ========================================
// Website Styles
// ========================================

export const WEBSITE_STYLES = [
    { value: 'modern', label: 'Modern & Bold', description: 'Clean lines, vibrant colors, contemporary design' },
    { value: 'minimal', label: 'Minimal & Simple', description: 'Clean, spacious, focused on content' },
    { value: 'elegant', label: 'Elegant & Luxurious', description: 'Sophisticated, premium, high-end feel' },
    { value: 'playful', label: 'Playful & Creative', description: 'Colorful, fun, energetic' },
    { value: 'professional', label: 'Professional & Corporate', description: 'Traditional, trustworthy, business-focused' },
] as const;

export type WebsiteStyleValue = typeof WEBSITE_STYLES[number]['value'];

// ========================================
// Target Audiences
// ========================================

export const TARGET_AUDIENCES = [
    { value: 'b2b', label: 'Businesses (B2B)', icon: '🏢' },
    { value: 'b2c', label: 'Consumers (B2C)', icon: '👤' },
    { value: 'local', label: 'Local Community', icon: '📍' },
    { value: 'global', label: 'Global Audience', icon: '🌍' },
    { value: 'youth', label: 'Young Adults (18-30)', icon: '🎓' },
    { value: 'families', label: 'Families', icon: '👨\u200d👩\u200d👧\u200d👦' },
    { value: 'seniors', label: 'Seniors (60+)', icon: '👴' },
    { value: 'luxury', label: 'Luxury / High-End Clients', icon: '💎' },
] as const;

export type TargetAudienceValue = typeof TARGET_AUDIENCES[number]['value'];

// ========================================
// Website Features
// ========================================

export const WEBSITE_FEATURES = [
    { value: 'booking', label: 'Booking / Appointments', icon: '📅', popular: true },
    { value: 'ecommerce', label: 'E-commerce / Shop', icon: '🛒', popular: true },
    { value: 'gallery', label: 'Photo Gallery', icon: '🖼️', popular: true },
    { value: 'blog', label: 'Blog / News', icon: '📝', popular: false },
    { value: 'contact-form', label: 'Contact Form', icon: '📧', popular: true },
    { value: 'testimonials', label: 'Testimonials / Reviews', icon: '⭐', popular: true },
    { value: 'team', label: 'Team / About Us', icon: '👥', popular: false },
    { value: 'pricing', label: 'Pricing Tables', icon: '💰', popular: false },
    { value: 'faq', label: 'FAQ Section', icon: '❓', popular: false },
    { value: 'map', label: 'Location Map', icon: '🗺️', popular: false },
    { value: 'social-feed', label: 'Social Media Feed', icon: '📱', popular: false },
    { value: 'newsletter', label: 'Newsletter Signup', icon: '✉️', popular: false },
] as const;

export type WebsiteFeatureValue = typeof WEBSITE_FEATURES[number]['value'];

// ========================================
// Color Preferences
// ========================================

export const COLOR_PREFERENCES = [
    { value: 'auto', label: 'Auto (AI chooses based on sector)', color: null },
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'purple', label: 'Purple', color: '#a855f7' },
    { value: 'green', label: 'Green', color: '#10b981' },
    { value: 'orange', label: 'Orange', color: '#f97316' },
    { value: 'red', label: 'Red', color: '#ef4444' },
    { value: 'pink', label: 'Pink', color: '#ec4899' },
    { value: 'teal', label: 'Teal', color: '#14b8a6' },
    { value: 'gray', label: 'Monochrome (Gray)', color: '#6b7280' },
] as const;

export type ColorPreferenceValue = typeof COLOR_PREFERENCES[number]['value'];
