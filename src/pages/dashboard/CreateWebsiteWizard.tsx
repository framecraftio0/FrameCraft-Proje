import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { generateSiteWithAI, type GenerateSiteInput } from '@/lib/n8n';
import {
    BUSINESS_SECTORS,
    WEBSITE_STYLES,
    TARGET_AUDIENCES,
    WEBSITE_FEATURES,
    COLOR_PREFERENCES,
    getSectorsByCategory,
    type BusinessSectorValue,
} from '@/lib/constants';

export default function CreateWebsiteWizard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form data
    const [formData, setFormData] = useState<GenerateSiteInput>({
        user_id: user?.id || '',
        business_name: '',
        business_sector: 'general',
        description: '',
        preferences: {
            style: 'modern',
            targetAudience: 'b2c',
            features: ['contact-form', 'testimonials'],
            colorPreference: 'auto',
        },
    });

    const handleNext = () => {
        if (currentStep === 1 && !formData.business_name.trim()) {
            setError('Business name is required');
            return;
        }
        setError(null);
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const result = await generateSiteWithAI(formData);

            if (result.success) {
                // Redirect to builder
                navigate(`/dashboard/websites/${result.website_id}/builder`);
            } else {
                setError(result.error || 'Failed to generate website');
            }
        } catch (err) {
            console.error('Generation error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsGenerating(false);
        }
    };

    const sectorsByCategory = getSectorsByCategory();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        ✨ Create Your Website with AI
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Answer a few questions and we'll generate a complete website for you in 30 seconds
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${step === currentStep
                                    ? 'bg-indigo-600 text-white scale-110'
                                    : step < currentStep
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {step < currentStep ? '✓' : step}
                            </div>
                            {step < 3 && (
                                <div
                                    className={`w-24 h-1 mx-2 transition-all ${step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Wizard Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Step 1: Business Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your business</h2>

                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.business_name}
                                    onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                                    placeholder="e.g., Sunset Yoga Studio"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Business Sector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Business Type *
                                </label>
                                <select
                                    value={formData.business_sector}
                                    onChange={(e) =>
                                        setFormData({ ...formData, business_sector: e.target.value as BusinessSectorValue })
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    {Object.entries(sectorsByCategory).map(([category, sectors]) => (
                                        <optgroup key={category} label={category}>
                                            {sectors.map((sector) => (
                                                <option key={sector.value} value={sector.value}>
                                                    {sector.label}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Brief Description (Optional)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="e.g., Modern yoga studio in Bali offering beach classes and wellness retreats"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Help AI understand your business better for personalized content
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Preferences */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize your preferences</h2>

                            {/* Style Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Website Style</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {WEBSITE_STYLES.map((style) => (
                                        <button
                                            key={style.value}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    preferences: { ...formData.preferences, style: style.value },
                                                })
                                            }
                                            className={`p-4 border-2 rounded-lg text-left transition-all ${formData.preferences?.style === style.value
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                                }`}
                                        >
                                            <div className="font-semibold text-gray-900">{style.label}</div>
                                            <div className="text-sm text-gray-600 mt-1">{style.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Target Audience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Target Audience</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {TARGET_AUDIENCES.map((audience) => (
                                        <button
                                            key={audience.value}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    preferences: { ...formData.preferences, targetAudience: audience.value },
                                                })
                                            }
                                            className={`p-3 border-2 rounded-lg text-center transition-all ${formData.preferences?.targetAudience === audience.value
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{audience.icon}</div>
                                            <div className="text-xs font-medium">{audience.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Features (Select all that apply)
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {WEBSITE_FEATURES.map((feature) => (
                                        <button
                                            key={feature.value}
                                            onClick={() => {
                                                const currentFeatures = formData.preferences?.features || [];
                                                const newFeatures = currentFeatures.includes(feature.value)
                                                    ? currentFeatures.filter((f) => f !== feature.value)
                                                    : [...currentFeatures, feature.value];
                                                setFormData({
                                                    ...formData,
                                                    preferences: { ...formData.preferences, features: newFeatures },
                                                });
                                            }}
                                            className={`p-3 border-2 rounded-lg text-left transition-all ${formData.preferences?.features?.includes(feature.value)
                                                ? 'border-green-600 bg-green-50'
                                                : 'border-gray-200 hover:border-green-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{feature.icon}</span>
                                                <span className="text-sm font-medium">{feature.label}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Preference */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4">Color Scheme</label>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                    {COLOR_PREFERENCES.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    preferences: { ...formData.preferences, colorPreference: color.value },
                                                })
                                            }
                                            className={`p-3 border-2 rounded-lg text-center transition-all ${formData.preferences?.colorPreference === color.value
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                                }`}
                                        >
                                            {color.color && (
                                                <div
                                                    className="w-8 h-8 rounded-full mx-auto mb-2"
                                                    style={{ backgroundColor: color.color }}
                                                />
                                            )}
                                            <div className="text-xs font-medium">{color.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Generate</h2>

                            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                <div>
                                    <div className="text-sm text-gray-600">Business Name</div>
                                    <div className="font-semibold text-gray-900">{formData.business_name}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Business Type</div>
                                    <div className="font-semibold text-gray-900">
                                        {BUSINESS_SECTORS.find((s) => s.value === formData.business_sector)?.label}
                                    </div>
                                </div>
                                {formData.description && (
                                    <div>
                                        <div className="text-sm text-gray-600">Description</div>
                                        <div className="text-gray-700">{formData.description}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm text-gray-600">Style</div>
                                    <div className="font-semibold text-gray-900">
                                        {WEBSITE_STYLES.find((s) => s.value === formData.preferences?.style)?.label}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Features</div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.preferences?.features?.map((f) => (
                                            <span
                                                key={f}
                                                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                                            >
                                                {WEBSITE_FEATURES.find((feat) => feat.value === f)?.label}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                                <div className="flex gap-3">
                                    <span className="text-2xl">⏱️</span>
                                    <div>
                                        <div className="font-semibold text-yellow-900">AI Generation in Progress</div>
                                        <div className="text-sm text-yellow-700 mt-1">
                                            This will take approximately 30 seconds. Please don't close this page.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="text-red-800">{error}</div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t">
                        <button
                            onClick={currentStep === 1 ? () => navigate('/dashboard') : handleBack}
                            disabled={isGenerating}
                            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {currentStep === 1 ? 'Cancel' : 'Back'}
                        </button>

                        {currentStep < 3 ? (
                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                            >
                                Continue
                            </button>
                        ) : (
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        ✨ Generate Website
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
