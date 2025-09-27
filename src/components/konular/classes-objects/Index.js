import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function ClassesObjectsIndex() {
  return (
    <TopicLayout
      title="Classes ve Objects - Kotlin"
      description="Kotlin'de Class yapısı, Data Classes, Sealed Classes, Companion Object, Object (Singleton) ve Object Expressions konularının pratik anlatımı."
      canonical="https://kotlin-kotlin.web.app/classes-objects"
      backLink="/hafta1"
      topicPath="/classes-objects"
    >

      <section className="section">
        <h2>1. Kotlin'de Class Yapısı</h2>
        <p>Class, nesnelerin şablonudur. Kotlin'de getter/setter ve constructor yazımı kısadır; Java'ya göre çok daha az kod gerekir.</p>
        <div className="topic-card">
          <h3>Basit class ve property'li class</h3>
          <CodeBlock language="kotlin">{`// En basit class tanımı
class Araba  // Boş class bile oluşturabilirsiniz

// Property'li class
class Kullanici {
    var ad: String = ""
    var yas: Int = 0
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Primary constructor</h3>
          <CodeBlock language="kotlin">{`// Constructor class başlığında tanımlanır
class Ogrenci(isim: String, sinif: Int) {
    // isim ve sinif constructor parametreleri
    // Bunları property yapmak için var/val eklememiz gerek
}

// Property'li primary constructor - en yaygın yöntem
class Calisan(
    var ad: String,      // var = değiştirilebilir property
    val tcNo: String,    // val = değiştirilemez property
    var maas: Double
) {
    // Artık ad, tcNo ve maas property'leri var
}

// Kullanım:
// val calisan = Calisan("Ali Veli", "12345678901", 15000.0)
// println(calisan.ad)  // "Ali Veli"
// calisan.maas = 16000.0  // var olduğu için değiştirilebilir
// calisan.tcNo = "999"  // HATA! val olduğu için değiştirilemez`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>2. Data Classes</h2>
        <p>Data class'lar veri tutmak için optimize edilmiştir; <code>equals</code>, <code>hashCode</code>, <code>toString</code>, <code>copy</code> ve <code>componentN</code> fonksiyonları otomatik gelir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`data class Urun(
    val id: Int,
    val ad: String,
    var fiyat: Double,
    val stok: Int
)

// Data class'ın sağladığı özellikler:
fun dataClassOzellikleri() {
    val urun1 = Urun(1, "Laptop", 15000.0, 10)
    val urun2 = Urun(1, "Laptop", 15000.0, 10)
    val urun3 = Urun(2, "Mouse", 150.0, 50)
    
    // 1. toString() otomatik
    println(urun1)  
    // Çıktı: Urun(id=1, ad=Laptop, fiyat=15000.0, stok=10)
    
    // 2. equals() otomatik - içeriği karşılaştırır
    println(urun1 == urun2)  // true - içerikleri aynı
    println(urun1 == urun3)  // false - içerikleri farklı
    
    // 3. copy() fonksiyonu - mevcut nesneden kopyalayıp değişiklik yapma
    val indirimliFiyat = urun1.copy(fiyat = 12000.0)
    println(indirimliFiyat)
    // Çıktı: Urun(id=1, ad=Laptop, fiyat=12000.0, stok=10)
    
    // 4. Destructuring - komponenlere ayırma
    val (id, ad, fiyat, stok) = urun1
    println("Ürün adı: $ad, Fiyatı: $fiyat")
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Neden data class?</h3>
          <CodeBlock language="kotlin">{`// 1) API response modelleri
data class ApiUser(
    val userId: Int,
    val username: String,
    val email: String,
    val profileImage: String?  // Nullable - bazen gelmeyebilir
)

// 2) Liste elemanları (RecyclerView/LazyColumn)
data class ListeElemani(
    val id: Long,
    val baslik: String,
    val aciklama: String,
    val tarih: String,
    var seciliMi: Boolean = false
)`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>3. Sealed Classes</h2>
        <p>Sealed class'lar sınırlı sayıda alt tipe sahip olabilir. State ve event yönetimi için idealdir ve <code>when</code> ile tüm durumları ele almayı teşvik eder.</p>
        <div className="topic-card">
          <h3>UI state örneği</h3>
          <CodeBlock language="kotlin">{`// UI State için sealed class - Her ekranın durumları
sealed class UiState {
    object Loading : UiState()
    data class Success(val data: List<String>) : UiState()
    data class Error(val message: String) : UiState()
    object Empty : UiState()
}

// Kullanım - State'e göre UI gösterme
fun ekraniGoster(state: UiState) {
    when (state) {
        is UiState.Loading -> {
            println("Yükleniyor animasyonu göster")
        }
        is UiState.Success -> {
            println("Veriyi göster: ${'${'}state.data{'}'}")
        }
        is UiState.Error -> {
            println("Hata mesajı göster: ${'${'}state.message{'}'}")
        }
        is UiState.Empty -> {
            println("Boş liste mesajı göster")
        }
        // else gerekmez! Tüm durumlar kapsandı
    }
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Event yönetimi örneği</h3>
          <CodeBlock language="kotlin">{`sealed class KullaniciEvent {
    object GeriTiklandi : KullaniciEvent()
    data class KullaniciSecildi(val userId: Int) : KullaniciEvent()
    data class AramayaBasladi(val query: String) : KullaniciEvent()
    object YenileTiklandi : KullaniciEvent()
}

fun handleEvent(event: KullaniciEvent) {
    when (event) {
        is KullaniciEvent.GeriTiklandi -> {
            // Geri navigasyon
        }
        is KullaniciEvent.KullaniciSecildi -> {
            // event.userId ile detay sayfasına git
        }
        is KullaniciEvent.AramayaBasladi -> {
            // event.query ile arama yap
        }
        is KullaniciEvent.YenileTiklandi -> {
            // Listeyi yenile
        }
    }
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Sealed vs Enum</h3>
          <CodeBlock language="kotlin">{`// Enum: tüm değerler aynı tip, sadece sabit
enum class Renk { KIRMIZI, YESIL, MAVI }

// Sealed: her alt sınıf farklı veri taşıyabilir
sealed class HataType {
    object NetworkError : HataType()
    data class ApiError(val code: Int, val message: String) : HataType()
    data class UnknownError(val exception: Exception) : HataType()
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>4. Companion Object</h2>
        <p><code>static</code> yerine kullanılır. Sabitler, factory metodlar ve ortak fonksiyonlar için idealdir.</p>
        <div className="topic-card">
          <h3>Static muadili ve singleton factory</h3>
          <CodeBlock language="kotlin">{`class VeriTabani {
    companion object {
        const val DB_NAME = "kullanici_db"
        const val DB_VERSION = 1
        
        private var INSTANCE: VeriTabani? = null
        
        fun getInstance(): VeriTabani {
            if (INSTANCE == null) {
                INSTANCE = VeriTabani()
            }
            return INSTANCE!!
        }
    }
    
    fun kaydet(veri: String) {
        println("$veri veritabanına kaydedildi")
    }
}

fun companionKullanimi() {
    println(VeriTabani.DB_NAME)
    val db = VeriTabani.getInstance()
    db.kaydet("Test verisi")
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Factory pattern</h3>
          <CodeBlock language="kotlin">{`class Kullanici private constructor(
    val id: Int,
    val ad: String,
    val email: String
) {
    companion object {
        fun emailIleOlustur(email: String): Kullanici {
            val kullaniciAdi = email.substringBefore('@')
            return Kullanici(
                id = 0,
                ad = kullaniciAdi,
                email = email
            )
        }
        
        fun misafirOlustur(): Kullanici {
            return Kullanici(
                id = -1,
                ad = "Misafir",
                email = "misafir@temp.com"
            )
        }
    }
}

// Kullanım:
// val kullanici1 = Kullanici.emailIleOlustur("ali@gmail.com")
// val kullanici2 = Kullanici.misafirOlustur()`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>5. Object (Singleton)</h2>
        <p><code>object</code> ile uygulama genelinde tek örnek (singleton) oluşturursunuz; ayarlar, logger, client vb. için uygundur.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`object AyarYoneticisi {
    private val ayarlar = mutableMapOf<String, Any>()
    
    fun ayarKoy(anahtar: String, deger: Any) {
        ayarlar[anahtar] = deger
    }
    
    fun ayarAl(anahtar: String): Any? {
        return ayarlar[anahtar]
    }
    
    fun tumAyarlariTemizle() {
        ayarlar.clear()
    }
}

fun objectKullanimi() {
    AyarYoneticisi.ayarKoy("tema", "karanlik")
    AyarYoneticisi.ayarKoy("dil", "TR")
    
    val tema = AyarYoneticisi.ayarAl("tema")
    println("Aktif tema: $tema")
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>6. Object Expressions (Anonim Sınıflar)</h2>
        <p>Interface implementasyonu için anonim sınıflar. Java'daki anonymous class'ların Kotlin karşılığıdır.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`interface ClickListener {
    fun onClick(view: String)
}

fun anonymousOrnek() {
    val listener = object : ClickListener {
        override fun onClick(view: String) {
            println("$view tıklandı")
        }
    }
    listener.onClick("Buton")
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>Özet</h2>
        <ul>
          <li>Data class: API modelleri, liste elemanları, veri taşıma</li>
          <li>Sealed class: UI state, event ve navigation modelleme</li>
          <li>Companion object: sabitler, factory metodlar, static yardımcılar</li>
          <li>Object: singleton yapılar ve anonim implementasyonlar</li>
        </ul>
      </section>

      <Notes topicPath="/classes-objects" topicTitle="Classes ve Objects" />

      <div className="navigation-links">
        <Link to="/fonksiyonlar-lambda" className="nav-button">Fonksiyonlar ve Lambda</Link>
        <Link to="/collections-operators" className="nav-button">Collections ve Operators</Link>
      </div>
    </TopicLayout>
  );
}
