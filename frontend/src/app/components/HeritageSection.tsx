/**
 * Раздел «Вера — В наследие»: контент из materials/heritage.docx
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
          В наследие
        </h2>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-10 border-2 border-gray-800 prose prose-invert prose-lg max-w-none">
          <p className="text-gray-300 leading-relaxed mb-4">
            Мы верим, что мы проявленные сыны Божии, цари и священники живого Бога. Мы имеем большую ответственность быть послами царства на земле. Мы имеем великое наследие, в которое нужно уметь входить и осознавать принадлежность.
          </p>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
            1. Вечное наследие как конечная цель (Царство Божье, новая земля, вечная жизнь)
          </h3>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">Матфея 25:34:</strong> «Тогда скажет Царь тем, которые по правую сторону Его: приидите, благословенные Отца Моего, наследуйте Царство, уготованное вам от создания мира».</li>
            <li><strong className="text-white">1 Петра 1:3–4:</strong> «Благословен Бог и Отец Господа нашего Иисуса Христа... возродивший нас... к наследству нетленному, чистому, неувядаемому, хранящемуся на небесах для вас».</li>
            <li><strong className="text-white">Откровение 21:7:</strong> «Побеждающий наследует все, и буду ему Богом, и он будет Мне сыном».</li>
            <li><strong className="text-white">Ефесянам 1:13–14:</strong> «В Нём и вы... запечатлены обетованным Святым Духом, Который есть залог наследия нашего, для искупления удела [Его], в похвалу славы Его».</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
            2. Наследие как победа и власть (соцарствование со Христом)
          </h3>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">Римлянам 8:17:</strong> «А если дети, то и наследники, наследники Божии, сонаследники же Христу, если только с Ним страдаем, чтобы с Ним и прославиться».</li>
            <li><strong className="text-white">2 Тимофею 2:12:</strong> «Если терпим, то с Ним и царствовать будем».</li>
            <li><strong className="text-white">Даниил 7:27:</strong> «Царство же и власть и величие царственное во всей поднебесной дано будет народу святых Всевышнего».</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
            3. Наследие усыновлённых детей Божьих
          </h3>
          <p className="text-gray-300 leading-relaxed mb-2">
            Основание для получения наследия — новый статус через веру в Иисуса Христа.
          </p>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">Галатам 4:7:</strong> «Посему ты уже не раб, но сын; а если сын, то и наследник Божий через Иисуса Христа».</li>
            <li><strong className="text-white">Галатам 3:29:</strong> «Если же вы Христовы, то вы семя Авраамово и по обетованию наследники».</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
            4. Условия и качества наследников (предупреждения)
          </h3>
          <p className="text-gray-300 leading-relaxed mb-2">
            Писание говорит не только о даре, но и об ответственности и изменении жизни.
          </p>
          <ul className="space-y-2 text-gray-300 mb-6">
            <li><strong className="text-white">1 Коринфянам 6:9–10:</strong> «Или не знаете, что неправедные Царства Божия не наследуют?... Не обманывайтесь: ни блудники... ни воры... Царства Божия не наследуют».</li>
            <li><strong className="text-white">Галатам 5:19–21:</strong> «Дела плоти известны... предваряю вас, как и прежде предварял, что поступающие так Царства Божия не наследуют».</li>
            <li><strong className="text-white">Ефесянам 5:5:</strong> «Ибо знайте, что никакой блудник, или нечистый, или любостяжатель... не имеет наследия в Царстве Христа и Бога».</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
