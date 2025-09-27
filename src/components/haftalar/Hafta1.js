import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';

function Hafta1() {
  return (
    <div className="hafta-container">
      <SEO
        title="1. Hafta - Temelleri Sağlamlaştırma | kotlin-kotlin"
        description="Kotlin Dili Hızlı Başlangıç, Jetpack Compose Temelleri, Mimari Yapısı"
        canonical="https://kotlin-kotlin.web.app/hafta1"
        og={{ url: 'https://kotlin-kotlin.web.app/hafta1' }}
      />
      <h1>1. Hafta - Temelleri Sağlamlaştırma</h1>
      <p>Bu hafta Kotlin dilinin temelleri, Jetpack Compose ile UI geliştirme ve MVVM mimari yapısını öğreneceksiniz.</p>

      <section>
        <h2>A. Kotlin Dili Hızlı Başlangıç</h2>
        <ul>
          <li><Link to="/kotlin-syntax-temelleri">1. Kotlin Syntax Temelleri (Tek Sayfa)</Link></li>
          <li><Link to="/fonksiyonlar-lambda">2. Fonksiyonlar ve Lambda</Link></li>
          <li><Link to="/classes-objects">3. Classes ve Objects</Link></li>
          <li><Link to="/collections-operators">4. Collections ve Operators</Link></li>
        </ul>
      </section>

      <section>
        <h2>B. Jetpack Compose Temelleri</h2>
        <ul>
          <li><Link to="/compose-mindset">1. Compose Mindset</Link></li>
          <li><Link to="/temel-ui-componentleri">2. Temel UI Componentleri</Link></li>
          <li><Link to="/remembermutablestateof">3. State Management Temelleri</Link></li>
          <li><Link to="/paddingmarginsize">4. Modifier Sistemi</Link></li>
        </ul>
      </section>

      <section>
        <h2>C. Mimari Yapısı - MVVM & Clean Architecture</h2>
        <ul>
          <li><Link to="/mvvm-pattern">1. MVVM Pattern</Link></li>
          <li><Link to="/clean-architecture-katmanlari">2. Clean Architecture Katmanları</Link></li>
          <li><Link to="/dependency-injection-temelleri">3. Dependency Injection Temelleri</Link></li>
        </ul>
      </section>
    </div>
  );
}

export default Hafta1;