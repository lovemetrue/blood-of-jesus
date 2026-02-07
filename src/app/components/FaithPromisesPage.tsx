import { ArticlePageLayout } from "./ArticlePageLayout";

export function FaithPromisesPage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="В обетования" onBack={onBack}>
      <p className="text-gray-300 leading-relaxed mb-6">
        Обетования для любящих Бога.
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Все содействует ко благу
      </h2>
      <p className="text-gray-300 leading-relaxed mb-4">
        <strong className="text-white">Римлянам 8:28:</strong> «Притом знаем, что любящим Бога, призванным по Его изволению, все содействует ко благу».
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Обещание вечной жизни и Царства Божьего
      </h2>
      <ul className="space-y-2 text-gray-300 mb-6">
        <li><strong className="text-white">Иакова 1:12:</strong> «Блажен человек, который переносит искушение, потому что, быв испытан, он получит венец жизни, который обещал Господь любящим Его».</li>
        <li><strong className="text-white">Иакова 2:5:</strong> «Послушайте, братия мои возлюбленные: не бедных ли мира избрал Бог быть богатыми верою и наследниками Царства, которое Он обещал любящим Его?»</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Обетование и благословение Авраама
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        <strong className="text-white">Бытие 22:18:</strong> «И благословятся в семени твоем все народы земли за то, что ты послушался гласа Моего».
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Божья верная любовь и милость
      </h2>
      <ul className="space-y-2 text-gray-300 mb-6">
        <li><strong className="text-white">Исход 20:6:</strong> «И творящий милость до тысячи родов любящим Меня и соблюдающим заповеди Мои».</li>
        <li><strong className="text-white">Второзаконие 7:9:</strong> «Итак, знай, что Господь, Бог твой, есть Бог, Бог верный, Который хранит завет [Свой] и милость к любящим Его и сохраняющим заповеди Его до тысячи родов».</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Божья защита и избавление
      </h2>
      <ul className="space-y-2 text-gray-300 mb-6">
        <li><strong className="text-white">Псалом 144:20:</strong> «Хранит Господь всех любящих Его, а всех нечестивых истребит».</li>
        <li><strong className="text-white">Псалом 96:10:</strong> «Хранящие Господа, ненавидьте зло! Он хранит души святых Своих; из руки нечестивых избавляет их».</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Божье особое откровение и близость
      </h2>
      <ul className="space-y-2 text-gray-300 mb-6">
        <li><strong className="text-white">Иоанна 14:23:</strong> «Иисус сказал ему в ответ: кто любит Меня, тот соблюдет слово Мое; и Отец Мой возлюбит его, и Мы придем к нему и обитель у него сотворим».</li>
        <li><strong className="text-white">1 Коринфянам 2:9:</strong> «Но, как написано: не видел того глаз, не слышало ухо, и не приходило то на сердце человеку, что приготовил Бог любящим Его».</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Победа над миром и его трудностями
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        <strong className="text-white">1 Иоанна 5:4–5:</strong> «Ибо всякий, рожденный от Бога, побеждает мир; и сия есть победа, победившая мир, вера наша. Кто побеждает мир, как не тот, кто верует, что Иисус есть Сын Божий?»
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Обетование быть услышанным в молитве
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        <strong className="text-white">Псалом 90:14–15:</strong> «За то, что он возлюбил Меня, избавлю его; защищу его, потому что он познал имя Мое. Воззовет ко Мне, и услышу его; с ним Я в скорби; избавлю его и прославлю его».
      </p>

      <h2 className="text-xl font-semibold text-white mt-8 mb-3 border-b border-red-900/30 pb-2">
        Непоколебимость и вечное наследие
      </h2>
      <p className="text-gray-300 leading-relaxed mb-6">
        <strong className="text-white">Псалом 36:27–29:</strong> «Уклоняйся от зла и делай добро, и будешь жить вовек: ибо Господь любит правду и не оставляет святых Своих; вовек они сохранятся... Праведники наследуют землю и будут жить на ней вовек».
      </p>
    </ArticlePageLayout>
  );
}