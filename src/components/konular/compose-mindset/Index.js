import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function ComposeMindsetIndex() {
  return (
    <TopicLayout
      title="Compose Mindset - Jetpack Compose Temelleri"
      description="Jetpack Compose'un deklaratif yaklaşımı, composable fonksiyonlar, remember, state hoisting, recomposition ve performans ipuçlarıyla Compose düşünce yapısı."
      canonical="https://kotlin-kotlin.web.app/compose-mindset"
      backLink="/hafta1"
      topicPath="/compose-mindset"
    >

      <section className="section">
        <h2>1. Compose Nedir ve Neden Devrim Niteliğinde?</h2>
        <p>Jetpack Compose, Android'in modern UI toolkit'idir. 2021'de stable oldu. XML layout'ların yerine Kotlin kodu ile UI yazarsınız.</p>
        <div className="topic-card">
          <h3>Eski Sistem (XML/View)</h3>
          <ul>
            <li>activity_main.xml'de UI tanımla</li>
            <li>MainActivity.kt'de findViewById ile bağla</li>
            <li>Değişiklik için view'ları manuel güncelle</li>
            <li>İki farklı dosya ve dil (XML + Kotlin)</li>
          </ul>
          <h3>Compose ile</h3>
          <ul>
            <li>Her şey Kotlin</li>
            <li>Tek dosyada UI ve logic</li>
            <li>Reactive: state değişince otomatik güncellenir</li>
            <li>Çok daha az ve okunabilir kod</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>2. Declarative vs Imperative UI</h2>
        <p>Compose'u anlamanın anahtarı: nasıl (imperative) yerine ne (declarative) demek.</p>
        <div className="topic-card">
          <h3>IMPERATIVE (XML/View System)</h3>
          <p>"Nasıl" yapılacağını adım adım söylersiniz.</p>
          <CodeBlock language="kotlin">{`class MainActivity : Activity() {
    private lateinit var textView: TextView
    private lateinit var button: Button
    private var counter = 0
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        textView = findViewById(R.id.textView)
        button = findViewById(R.id.button)
        
        // Butona tıklandığında - ADIM ADIM TALİMATLAR
        button.setOnClickListener {
            counter++                              // 1. Counter'ı arttır
            textView.text = "Sayı: $counter"      // 2. Text'i güncelle
            if (counter > 5) {                    // 3. Koşulu kontrol et
                textView.setTextColor(Color.RED)  // 4. Rengi değiştir
            } else {
                textView.setTextColor(Color.GREEN) // 5. Veya bu rengi kullan
            }
        }
    }
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>DECLARATIVE (Compose)</h3>
          <p>"Ne" istediğinizi söylersiniz; nasıl yapılacağını Compose halleder.</p>
          <CodeBlock language="kotlin">{`@Composable
fun CounterScreen() {
    var counter by remember { mutableStateOf(0) }
    
    Column {
        Text(
            text = "Sayı: $counter",
            color = if (counter > 5) Color.Red else Color.Green
        )
        
        Button(onClick = { counter++ }) {
            Text("Arttır")
        }
    }
}`}</CodeBlock>
          <p>Imperative: "Text'i bul, değiştir"; Declarative: "counter &gt; 5 ise kırmızı olsun". State değişince UI otomatik recompose olur.</p>
        </div>
      </section>

      <section className="section">
        <h2>3. Composable Functions</h2>
        <p>Composable function, UI üreten fonksiyondur ve <code>@Composable</code> ile işaretlenir. Kurallar: composable olmalı, büyük harfle başlaması tercih edilir, Unit döndürür, side-effect'ten kaçınılır, aynı input aynı UI üretmelidir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun Greeting(name: String) {
    Text(text = "Merhaba $name!")
}

@Composable
fun WelcomeScreen() {
    Column {
        Greeting("Ali")
        Greeting("Veli")
        Button(onClick = {}) {
            Text("Tıkla")
        }
    }
}`}</CodeBlock>
        </div>
                <div className="topic-card">
                    <h3>Composable'lar Normal Fonksiyon Değildir</h3>
                    <CodeBlock language="kotlin">{`// Normal fonksiyon hemen çalışır ve değer döndürür
fun topla(a: Int, b: Int) = a + b
val sonuc = topla(3, 5)  // 8

// Composable fonksiyon UI üretir ve sadece Composable scope içinde çağrılır
@Composable
fun UserCard(user: User) { /* ... */ }
// UserCard(user)  // HATA: Composable sadece Composable içinde çağrılabilir
`}</CodeBlock>
                    <ul>
                        <li>Compose compiler özel işleme tabi tutar</li>
                        <li>UI tree'ye node ekler</li>
                        <li>Recomposition döngüsüne katılır</li>
                        <li>Sadece composable scope'ta çağrılabilir</li>
                    </ul>
                </div>
      </section>

      <section className="section">
        <h2>4. Recomposition - Compose'un Kalbi</h2>
        <p>Recomposition, state değişince sadece ilgili UI parçalarının yeniden çizilmesidir. Compose akıllıca sadece gereken yerleri çalıştırır.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun UserProfile() {
    var userName by remember { mutableStateOf("Ali") }
    var userAge by remember { mutableStateOf(25) }
    var showDetails by remember { mutableStateOf(false) }
    
    Column {
        Text("İsim: $userName")
        Text("Yaş: $userAge")
        
        Button(onClick = { showDetails = !showDetails }) {
            Text(if (showDetails) "Gizle" else "Göster")
        }
        
        if (showDetails) {
            UserDetailsSection()
        }
    }
}`}</CodeBlock>
        </div>
                <div className="topic-card">
                    <h3>Recomposition Süreci</h3>
                    <ol>
                        <li>State değişir (ör. userName = "Veli")</li>
                        <li>Compose değişikliği algılar</li>
                        <li>Bu state'i kullanan Composable'ları bulur</li>
                        <li>Sadece o bölümleri yeniden çalıştırır</li>
                        <li>UI güncellenir</li>
                    </ol>
                </div>
                <ul>
                    <li>Animasyonlarda her frame'de tetiklenebilir (60 fps)</li>
                    <li>Scroll ve text input'ta sıkça olur</li>
                    <li>Composable'lar hızlı, side-effect'siz ve hafif olmalı</li>
                </ul>
      </section>

      <section className="section">
        <h2>5. remember ve rememberSaveable</h2>
        <p>Recomposition'da normal değişkenler sıfırlanır; <code>remember</code> ile korunur. <code>rememberSaveable</code> ise konfigürasyon değişikliklerinde de hayatta kalır.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun WrongCounter() {
    var count = 0  // YANLIŞ! Her recomposition'da 0 olur
    
    Button(onClick = { count++ }) {
        Text("Sayı: $count")  // Hep 0
    }
}

@Composable
fun CorrectCounter() {
    var count by remember { mutableStateOf(0) }
    
    Button(onClick = { count++ }) {
        Text("Sayı: $count")
    }
}

@Composable
fun PersistentCounter() {
    var count by rememberSaveable { mutableStateOf(0) }
    
    Button(onClick = { count++ }) {
        Text("Sayı: $count")
    }
}`}</CodeBlock>
        </div>
                <div className="topic-card">
                    <h3>remember Ne Zaman Temizlenir?</h3>
                    <ul>
                        <li>Composable composition'dan çıkınca</li>
                        <li>Parent recompose olup bu composable'ı çağırmazsa</li>
                        <li>Activity/Fragment destroy olunca</li>
                    </ul>
                    <h4>rememberSaveable</h4>
                    <ul>
                        <li>Configuration change'de (rotasyon) hayatta kalır</li>
                        <li>Process death sonrası state geri getirilebilir</li>
                        <li>Bundle'a serialize edilebilir tipler için uygundur</li>
                    </ul>
                </div>
      </section>

      <section className="section">
        <h2>6. State Hoisting</h2>
        <p>State'i üst seviyeye taşımak, reusable ve test edilebilir bileşenler sağlar; tek doğruluk kaynağı ve tek yönlü veri akışı oluşturur.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun BadTextField() {
    var text by remember { mutableStateOf("") }
    TextField(value = text, onValueChange = { text = it })
}

