import { Download } from "lucide-react";
import { ArticlePageLayout } from "./ArticlePageLayout";

const prayers = [
  {
    title: "Опасные молитвы из небесных залов суда",
    description:
      "Эти молитвы являются переводом и выдержкой из книги Фрэнсис Майлс — «Молитвы из небесных залов суда». Они помогут Вам познать Господа как судью и аннулировать злые алтари через небесную юрисдикцию любви нашего Господа.",
    url: "/materials/Опасные_молитвы_из_небесных_залов_суда.docx",
    fileName: "Опасные_молитвы_из_небесных_залов_суда.docx",
  },
  {
    title: "Христианину следует не бояться дьявола",
    description:
      "Краткий материал о том, почему верующий во Христа призван ходить в смелости и власти, а не в страхе перед врагом.",
    url: "/materials/Христианину_следует_не_бояться_дьявола.docx",
    fileName: "Христианину_следует_не_бояться_дьявола.docx",
  },
];

export function MaterialsPrayersPage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Молитвы" onBack={onBack}>
      <div className="space-y-6">
        {prayers.map((prayer) => (
          <section
            key={prayer.fileName}
            className="rounded-xl border border-gray-700 bg-[#0f1322]/85 p-5 sm:p-6 shadow-lg shadow-black/30"
          >
            <h2 className="mt-0 mb-3 border-b border-red-900/30 pb-2 text-xl font-semibold text-white">{prayer.title}</h2>
            <p className="mb-5 leading-relaxed text-gray-300">{prayer.description}</p>
            <a
              href={prayer.url}
              download={prayer.fileName}
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
