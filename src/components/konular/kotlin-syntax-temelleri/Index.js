import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function KotlinSyntaxIndex() {
  return (
    <TopicLayout
      title="Kotlin Syntax Temelleri - Kotlin"
      description="Kotlin'de Variables (var/val/const val), Null Safety (?. ?: !!) ve Data Types & Type Inference konularının eksiksiz anlatımı."
      canonical="https://kotlin-kotlin.web.app/kotlin-syntax-temelleri"
      backLink="/hafta1"
      topicPath="/kotlin-syntax-temelleri"
    >

  <section className="section">
    <h2>1. VARIABLES (DEĞİŞKENLER)</h2>
  <p>Kotlin'de değişken tanımlama 3 farklı şekilde yapılır:</p>
  <ul>
    <li><strong>var</strong>: Değiştirilebilir değişken (mutable)</li>
    <li><strong>val</strong>: Değiştirilemez değişken (immutable)</li>
    <li><strong>const val</strong>: Derleme zamanında bilinen sabitler</li>
  </ul>

  <div className="topic-card">
    <h3>VAR - Değeri sonradan değiştirilebilir</h3>
    <CodeBlock language="kotlin">{`var yasim = 25
// Bu değişkenin değerini istediğimiz zaman değiştirebiliriz
yasim = 26  // Sorunsuz çalışır
yasim = 27  // Bu da çalışır`}</CodeBlock>
  </div>

  <div className="topic-card">
    <h3>VAL - Bir kere atandıktan sonra değiştirilemez</h3>
    <CodeBlock language="kotlin">{`val isim = "Ahmet"
// isim = "Mehmet"  // HATA! Val ile tanımlanan değişkenin değeri değiştirilemez`}</CodeBlock>
  </div>

  <h4>Neden val kullanmalıyız?</h4>
  <ul>
    <li>Kod güvenliği sağlar - yanlışlıkla değiştirilmesini engeller</li>
    <li>Thread-safe'dir - çoklu işlemlerde güvenlidir</li>
    <li>Okunabilirlik artar - bu değerin değişmeyeceğini bilirsiniz</li>
  </ul>

  <div className="topic-card">
    <h3>CONST VAL - Derleme zamanında bilinen sabitler için</h3>
    <p>Sadece primitive tipler ve String için kullanılır. Class'ın en üstünde veya object/companion object içinde tanımlanır.</p>
    <CodeBlock language="kotlin">{`class Sabitler {
    companion object {
    const val PI = 3.14159  // Matematiksel sabit
    const val API_URL = "https://api.example.com"  // Uygulama sabiti
    }
}`}</CodeBlock>
  </div>

  <p><strong>const val</strong> derleme sırasında yerine konur (compile-time), <strong>val</strong> ise çalışma zamanında atanır (runtime).</p>
  </section>

  <section className="section">
    <h2>2. NULL SAFETY</h2>
  <p>Kotlin'in en önemli özelliklerinden biri Null Safety'dir. NullPointerException hatalarını önlemek için tasarlanmıştır.</p>

  <h3>Nullable olmayan tip</h3>
  <CodeBlock language="kotlin">{`var kesinIsim: String = "Ali"
// kesinIsim = null  // HATA! String tipine null atanamaz`}</CodeBlock>

  <h3>Nullable tip</h3>
  <CodeBlock language="kotlin">{`var belkiIsim: String? = "Veli"
belkiIsim = null  // Sorunsuz çalışır, çünkü String? null alabilir`}</CodeBlock>

  <div className="topic-card">
    <h3>Safe Call Operator (?.)</h3>
    <CodeBlock language="kotlin">{`var kullaniciAdi: String? = "user123"

// Eğer kullaniciAdi null değilse length'i al, null ise null döndür
val uzunluk = kullaniciAdi?.length  // Sonuç: 7

kullaniciAdi = null
val uzunluk2 = kullaniciAdi?.length  // Sonuç: null (hata vermez)`}</CodeBlock>
  </div>

  <div className="topic-card">
    <h3>Elvis Operator (?:)</h3>
    <CodeBlock language="kotlin">{`// Sol taraf null ise sağ taraftaki değeri kullan
val kesinUzunluk = kullaniciAdi?.length ?: 0  
// kullaniciAdi null olduğu için sonuç: 0`}</CodeBlock>
  </div>

  <div className="topic-card">
    <h3>Gerçek hayat örneği</h3>
    <CodeBlock language="kotlin">{`fun kullaniciyiSelamla(isim: String?) {
    // Eğer isim null ise "Misafir" kullan
    val gosterilecekIsim = isim ?: "Misafir"
    println("Hoşgeldin $gosterilecekIsim")
}

kullaniciyiSelamla("Ahmet")  // Çıktı: Hoşgeldin Ahmet
kullaniciyiSelamla(null)     // Çıktı: Hoşgeldin Misafir`}</CodeBlock>
  </div>

  <h3>Not-null Assertion Operator (!!)</h3>
  <p>"Bu değişken kesinlikle null değil" demek için kullanılır. DİKKAT: null ise NullPointerException fırlatır! Mümkün olduğunca <code>?.</code> veya <code>?:</code> kullanın.</p>
  <CodeBlock language="kotlin">{`var sehir: String? = "İstanbul"
val sehirUzunlugu = sehir!!.length  // 8
// sehir = null
// val tehlikeli = sehir!!.length  // NullPointerException!`}</CodeBlock>
  </section>

  <section className="section">
    <h2>3. DATA TYPES VE TYPE INFERENCE</h2>
  <p>Kotlin güçlü tip sistemine sahiptir ve tip çıkarımı (type inference) yapar. Yani her zaman tipi belirtmenize gerek yoktur.</p>

  <h3>Type Inference</h3>
  <CodeBlock language="kotlin">{`val otomatikSayi = 42          // Kotlin bunun Int olduğunu anlar
val otomatikOndalik = 3.14     // Double olduğunu anlar
val otomatikMetin = "Merhaba"  // String olduğunu anlar
val otomatikBool = true        // Boolean olduğunu anlar`}</CodeBlock>

  <h3>Manuel tip belirtme</h3>
  <CodeBlock language="kotlin">{`val kesinInt: Int = 100
val kesinDouble: Double = 50.0
val kesinFloat: Float = 25.5f  // f harfi Float olduğunu belirtir
val kesinLong: Long = 1000000L // L harfi Long olduğunu belirtir`}</CodeBlock>

  <h3>Temel Veri Tipleri</h3>
  <CodeBlock language="kotlin">{`val byteOrnek: Byte = 127       // -128 ile 127 arası
val shortOrnek: Short = 32000   // -32,768 ile 32,767 arası
val intOrnek: Int = 2147483647  // Yaklaşık ±2 milyar
val longOrnek: Long = 9223372036854775807L  // Çok büyük sayılar

val floatOrnek: Float = 3.14f   // 6-7 basamak hassasiyet
val doubleOrnek: Double = 3.14159265359  // 15-16 basamak hassasiyet

val karakterOrnek: Char = 'A'   // Tek karakter
val metinOrnek: String = "Kotlin öğreniyorum"  // Metin

val dogruOrnek: Boolean = true
val yanlisOrnek: Boolean = false`}</CodeBlock>

  <h3>Type Conversion - Tip dönüşümleri</h3>
  <p>Kotlin'de otomatik tip dönüşümü yoktur, açık dönüşüm gerekir.</p>
  <CodeBlock language="kotlin">{`val intSayi: Int = 100
// val doubleSayi: Double = intSayi  // HATA! Otomatik dönüşüm yok

// Doğru kullanım - Açık dönüşüm metodları
val doubleSayi: Double = intSayi.toDouble()
val floatSayi: Float = intSayi.toFloat()
val stringSayi: String = intSayi.toString()`}</CodeBlock>

  <h4>String'den sayıya dönüşüm</h4>
  <CodeBlock language="kotlin">{`val metinSayi = "123"
val gercekSayi = metinSayi.toInt()     // 123
val ondalikSayi = "45.67".toDouble()   // 45.67`}</CodeBlock>

  <h4>Güvenli dönüşüm</h4>
  <p>Hatalı dönüşümlerde null döndürür; Elvis ile varsayılan verebilirsiniz.</p>
  <CodeBlock language="kotlin">{`val hataliMetin = "abc123"
val guvenliSayi = hataliMetin.toIntOrNull()  // null döner
val varsayilanli = hataliMetin.toIntOrNull() ?: 0  // 0 döner`}</CodeBlock>

  <h3>Smart Cast</h3>
  <p>Kotlin, <code>is</code> kontrolünden sonra değişkeni otomatik olarak ilgili tipe indirger.</p>
    <CodeBlock language="kotlin">{`fun akillıTipDonusumu(deger: Any) {
  if (deger is String) {
    // Bu blok içinde deger otomatik olarak String tipindedir
    println("Metnin uzunluğu: ${'${'}deger.length{'}'}")
  } else if (deger is Int) {
    // Bu blok içinde deger otomatik olarak Int tipindedir
    println("Sayının karesi: ${'${'}deger * deger{'}'}")
  }
}

akillıTipDonusumu("Kotlin")  // Çıktı: Metnin uzunluğu: 6
akillıTipDonusumu(5)         // Çıktı: Sayının karesi: 25`}</CodeBlock>

  <h3>Any tipi</h3>
  <CodeBlock language="kotlin">{`val herhangiTip: Any = "Bu bir string"
val baskaTip: Any = 123
val dahaFarkli: Any = true`}</CodeBlock>

    <h3>Unit ve Nothing</h3>
  <CodeBlock language="kotlin">{`// Unit tipi - Değer döndürmeyen fonksiyonlar için (Java'daki void gibi)
fun selamVer(): Unit {  // Unit yazmasak da olur
    println("Merhaba!")
}

// Nothing tipi - Hiçbir zaman normal şekilde sonlanmayan fonksiyonlar için
fun hataFirlat(): Nothing {
    throw Exception("Bu bir hata!")
}`}</CodeBlock>
  </section>

  <Notes topicPath="/kotlin-syntax-temelleri" topicTitle="Kotlin Syntax Temelleri" />

  <div className="navigation-links">
    <Link to="/hafta1" className="nav-button">1. Hafta</Link>
    <Link to="/fonksiyonlar-lambda" className="nav-button">Fonksiyonlar ve Lambda</Link>
  </div>
    </TopicLayout>
  );
}
