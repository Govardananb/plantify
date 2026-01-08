import { Globe } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function LanguageSelector() {
    const { language, setLanguage } = useLanguage();

    const handleToggle = () => {
        if (language === 'en') setLanguage('ta');
        else if (language === 'ta') setLanguage('hi');
        else setLanguage('en');
    };

    const getLabel = () => {
        if (language === 'ta') return 'தமிழ்';
        if (language === 'hi') return 'हिंदी';
        return 'EN';
    };

    return (
        <button
            onClick={handleToggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white transition-colors active:scale-95 hover:bg-white/20"
            aria-label="Select Language"
        >
            <Globe className="w-4 h-4" />
            <span>{getLabel()}</span>
        </button>
    );
}
