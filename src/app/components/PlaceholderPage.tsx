import { ArticlePageLayout } from "./ArticlePageLayout";

interface PlaceholderPageProps {
  title: string;
  onBack: () => void;
}

export function PlaceholderPage({ title, onBack }: PlaceholderPageProps) {
  return (
    <ArticlePageLayout title={title} onBack={onBack}>
      <p className="text-gray-400">
        Содержимое этой страницы готовится. Возвращайтесь позже.
      </p>
    </ArticlePageLayout>
  );
}
