import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description, canonical, og = {} }) {
  const siteTitle = 'İki Ay';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription = 'İki ayda yazılım geliştirici olmak için kapsamlı eğitim platformu. Veri yapıları, algoritmalar ve modern yazılım geliştirme teknikleri.';
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      {og.url && <meta property="og:url" content={og.url} />}
      {og.image && <meta property="og:image" content={og.image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={finalDescription} />
      {og.image && <meta property="twitter:image" content={og.image} />}

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content="İki Ay Eğitim Platformu" />
    </Helmet>
  );
}

export default SEO;
