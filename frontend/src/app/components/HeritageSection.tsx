/**
 * Раздел «Вера — Наследие Авраама»
 */
export function HeritageSection() {
  return (
    <section
      id="faith-inheritance"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent"
      aria-labelledby="heritage-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="heritage-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 px-2"
        >
          Наследие Авраама
        </h2>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-10 border-2 border-gray-800 prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 leading-relaxed mb-4">
            Обетования Аврааму — это прообраз и основа всего библейского учения о наследии.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li>Наследие земли: «Потомству твоему даю Я землю сию» (Бытие 12:7; 15:7, 18).</li>
            <li>Наследие благословения для всех народов: «И благословятся в семени твоем все народы земли» (Бытие 22:18).</li>
            <li>Галатам 3:14, Евреям 6:12 — наследие верой, как у Авраама.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
