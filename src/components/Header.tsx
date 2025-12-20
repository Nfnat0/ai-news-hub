import { Link, useLocation } from 'react-router-dom';
import { Newspaper, Link as LinkIcon } from 'lucide-react';
import { LanguageSwitch } from './LanguageSwitch';

export const Header = () => {
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/95 via-black/80 to-transparent px-8 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-80 transition-opacity">
                        AI DogDock
                    </span>
                </Link>
                <div className="flex items-center gap-6">
                    <nav className="flex gap-4">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${location.pathname === '/'
                                ? 'bg-white/20 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <Newspaper size={18} />
                            <span className="font-medium">News</span>
                        </Link>
                        <Link
                            to="/links"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${location.pathname === '/links'
                                ? 'bg-white/20 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <LinkIcon size={18} />
                            <span className="font-medium">Links</span>
                        </Link>
                    </nav>
                    <LanguageSwitch />
                </div>
            </div>
        </header>
    );
};
