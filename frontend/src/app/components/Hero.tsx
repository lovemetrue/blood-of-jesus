import { Heart, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import heroImage from "@/assets/logo-4fS-_4Sj.png.jpeg";
import { fadeSlideUp, viewportOnce, hoverScaleCrimson, hoverScale, staggerContainer, staggerItem } from "@/app/motionVariants";

export function Hero() {
  return (
    <motion.section
      id="home"
      className="pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24 bg-transparent mt-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-[68rem] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Hero with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5 lg:space-y-6">
            <motion.h1
              initial={fadeSlideUp.initial}
              whileInView={fadeSlideUp.inView}
              viewport={viewportOnce}
              transition={{ ...fadeSlideUp.transition, duration: 0.45 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-white leading-tight"
            >
              На другой день видит Иоанн идущего к нему Иисуса и говорит:
              <br />
              вот Агнец Божий, Который берет на Себя грех мира
            </motion.h1>
            <motion.p
              initial={fadeSlideUp.initial}
              whileInView={fadeSlideUp.inView}
              viewport={viewportOnce}
              transition={fadeSlideUp.transition}
              className="text-sm sm:text-base text-gray-300 leading-relaxed"
            >
              Служение освобождения, изгнания демонов
              и исцеления через любовь силу Святого Духа
            </motion.p>
            <motion.button
              onClick={() =>
                document
                  .getElementById("materials")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={hoverScaleCrimson.whileHover}
              whileTap={hoverScaleCrimson.whileTap}
              transition={hoverScaleCrimson.transition}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-[#DC143C] text-white rounded-full hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/50"
            >
              Начать обучение
            </motion.button>
          </div>

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={fadeSlideUp.initial}
            whileInView={fadeSlideUp.inView}
            viewport={viewportOnce}
            transition={fadeSlideUp.transition}
          >
            <div className="transform origin-center w-full flex justify-center lg:justify-end">
              <img
                src={heroImage}
                alt="Агнец Божий - Агнус Деи, несущий крест и знамя с надписью 'Вот Агнец Божий, Который берет на Себя грех мира'"
                className="w-full max-w-[405px] h-auto min-h-[158px] sm:min-h-[210px] md:min-h-[240px] lg:min-h-[262px] object-cover rounded-xl shadow-2xl shadow-red-900/30"
              />
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10 justify-items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={staggerItem}
            transition={{ duration: 0.4 }}
            whileHover={hoverScale.whileHover}
            whileTap={hoverScale.whileTap}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-white">Любовь</h3>
            <p className="text-xs text-gray-400 text-center max-w-[200px]">
             Божья любовь исцеляет, корректирует и восстанавливает
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            transition={{ duration: 0.4 }}
            whileHover={hoverScale.whileHover}
            whileTap={hoverScale.whileTap}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-white">Защита</h3>
            <p className="text-xs text-gray-400 text-center max-w-[200px]">
            Покрытие всех сфер жизни через завет и послушание
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            transition={{ duration: 0.4 }}
            whileHover={hoverScale.whileHover}
            whileTap={hoverScale.whileTap}
            className="flex flex-col items-center space-y-2 p-3 sm:p-4 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors sm:col-span-2 md:col-span-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-white">
              Свобода
            </h3>
            <p className="text-xs text-gray-400 text-center max-w-[200px]">
             Ходить в полноте призвания и всех сфер жизни
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}