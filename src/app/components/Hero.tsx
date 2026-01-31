import { Heart, Shield, Sparkles } from "lucide-react";
import heroImage from "figma:asset/87dea475728492b77f108a11cbe676bc39a21a72.png";

export function Hero() {
  return (
    <section
      id="home"
      className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-7xl ml-0 pl-4">
        {/* Hero with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
              Обретите свободу от угнетения и исцеление души
              через любовь, веру и власть в Иисусе Христе
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Служение духовного освобождения, изгнания демонов
              и исцеления через силу Святого Духа
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("materials")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-4 bg-[#DC143C] text-white rounded-full hover:bg-[#FF1744] transition-colors shadow-lg hover:shadow-xl shadow-red-900/50"
            >
              Начать обучение
            </button>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src={heroImage}
              alt="Духовное освобождение через Святой Дух - символическое изображение освобождения души"
              className="w-full max-w-3xl h-auto min-h-[500px] object-cover rounded-2xl shadow-2xl shadow-red-900/30"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors">
            <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-white">Любовь</h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Божья любовь исцеляет и восстанавливает
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors">
            <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-white">Защита</h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Власть во имя Иисуса над тьмой
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-white/5 backdrop-blur-sm transition-colors">
            <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-white">
              Свобода
            </h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Освобождение от духовного угнетения
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}