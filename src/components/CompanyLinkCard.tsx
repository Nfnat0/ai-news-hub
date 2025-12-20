import { ExternalLink } from 'lucide-react';
import type { CompanyLink } from '../types';

interface CompanyLinkCardProps {
    company: CompanyLink;
}

export const CompanyLinkCard = ({ company }: CompanyLinkCardProps) => {
    return (
        <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-b from-gray-800/60 to-gray-900 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/50 border border-white/5 hover:border-white/20"
        >
            <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{company.logo}</span>
                <ExternalLink
                    size={20}
                    className="text-gray-600 group-hover:text-white transition-colors"
                />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {company.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{company.description}</p>
            <p className="text-gray-600 text-xs truncate font-medium">{company.url}</p>
        </a>
    );
};
