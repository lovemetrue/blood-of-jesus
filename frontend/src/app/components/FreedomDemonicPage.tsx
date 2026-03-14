import { ArticlePageLayout } from "./ArticlePageLayout";

const block = "text-gray-300 leading-relaxed";
const step = "mb-4 flex gap-2";
const emoji = "flex-shrink-0";

export function FreedomDemonicPage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="От демонического угнетения" onBack={onBack}>
      <h2 className="text-xl font-semibold text-white mt-6 mb-4 border-b border-red-900/30 pb-2">
        Инструкция по освобождению
      </h2>

      <ol className="list-none space-y-3 mb-8">
        <li className={step}>
          <span className={emoji}>🔥</span>
          <span className={block}>Приходим к Отцу через Иисуса Христа и просим Духа Святого показать человека или ситуацию с которой нужно разобраться — Дух Святой показывает человека или ситуацию →</span>
        </li>
        <li className={step}>
          <span className={emoji}>🧎</span>
          <span className={block}>приносим покаяние за непрощение этого человека, просим Духа Святого помочь нам его простить, прощаем →</span>
        </li>
        <li className={step}>
          <span className={emoji}>✝️</span>
          <span className={block}>отдаём эмоции, связанные с этим человеком / ситуацией Иисусу на крест, пример: Я отдаю на крест горечь, гнев, непрощение и т.д. →</span>
        </li>
        <li className={step}>
          <span className={emoji}>⛑️🚑</span>
          <span className={block}>просим Иисуса войти в эту часть нашей души и исцелить её</span>
        </li>
        <li className={step}>
          <span className={emoji}>👹</span>
          <span className={block}>связываем сильного в сфере этого греха (непрощение, горечь, гордость, бунт, блуд, ненависть, зависть и т.д.) и изгоняем его</span>
        </li>
        <li className={step}>
          <span className={emoji}>😈</span>
          <span className={block}>изгоняем всех остальных нечистых духов (просим Духа Святого помочь их идентифицировать), провозглашаем свободу от них и говорим, что у них нет больше легальных оснований в нашей жизни</span>
        </li>
        <li className={step}>
          <span className={emoji}>⚖️</span>
          <span className={block}>высвобождаем дух огня и суда на этих духов</span>
        </li>
        <li className={step}>
          <span className={emoji}>🩸</span>
          <span className={block}>покрываем эти сферы нашей жизни кровью Иисуса Христа, принимаем причастие как утверждение Его победы на кресте</span>
        </li>
        <li className={step}>
          <span className={emoji}>💭</span>
          <span className={block}>просим Отца через Иисуса Христа сделать наш разум трезвым и бодрствующим, чтобы распознать дальнейшие атаки врага через умственную жизнь</span>
        </li>
        <li className={step}>
          <span className={emoji}>👑</span>
          <span className={block}>славим и благодарим нашего великого Господа за Его милость и могущественное имя Иисуса Христа</span>
        </li>
        <li className={step}>
          <span className={emoji}>🏆</span>
          <span className={block}>живём победоносной жизнью в Иисусе Христе и освобождаем себя и других</span>
        </li>
      </ol>

      <h2 className="text-xl font-semibold text-white mt-10 mb-4 border-b border-red-900/30 pb-2">
        Дополнение к инструкции по освобождению
      </h2>

      <ul className="space-y-4 mb-6">
        <li className={step}>
          <span className={emoji}>🙏</span>
          <span className={block}><strong className="text-white">Молитва отделения:</strong> Иисус, помоги мне пожалуйста отделить этого человека от его поступков, я осознаю, что это говорил и/или делал не он, а дьявол через него; дай мне любви и сострадания к этому человеку и покажи, почему он так себя ведёт или вёл;</span>
        </li>
        <li className={step}>
          <span className={emoji}>💒</span>
          <span className={block}>провести человека через прощение от ран, нанесённых в церкви служителями и/или братьями и сёстрами во Христе</span>
        </li>
        <li className={step}>
          <span className={emoji}>🗿</span>
          <span className={block}><strong className="text-white">Молитва отречения от идолопоклонства:</strong> Дух Святой, покажи пожалуйста какой идол был или есть в моём в сердце, чтобы мне разорвать эту связь и отречься от неё</span>
        </li>
        <li className={step}>
          <span className={emoji}>⛑️</span>
          <span className={block}>пройти через исцеление души от религиозных действий (постов/бдений/многочасовых молитв без результата и т.д.) — отдать эту травму и негативные эмоции на крест</span>
        </li>
        <li className={step}>
          <span className={emoji}>🧎</span>
          <span className={block}><strong className="text-white">Молитва покаяния за обиду на Бога:</strong> Отец, прости меня за всякую горечь и обиду по отношению к Тебе, я также приношу покаяние за грех беспокойства, который я допустил в своей жизни, я отрекаюсь от всякого страха и приношу покаяние за недоверие по отношению к Тебе</span>
        </li>
        <li className={step}>
          <span className={emoji}>❤️‍🩹</span>
          <span className={block}><strong className="text-white">Молитва принятия:</strong> Отец, я осознаю, что Иисус понёс мою отверженность на кресте, чтобы я мог иметь Твоё принятие (молитва взята из книги Дерека Принса «Лекарство от отверженности»)</span>
        </li>
        <li className={step}>
          <span className={emoji}>❗️</span>
          <span className={block}><strong className="text-white">Утверждение в любви Божией и Его защиты и принятие себя каждый день</strong> →</span>
        </li>
        <li className={step}>
          <span className={emoji}>♥️</span>
          <span className={block}>Бог любит меня, Он защищает меня и мою семью, я люблю себя, я принимаю себя, Господь, дай мне пожалуйста любви к себе, помоги мне видеть себя Твоими глазами, я есть образ и подобие Божие, я Его поэма, я чудно сотворён, я соткан втайне и мой зародыш видели глаза Твои, я создан во Христе Иисусе на добрые дела, у меня ум Христов, я принимаю свою личность, я принимаю свою внешность — перечисляем и признаёмся в любви и принятии к тем частям тела, которые вы не принимали и осуждали в себе</span>
        </li>
        <li className={step}>
          <span className={emoji}>💏</span>
          <span className={block}>говорите со своей душой: — душа, откройся чтобы принимать любовь Бога</span>
        </li>
        <li className={step}>
          <span className={emoji}>💔</span>
          <span className={block}>молитва разрушения нечестивых душевных связей (статья «ДУШЕВНЫЕ СВЯЗИ» в <a href="/Руководство_по_освобождению_Джон_Экхарт.docx" download="Руководство_по_освобождению_Джон_Экхарт.docx" className="text-[#DC143C] hover:underline underline-offset-2">руководстве</a>)</span>
        </li>
        <li className={step}>
          <span className={emoji}>🔨</span>
          <span className={block}><strong className="text-white">Молитва разрушения духовной проекции:</strong> именем Иисуса Христа я разрушаю всякую проекцию, исходящую от человека или группы людей [религиозную; проекцию гордости; сквернословия и т.д.] (статья «ПРОЕКТЫ» в руководстве). Такую молитву необходимо творить после каждого столкновения с людьми с неправильными доктринами / неверующими людьми, употребляющими нецензурную брань / просмотра рекламы о сезонной простуде или передачи про животных, где по тысяче раз за минуту говорят про эволюцию (помните, что лучшее, что есть в телевизоре — это красная кнопка 🔴)</span>
        </li>
        <li className={step}>
          <span className={emoji}>📖</span>
          <span className={block}>не полагаю пред глаза мои вещи [слова] непотребного, дела законопреступные ненавижу, не прилепляюсь к ним — Псалом 100:3</span>
        </li>
      </ul>
    </ArticlePageLayout>
  );
}
