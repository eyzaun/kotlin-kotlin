import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

function Hafta2() {
  return (
    <div className="hafta-container">
      <SEO
        title="2. Hafta - İleri Seviye ve Uygulamalı Konular | kotlin-kotlin"
        description="State Yönetimi, Data Management, UI/UX, Best Practices, Proje Odaklı Konular"
        canonical="https://kotlin-kotlin.web.app/hafta2"
        og={{ url: 'https://kotlin-kotlin.web.app/hafta2' }}
      />
      <h1>2. Hafta - İleri Seviye ve Uygulamalı Konular</h1>
      <p>Bu hafta ileri seviye konular, API entegrasyonu, UI/UX ve gerçek proje uygulamalarını öğreneceksiniz.</p>

      <section>
        <h2>D. State Yönetimi ve Event Handling</h2>
        <ul>
          <li><Link to="/event-state-architecture">1. Event-State Architecture</Link></li>
          <li><Link to="/side-effects-compose">2. Side Effects in Compose</Link></li>
          <li><Link to="/navigation-component">3. Navigation Component</Link></li>
        </ul>
      </section>

      <section>
        <h2>E. Data Management ve API</h2>
        <ul>
          <li><Link to="/retrofit-rest-api">1. Retrofit ile REST API</Link></li>
          <li><Link to="/local-storage">2. Local Storage</Link></li>
          <li><Link to="/image-loading-caching">3. Image Loading ve Caching</Link></li>
        </ul>
      </section>

      <section>
        <h2>F. UI/UX ve Animations</h2>
        <ul>
          <li><Link to="/material-design-3">1. Material Design 3</Link></li>
          <li><Link to="/animasyonlar">2. Animasyonlar</Link></li>
          <li><Link to="/responsive-design">3. Responsive Design</Link></li>
        </ul>
      </section>

      <section>
        <h2>G. Best Practices ve Prensipler</h2>
        <ul>
          <li><Link to="/solid-prensipleri">1. SOLID Prensipleri</Link></li>
          <li><Link to="/code-organization">2. Code Organization</Link></li>
          <li><Link to="/testing-temelleri">3. Testing Temelleri</Link></li>
        </ul>
      </section>

      <section>
        <h2>H. Proje Odaklı Konular</h2>
        <ul>
          <li><Link to="/contact-permissions">1. Contact Permissions</Link></li>
          <li><Link to="/swipe-actions-implementation">2. SwipeActions Implementation</Link></li>
          <li><Link to="/search-functionality">3. Search Functionality</Link></li>
        </ul>
      </section>
    </div>
  );
}

export default Hafta2;