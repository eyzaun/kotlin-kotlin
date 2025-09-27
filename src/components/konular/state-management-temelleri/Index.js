import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function StateManagementIndex() {
  return (
    <TopicLayout
      title="State Management Temelleri - Jetpack Compose"
      description="Compose'da state nedir, remember/mutableStateOf, rememberSaveable, state hoisting, derivedStateOf ve performans ipuçları."
      canonical="https://kotlin-kotlin.web.app/state-management-temelleri"
      backLink="/hafta1"
      topicPath="/state-management-temelleri"
    >
      <section className="section">
        <h2>1. State Nedir? UI ile İlişkisi</h2>
        <p>State, UI'ınızın nasıl görüneceğini belirleyen değişebilir veridir. Compose'da UI, state'in bir fonksiyonudur: UI = f(State). State değişirse ilgili UI otomatik olarak yeniden çizilir (recomposition).</p>
        <ul>
          <li>Single Source of Truth: State tek bir yerde tutulmalı</li>
          <li>Unidirectional Data Flow: Veri yukarıdan aşağı akar, event'ler aşağıdan yukarı çıkar</li>
          <li>İzole Bileşenler: State hoisting ile yeniden kullanılabilirlik</li>
        </ul>
      </section>

      <section className="section">
        <h2>2. remember ve mutableStateOf</h2>
        <p>Recomposition sırasında normal değişkenler sıfırlanır. <code>remember</code>, bu değeri kompozisyon ömrü boyunca hatırlar. <code>mutableStateOf</code> ile birlikte kullanıldığında reaktif UI akışı sağlar.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun WrongCounter() {
    var count = 0 // YANLIŞ: her recomposition'da 0 olur
    Button(onClick = { count++ }) { Text("Sayı: $count") }
}

@Composable
fun CorrectCounter() {
    var count by remember { mutableStateOf(0) }
    Button(onClick = { count++ }) { Text("Sayı: $count") }
}
`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>State Okuma ve Yazma</h3>
          <CodeBlock language="kotlin">{`@Composable
fun ToggleExample() {
    var enabled by remember { mutableStateOf(false) }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Switch(checked = enabled, onCheckedChange = { enabled = it })
        Spacer(Modifier.width(8.dp))
        Text(if (enabled) "Açık" else "Kapalı")
    }
}
`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>3. rememberSaveable</h2>
        <p><code>remember</code> değeri, composable composition'dan çıkınca veya process öldüğünde kaybolur. <code>rememberSaveable</code> ise ekran döndürme (configuration change) ve process recreation sonrası state'i geri getirir (serileştirilebilir tipler için).</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun PersistentCounter() {
    var count by rememberSaveable { mutableStateOf(0) }
    Button(onClick = { count++ }) { Text("Sayı: $count") }
}
`}</CodeBlock>
          <ul>
            <li>Custom tipler için <code>Saver</code> yazabilirsiniz</li>
            <li>NavBackStackEntry ile navigation kapsamına bağlı state kullanımı yaygındır</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>4. State Hoisting</h2>
        <p>State'i komponent dışına taşıyıp üst seviyede tutma tekniği. Tek doğruluk kaynağı sağlar, test edilebilirliği artırır ve yeniden kullanımı kolaylaştırır.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun BadTextField() {
    var text by remember { mutableStateOf("") }
    TextField(value = text, onValueChange = { text = it })
}

@Composable
fun GoodTextField(value: String, onValueChange: (String) -> Unit) {
    TextField(value = value, onValueChange = onValueChange)
}

@Composable
fun FormScreen() {
    var name by remember { mutableStateOf("") }
    var email by remember { mutableStateOf("") }
    Column {
        GoodTextField(value = name, onValueChange = { name = it })
        GoodTextField(value = email, onValueChange = { email = it })
        Button(onClick = { /* submit */ }, enabled = name.isNotEmpty() && email.contains("@")) {
            Text("Kaydet")
        }
    }
}
`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>5. derivedStateOf</h2>
        <p>Başka state'lerden türetilen hesaplanmış değerleri performanslı şekilde üretir. Yalnızca bağımlılıklar değiştiğinde yeniden hesaplanır.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun SearchScreen(users: List<User>) {
    var query by remember { mutableStateOf("") }
    
    val filtered by remember(query, users) {
        derivedStateOf {
            users.filter { it.name.contains(query, ignoreCase = true) }
        }
    }
    
    Column(Modifier.padding(16.dp)) {
        OutlinedTextField(value = query, onValueChange = { query = it }, label = { Text("Ara") })
        Spacer(Modifier.height(8.dp))
        LazyColumn { items(filtered) { user -> Text(user.name) } }
    }
}
`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>6. Performans İpuçları</h2>
        <ul>
          <li>Heavy iş yüklerini composable içinde yapmayın; <code>remember</code> ile cache'leyin</li>
          <li>Immutable veri yapıları ve stable parametreler kullanın</li>
          <li>Listelerde <code>key</code> sağlayın ve item'ları küçük tutun</li>
          <li>Composable'ları side-effect'siz tutun; side effect için uygun API'leri kullanın</li>
        </ul>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Stable
data class User(val id: Int, val name: String)
`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>7. Mini Uygulama: Yapılacaklar</h2>
        <p>State hoisting ve derivedStateOf kullanımını bir arada gösteren basit bir örnek.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`data class Todo(val id: Long, val title: String, val done: Boolean)

@Composable
fun TodoScreen() {
    var items by rememberSaveable { mutableStateOf(listOf<Todo>()) }
    var text by remember { mutableStateOf("") }
    val remaining by remember(items) { derivedStateOf { items.count { !it.done } } }

    Column(Modifier.padding(16.dp)) {
        Row {
            OutlinedTextField(value = text, onValueChange = { text = it }, modifier = Modifier.weight(1f))
            Spacer(Modifier.width(8.dp))
            Button(onClick = {
                if (text.isNotBlank()) {
                    items = items + Todo(id = System.currentTimeMillis(), title = text, done = false)
                    text = ""
                }
            }) { Text("Ekle") }
        }
        Text("Kalan: ${'${'}remaining{'}'}")
        Spacer(Modifier.height(8.dp))
        LazyColumn { items(items, key = { it.id }) { todo -> TodoRow(todo) { updated ->
            items = items.map { if (it.id == updated.id) updated else it }
        } } }
    }
}

@Composable
fun TodoRow(todo: Todo, onToggle: (Todo) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
        Checkbox(checked = todo.done, onCheckedChange = { onToggle(todo.copy(done = it)) })
        Spacer(Modifier.width(8.dp))
        Text(if (todo.done) "✓ ${'${'}todo.title{'}'}" else todo.title)
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
