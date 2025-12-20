import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LinksPage } from './pages/LinksPage';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/ai-news-hub">
        <div className="min-h-screen bg-[#141414]">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/links" element={<LinksPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
