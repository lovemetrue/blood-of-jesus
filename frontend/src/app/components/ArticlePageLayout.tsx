import { ArrowLeft } from "lucide-react";

interface ArticlePageLayoutProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export function ArticlePageLayout({ title, onBack, children }: ArticlePageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-[#DC143C] transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {title}
          </h1>
        </div>
        <article className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800 prose prose-invert prose-lg max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}
