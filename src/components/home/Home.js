import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/seo/SEO';

function Home() {
  return (
    <div className="app-container">
      <SEO
        title="kotlin-kotlin | 2 Haftalık Kotlin Öğrenme Programı"
        description="2 haftalık yoğun Kotlin öğrenme programı - Android geliştirme, Jetpack Compose, MVVM mimarisi"
        canonical="https://kotlin-kotlin.web.app/"
        og={{ url: 'https://kotlin-kotlin.web.app/' }}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'kotlin-kotlin Kotlin Öğrenme Programı',
          description: '2 haftalık yoğun Kotlin öğrenme eğitimi',
          url: 'https://kotlin-kotlin.web.app/',
          provider: {
            '@type': 'Organization',
            name: 'kotlin-kotlin'
          }
        }}
      />
      <div className="header">
        <h1>2 Haftalık Kotlin Öğrenme Programı</h1>
        <p>Kotlin dilinden Android geliştirmeye kadar kapsamlı öğrenme yolculuğu</p>
      </div>

      <section className="section">
        <h2>Program İçeriği</h2>
        <div className="topics-grid">
          <div className="topic-card">
            <h3><Link to="/hafta1">1. Hafta: Temelleri Sağlamlaştırma</Link></h3>
            <p>Kotlin Syntax, Jetpack Compose, MVVM & Clean Architecture</p>
          </div>
          
          <div className="topic-card">
            <h3><Link to="/hafta2">2. Hafta: İleri Seviye ve Uygulamalı Konular</Link></h3>
            <p>State Management, API, UI/UX, Best Practices, Proje Odaklı Konular</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

