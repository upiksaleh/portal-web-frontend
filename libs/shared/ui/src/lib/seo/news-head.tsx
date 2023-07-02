import Head from 'next/head';

export function UISeoNewsHead({
  data,
  articleUrl,
  publicUrl,
}: {
  data: Record<string, any>;
  articleUrl: string;
  publicUrl: string;
}) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: data.title,
            description: data.description ?? '',
            datePublished: data.publish_date,
            dateModified: data.date_updated,
            image: [data.image_cover.url],
            author: [
              {
                '@type': 'Person',
                name: data.writer,
                url: publicUrl,
              },
            ],
            publisher: {
              '@type': 'Organization',
              name: 'Pemerintah Kabupaten Bolaang Mongondow Selatan',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.bolselkab.go.id/images/logo.png',
              },
            },
          }),
        }}
      />
      <title>{data.title}</title>
      <meta name="title" content={data.title} />
      <meta name="description" content={data.description} />

      <meta property="og:type" content="article" />
      <meta property="og:url" content={articleUrl} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.image_cover.url} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={articleUrl} />
      <meta property="twitter:title" content={data.title} />
      <meta property="twitter:description" content={data.description} />
      <meta property="twitter:image" content={data.image_cover.url} />
    </Head>
  );
}
