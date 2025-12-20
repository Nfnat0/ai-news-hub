import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitch = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'en'
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('jp')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${language === 'jp'
                        ? 'bg-white text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                JP
            </button>
        </div>
    );
};
