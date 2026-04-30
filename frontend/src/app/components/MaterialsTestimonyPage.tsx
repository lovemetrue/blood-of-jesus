import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArticlePageLayout } from "./ArticlePageLayout";
import { staggerContainer, staggerItem, viewportOnce } from "../motionVariants";

type Testimony = {
  id: string;
  title: string;
  author: string;
  photoUrl: string;
  preview: string;
  paragraphs: string[];
};

const testimonies: Testimony[] = [
  {
    id: "spine-healing",
    title: "Изгнание духа змеи и исцеление позвоночника",
    author: "Служение команды Жизни",
    photoUrl: "/testimonials/testimony_spine.jpg",
    preview:
      "На молитвенном собрании женщина 44 лет, около 40 лет страдавшая сколиозом, получила освобождение после короткой молитвы. Уже в тот же день окружающие увидели изменения, а позже врач подтвердил выпрямление спины.",
    paragraphs: [
      "Однажды на молитвенном собрании в нашей церкви женщина 44 лет начала рассказывать о том, что она около 40 лет ходила со сколиозом, и о том, как Господь открывал ей двери в больницах, чтобы пройти обследования без очередей.",
      "Искривление позвоночника было по двум осям: если смотреть на человека со спины — в форме змеи; если смотреть в профиль — сильная сутулость. В момент рассказа Господь дал нам одно слово: «Змея». Ведущая собрания обратилась ко мне с улыбкой и спросила: «Наверное, там что-то духовное?» На что я ответил: «Очень вероятно, мы узнаем попозже».",
      "В конце собрания эта девушка подошла к моей супруге помолиться совсем о другом аспекте её жизни; я подошёл к ним и сказал слово от Господа, и что нам нужно выкинуть эту змею из её спины.",
      "Я попросил супругу возложить руки на спину девушки; мы приказали змее расплестись вокруг позвоночника, и супруга проделала выбрасывающий змею жест своей рукой. Молитвы длились не больше двух минут. Девушка распрямила плечи и с удивлением сказала: «У меня плечи выпрямились».",
      "Мы попросили дочь девушки проверить спину; она сказала, что спина стала прямая. В тот же вечер по дороге она радовалась, и у неё изменилась походка — как она сама сказала: «Как будто иду по подиуму».",
      "Позже врач подтвердил, что спина выпрямилась почти на 100%. Можно предположительно сказать, что 95% искривления было демоническим влиянием змееподобного духа, который маскировался под диагноз сколиоза.",
      "Врачи прогнозировали ей горб, но слава Господу — она была освобождена и исцелена. Вся слава и хвала Иисусу Христу.",
    ],
  },
  {
    id: "nikolai-leg-healing",
    title: "Исцеление ноги через разрушение твердыни",
    author: "Николай",
    photoUrl: "/testimonials/nikolai_photo.jpg",
    preview:
      "Около 5 лет болела нога, и казалось, что это навсегда. После молитвы и освобождения боль уходила постепенно в течение нескольких недель и полностью исчезла.",
    paragraphs: [
      "Хочу засвидетельствовать об исцелении моей ноги через служение нашей команды Жизни.",
      "Около 5 лет болела нога, думал, что на то есть естественные причины, просто жил с этим.",
      "Дима и Саша провели меня в процессе освобождения от ментальной установки, что это навсегда, и провозгласили исцеление. Оковы рухнули, сознание изменилось, принял исцеление.",
      "Боль ушла не сразу и не полностью, но с течением дней (2-3 недели) неприятные ощущения уходили и полностью сошли на нет.",
      "Хвала Иисусу-Освободителю и слава Ему за нашу группу.",
    ],
  },
];

export function MaterialsTestimonyPage({ onBack }: { onBack: () => void }) {
  const [activeTestimony, setActiveTestimony] = useState<Testimony | null>(null);

  /** Закрывает модалку по клавише Escape. */
  useEffect(() => {
    if (!activeTestimony) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTestimony(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTestimony]);

  return (
    <ArticlePageLayout title="Свидетельства" onBack={onBack}>
      <motion.div
        className="grid gap-5 md:grid-cols-2"
        variants={staggerContainer}
        initial="initial"
        whileInView="inView"
        viewport={viewportOnce}
      >
        {testimonies.map((testimony) => (
          <motion.article
            key={testimony.id}
            variants={staggerItem}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-2xl border border-gray-700 bg-[#0a0f1b]/95 p-5 shadow-[0_0_24px_rgba(0,0,0,0.45)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <img
                src={testimony.photoUrl}
                alt={testimony.author}
                className="h-14 w-14 rounded-full object-cover border border-gray-600"
                loading="lazy"
              />
              <div>
                <h2 className="m-0 text-lg font-semibold text-white">{testimony.title}</h2>
                <p className="m-0 text-sm text-gray-400">{testimony.author}</p>
              </div>
            </div>
            <p className="mb-4 leading-relaxed text-gray-300">{testimony.preview}</p>
            <motion.button
              type="button"
              onClick={() => setActiveTestimony(testimony)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center rounded-md border border-[#DC143C]/50 bg-[#DC143C]/15 px-3 py-2 text-sm font-medium text-[#ff6b86] transition-colors hover:bg-[#DC143C]/25"
            >
              Читать полностью
            </motion.button>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeTestimony && (
          <motion.div
            key="testimony-backdrop"
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/75 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="testimony-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActiveTestimony(null)}
          >
            <motion.div
              key={activeTestimony.id}
              id="testimony-modal-panel"
              className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-gray-700 bg-[#0b1120] p-6 shadow-2xl shadow-black/70"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-gray-700 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={activeTestimony.photoUrl}
                    alt={activeTestimony.author}
                    className="h-14 w-14 rounded-full object-cover border border-gray-600"
                  />
                  <div>
                    <h3 id="testimony-modal-title" className="m-0 text-xl font-semibold text-white">
                      {activeTestimony.title}
                    </h3>
                    <p className="m-0 text-sm text-gray-400">{activeTestimony.author}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTestimony(null)}
                  className="rounded-md border border-gray-600 px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-800/70"
                >
                  Закрыть
                </button>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                {activeTestimony.paragraphs.map((paragraph, index) => (
                  <p key={`${activeTestimony.id}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ArticlePageLayout>
  );
}
