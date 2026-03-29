import { Download } from "lucide-react";
import { ArticlePageLayout } from "./ArticlePageLayout";

const guides = [
  {
    title: "Руководство по освобождению (Джон Экхарт)",
    description:
      "Это руководство Джона Экхарта поможет Вам выявить демонические скопления в вашей жизни и систематизировать знания для успешного ведения духовной войны.",
    url: "/materials/Руководство_по_освобождению_Джон_Экхарт.docx",
    fileName: "Руководство_по_освобождению_Джон_Экхарт.docx",
  },
];

export function MaterialsGuidePage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Руководства" onBack={onBack}>
      <div className="space-y-6">
        {guides.map((guide) => (
          <section
            key={guide.fileName}
            className="rounded-xl border border-gray-700 bg-[#0f1322]/85 p-5 sm:p-6 shadow-lg shadow-black/30"
          >
            <h2 className="mt-0 mb-3 border-b border-red-900/30 pb-2 text-xl font-semibold text-white">{guide.title}</h2>
            <p className="mb-5 leading-relaxed text-gray-300">{guide.description}</p>
            <a
              href={guide.url}
              download={guide.fileName}
              className="inline-flex items-center gap-2 rounded-md bg-[#DC143C] px-4 py-2.5 text-sm text-white transition-colors hover:bg-[#FF1744] shadow-lg shadow-red-900/30"
            >
              <Download className="w-4 h-4" aria-hidden />
              Скачать документ
            </a>
          </section>
        ))}
      </div>
    </ArticlePageLayout>
  );
}
