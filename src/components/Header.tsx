import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Building2, Code2 } from 'lucide-react';
import { LanguageSwitch } from './LanguageSwitch';

const tabs = [
    { id: 'companies', label: 'AI Companies', icon: Building2, path: '/' },
    { id: 'dev', label: 'Dev Tools', icon: Code2, path: '/?tab=dev' },
];

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get('tab') || 'companies';

    const handleTabClick = (tab: typeof tabs[0]) => {
        navigate(tab.path);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/92 backdrop-blur-md px-8 py-3">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-80 transition-opacity">
                        AI DogDock
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* Tab Navigation */}
                    <nav className="flex gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = currentTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm
                                        transition-all duration-300 ease-out
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25'
                                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    <Icon size={16} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>

                    <LanguageSwitch />
                </div>
            </div>
        </header>
    );
};
