import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ title, description, canonical, robots = 'index,follow', og = {}, jsonLd }) {
  const siteName = 'Go Lang Learn';
  const ogTitle = og.title || title || siteName;
  const ogDesc = og.description || description || 'Go dili öğrenme rehberi, algoritmalar ve LeetCode pratikleri';
  const ogUrl = og.url || canonical;
  const ogImage = og.image || `${process.env.PUBLIC_URL || ''}/logo192.png`;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={og.type || 'website'} />
      <meta property="og:site_name" content={siteName} />
      {ogTitle && <meta property="og:title" content={ogTitle} />}      
      {ogDesc && <meta property="og:description" content={ogDesc} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {ogTitle && <meta name="twitter:title" content={ogTitle} />}
      {ogDesc && <meta name="twitter:description" content={ogDesc} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export default SEO;

