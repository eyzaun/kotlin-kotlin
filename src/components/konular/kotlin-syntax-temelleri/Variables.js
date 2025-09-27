import React from 'react';
import SEO from '../../seo/SEO';
import CodeBlock from '../../ui/CodeBlock';

function Variables() {
  return (
    <div className="topic-container">
      <SEO
        title="Variables | kotlin-kotlin"
        description="Kotlin'de var, val ve const val ile değişken tanımlama; immutability, thread-safety ve compile-time vs runtime farkları."
        canonical="https://kotlin-kotlin.web.app/variables"
        og={{ url: 'https://kotlin-kotlin.web.app/variables' }}
      />
      <h1>Kotlin Syntax Temelleri: Variables (Değişkenler)</h1>

      <h2>Değişken Türleri</h2>
      <p>Kotlin'de değişken tanımlama 3 farklı şekilde yapılır:</p>
      <ul>
        <li><strong>var</strong>: Değeri sonradan değiştirilebilir (mutable)</li>
        <li><strong>val</strong>: Bir kez atandıktan sonra değiştirilemez (immutable, Java'daki <code>final</code> gibi)</li>
        <li><strong>const val</strong>: Derleme (compile-time) zamanında bilinen sabitler</li>
      </ul>

      <h3>var — Değiştirilebilir</h3>
      <CodeBlock language="kotlin">{`var yasim = 25
// Bu değişkenin değerini istediğimiz zaman değiştirebiliriz
yasim = 26  // Sorunsuz çalışır
yasim = 27  // Bu da çalışır`}</CodeBlock>

      <h3>val — İmmutable</h3>
      <p><code>val</code> ile tanımlanan değişkenin değeri sonradan değiştirilemez.</p>
      <CodeBlock language="kotlin">{`val isim = "Ahmet"
// isim = "Mehmet"  // HATA! val ile tanımlanan değişken değiştirilemez`}</CodeBlock>

      <h4>Neden val kullanmalıyız?</h4>
      <ul>
        <li>Kod güvenliği sağlar — yanlışlıkla değiştirilmesini engeller</li>
        <li>Thread-safe — çoklu işlemlerde güvenlidir</li>
        <li>Okunabilirlik artar — bu değerin değişmeyeceğini bilirsiniz</li>
      </ul>

      <h3>const val — Derleme Zamanı Sabitleri</h3>
      <ul>
        <li>Sadece primitive tipler ve <code>String</code> için kullanılabilir</li>
        <li>Üst seviyede veya <code>object</code>/<code>companion object</code> içinde tanımlanır</li>
      </ul>
      <CodeBlock language="kotlin">{`class Sabitler {
    companion object {
        const val PI = 3.14159  // Matematiksel sabit
        const val API_URL = "https://api.example.com"  // Uygulama sabiti
    }
}`}</CodeBlock>

      <h4>const val ile val arasındaki fark</h4>
      <ul>
        <li><strong>const val</strong>: Derleme sırasında yerine konur (compile-time)</li>
        <li><strong>val</strong>: Çalışma zamanında atanır (runtime)</li>
      </ul>
    </div>
  );
}

export default Variables;


