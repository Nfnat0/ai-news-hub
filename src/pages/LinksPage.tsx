import { CompanyLinkCard } from '../components/CompanyLinkCard';
import { companyLinks } from '../data/companies';

export const LinksPage = () => {
    return (
        <main className="min-h-screen bg-[#141414] pt-24 pb-16 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Official Links</h1>
                <p className="text-gray-500 mb-8 font-medium">
                    Direct links to official websites of major AI companies
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companyLinks.map((company) => (
                        <CompanyLinkCard key={company.name} company={company} />
                    ))}
                </div>
            </div>
        </main>
    );
};
