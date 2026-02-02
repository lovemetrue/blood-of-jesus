import { Heart, Shield, Sparkles } from "lucide-react";
import heroImage from "@/assets/87dea475728492b77f108a11cbe676bc39a21a72.png";

export function Hero() {
  return (
    <section
      id="home"
      className="pt-16 pb-16 bg-transparent mt-5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16">
          <div className="order-2 lg:order-1 space-y-4 sm:space-y-5 lg:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-white leading-tight">
              Обретите свободу от угнетения и исцеление души
              через любовь, веру и власть в Иисусе Христе
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Служение духовного освобождения, изгнания демонов
              и исцеления через силу Святого Духа
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("materials")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-[#DC143C] text-white rounded-full hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/50"
            >
              Начать обучение
            </button>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="transform scale-90 origin-center">
              <img
                src={heroImage}
                alt="Духовное освобождение через Святой Дух - символическое изображение освобождения души"
                className="w-full max-w-full sm:max-w-full lg:max-w-full xl:max-w-[768px] h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] object-cover rounded-2xl shadow-2xl shadow-red-900/30"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          <div className="flex flex-col items-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Любовь</h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xs">
              Божья любовь исцеляет и восстанавливает
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">Защита</h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xs">
              Власть во имя Иисуса над тьмой
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors sm:col-span-2 md:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Свобода
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-xs">
              Освобождение от духовного угнетения
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}