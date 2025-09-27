import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

function TopicLayout({ children, title, description, canonical, backLink, topicPath }) {
  return (
    <div className="app-container">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
      />

      <div className="content-header">
        <h1>{title.split(' - ')[0]}</h1>
        {backLink && (
          <Link to={backLink} className="back-link">{backLink.split('/')[1] === 'hafta1' ? '1. Hafta\'ya Dön' : 'Geri Dön'}</Link>
        )}
      </div>

      <div className="content-with-notes">
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default TopicLayout;
