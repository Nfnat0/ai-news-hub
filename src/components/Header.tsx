import { Link } from 'react-router-dom';
import { LanguageSwitch } from './LanguageSwitch';

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/92  px-8 py-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-80 transition-opacity">
                        AI DogDock
                    </span>
                </Link>
                <LanguageSwitch />
            </div>
        </header>
    );
};
