import React from 'react';
import { Link } from 'react-router-dom';
import TopicLayout from '../../layout/TopicLayout';
import Notes from '../../notes/Notes';
import CodeBlock from '../../ui/CodeBlock';

export default function TemelUIIndex() {
  return (
    <TopicLayout
      title="Temel UI Componentleri - Jetpack Compose"
      description="Compose'da Text, Button, TextField, Column/Row/Box, LazyColumn/LazyRow, Card, Surface, Scaffold ve pratik örnekler."
      canonical="https://kotlin-kotlin.web.app/temel-ui-componentleri"
      backLink="/hafta1"
      topicPath="/temel-ui-componentleri"
    >

      <section className="section">
        <h2>1. Compose'da UI Component Yapısı</h2>
        <p>Compose'da her UI elementi bir Composable function'dır. XML'deki View'ların yerini Composable'lar alır.</p>
        <div className="topic-card">
          <ul>
            <li>TextView → <code>Text</code></li>
            <li>Button → <code>Button</code></li>
            <li>EditText → <code>TextField</code></li>
            <li>LinearLayout → <code>Column/Row</code></li>
            <li>FrameLayout → <code>Box</code></li>
            <li>ScrollView → <code>Scrollable Column</code></li>
            <li>RecyclerView → <code>LazyColumn/LazyRow</code></li>
            <li>CardView → <code>Card</code></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>2. Text Composable</h2>
        <p>Text, XML'deki TextView karşılığıdır ve çok daha esnektir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun TextOrnekleri() {
    // En basit kullanım
    Text("Merhaba Dünya")
    
    // Stil özellikleriyle
    Text(
        text = "Renkli ve Büyük Text",
        color = Color.Red,
        fontSize = 24.sp,
        fontWeight = FontWeight.Bold,
        fontStyle = FontStyle.Italic,
        fontFamily = FontFamily.Cursive,
        letterSpacing = 2.sp,
        textDecoration = TextDecoration.Underline,
        textAlign = TextAlign.Center,
        maxLines = 2,
        overflow = TextOverflow.Ellipsis
    )
    
    // Material Typography
    Text(text = "Başlık", style = MaterialTheme.typography.h4)
    Text(text = "Alt başlık", style = MaterialTheme.typography.subtitle1)
    Text(text = "Gövde metni", style = MaterialTheme.typography.body1)
    
    // AnnotatedString - farklı stiller
    Text(
        buildAnnotatedString {
            withStyle(style = SpanStyle(color = Color.Blue)) { append("Mavi ") }
            append("normal ")
            withStyle(style = SpanStyle(fontWeight = FontWeight.Bold)) { append("kalın ") }
            withStyle(style = SpanStyle(fontSize = 20.sp, color = Color.Red)) { append("büyük kırmızı") }
        }
    )
    
    // Tıklanabilir text
    Text(
        text = "Tıkla bana!",
        modifier = Modifier.clickable { println("Text'e tıklandı") }
    )
    
    // Selectable text
    SelectionContainer { Text("Bu text seçilebilir ve kopyalanabilir") }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>3. Button Composable</h2>
        <p>Kullanıcı etkileşimi için temel component; Material yönergelerine uygun hazır durumlar ve animasyonlar içerir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun ButtonOrnekleri() {
    // Basit button
    Button(onClick = { println("Tıklandı") }) { Text("Basit Buton") }
    
    // İkon ve text
    Button(onClick = { /* TODO */ }, modifier = Modifier.fillMaxWidth()) {
        Icon(Icons.Default.ShoppingCart, contentDescription = null, modifier = Modifier.size(18.dp))
        Spacer(modifier = Modifier.width(8.dp))
        Text("Sepete Ekle")
    }
    
    // Farklı tipler
    Button(onClick = {}) { Text("Filled Button") }
    OutlinedButton(onClick = {}) { Text("Outlined Button") }
    TextButton(onClick = {}) { Text("Text Button") }
    IconButton(onClick = {}) { Icon(Icons.Default.Favorite, contentDescription = "Favori") }
    FloatingActionButton(onClick = {}, backgroundColor = MaterialTheme.colors.primary) { Icon(Icons.Default.Add, contentDescription = "Ekle") }
    ExtendedFloatingActionButton(text = { Text("Yeni Görev") }, icon = { Icon(Icons.Default.Add, contentDescription = null) }, onClick = {})
    
    // Özelleştirme
    Button(
        onClick = {},
        enabled = false,
        colors = ButtonDefaults.buttonColors(
            backgroundColor = Color.Green,
            contentColor = Color.White,
            disabledBackgroundColor = Color.Gray,
            disabledContentColor = Color.LightGray
        ),
        elevation = ButtonDefaults.elevation(defaultElevation = 8.dp, pressedElevation = 16.dp),
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(2.dp, Color.Black),
        modifier = Modifier.fillMaxWidth().height(56.dp)
    ) { Text("Özelleştirilmiş Buton") }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>4. TextField Composable</h2>
        <p>XML'deki EditText'in karşılığı; doğrulama, ikonlar, dönüştürmeler ve klavye aksiyonlarıyla güçlüdür.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun TextFieldOrnekleri() {
    var text by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var phone by remember { mutableStateOf("") }
    
    TextField(value = text, onValueChange = { text = it }, label = { Text("İsim") })
    
    OutlinedTextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Email") },
        placeholder = { Text("ornek@email.com") },
        leadingIcon = { Icon(Icons.Default.Email, contentDescription = null) },
        trailingIcon = {
            if (text.isNotEmpty()) {
                IconButton(onClick = { text = "" }) { Icon(Icons.Default.Clear, contentDescription = "Temizle") }
            }
        },
        isError = !text.contains("@"),
        singleLine = true,
        modifier = Modifier.fillMaxWidth()
    )
    
    var passwordVisible by remember { mutableStateOf(false) }
    OutlinedTextField(
        value = password,
        onValueChange = { password = it },
        label = { Text("Şifre") },
        visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
        trailingIcon = {
            IconButton(onClick = { passwordVisible = !passwordVisible }) {
                Icon(if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff, contentDescription = null)
            }
        }
    )
    
    OutlinedTextField(
        value = phone,
        onValueChange = { newValue -> if (newValue.all { it.isDigit() }) phone = newValue },
        label = { Text("Telefon") },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone, imeAction = ImeAction.Done),
        keyboardActions = KeyboardActions(onDone = { println("Telefon: ${'${'}phone{'}'}") }),
        visualTransformation = PhoneVisualTransformation()
    )
}

class PhoneVisualTransformation : VisualTransformation {
    override fun filter(text: AnnotatedString): TransformedText {
        val trimmed = text.text.take(10)
        val out = StringBuilder()
        
        for (i in trimmed.indices) {
            when (i) {
                0 -> out.append("(")
                3 -> out.append(") ")
                6 -> out.append("-")
            }
            out.append(trimmed[i])
        }
        
        return TransformedText(AnnotatedString(out.toString()), phoneNumberOffsetTranslator)
    }
    
    private val phoneNumberOffsetTranslator = object : OffsetMapping {
        override fun originalToTransformed(offset: Int): Int = offset
        override fun transformedToOriginal(offset: Int): Int = offset
    }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>5. Layout Composables: Column, Row, Box</h2>
        <p>Compose'ın temel layout container'larıdır; LinearLayout/FrameLayout karşılığı.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun LayoutOrnekleri() {
    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        verticalArrangement = Arrangement.SpaceEvenly,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("Üst"); Text("Orta"); Text("Alt")
    }
    
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) { Text("Sol"); Text("Orta"); Text("Sağ") }
    
    Box(modifier = Modifier.size(200.dp), contentAlignment = Alignment.Center) {
        Image(painter = painterResource(id = R.drawable.background), contentDescription = null, modifier = Modifier.fillMaxSize())
        Text("Üstteki Text", color = Color.White, fontSize = 20.sp, fontWeight = FontWeight.Bold)
        Icon(Icons.Default.Close, contentDescription = null, modifier = Modifier.align(Alignment.TopEnd))
    }
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Gerçek Kullanım: Profil Kartı</h3>
          <CodeBlock language="kotlin">{`@Composable
fun ProfileCard() {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text("Profil", style = MaterialTheme.typography.h5)
            IconButton(onClick = {}) { Icon(Icons.Default.Settings, contentDescription = "Ayarlar") }
        }
        Spacer(modifier = Modifier.height(16.dp))
        Card(modifier = Modifier.fillMaxWidth(), elevation = 4.dp) {
            Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(modifier = Modifier.size(60.dp).clip(CircleShape).background(Color.Gray))
                Spacer(modifier = Modifier.width(16.dp))
                Column {
                    Text("Kullanıcı Adı", fontWeight = FontWeight.Bold)
                    Text("kullanici@email.com", color = Color.Gray, fontSize = 14.sp)
                }
            }
        }
    }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>6. LazyColumn ve LazyRow</h2>
        <p>RecyclerView muadili; sadece görünen elemanlar render edilir.</p>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun LazyLayoutOrnekleri() {
    data class User(val id: Int, val name: String, val email: String)
    val users = remember {
        List(100) { index -> User(id = index, name = "Kullanıcı ${'${'}index{'}'}", email = "user${'${'}index{'}'}@email.com") }
    }
    
    LazyColumn(modifier = Modifier.fillMaxSize(), contentPadding = PaddingValues(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        item { Text("Kullanıcı Listesi", style = MaterialTheme.typography.h5) }
        items(items = users, key = { it.id }) { user -> UserCard(user = user) }
        item { Spacer(modifier = Modifier.height(80.dp)) }
    }
    
    LazyRow(contentPadding = PaddingValues(horizontal = 16.dp), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        items(10) { index ->
            Card(modifier = Modifier.size(120.dp, 160.dp), elevation = 4.dp) {
                Box(contentAlignment = Alignment.Center) { Text("Kart ${'${'}index{'}'}") }
            }
        }
    }
}`}</CodeBlock>
        </div>
        <div className="topic-card">
          <h3>Sticky Header, Grup ve Pagination</h3>
          <CodeBlock language="kotlin">{`@Composable
fun GroupedList(users: List<User>) {
    val groupedUsers = users.groupBy { it.name.first() }
    LazyColumn {
        stickyHeader {
            Row(modifier = Modifier.fillMaxWidth().background(Color.White).padding(16.dp)) {
                Text("Sabit Başlık", fontWeight = FontWeight.Bold)
            }
        }
        groupedUsers.forEach { (letter, userList) ->
            item { Text(letter.toString(), modifier = Modifier.padding(16.dp), fontWeight = FontWeight.Bold) }
            items(userList) { user -> UserListItem(user) }
        }
    }
}

@Composable
fun PaginatedList(users: List<User>) {
    val listState = rememberLazyListState()
    LazyColumn(state = listState) {
        items(users) { user ->
            UserCard(user)
            val lastIndex = users.lastIndex
            if (users.indexOf(user) == lastIndex - 5) {
                LaunchedEffect(Unit) { /* loadMoreUsers() */ }
            }
        }
        item {
            Box(modifier = Modifier.fillMaxWidth().padding(16.dp), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
        }
    }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>7. Card, Surface, Scaffold</h2>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun MaterialComponentOrnekleri() {
    Card(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        elevation = 8.dp,
        shape = RoundedCornerShape(16.dp),
        backgroundColor = Color.White,
        border = BorderStroke(1.dp, Color.Gray)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text("Kart Başlığı", fontWeight = FontWeight.Bold)
            Spacer(modifier = Modifier.height(8.dp))
            Text("Kart içeriği buraya gelir")
        }
    }
    
    Surface(modifier = Modifier.size(100.dp), shape = CircleShape, color = MaterialTheme.colors.primary, elevation = 4.dp) {
        Box(contentAlignment = Alignment.Center) { Text("S", color = Color.White, fontSize = 32.sp) }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Başlık") },
                navigationIcon = { IconButton(onClick = {}) { Icon(Icons.Default.Menu, contentDescription = null) } },
                actions = {
                    IconButton(onClick = {}) { Icon(Icons.Default.Search, contentDescription = null) }
                    IconButton(onClick = {}) { Icon(Icons.Default.MoreVert, contentDescription = null) }
                }
            )
        },
        bottomBar = {
            BottomNavigation {
                BottomNavigationItem(selected = true, onClick = {}, icon = { Icon(Icons.Default.Home, null) }, label = { Text("Ana Sayfa") })
                BottomNavigationItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Person, null) }, label = { Text("Profil") })
            }
        },
        floatingActionButton = { FloatingActionButton(onClick = {}) { Icon(Icons.Default.Add, contentDescription = "Ekle") } },
        floatingActionButtonPosition = FabPosition.End,
        drawerContent = { Column(modifier = Modifier.padding(16.dp)) { Text("Menü Öğesi 1"); Text("Menü Öğesi 2") } }
    ) { paddingValues ->
        Column(modifier = Modifier.padding(paddingValues).fillMaxSize()) { Text("Ana içerik buraya gelir") }
    }
}`}</CodeBlock>
        </div>
      </section>

      <section className="section">
        <h2>8. Yardımcı Bileşen: UserCard</h2>
        <div className="topic-card">
          <CodeBlock language="kotlin">{`@Composable
fun UserCard(user: User) {
    Card(modifier = Modifier.fillMaxWidth(), elevation = 2.dp) {
        Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
            Surface(modifier = Modifier.size(48.dp), shape = CircleShape, color = MaterialTheme.colors.primary) {
                Box(contentAlignment = Alignment.Center) {
                    Text(user.name.first().toString(), color = Color.White, fontWeight = FontWeight.Bold)
                }
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(user.name, fontWeight = FontWeight.Bold)
                Text(user.email, color = Color.Gray, fontSize = 14.sp)
            }
        }
    }
}`}</CodeBlock>
        </div>
      </section>

      <Notes topicPath="/temel-ui-componentleri" topicTitle="Temel UI Componentleri" />

      <div className="navigation-links">
        <Link to="/compose-mindset" className="nav-button">Compose Mindset</Link>
                <Link to="/state-management-temelleri" className="nav-button">State Management Temelleri</Link>
      </div>
    </TopicLayout>
  );
}
