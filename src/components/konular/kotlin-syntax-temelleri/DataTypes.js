import React from 'react';
import SEO from '../../seo/SEO';
import CodeBlock from '../../ui/CodeBlock';

function DataTypes() {
  return (
    <div className="topic-container">
      <SEO
        title="DataTypes | kotlin-kotlin"
    description="Kotlin veri tipleri ve type inference: Int, Double, Float, Long, Byte, Short, Char, String, Boolean; dönüşümler ve smart cast."
        canonical="https://kotlin-kotlin.web.app/datatypes"
        og={{ url: 'https://kotlin-kotlin.web.app/datatypes' }}
      />
  <h1>Kotlin Syntax Temelleri: Data Types ve Type Inference</h1>

  <h2>Type Inference</h2>
  <p>Kotlin güçlü bir tip sistemine sahiptir ve çoğu durumda tipi otomatik çıkarır.</p>
  <CodeBlock language="kotlin">{`val otomatikSayi = 42          // Int
val otomatikOndalik = 3.14     // Double
val otomatikMetin = "Merhaba"  // String
val otomatikBool = true        // Boolean`}</CodeBlock>

  <h2>Manuel Tip Belirtme</h2>
  <CodeBlock language="kotlin">{`val kesinInt: Int = 100
val kesinDouble: Double = 50.0
val kesinFloat: Float = 25.5f  // f harfi Float olduğunu belirtir
val kesinLong: Long = 1000000L // L harfi Long olduğunu belirtir`}</CodeBlock>

  <h2>Temel Veri Tipleri</h2>
  <CodeBlock language="kotlin">{`val byteOrnek: Byte = 127
val shortOrnek: Short = 32000
val intOrnek: Int = 2147483647
val longOrnek: Long = 9223372036854775807L

val floatOrnek: Float = 3.14f
val doubleOrnek: Double = 3.14159265359

val karakterOrnek: Char = 'A'
val metinOrnek: String = "Kotlin öğreniyorum"

val dogruOrnek: Boolean = true
val yanlisOrnek: Boolean = false`}</CodeBlock>

  <h2>Tip Dönüşümleri</h2>
  <p>Kotlin'de otomatik sayısal dönüşüm yoktur; açık dönüşüm gerekir.</p>
  <CodeBlock language="kotlin">{`val intSayi: Int = 100
// val doubleSayi: Double = intSayi  // HATA! Otomatik dönüşüm yok

// Doğru kullanım - Açık dönüşüm metodları
val doubleSayi: Double = intSayi.toDouble()
val floatSayi: Float = intSayi.toFloat()
val stringSayi: String = intSayi.toString()`}</CodeBlock>

  <h3>String'den Sayıya Dönüşüm</h3>
  <CodeBlock language="kotlin">{`val metinSayi = "123"
val gercekSayi = metinSayi.toInt()     // 123
val ondalikSayi = "45.67".toDouble()   // 45.67`}</CodeBlock>

  <h3>Güvenli Dönüşüm</h3>
  <p>Hatalı dönüşümlerde <code>null</code> döner; Elvis ile varsayılan verebilirsiniz.</p>
  <CodeBlock language="kotlin">{`val hataliMetin = "abc123"
val guvenliSayi = hataliMetin.toIntOrNull()  // null
val varsayilanli = hataliMetin.toIntOrNull() ?: 0  // 0`}</CodeBlock>

  <h2>Smart Cast</h2>
  <p><code>is</code> kontrolünden sonra Kotlin, değişkeni otomatik olarak o tipe indirger.</p>
  <CodeBlock language="kotlin">{`fun akillıTipDonusumu(deger: Any) {
    if (deger is String) {
    println("Metnin uzunluğu: ${deger.length}")
    } else if (deger is Int) {
    println("Sayının karesi: ${deger * deger}")
    }
}

akillıTipDonusumu("Kotlin")  // Metnin uzunluğu: 6
akillıTipDonusumu(5)         // Sayının karesi: 25`}</CodeBlock>

  <h2>Any, Unit, Nothing</h2>
  <CodeBlock language="kotlin">{`// Any: tüm tiplerin üst tipi
val herhangiTip: Any = "Bu bir string"
val baskaTip: Any = 123
val dahaFarkli: Any = true

// Unit: değer döndürmeyen fonksiyonlar (Java'da void)
fun selamVer(): Unit {
    println("Merhaba!")
}

// Nothing: normal şekilde sonlanmayan fonksiyonlar
fun hataFirlat(): Nothing {
    throw Exception("Bu bir hata!")
}`}</CodeBlock>
    </div>
  );
}

export default DataTypes;


