import React, { useMemo, useState } from 'react';
import TopicLayout from '../layout/TopicLayout';
import Notes from '../notes/Notes';
import CodeBlock from '../ui/CodeBlock';

export default function SoruCevap1() {
  const [query, setQuery] = useState('');

  const data = useMemo(() => ([
    {
      id: 'kotlin-syntax',
      title: '1. Kotlin Syntax Temelleri',
      items: [
        {
          q: 'SORU 1: var, val ve const val arasındaki farklar nedir?',
          a: (
            <>
              <p>
                var: Değiştirilebilir değişken. val: Değiştirilemez referans. const val: derleme zamanı sabiti (top-level ya da companion object içinde; primitive ve String için).
              </p>
              <CodeBlock language="kotlin">{`var isim = "Ali"
isim = "Veli"  // değiştirilebilir

val yas = 25
// yas = 26  // HATA!

class Api {
    companion object {
        const val API_KEY = "abc123" // compile-time constant
    }
}

val liste = mutableListOf(1, 2)
liste.add(3) // val referans sabit; içeriği değişebilir
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 2: Null safety nedir? ?. ?: !! operatörleri ne işe yarar?',
          a: (
            <>
              <p>
                Kotlin null safety ile NPE riskini azaltır. ? nullable tanımlar; ?. güvenli çağrı; ?: Elvis; !! not-null assertion (riskli).
              </p>
              <CodeBlock language="kotlin">{`var isim: String? = null
val uzunluk = isim?.length
val kesinIsim = isim ?: "Misafir"
// val patlar = isim!!.length // isim null ise crash

fun kullaniciSelamla(ad: String?) {
    val gosterilecekAd = ad?.uppercase() ?: "MİSAFİR"
    println("Hoşgeldin ${'${'}gosterilecekAd{'}'}")
}
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 3: Type inference nedir? Ne zaman açık tip belirtmeliyiz?',
          a: (
            <>
              <p>
                Derleyici çoğu durumda tipi çıkarır. Boş koleksiyonlar, null başlangıçlar, üst tip kullanımı, Java interop gibi durumlarda açık tip verin.
              </p>
              <CodeBlock language="kotlin">{`val sayi = 42
val metin = "Merhaba"
val ondalik = 3.14

val liste: List<String> = emptyList()
val isim: String? = null
val herhangi: Any = "Metin"
val javaList: ArrayList<String> = ArrayList()
`}</CodeBlock>
            </>
          )
        }
      ]
    },
    {
      id: 'fonksiyonlar-lambda',
      title: '2. Fonksiyonlar ve Lambda',
      items: [
        {
          q: 'SORU 4: Extension function nedir? Neden kullanılır?',
          a: (
            <>
              <p>
                Mevcut sınıflara koduna dokunmadan yeni fonksiyonlar eklemeyi sağlar; okunabilirlik ve yeniden kullanım için idealdir.
              </p>
              <CodeBlock language="kotlin">{`fun String.ilkHarfBuyuk(): String {
    return this.firstOrNull()?.uppercase() + this.drop(1).lowercase()
}
val isim = "kotlin".ilkHarfBuyuk() // Kotlin

fun View.show() { visibility = View.VISIBLE }
fun View.hide() { visibility = View.GONE }
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 5: Higher-order function nedir? Lambda ile farkı nedir?',
          a: (
            <>
              <p>
                Higher-order: fonksiyon alan/döndüren fonksiyon. Lambda: isimsiz fonksiyon ifadesi.
              </p>
              <CodeBlock language="kotlin">{`fun hesapla(x: Int, y: Int, operation: (Int, Int) -> Int): Int {
    return operation(x, y)
}
val toplam = hesapla(5, 3) { a, b -> a + b }
val carpim = hesapla(5, 3) { a, b -> a * b }

button.setOnClickListener { view ->
    // click işlemleri
}
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 6: Scope functions (let, apply, run, also, with) ne zaman kullanılır?',
          a: (
            <>
              <p>Özet kullanım alanları:</p>
              <ul>
                <li>let: null kontrolü/dönüşüm</li>
                <li>apply: nesne konfigurasyonu (this) nesneyi döndürür</li>
                <li>run: işlem ve sonuç döndürme (this)</li>
                <li>also: yan etki/log (it) nesneyi döndürür</li>
                <li>with: bir nesne üzerinde birden çok işlem (extension değil)</li>
              </ul>
              <CodeBlock language="kotlin">{`kullanici?.let { saveToDatabase(it) }

val tv = TextView(context).apply {
    text = "Merhaba"; textSize = 16f; setTextColor(Color.BLACK)
}

val sonuc = kullanici.run { "$name $surname" }

return user.also {
    Log.d("User", "Saving user: ${'${'}it.name{'}'}")
}

with(binding) {
    textView.text = "Başlık"; button.isEnabled = true
}
`}</CodeBlock>
            </>
          )
        }
      ]
    },
    {
      id: 'classes-objects',
      title: '3. Classes ve Objects',
      items: [
        {
          q: 'SORU 7: Data class nedir? Normal class\'tan farkı nedir?',
          a: (
            <>
              <p>
                Data class veri için optimize; equals/hashCode, toString, copy, componentN otomatik gelir.
              </p>
              <CodeBlock language="kotlin">{`data class User(val id: Int, val name: String)

val user1 = User(1, "Ali")
val user2 = User(1, "Ali")
println(user1 == user2) // true (içerik)
println(user1) // User(id=1, name=Ali)
val user3 = user1.copy(name = "Veli")
val (id, name) = user1
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 8: Sealed class nedir? Enum\'dan farkı nedir?',
          a: (
            <>
              <p>
                Sealed sınırlı alt tipe sahip; when ile tüm durumların ele alınmasını garanti eder. Enum sabit değerler içindir; sealed alt tipler farklı veriler taşıyabilir.
              </p>
              <CodeBlock language="kotlin">{`sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) {
    when (result) {
        is Result.Success -> println(result.data)
        is Result.Error -> println(result.message)
        Result.Loading -> println("Yükleniyor...")
    }
}
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 9: Companion object nedir? Java\'daki static ile farkı?',
          a: (
            <>
              <p>
                Kotlin\'de static yok; companion object var. Ortak sabit/fonksiyonlar için kullanılır; nesnedir, interface implemente edebilir, extension alabilir.
              </p>
              <CodeBlock language="kotlin">{`class VeriTabani {
    companion object {
        const val DB_NAME = "app.db"
        private var instance: VeriTabani? = null
        fun getInstance(): VeriTabani {
            if (instance == null) instance = VeriTabani()
            return instance!!
        }
    }
}
val dbName = VeriTabani.DB_NAME
val db = VeriTabani.getInstance()
`}</CodeBlock>
            </>
          )
        }
      ]
    },
    {
      id: 'collections-operators',
      title: '4. Collections ve Operators',
      items: [
        {
          q: 'SORU 10: List, Set, Map arasındaki farklar nedir?',
          a: (
            <>
              <p>
                List sıralı ve duplicate olabilir; Set benzersiz elemanlar; Map anahtar-değer eşlemeleri. Performans: Set/Map contains ve key erişimi genelde O(1).
              </p>
              <CodeBlock language="kotlin">{`val liste = listOf("A", "B", "A")
println(liste[0])

val set = setOf("A", "B", "A")
val varMi = "A" in set

val map = mapOf("TR" to "Türkiye", "US" to "Amerika")
println(map["TR"])
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 11: filter, map, forEach arasındaki fark nedir?',
          a: (
            <>
              <p>
                filter koşula uyanları seçer; map dönüştürür; forEach yan etki için çalışır, değer döndürmez. Zincirlenebilirler.
              </p>
              <CodeBlock language="kotlin">{`val ciftler = listOf(1,2,3,4,5).filter { it % 2 == 0 }
val kareler = listOf(1,2,3).map { it * it }
listOf(1,2,3).forEach { println(it) }

val sonuc = users
    .filter { it.age >= 18 }
    .map { it.name.uppercase() }
    .sorted()
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 12: Immutable vs Mutable collections farkı nedir?',
          a: (
            <>
              <p>
                Immutable tipler değiştirilemez; Mutable tipler değiştirilebilir. Compose\'da immutable listeler state yönetimi için tercih edilir.
              </p>
              <CodeBlock language="kotlin">{`val imm = listOf(1, 2, 3)
// imm.add(4) // HATA

val mut = mutableListOf(1, 2, 3)
mut.add(4)
mut.removeAt(0)

var userList by remember { mutableStateOf(listOf<User>()) }
userList = userList + newUser // recomposition tetiklenir

val userListMutable = mutableListOf<User>()
userListMutable.add(newUser) // Compose bunu algılamayabilir
`}</CodeBlock>
            </>
          )
        }
      ]
    },
    {
      id: 'bonus',
      title: 'Bonus Sorular',
      items: [
        {
          q: 'SORU 13: Kotlin\'de == ile === farkı nedir?',
          a: (
            <>
              <p>
                == içerik eşitliği (equals), === referans eşitliği.
              </p>
              <CodeBlock language="kotlin">{`val a = User(1, "Ali")
val b = User(1, "Ali")
val c = a
println(a == b)  // true
println(a === b) // false
println(a === c) // true
`}</CodeBlock>
            </>
          )
        },
        {
          q: 'SORU 14: lazy ve lateinit farkı nedir?',
          a: (
            <>
              <p>
                lazy: val için, ilk erişimde oluşturulur (varsayılan thread-safe). lateinit: var için, sonradan initialize edilir.
              </p>
              <CodeBlock language="kotlin">{`val heavyObject by lazy {
    println("Creating...")
    HeavyObject()
}

lateinit var binding: ActivityMainBinding
// onCreate gibi yerde:
// binding = ActivityMainBinding.inflate(layoutInflater)
`}</CodeBlock>
            </>
          )
        }
      ]
    }
  ]), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const qLower = query.toLowerCase();
    return data.map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        item.q.toLowerCase().includes(qLower) ||
        // rough text extraction from JSX answer for search: stringify children
        JSON.stringify(item.a).toLowerCase().includes(qLower)
      )
    })).filter(cat => cat.items.length > 0);
  }, [data, query]);

  return (
    <TopicLayout
      title="Mülakat Soruları ve Cevapları - 1"
      description="Kotlin ve Android Compose odaklı mülakat soru-cevapları: syntax, fonksiyonlar, sınıflar, koleksiyonlar ve bonus."
      canonical="https://kotlin-kotlin.web.app/soru-cevap-1"
      backLink="/hafta1"
      topicPath="/soru-cevap-1"
    >
      <section className="section">
        <div className="topic-card" style={{display:'grid', gap:12}}>
          <label htmlFor="qa-search"><strong>Hızlı Arama</strong></label>
          <input
            id="qa-search"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Soru ve cevaplarda ara..."
            style={{padding:'10px 12px', border:'1px solid #ccc', borderRadius:8}}/>
          {query && (
            <button className="nav-button" onClick={() => setQuery('')} style={{width:'fit-content'}}>Temizle</button>
          )}
        </div>
      </section>

      {filtered.map(cat => (
        <section key={cat.id} className="section" id={cat.id}>
          <h2>{cat.title}</h2>
          <div className="topic-card" style={{display:'grid', gap:10}}>
            {cat.items.map((item, idx) => (
              <details key={idx} className="qa-item">
                <summary style={{cursor:'pointer'}}>{item.q}</summary>
                <div style={{marginTop:10}}>
                  {item.a}
                </div>
              </details>
            ))}
            {cat.items.length === 0 && (
              <p>Bu kategoride arama sonucuna uygun madde bulunamadı.</p>
            )}
          </div>
        </section>
      ))}

      <Notes topicPath="/soru-cevap-1" topicTitle="Mülakat Soru-Cevap 1" />
    </TopicLayout>
  );
}
