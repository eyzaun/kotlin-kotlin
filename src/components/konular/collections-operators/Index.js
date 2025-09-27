import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function CollectionsOperatorsIndex() {
  return (
    <TopicLayout
      title="Collections ve Operators - Kotlin"
      description="Kotlin'de List, Set, Map koleksiyonları ve güçlü collection operator'leri (filter, map, forEach, find, any/all, sortedBy, groupBy, partition, distinct, sum, reduce/fold) detaylı anlatım."
      canonical="https://kotlin-kotlin.web.app/collections-operators"
      backLink="/hafta1"
      topicPath="/collections-operators"
    >

      <section className="section">
        <h2>1. Collections Nedir ve Neden Önemlidir?</h2>
        <p>Collections, birden fazla veriyi bir arada tutan yapılardır. Android'de listeler, map'ler ve set'ler; ekran veri kaynakları, cache ve filtreleme gibi işlemlerde her yerde kullanılır.</p>
        <ul>
          <li>List – Sıralı, index'li, duplicate olabilir</li>
          <li>Set – Sırasız, unique elemanlar (duplicate yok)</li>
          <li>Map – Key-Value çiftleri</li>
        </ul>
      </section>

      <section className="section">
        <h2>2. List – En Çok Kullanılan</h2>
        <p>Immutable List (değiştirilemez) ve MutableList (değiştirilebilir) varyantları vardır. Android'de genellikle immutable list tercih edilir; state değiştiğinde yeni liste üretilir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`fun listOrnekleri() {
    // IMMUTABLE LIST - Değiştirilemez
    val sehirler = listOf("İstanbul", "Ankara", "İzmir")
    // sehirler.add("Bursa")  // HATA! add metodu yok
    println(sehirler[0])  // İstanbul - index ile erişim
    println(sehirler.size)  // 3 - eleman sayısı
    
    // MUTABLE LIST - Değiştirilebilir
    val takimlar = mutableListOf("Galatasaray", "Fenerbahçe", "Beşiktaş")
    takimlar.add("Trabzonspor")  // Ekleme yapabiliyoruz
    takimlar.removeAt(0)  // İlk elemanı sil
    takimlar[0] = "BJK"  // Index ile değiştirme
    
    // BOŞ LİSTE OLUŞTURMA
    val bosListe = emptyList<String>()  // Immutable boş liste
    val bosMutable = mutableListOf<Int>()  // Mutable boş liste
    
    // TİP BELİRTME
    val sayiListesi: List<Int> = listOf(1, 2, 3, 4, 5)
    val isimListesi: MutableList<String> = mutableListOf()
    
    // ARRAYLIST - Java uyumluluğu için
    val javaList = ArrayList<Double>()  // Java'daki ArrayList
    val kotlinList = arrayListOf(1.0, 2.0, 3.0)  // Kotlin helper
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>3. Set – Unique Elemanlar</h2>
        <p>Set'ler duplicate değer tutmaz. Takip edilen kullanıcı ID'leri, favori ürünler gibi benzersiz kümeler için idealdir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`fun setOrnekleri() {
    // IMMUTABLE SET
    val benzersizSayilar = setOf(1, 2, 3, 2, 1)  // Duplicate'ler otomatik silinir
    println(benzersizSayilar)  // [1, 2, 3] - sadece unique'ler kaldı
    
    // MUTABLE SET
    val takipEdilenler = mutableSetOf<Int>()  // Kullanıcı ID'leri
    takipEdilenler.add(101)  // true - eklendi
    takipEdilenler.add(102)  // true - eklendi
    takipEdilenler.add(101)  // false - zaten var, eklenmedi
    println(takipEdilenler.size)  // 2 - duplicate sayılmaz
    
    // SET'İN GÜCÜ - Hızlı contains kontrolü
    val favoriUrunler = setOf(1001, 1002, 1003, 1004, 1005)
    val urunFavoriMi = 1003 in favoriUrunler  // true - çok hızlı!
    // List'te bu kontrol O(n), Set'te O(1)
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>4. Map – Key/Value Çiftleri</h2>
        <p>Map, anahtar-değer eşlemesidir. Kullanıcı ID → Kullanıcı, Ürün Kodu → Fiyat gibi hızlı erişim gerektiren senaryolarda idealdir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`fun mapOrnekleri() {
    // IMMUTABLE MAP
    val ulkeBaskentleri = mapOf(
        "Türkiye" to "Ankara",
        "Fransa" to "Paris",
        "Almanya" to "Berlin"
    )
    println(ulkeBaskentleri["Türkiye"])  // Ankara
    
    // MUTABLE MAP
    val urunFiyatlari = mutableMapOf<String, Double>()
    urunFiyatlari["URUN001"] = 150.0
    urunFiyatlari["URUN002"] = 250.0
    urunFiyatlari.put("URUN003", 350.0)
    
    // DEFAULT DEĞER İLE ALMA
    val fiyat = urunFiyatlari.getOrDefault("URUN999", 0.0)  // 0.0 döner
    
    // KEY-VALUE İTERASYONU
    for ((kod, fiyat) in urunFiyatlari) {
        println("Ürün: ${'${'}kod{'}'}, Fiyat: ${'${'}fiyat{'}'} TL")
    }
    
    // HASHMAP - Performans için
    val cache = HashMap<String, String>()
    val settings = hashMapOf(
        "tema" to "dark",
        "dil" to "TR"
    )
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>5. Collection Operators – Kotlin'in Gücü</h2>
        <p>Filtreleme, dönüştürme, sıralama, grupla, unique alma, matematiksel işlemler ve daha fazlası için zengin operatörler.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`data class Urun(
    val id: Int,
    val ad: String,
    val fiyat: Double,
    val kategori: String,
    val stokMiktari: Int
)

fun operatorOrnekleri() {
    val urunler = listOf(
        Urun(1, "Laptop", 15000.0, "Elektronik", 5),
        Urun(2, "Mouse", 150.0, "Elektronik", 50),
        Urun(3, "Klavye", 500.0, "Elektronik", 0),
        Urun(4, "Masa", 2000.0, "Mobilya", 10),
        Urun(5, "Sandalye", 800.0, "Mobilya", 25),
        Urun(6, "Monitor", 3000.0, "Elektronik", 8)
    )
    
    // FILTER
    val ucuzUrunler = urunler.filter { it.fiyat < 2000 }
    println("Ucuz ürün sayısı: ${'${'}ucuzUrunler.size{'}'}")
    
    val stoktakiElektronik = urunler.filter { 
        it.kategori == "Elektronik" && it.stokMiktari > 0 
    }
    
    // MAP
    val urunIsimleri: List<String> = urunler.map { it.ad }
    println(urunIsimleri)  // [Laptop, Mouse, Klavye, ...]
    val kdvliFiyatlar = urunler.map { it.fiyat * 1.18 }
    
    data class UrunOzet(val ad: String, val fiyat: Double)
    val ozetler = urunler.map { UrunOzet(it.ad, it.fiyat) }
    
    // FILTER + MAP + SORT
    val elektronikIsimler = urunler
        .filter { it.kategori == "Elektronik" }
        .map { it.ad.uppercase() }
        .sorted()
    
    // FOREACH
    urunler.forEach { urun ->
        println("${'${'}urun.ad{'}'}: ${'${'}urun.fiyat{'}'} TL")
    }
    
    urunler.forEachIndexed { index, urun ->
        println("${'${'}index + 1{'}'}. ${'${'}urun.ad{'}'}")
    }
    
    // FIND / FIRSTORNULL
    val laptop = urunler.find { it.ad == "Laptop" }
    val yokUrun = urunler.find { it.ad == "Tablet" }
    
    val ilkMobilya = urunler.firstOrNull { it.kategori == "Mobilya" }
    ilkMobilya?.let {
        println("İlk mobilya: ${'${'}it.ad{'}'}")
    }
    
    // ANY / ALL / NONE
    val pahalıUrunVarMi = urunler.any { it.fiyat > 10000 }
    val hepsiStoktaMi = urunler.all { it.stokMiktari > 0 }
    val hicMobilyaYokMu = urunler.none { it.kategori == "Mobilya" }
    
    // SORTEDBY
    val fiyataGoreSirali = urunler.sortedBy { it.fiyat }
    val pahalidanUcuza = urunler.sortedByDescending { it.fiyat }
    
    val cokluSiralama = urunler.sortedWith(compareBy({ it.kategori }, { it.fiyat }))
    
    // GROUPBY
    val kategoriyeGore = urunler.groupBy { it.kategori }
    kategoriyeGore.forEach { (kategori, urunListesi) ->
        println("${'${'}kategori{'}'} kategorisinde ${'${'}urunListesi.size{'}'} ürün var")
    }
    
    // PARTITION
    val (stoktakiler, stokBitenler) = urunler.partition { it.stokMiktari > 0 }
    println("Stokta: ${'${'}stoktakiler.size{'}'}, Bitmiş: ${'${'}stokBitenler.size{'}'}")
    
    // TAKE / DROP
    val ilkUc = urunler.take(3)
    val sonIki = urunler.takeLast(2)
    val ilkUcHaric = urunler.drop(3)
    
    // DISTINCT / DISTINCTBY
    val kategoriler = urunler.map { it.kategori }.distinct()
    val benzersizFiyatlar = urunler.distinctBy { it.fiyat }
    
    // SUM / AVERAGE / MAX / MIN
    val toplamDeger = urunler.sumOf { it.fiyat * it.stokMiktari }
    val ortalamafiyat = urunler.map { it.fiyat }.average()
    val enPahali = urunler.maxByOrNull { it.fiyat }
    val enUcuz = urunler.minByOrNull { it.fiyat }
    
    // REDUCE / FOLD
    val sayilar = listOf(1, 2, 3, 4, 5)
    val toplam = sayilar.reduce { acc, sayi -> acc + sayi }
    val carpim = sayilar.fold(1) { acc, sayi -> acc * sayi }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>6. Gerçek Android Örnekleri</h2>
        <div className="topic-card">
          <h3>API'den Gelen Veriyi İşleme</h3>
          <CodeBlock language="kotlin">{`data class ApiUser(
    val id: Int,
    val name: String,
    val email: String,
    val isActive: Boolean,
    val role: String
)

fun apiVeriIsleme(users: List<ApiUser>) {
    val aktifKullanicilar = users.filter { it.isActive }
    val (adminler, normalKullanicilar) = users.partition { it.role == "admin" }
    val siraliListe = users.sortedBy { it.name }
    
    fun aramaYap(query: String): List<ApiUser> {
        return users.filter {
            it.name.contains(query, ignoreCase = true) ||
            it.email.contains(query, ignoreCase = true)
        }
    }
    
    val userMap = users.associateBy { it.id }
    val kullanici = userMap[123]  // O(1) erişim
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>RecyclerView/LazyColumn İçin Veri Hazırlama</h3>
          <CodeBlock language="kotlin">{`data class ListItem(
    val id: Long,
    val title: String,
    val subtitle: String,
    val date: Long,
    val isRead: Boolean
)

fun listeHazirlama(items: List<ListItem>) {
    val siraliListe = items.sortedByDescending { !it.isRead }
    
    val tarihGruplari = items.groupBy { 
        java.text.SimpleDateFormat("dd/MM/yyyy").format(it.date)
    }
    
    val harfGruplari = items
        .sortedBy { it.title }
        .groupBy { it.title.first().uppercase() }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>7. Performans İpuçları</h2>
        <ul>
          <li>Büyük listeler için <code>Sequence</code> kullanın: <code>list.asSequence().filter{}.map{}.take(10)</code> lazy çalışır.</li>
          <li>Hızlı <code>contains</code> kontrolleri için <code>Set</code> kullanın.</li>
          <li>ID bazlı erişimde <code>Map</code> ile <code>associateBy</code> kullanın.</li>
          <li>Immutable listeler state yönetimi ve thread safety için daha iyi.</li>
        </ul>
      </section>

      <Notes topicPath="/collections-operators" topicTitle="Collections ve Operators" />

      <div className="navigation-links">
        <Link to="/classes-objects" className="nav-button">Classes ve Objects</Link>
        <Link to="/compose-mindset" className="nav-button">Compose Mindset</Link>
      </div>
    </TopicLayout>
  );
}
