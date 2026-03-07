import { motion } from "motion/react";
import { fadeSlideUp, viewportOnce } from "@/app/motionVariants";

export function AboutUsSection() {
  return (
    <motion.section
      id="about"
      className="py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-transparent"
      aria-labelledby="about-heading"
      initial={fadeSlideUp.initial}
      whileInView={fadeSlideUp.inView}
      viewport={viewportOnce}
      transition={fadeSlideUp.transition}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          id="about-heading"
          initial={fadeSlideUp.initial}
          whileInView={fadeSlideUp.inView}
          viewport={viewportOnce}
          transition={fadeSlideUp.transition}
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-10 lg:mb-12 px-2 text-center"
        >
          О нас
        </motion.h2>
        <motion.div
          initial={fadeSlideUp.initial}
          whileInView={fadeSlideUp.inView}
          viewport={viewportOnce}
          transition={fadeSlideUp.transition}
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl shadow-red-900/10 p-6 sm:p-8 lg:p-10 border-2 border-gray-800 space-y-5 text-gray-300 leading-relaxed text-sm sm:text-base"
        >
          <p>
            Мы с супругой являемся пасторами домашней церкви, а также основателями команды жизни от JGLM — John G. Lake Ministries.
            На протяжении нескольких лет мы искали Божье видение для себя и тела Христа в освобождении, исцелении и практике нашей власти во Христе.
            Очень радостно видеть, как Господь сверхъестественно освобождает и исцеляет людей, когда мы желаем быть проводниками Его любви.
          </p>
          <p className="font-semibold text-white">Мы верим, что Слово Божье:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Есть сам Иисус</li>
            <li>Написано для каждого человека лично, и с каждой страницы Дух Святой говорит лично к человеку</li>
            <li>Должно быть читаемо, слушаемо и исполняемо в жизни каждого рождённого свыше человека</li>
          </ul>
          <p className="font-semibold text-white">Мы верим, что каждый любящий Бога верующий хочет исполнять Его заповеди, и вот некоторые из них:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Исполнять первую и наивысшую заповедь: возлюби Господа Бога твоего всем сердцем твоим, и всею душею твоею, и всем разумением твоим</li>
            <li>Именем Его будут изгонять бесов</li>
            <li>Возложат руки на больных, и они будут здоровы</li>
            <li>Смело проповедовать Евангелие всему творению</li>
            <li>Будут брать змей</li>
            <li>Воскрешать мёртвых</li>
            <li>Крестить (погружать в) водой и Духом</li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
