import React from 'react';
import SEO from '../../seo/SEO';
import CodeBlock from '../../ui/CodeBlock';

function NullSafety() {
  return (
    <div className="topic-container">
      <SEO
        title="NullSafety | kotlin-kotlin"
        description="Kotlin Null Safety: nullable tipler, safe call (?.), Elvis (?:), not-null assertion (!!) ve gerçek hayat örnekleri."
        canonical="https://kotlin-kotlin.web.app/nullsafety"
        og={{ url: 'https://kotlin-kotlin.web.app/nullsafety' }}
      />
      <h1>Kotlin Syntax Temelleri: Null Safety</h1>

      <p>Kotlin'in en önemli özelliklerinden biri <strong>Null Safety</strong>'dir. NullPointerException hatalarını önlemek için tasarlanmıştır.</p>

      <h2>Nullable Olmayan Tip</h2>
      <p>Varsayılan olarak tipler <em>nullable değildir</em>; yani <code>null</code> alamazlar.</p>
      <CodeBlock language="kotlin">{`var kesinIsim: String = "Ali"
// kesinIsim = null  // HATA! String tipine null atanamaz`}</CodeBlock>

      <h2>Nullable Tip</h2>
      <p>Tip sonuna <code>?</code> ekleyerek nullable yapabilirsiniz.</p>
      <CodeBlock language="kotlin">{`var belkiIsim: String? = "Veli"
belkiIsim = null  // Sorunsuz çalışır`}</CodeBlock>

      <h3>Safe Call Operator (?.)</h3>
      <p>Nullable değişkenlere güvenli erişim için kullanılır; sol taraf null ise ifade null döner.</p>
      <CodeBlock language="kotlin">{`var kullaniciAdi: String? = "user123"
val uzunluk = kullaniciAdi?.length  // 7

kullaniciAdi = null
val uzunluk2 = kullaniciAdi?.length  // null (hata vermez)`}</CodeBlock>

      <h3>Elvis Operator (?:)</h3>
      <p>Sol taraf null ise sağ taraftaki varsayılan değeri kullanır.</p>
      <CodeBlock language="kotlin">{`val kesinUzunluk = kullaniciAdi?.length ?: 0  // null ise 0`}</CodeBlock>

      <h3>Gerçek Hayat Örneği</h3>
      <CodeBlock language="kotlin">{`fun kullaniciyiSelamla(isim: String?) {
    val gosterilecekIsim = isim ?: "Misafir"
    println("Hoşgeldin $gosterilecekIsim")
}

kullaniciyiSelamla("Ahmet")  // Çıktı: Hoşgeldin Ahmet
kullaniciyiSelamla(null)     // Çıktı: Hoşgeldin Misafir`}</CodeBlock>

      <h3>Not-null Assertion (!!)</h3>
      <p><code>!!</code>, "Bu değişken kesinlikle null değil" demektir. Null ise <code>NullPointerException</code> fırlatır. Mümkün olduğunca kaçının; <code>?.</code> ve <code>?:</code> tercih edin.</p>
      <CodeBlock language="kotlin">{`var sehir: String? = "İstanbul"
val sehirUzunlugu = sehir!!.length  // 8
// sehir = null
// val tehlikeli = sehir!!.length  // NullPointerException!`}</CodeBlock>
    </div>
  );
}

export default NullSafety;


