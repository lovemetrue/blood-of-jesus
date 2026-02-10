import { Download, Book, FileCheck } from 'lucide-react';

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
    <section id="materials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent" aria-labelledby="materials-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 id="materials-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            Материалы для обучения
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Бесплатные ресурсы для вашего духовного роста и освобождения
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {materials.map((material) => {
            const Icon = material.icon;
            return (
              <article
                key={material.id}
                className="bg-gray-900/50 backdrop-blur-sm border-2 border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#DC143C] hover:shadow-xl hover:shadow-red-900/20 transition-all duration-300 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-950/50 rounded-lg flex items-center justify-center group-hover:bg-[#DC143C] transition-colors" aria-hidden="true">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#DC143C] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 sm:px-3 py-1 rounded-full">
                    {material.type}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {material.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed flex-grow">
                  {material.description}
                </p>

                <button
                  onClick={() => handleDownload(material)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-[#DC143C] text-white rounded-lg hover:bg-[#FF1744] transition-colors shadow-lg shadow-red-900/30 mt-auto"
                  aria-label={`Скачать ${material.title}`}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  Скачать
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}