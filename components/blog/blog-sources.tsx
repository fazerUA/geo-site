type SourceItem = {
  title: string;
  url: string;
};

type Props = {
  sources: SourceItem[];
};

export function BlogSources({ sources }: Props) {
  if (sources.length === 0) {
    return null;
  }

  return (
    <section className="blog-tags-cloud mt-10" aria-label="Источники">
      <p className="blog-eyebrow mb-3 text-xs uppercase tracking-[0.28em]">Источники</p>
      <ul className="space-y-2">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-read-more text-sm hover:underline"
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
