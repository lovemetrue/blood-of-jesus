import { ArticlePageLayout } from "./ArticlePageLayout";

export function HeritagePage({ onBack }: { onBack: () => void }) {
  return (
    <ArticlePageLayout title="Наследие Авраама" onBack={onBack}>
      <p className="text-gray-300 leading-relaxed mb-4">
        Обетования Аврааму — это прообраз и основа всего библейского учения о наследии.
      </p>
      <ul className="space-y-2 text-gray-300">
        <li>Наследие земли: «Потомству твоему даю Я землю сию» (Бытие 12:7; 15:7, 18).</li>
        <li>Наследие благословения для всех народов: «И благословятся в семени твоем все народы земли» (Бытие 22:18).</li>
        <li>Галатам 3:14, Евреям 6:12 — наследие верой, как у Авраама.</li>
      </ul>
    </ArticlePageLayout>
  );
}
