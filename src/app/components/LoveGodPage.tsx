import { ArticlePageLayout } from "./ArticlePageLayout";

export function LoveGodPage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Любовь к Богу" onBack={onBack}>
      <p className="text-gray-300 leading-relaxed mb-6">
        Бог возлюбил нас прежде чем мы были способны воспринять и узнать Его любовь, мы были недостойные блудники, алчные лихоимцы, отвратительные идолопоклонники, остроязычные клеветники и т.д.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        По великой милости своей, Господь даровал нам прощение грехов через жертву Иисуса Христа – и Его кровь. Прежде создания времени, пространства и материи существовал Агнец закланый от начала мира.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Через веру в эти события мы имеем возможность получить Святой Дух как залог и печать.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Теперь Дух самого Бога учит нас всякой истине, учит любить Его, учит любить себя и ближнего как самого себя.
      </p>
    </ArticlePageLayout>
  );
}
