import { ArticlePageLayout } from "./ArticlePageLayout";

export function LoveSelfPage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Любовь к себе" onBack={onBack}>
      <p className="text-gray-300 leading-relaxed mb-6">
        Путем размышлений, молитв и прошений к Богу - исследовать глубины нашей сущности (Пс 138) мы с моей супругой осознали, что любовь к себе, которую мы знали до Христа была жалким подобием истинной любви к себе, безусловной и всеобъемлющей.
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Слава Богу! Господь учит нас этому каждый день!
      </p>
      <p className="text-gray-300 leading-relaxed mb-6">
        Мы с большим удивлением обнаружили, что наша 'душа' имеет свойство проецировать такие чувства как обида, горечь и подобные на личность Бога из-за разного рода испытаний и происшествий в нашей жизни.
      </p>
      <p className="text-gray-300 leading-relaxed">
        Очень важно во время адресовать эти чувства, отдав их на крест Иисуса Христа и приняв прощение через Его святую кровь.
      </p>
    </ArticlePageLayout>
  );
}
