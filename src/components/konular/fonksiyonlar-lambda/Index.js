import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function FonksiyonlarLambda() {
  return (
    <TopicLayout
      title="Fonksiyonlar ve Lambda - Kotlin"
      description="Kotlin'de Fonksiyonlar, Varsayılan ve İsimlendirilmiş Parametreler, Extension Functions, Higher-Order Functions, Lambda Expressions, Trailing Lambda ve Scope Functions (let, run, apply, also, with)."
      canonical="https://kotlin-kotlin.web.app/fonksiyonlar-lambda"
      backLink="/hafta1"
      topicPath="/fonksiyonlar-lambda"
    >

      <section className="section">
        <h2>1. Fonksiyonlar Nedir ve Neden Önemlidir?</h2>
        <p>Fonksiyonlar belirli bir görevi yerine getiren kod bloklarıdır. Aynı kodu tekrar yazmak yerine fonksiyon haline getirir ve çağırırız. Kotlin'de fonksiyonlar <code>fun</code> ile başlar ve Java'dan farklı olarak <strong>top-level</strong> (dosya seviyesinde) fonksiyonlar da yazabilirsiniz.</p>

        <div className="topic-card">
          <h3>En basit fonksiyon</h3>
          <CodeBlock language="kotlin">{`// En basit fonksiyon - hiç parametre almaz, değer döndürmez
fun merhaba() {
    println("Merhaba!")
}
// Çağırma: merhaba()`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>Parametre alan fonksiyon</h3>
          <p>Fonksiyonlara dışarıdan veri göndermek için parametreler kullanırız.</p>
          <CodeBlock language="kotlin">{`fun kdvHesapla(fiyat: Double) {
    // fiyat parametresi Double tipinde olmak ZORUNDA
    // Kotlin tip güvenliği sağlar - yanlış tip gönderemezsiniz
    val kdv = fiyat * 0.18
    val toplam = fiyat + kdv
    println("Fiyat: ${'${'}fiyat{'}'} TL, KDV: ${'${'}kdv{'}'} TL, Toplam: ${'${'}toplam{'}'} TL")
}
// Kullanım: kdvHesapla(100.0)  // 100 yerine 100.0 yazmalıyız çünkü Double isteniyor`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>Değer döndüren fonksiyon</h3>
          <CodeBlock language="kotlin">{`fun topla(a: Int, b: Int): Int {
    val sonuc = a + b
    return sonuc  // Bu değeri fonksiyonu çağıran yere gönderir
}
// Kullanım:
// val toplam = topla(5, 3)  // toplam = 8`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>Tek satırlık fonksiyon (Single Expression)</h3>
          <CodeBlock language="kotlin">{`fun carp(x: Int, y: Int): Int = x * y
// Yukarıdaki ile aşağıdaki aynı:
// fun carp(x: Int, y: Int): Int {
//     return x * y  
// }`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>2. Varsayılan Parametreler (Default Parameters)</h2>
        <p>Java'daki method overloading karmaşasını azaltır. Parametreler için varsayılan değerler tanımlayabilirsiniz.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`fun kahveSiparisi(
    tur: String = "Latte",       // Belirtilmezse Latte
    boyut: String = "Orta",       // Belirtilmezse Orta
    seker: Boolean = true         // Belirtilmezse şekerli
): String {
    var siparis = "${'${'}boyut{'}'} boy ${'${'}tur{'}'}"
    if (seker) siparis += " (Şekerli)" 
    else siparis += " (Şekersiz)"
    return siparis
}

// Kullanım örnekleri:
// kahveSiparisi()                           // "Orta boy Latte (Şekerli)"
// kahveSiparisi("Cappuccino")               // "Orta boy Cappuccino (Şekerli)"
// kahveSiparisi("Espresso", "Küçük", false) // "Küçük boy Espresso (Şekersiz)"`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>3. İsimlendirilmiş Parametreler (Named Arguments)</h2>
        <p>Parametreleri sıra yerine isimleriyle vererek okunabilirliği artırabilirsiniz.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`fun kullaniciKayit(ad: String, soyad: String, yas: Int, sehir: String) {
    println("${'${'}ad{'}'} ${'${'}soyad{'}'}, ${'${'}yas{'}'} yaşında, ${'${'}sehir{'}'} şehrinde")
}

// Normal kullanım - sırayı ezberlemek zorundasınız:
// kullaniciKayit("Ali", "Veli", 25, "İstanbul")

// Named arguments - sıra önemli değil, daha okunabilir:
// kullaniciKayit(sehir = "Ankara", ad = "Mehmet", yas = 30, soyad = "Öz")`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>4. Extension Functions</h2>
        <p>Var olan bir sınıfa, o sınıfın koduna dokunmadan yeni fonksiyonlar ekleyebilirsiniz.</p>
        <div className="topic-card">
          <h3>String.telefonFormati()</h3>
          <CodeBlock language="kotlin">{`// String'e telefon numarası formatı ekleme
fun String.telefonFormati(): String {
    // this = fonksiyonu çağıran String nesnesinin kendisi
    if (this.length != 10) return this
    
    // 5551234567 -> (555) 123-4567 formatına çevir
    return "(${ '${' }this.substring(0,3){ '}' }) ${ '${' }this.substring(3,6){ '}' }-${ '${' }this.substring(6){ '}' }"
}

// Artık HER String'de bu fonksiyon var!
// val numara = "5551234567"
// val formatli = numara.telefonFormati()  // "(555) 123-4567"`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Int.ciftMi()</h3>
          <CodeBlock language="kotlin">{`// Int'e çift mi kontrolü ekleme
fun Int.ciftMi(): Boolean = this % 2 == 0

// val sayi = 4
// if (sayi.ciftMi()) println("Çift")`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Null-güvenli Extension</h3>
          <CodeBlock language="kotlin">{`// Nullable tipler için de extension yazabilirsiniz
fun String?.güvenliUzunluk(): Int {
    // this null olabilir, kontrol ediyoruz
    return this?.length ?: 0  // null ise 0 döndür
}

// var isim: String? = null
// println(isim.güvenliUzunluk())  // 0 - hata vermez!`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>5. Higher-Order Functions</h2>
        <p>Parametre olarak başka fonksiyon alan veya fonksiyon döndüren fonksiyonlardır.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`// Örnek: Bir liste üzerinde işlem yapan fonksiyon
fun listedeIslemYap(
    liste: List<Int>,
    islem: (Int) -> Unit  // Int alır, Unit döndürür
) {
    for (eleman in liste) {
        islem(eleman)  // Gelen fonksiyonu her eleman için çağır
    }
}

// Kullanım - farklı işlemler yapabiliriz:
val sayilar = listOf(1, 2, 3, 4, 5)

// listedeIslemYap(sayilar) { sayi ->
//     println(sayi * sayi)  // Her sayının karesini yazdır
// }

// listedeIslemYap(sayilar) { sayi ->
//     if (sayi.ciftMi()) println(sayi)  // Sadece çiftleri yazdır
// }`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>6. Lambda Expressions</h2>
        <p>Lambda = İsimsiz fonksiyon. <code>{`{ }`}</code> içinde yazılır. Tek kullanımlık fonksiyonlar ve functional tarz için idealdir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`// Normal fonksiyon
fun topla(a: Int, b: Int): Int {
    return a + b
}

// Lambda hali
val toplaLambda = { a: Int, b: Int -> a + b }

// Lambda örnekleri
val kareAl = { x: Int -> x * x }
// Kullanım: val sonuc = kareAl(5)  // 25

// Tek parametreli lambda'da "it" kullanabilirsiniz
val ikiKati = { it: Int -> it * 2 }
// Daha kısa:
val ikiKati2: (Int) -> Int = { it * 2 }`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>Trailing Lambda</h3>
          <CodeBlock language="kotlin">{`fun butonTiklama(text: String, tiklandi: () -> Unit) {
    println("Buton: ${'${'}text{'}'}")
    tiklandi()  // Lambda'yı çağır
}

// Normal kullanım:
// butonTiklama("Kaydet", { println("Kaydedildi!") })

// Trailing lambda - daha okunabilir:
// butonTiklama("Kaydet") {
//     println("Kaydedildi!")
// }`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>7. Scope Functions: let, run, apply, also, with</h2>
        <p>Bir nesne üzerinde geçici çalışma alanı oluşturup daha okunabilir kod yazmayı sağlarlar.</p>

        <div className="topic-card">
          <h3>let</h3>
          <CodeBlock language="kotlin">{`data class User(var ad: String = "", var yas: Int = 0)

fun letOrnegi() {
    val kullanici: User? = User("Ali", 25)
    
    // Null değilse çalış
    kullanici?.let {
        println("Kullanıcı adı: ${'${'}it.ad{'}'}")
        println("Yaşı: ${'${'}it.yas{'}'}")
        "İşlem tamamlandı"  // Bu değer döner
    }
}`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>apply</h3>
          <CodeBlock language="kotlin">{`fun applyOrnegi() {
    val yeniUser = User().apply {
        ad = "Mehmet"     // this.ad yazmaya gerek yok
        yas = 30          // this.yas yazmaya gerek yok
    }
    // apply nesneyi döndürdü, yeniUser kullanıma hazır
}`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>run</h3>
          <CodeBlock language="kotlin">{`fun runOrnegi() {
    val user = User("Veli", 17)
    val mesaj = user.run {
        if (yas >= 18) "${'${'}ad{'}'} reşit" 
        else "${'${'}ad{'}'} reşit değil"
    }
    // mesaj = "Veli reşit değil"
}`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>also</h3>
          <CodeBlock language="kotlin">{`fun alsoOrnegi() {
    User("Can", 22)
        .also { println("User oluşturuldu: ${'${'}it.ad{'}'}") }  // Loglama
        .apply { yas = 23 }  // Zincirleme devam edebilir
}`}</CodeBlock>
        </div>

        <div className="topic-card">
          <h3>with</h3>
          <CodeBlock language="kotlin">{`fun withOrnegi() {
    val user = User("Deniz", 28)
    val sonuc = with(user) {
        println(ad)
        println(yas)
        "Bilgiler yazdırıldı"  // Dönüş değeri
    }
}`}</CodeBlock>
        </div>

        <p><strong>Özet kural:</strong> Null kontrolü gerekiyorsa <code>let</code>, nesne kurulumu için <code>apply</code>, hesaplama/dönüşüm için <code>run</code>, yan etkiler için <code>also</code>, çoklu işlem için <code>with</code>.</p>
      </section>

      <Notes topicPath="/fonksiyonlar-lambda" topicTitle="Fonksiyonlar ve Lambda" />

      <div className="navigation-links">
        <Link to="/kotlin-syntax-temelleri" className="nav-button">Kotlin Syntax Temelleri</Link>
        <Link to="/classes-objects" className="nav-button">Classes ve Objects</Link>
      </div>
    </TopicLayout>
  );
}
