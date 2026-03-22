import { Download } from "lucide-react";
import { ArticlePageLayout } from "./ArticlePageLayout";

const FILE_URL = "/materials/Руководство_по_освобождению_Джон_Экхарт.docx";
const FILE_NAME = "Руководство_по_освобождению_Джон_Экхарт.docx";

export function MaterialsGuidePage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Руководства" onBack={onBack}>
      <h2 className="text-xl font-semibold text-white mt-0 mb-4 border-b border-red-900/30 pb-2">
        Руководство по освобождению (Джон Экхарт)
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Это руководство Джона Экхарта поможет Вам выявить демонические скопления в вашей жизни и систематизировать знания для успешного ведения духовной войны.
      </p>
      <a
        href={FILE_URL}
        download={FILE_NAME}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-[#DC143C] text-white rounded-md hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30"
      >
        <Download className="w-4 h-4" aria-hidden />
        Скачать документ
      </a>
    </ArticlePageLayout>
  );
}
