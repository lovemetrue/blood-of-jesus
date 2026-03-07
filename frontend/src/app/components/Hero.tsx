import { Heart, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import heroImage from "@/assets/logo-4fS-_4Sj.png.jpeg";
import { fadeSlideUp, viewportOnce, hoverScaleCrimson, hoverScale, staggerContainer, staggerItem } from "@/app/motionVariants";

export function Hero() {
  return (
    <motion.section
      id="home"
      className="pt-16 pb-16 bg-transparent mt-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5 lg:space-y-6">
            <motion.h1
              initial={fadeSlideUp.initial}
              whileInView={fadeSlideUp.inView}
              viewport={viewportOnce}
              transition={{ ...fadeSlideUp.transition, duration: 0.45 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white leading-tight"
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
              className="text-base sm:text-lg text-gray-300 leading-relaxed"
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
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-[#DC143C] text-white rounded-full hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/50"
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
            <div className="transform scale-90 origin-center">
              <img
                src={heroImage}
                alt="Агнец Божий - Агнус Деи, несущий крест и знамя с надписью 'Вот Агнец Божий, Который берет на Себя грех мира'"
                className="w-full max-w-full sm:max-w-full lg:max-w-full xl:max-w-[768px] h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] object-cover rounded-2xl shadow-2xl shadow-red-900/30"
              />
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
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
            className="flex flex-col items-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Любовь</h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xs">
             Божья любовь исцеляет, корректирует и восстанавливает
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            transition={{ duration: 0.4 }}
            whileHover={hoverScale.whileHover}
            whileTap={hoverScale.whileTap}
            className="flex flex-col items-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Защита</h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xs">
            Покрытие всех сфер жизни через завет и послушание
            </p>
          </motion.div>

          <motion.div
            variants={staggerItem}
            transition={{ duration: 0.4 }}
            whileHover={hoverScale.whileHover}
            whileTap={hoverScale.whileTap}
            className="flex flex-col items-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors sm:col-span-2 md:col-span-1"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Свобода
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xs">
             Ходить в полноте призвания и всех сфер жизни
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}