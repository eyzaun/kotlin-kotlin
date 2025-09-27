import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function StateManagementIndex() {
  return (
    <TopicLayout
      title="State Management Temelleri - Jetpack Compose"
    description="Compose'da state nedir, remember/mutableStateOf, rememberSaveable, state hoisting, derivedStateOf, Kotlin delegation ve en iyi pratikler."
      canonical="https://kotlin-kotlin.web.app/state-management-temelleri"
      backLink="/hafta1"
      topicPath="/state-management-temelleri"
    >
      <section className="section">
    <h2>1. State Nedir ve Neden Kritik?</h2>
    <p>State = Zaman içinde değişebilen ve UI’ı etkileyen veri. Örneğin bir sayaç uygulamasında ekrandaki sayı state’tir; butona her bastığınızda değişir ve UI otomatik güncellenir.</p>
    <p>XML/View dünyasında bir değeri değiştirdikten sonra ilgili View’ı bulup her bir özelliği manuel güncellemeniz gerekir. Compose’da ise UI = f(State); state değişince ilgili UI otomatik recomposition ile yenilenir.</p>
      </section>

      <section className="section">
    <h2>2. remember ve mutableStateOf</h2>
    <p>Compose’da state oluşturmanın temel yolu <code>remember</code> + <code>mutableStateOf</code> ikilisidir. <code>mutableStateOf</code> değişiklikleri Compose’a bildirir; <code>remember</code> ise recomposition sırasında değerin korunmasını sağlar.</p>
    <div className="topic-card">
      <CodeBlock language="kotlin">{`@Composable
fun StateTemelOrnegi() {
  // YANLIŞ KULLANIM - Çalışmaz!
  var sayac1 = 0  // Normal değişken
  Button(onClick = { sayac1++ }) {
    Text("Sayaç: $sayac1")  // Her zaman 0 gösterir!
  }
  // NEDEN? Çünkü sayac1++ olduğunda Compose bunu bilmez, UI güncellemez
    
  // YANLIŞ KULLANIM 2 - Çalışmaz!
  val sayac2 = mutableStateOf(0)  // remember yok!
  Button(onClick = { sayac2.value++ }) {
    Text("Sayaç: ${'${'}sayac2.value{'}'}")  // Her recomposition'da 0'a döner!
  }
  // NEDEN? Her recomposition'da yeni mutableStateOf(0) oluşur
    
  // DOĞRU KULLANIM
  var sayac3 by remember { mutableStateOf(0) }
  Button(onClick = { sayac3++ }) {
    Text("Sayaç: $sayac3")  // Mükemmel çalışır!
  }
    
  /*
  Çalışma mantığı:
  1) İlk composition'da mutableStateOf(0) oluşur ve remember ile saklanır
  2) Butona tıklanınca sayac3++ olur
  3) State değişimi Compose'a recomposition sinyali gönderir
  4) Recomposition olur; remember sayesinde değer korunur
  5) Yeni değerle UI güncellenir
  */
}
`}</CodeBlock>
    </div>
      </section>

    <section className="section">
    <h2>3. Kotlin Delegation: by kullanımı</h2>
    <p>State’e iki şekilde erişebilirsiniz: <code>.value</code> ile veya Kotlin’in <code>by</code> delegation özelliğiyle. <code>by</code> kullanımı daha okunaklıdır.</p>
    <div className="topic-card">
      <CodeBlock language="kotlin">{`@Composable
fun DelegateOrnegi() {
  // 1. YOL - .value kullanımı
  val isim1 = remember { mutableStateOf("") }
  TextField(
    value = isim1.value,
    onValueChange = { isim1.value = it }
  )
    
  // 2. YOL - by delegate (önerilen)
  var isim2 by remember { mutableStateOf("") }
  TextField(
    value = isim2,
    onValueChange = { isim2 = it }
  )
}
// Not: import androidx.compose.runtime.getValue
//      import androidx.compose.runtime.setValue
`}</CodeBlock>
    </div>
    </section>

      <section className="section">
    <h2>4. rememberSaveable: Config Change'e dayanıklı</h2>
    <p><code>remember</code> recomposition’da hayatta kalır; <code>rememberSaveable</code> ise ekran döndürme gibi configuration değişikliklerinden sonra bile değeri geri yükler.</p>
    <div className="topic-card">
      <CodeBlock language="kotlin">{`@Composable
fun RememberSaveableOrnegi() {
  // remember - Ekran döndürülünce sıfırlanır
  var geciciDeger by remember { mutableStateOf("") }
    
  // rememberSaveable - Ekran döndürülse bile korunur
  var kaliciDeger by rememberSaveable { mutableStateOf("") }
    
  Column {
    TextField(
      value = geciciDeger,
      onValueChange = { geciciDeger = it },
      label = { Text("Dönünce silinir") }
    )
        
    TextField(
      value = kaliciDeger,
      onValueChange = { kaliciDeger = it },
      label = { Text("Dönünce kalır") }
    )
  }
    
  // Custom objeler için Saver
  data class User(val id: Int, val name: String)
    
  var user by rememberSaveable(
    stateSaver = Saver(
      save = { user -> mapOf("id" to user.id, "name" to user.name) },
      restore = { map -> User(map["id"] as Int, map["name"] as String) }
    )
  ) {
    mutableStateOf(User(1, "Ali"))
  }
}
`}</CodeBlock>
    </div>
      </section>

      <section className="section">
    <h2>5. State Hoisting - Çok önemli pattern</h2>
    <p>State’i onu kullanan en düşük ortak parent’a taşıyın. Böylece tek doğruluk kaynağı oluşur, yeniden kullanım ve test kolaylaşır.</p>
        <div className="topic-card">
      <CodeBlock language="kotlin">{`@Composable
fun KotuCounter() {
  var count by remember { mutableStateOf(0) }  // State içeride
  Button(onClick = { count++ }) {
    Text("Sayı: $count")
  }
}

@Composable
fun IyiCounter(
  count: Int,
  onIncrement: () -> Unit
) {
  Button(onClick = onIncrement) {
    Text("Sayı: $count")
  }
}

@Composable
fun CounterEkrani() {
  var count by remember { mutableStateOf(0) }
    
  Column {
    IyiCounter(
      count = count,
      onIncrement = { count++ }
    )
    Text("Toplam tıklama: $count")
    Button(
      onClick = { count = 0 },
      enabled = count > 0
    ) { Text("Sıfırla") }
  }
}
`}</CodeBlock>
        </div>
    <ul>
      <li>State’i kullanan en düşük ortak parent’a taşı</li>
      <li>State ve değiştirici fonksiyonları parametre olarak geçir</li>
      <li>Child composable’ları olabildiğince stateless tut</li>
    </ul>
      </section>

      <section className="section">
    <h2>6. derivedStateOf - Hesaplanmış state</h2>
    <p>Diğer state’lerden türetilen değerleri sadece bağımlılıklar değiştiğinde yeniden hesaplamak için kullanılır.</p>
    <div className="topic-card">
      <CodeBlock language="kotlin">{`@Composable
fun DerivedStateOrnegi() {
  var firstName by remember { mutableStateOf("") }
  var lastName by remember { mutableStateOf("") }
  val fullNameIyi by remember {
    derivedStateOf { "$firstName $lastName" }
  }
    
  var searchQuery by remember { mutableStateOf("") }
  val userList = remember { getUserList() }
  val filteredUsers by remember {
    derivedStateOf {
      if (searchQuery.isEmpty()) userList
      else userList.filter { it.name.contains(searchQuery, ignoreCase = true) }
    }
  }
    
  var email by remember { mutableStateOf("") }
  var password by remember { mutableStateOf("") }
  var passwordConfirm by remember { mutableStateOf("") }
  val isEmailValid by remember { derivedStateOf { email.contains("@") && email.contains(".") } }
  val isPasswordValid by remember { derivedStateOf { password.length >= 8 } }
  val doPasswordsMatch by remember { derivedStateOf { password == passwordConfirm && password.isNotEmpty() } }
  val isFormValid by remember { derivedStateOf { isEmailValid && isPasswordValid && doPasswordsMatch } }
    
  Button(onClick = { /* Submit */ }, enabled = isFormValid) { Text("Kayıt Ol") }
}
`}</CodeBlock>
    </div>
      </section>

      <section className="section">
    <h2>7. State Best Practices</h2>
    <ul>
      <li>State’i mümkün olan en düşük seviyede tutun</li>
      <li>Stateless composable tercih edin; state’i parent kontrol etsin</li>
      <li>Immutable veri yapıları kullanın: <code>list = list + item</code> (doğru), <code>list.add(item)</code> (yanlış)</li>
      <li>Lazy listelerde <code>key</code> kullanın: <code>items(list, key = {'{'} it.id {'}'})</code></li>
      <li>Hesaplanabilir değerler için gereksiz state tutmayın; <code>derivedStateOf</code> kullanın</li>
      <li>Business logic’i composable dışına taşıyın (ViewModel / UseCase)</li>
    </ul>
      </section>

      <section className="section">
    <h2>8. Gerçek Örnek: Login Form State Yönetimi</h2>
    <div className="topic-card">
      <CodeBlock language="kotlin">{`@Composable
fun LoginFormExample() {
  // Tüm state'ler
  var username by rememberSaveable { mutableStateOf("") }
  var password by rememberSaveable { mutableStateOf("") }
  var rememberMe by rememberSaveable { mutableStateOf(false) }
  var isLoading by remember { mutableStateOf(false) }
  var errorMessage by remember { mutableStateOf<String?>(null) }
    
  // Derived states - validasyon
  val isUsernameValid by remember { derivedStateOf { username.length >= 3 } }
  val isPasswordValid by remember { derivedStateOf { password.length >= 6 } }
  val canSubmit by remember { derivedStateOf { isUsernameValid && isPasswordValid && !isLoading } }
    
  Column(modifier = Modifier.padding(16.dp)) {
    OutlinedTextField(
      value = username,
      onValueChange = {
        username = it
        errorMessage = null
      },
      label = { Text("Kullanıcı Adı") },
      isError = username.isNotEmpty() && !isUsernameValid,
      supportingText = {
        if (username.isNotEmpty() && !isUsernameValid) {
          Text("En az 3 karakter olmalı")
        }
      }
    )
        
    OutlinedTextField(
      value = password,
      onValueChange = { password = it },
      label = { Text("Şifre") },
      visualTransformation = PasswordVisualTransformation(),
      isError = password.isNotEmpty() && !isPasswordValid
    )
        
    Row(verticalAlignment = Alignment.CenterVertically) {
      Checkbox(checked = rememberMe, onCheckedChange = { rememberMe = it })
      Text("Beni hatırla")
    }
        
    errorMessage?.let {
      Text(
        text = it,
        color = MaterialTheme.colors.error,
        modifier = Modifier.padding(vertical = 8.dp)
      )
    }
        
    Button(
      onClick = { isLoading = true /* Login işlemi... */ },
      enabled = canSubmit,
      modifier = Modifier.fillMaxWidth()
    ) {
      if (isLoading) {
        CircularProgressIndicator(modifier = Modifier.size(16.dp))
      } else {
        Text("Giriş Yap")
      }
    }
  }
}
`}</CodeBlock>
    </div>
      </section>

      <Notes topicPath="/state-management-temelleri" topicTitle="State Management Temelleri" />

      <div className="navigation-links">
        <Link to="/temel-ui-componentleri" className="nav-button">Temel UI Componentleri</Link>
        <Link to="/paddingmarginsize" className="nav-button">Modifier Sistemi</Link>
      </div>
    </TopicLayout>
  );
}
