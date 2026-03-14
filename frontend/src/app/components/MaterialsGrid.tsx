import { Download, Book, FileCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { hoverScale } from '@/app/motionVariants';

const materials = [
  {
    id: 1,
    title: 'Основы духовной войны',
    description: 'Руководство по противостоянию духовному угнетению',
    icon: Book,
    type: 'PDF',
    downloadUrl: null
  },
  {
    id: 2,
    title: 'Свидетельства освобождения',
    description: 'Реальные истории чудес и освобождения',
    icon: FileCheck,
    type: 'PDF',
    downloadUrl: null
  },
  {
    id: 3,
    title: 'Практическое руководство',
    description: 'Практические шаги к духовной свободе',
    icon: Book,
    type: 'DOCX',
    downloadUrl: '/Руководство_по_освобождению_Джон_Экхарт.docx'
  }
];

export function MaterialsGrid() {
  const handleDownload = (material: typeof materials[0]) => {
    if (material.downloadUrl) {
      // Создаем временную ссылку для скачивания файла
      const link = document.createElement('a');
      link.href = material.downloadUrl;
      link.download = `${material.title}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Загрузка материала: ${material.title}`);
    }
  };

  return (
    <section
      id="materials"
      className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-transparent"
      aria-labelledby="materials-heading"
    >
      <div className="max-w-[68rem] mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            id="materials-heading"
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 px-2"
          >
            Материалы для обучения
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto px-2">
            Бесплатные ресурсы для вашего духовного роста и освобождения
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-[68rem] mx-auto">
          {materials.map((material) => {
            const Icon = material.icon;
            return (
              <motion.article
                key={material.id}
                whileHover={hoverScale.whileHover}
                whileTap={hoverScale.whileTap}
                className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-[#DC143C] hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-950/50 rounded-md flex items-center justify-center group-hover:bg-[#DC143C] transition-colors" aria-hidden="true">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC143C] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 bg-gray-800 px-1.5 sm:px-2 py-0.5 rounded-full">
                    {material.type}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5">
                  {material.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 leading-relaxed flex-grow">
                  {material.description}
                </p>

                <button
                  onClick={() => handleDownload(material)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 text-xs sm:text-sm bg-[#DC143C] text-white rounded-md hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30 mt-auto"
                  aria-label={`Скачать ${material.title}`}
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                  Скачать
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}