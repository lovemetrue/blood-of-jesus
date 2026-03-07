export function AboutUsSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-transparent" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="about-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-10 px-2 text-center">
          О нас
        </h2>
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-12 border-2 border-gray-800 space-y-6 text-gray-300 leading-relaxed">
          <p>
            Мы с супругой являемся пасторами домашней церкви, а также основателями команды жизни от JGLM — John G. Lake Ministries.
            На протяжении нескольких лет мы искали Божье видение для себя и тела Христа в освобождении, исцелении и практике нашей власти во Христе.
            Очень радостно видеть, как Господь сверхъестественно освобождает и исцеляет людей, когда мы желаем быть проводниками Его любви.
          </p>
          <p className="font-semibold text-white">Мы верим, что Слово Божье:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Есть сам Иисус</li>
            <li>Написано для каждого человека лично, и с каждой страницы Дух Святой говорит лично к человеку</li>
            <li>Должно быть читаемо, слушаемо и исполняемо в жизни каждого рождённого свыше человека</li>
          </ul>
          <p className="font-semibold text-white">Мы верим, что каждый любящий Бога верующий хочет исполнять Его заповеди, и вот некоторые из них:</p>
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Именем Его будут изгонять бесов и демонов</li>
            <li>Возложат руки на больных, и они будут здоровы</li>
            <li>Смело проповедовать Евангелие всему творению</li>
            <li>Будут брать змей</li>
            <li>Воскрешать мёртвых</li>
            <li>Крестить (погружать в) водой и Духом</li>
            <li>Исполнять первую и наивысшую заповедь: возлюби Господа Бога твоего всем сердцем твоим, и всею душею твоею, и всем разумением твоим</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