@Composable
fun GoodTextField(
    value: String,
    onValueChange: (String) -> Unit
) {
    TextField(value = value, onValueChange = onValueChange)
}

@Composable
fun FormScreen() {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    
    Column {
        GoodTextField(value = name, onValueChange = { name = it })
        GoodTextField(value = email, onValueChange = { email = it })
        
        Button(
            onClick = { /* name ve email'i kullan */ },
            enabled = name.isNotEmpty() && email.contains("@")
        ) { Text("Kaydet") }
    }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>7. Compose Performans İpuçları</h2>
        <ul>
          <li>Stable parametreler kullanın: primitive'ler, String ve immutable data class'lar</li>
          <li>Listelerde <code>key</code> verin</li>
          <li>Hesaplanmış değerler için <code>derivedStateOf</code> kullanın</li>
        </ul>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Stable
data class User(
    val id: Int,
    val name: String
)

@Composable
fun SearchScreen() {
    var searchQuery by remember { mutableStateOf("") }
    val userList by remember { mutableStateOf(users) }
    
    // İyi: sadece bağımlılıklar değişince hesaplanır
    val filteredList by remember(searchQuery, userList) {
        derivedStateOf {
            userList.filter { it.name.contains(searchQuery) }
        }
    }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>8. Compose vs XML Karşılaştırma</h2>
                <div className="topic-card">
                    <div style={{display:'grid', gap:'12px'}}>
                        <div>
                            <h3>XML/View System</h3>
                            <ul>
                                <li>2 dosya (XML + Kotlin)</li>
                                <li>findViewById veya View/Data Binding</li>
                                <li>Manuel state yönetimi</li>
                                <li>Boilerplate kod fazla</li>
                                <li>Preview sınırlı</li>
                                <li>Animasyon zor</li>
                                <li>Custom view karmaşık</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Compose</h3>
                            <ul>
                                <li>Tek dosya (Kotlin)</li>
                                <li>Direct access</li>
                                <li>State-driven UI</li>
                                <li>Otomatik güncelleme</li>
                                <li>Minimum kod</li>
                                <li>Güçlü preview</li>
                                <li>Animasyon kolay</li>
                                <li>Composition kolay</li>
                            </ul>
                        </div>
                    </div>
          <h3>Örnek: Visible/Invisible</h3>
          <CodeBlock language="kotlin">{`// XML
button.visibility = if (condition) View.VISIBLE else View.GONE

// Compose
if (condition) {
    Button(onClick = { /* ... */ }) { Text("Tıkla") }
}`}</CodeBlock>
          <p>Compose'da yok olan UI elemanı gerçekten composition'dan çıkar; sadece gizlenmez.</p>
        </div>
      </section>

      <section className="section">
        <h2>9. Gerçek Compose Örneği: LoginScreen</h2>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun LoginScreen(
    onLoginClick: (String, String) -> Unit
) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }
    
    val isFormValid by remember {
        derivedStateOf { email.contains("@") && password.length >= 6 }
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        OutlinedTextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Şifre") },
            visualTransformation = if (passwordVisible)
                VisualTransformation.None else PasswordVisualTransformation(),
            trailingIcon = {
                IconButton(onClick = { passwordVisible = !passwordVisible }) {
                    Icon(
                        imageVector = if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                        contentDescription = null
                    )
                }
            },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        Button(
            onClick = {
                isLoading = true
                onLoginClick(email, password)
            },
            enabled = isFormValid && !isLoading,
            modifier = Modifier.fillMaxWidth()
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(16.dp),
                    color = MaterialTheme.colors.onPrimary
                )
            } else {
                Text("Giriş Yap")
            }
        }
    }
}`}</CodeBlock>
        </div>
      </section>

      <Notes topicPath="/compose-mindset" topicTitle="Compose Mindset" />

      <div className="navigation-links">
        <Link to="/collections-operators" className="nav-button">Collections ve Operators</Link>
                <Link to="/temel-ui-componentleri" className="nav-button">Temel UI Componentleri</Link>
      </div>
    </TopicLayout>
  );
}
