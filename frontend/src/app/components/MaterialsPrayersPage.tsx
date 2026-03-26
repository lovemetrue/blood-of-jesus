import { Download } from "lucide-react";
import { ArticlePageLayout } from "./ArticlePageLayout";

const FILE_URL = "/materials/Опасные_молитвы_из_небесных_залов_суда.docx";
const FILE_NAME = "Опасные_молитвы_из_небесных_залов_суда.docx";
const FEAR_FILE_URL = "/materials/Христианину_следует_не_бояться_дьявола.docx";
const FEAR_FILE_NAME = "Христианину_следует_не_бояться_дьявола.docx";

export function MaterialsPrayersPage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Молитвы" onBack={onBack}>
      <h2 className="text-xl font-semibold text-white mt-0 mb-4 border-b border-red-900/30 pb-2">
        Опасные молитвы из небесных залов суда
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Эти молитвы являются переводом и выдержкой из книги Фрэнсис Майлс — «Молитвы из небесных залов суда». Они помогут Вам познать Господа как судью и аннулировать злые алтари через небесную юрисдикцию любви нашего Господа.
      </p>
      <a
        href={FILE_URL}
        download={FILE_NAME}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-[#DC143C] text-white rounded-md hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30"
      >
        <Download className="w-4 h-4" aria-hidden />
        Скачать документ
      </a>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4 border-b border-red-900/30 pb-2">
        Христианину следует не бояться дьявола
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        Краткий материал о том, почему верующий во Христа призван ходить в смелости и власти, а не в страхе перед врагом.
      </p>
      <a
        href={FEAR_FILE_URL}
        download={FEAR_FILE_NAME}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-[#DC143C] text-white rounded-md hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30"
      >
        <Download className="w-4 h-4" aria-hidden />
        Скачать документ
      </a>
    </ArticlePageLayout>
  );
}
