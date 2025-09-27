// Simple sitemap generator for CRA + react-router SPA hosted on Firebase
// Update baseUrl to your production domain
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.SITEMAP_BASE_URL || 'https://kotlin-kotlin.web.app';

// List all static routes you want indexed
// Keep this in sync with src/App.js routes
const routes = [
  '/',
  '/hafta1', '/hafta2',
  // Kotlin Syntax Temelleri (tek sayfa)
  '/kotlin-syntax-temelleri',
  // Fonksiyonlar ve Lambda (tek sayfa)
  '/fonksiyonlar-lambda',
  // Classes ve Objects (tek sayfa)
  '/classes-objects',
  // Collections ve Operators (tek sayfa)
  '/collections-operators',
  // Compose Mindset (tek sayfa)
  '/compose-mindset',
  // Temel UI Componentleri (tek sayfa)
  '/temel-ui-componentleri',
  // State Management Temelleri
  '/state-management-temelleri',
  // Modifier Sistemi
  '/paddingmarginsize','/backgroundborderclip','/clickableswipeable',
  // MVVM Pattern
  '/modelviewviewmodel','/viewmodellifecycle','/livedatastateflow',
  // Clean Architecture Katmanları
  '/presentationlayer','/domainlayer','/datalayer',
  // Dependency Injection Temelleri
  '/hiltdaggerbasics','/injectprovidesmodule','/viewmodelinjection',
  // Event-State Architecture
  '/uieventsuistate','/sealedclassinterface','/dataclassstates','/stateflowsharedflow',
  // Side Effects in Compose
  '/launchedeffect','/disposableeffect','/sideeffect','/remembercoroutinescope',
  // Navigation Component
  '/navhostnavcontroller','/argumentspassing','/bottomnavigation',
  // Retrofit ile REST API
  '/retrofitsetup','/interceptors','/responsehandling','/coroutinesasync',
  // Local Storage
  '/roomdatabase','/entitydaodatabase','/cachestrategies','/datastorepreferences',
  // Image Loading ve Caching
  '/coillibrary','/imagecaching','/bitmapoptimization',
  // Material Design 3
  '/themeyapisi','/darklighttheme','/dynamiccolors',
  // Animasyonlar
  '/lottieintegration','/animatefloatcolor','/animatedvisibility','/swipetodelete',
  // Responsive Design
  '/screensizes','/orientationchanges','/windowsizeclasses',
  // SOLID Prensipleri
  '/singleresponsibility','/openclosed','/liskovsubstitution','/interfacesegregation','/dependencyinversion',
  // Code Organization
  '/packagestructure','/dryprinciple','/kissprinciple',
  // Testing Temelleri
  '/unittestbasics','/viewmodeltesting','/uitestingcompose',
  // Contact Permissions
  '/runtimepermissions','/contactsproviderapi',
  // Swipe Actions Implementation
  '/swipeablemodifier','/deleteeditactions',
  // Search Functionality
  '/searchhistory','/debouncethrottle','/filteringgrouping'
];

function formatDate(d) {
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
const lastmod = formatDate(new Date());

// Generate the URL set (pages)
const urls = routes.map((r) => `  <url>\n    <loc>${baseUrl}${r}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.6'}</priority>\n  </url>`).join('\n');

const urlsetXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const outDir = path.join(__dirname, '..', 'build');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap-pages.xml'), urlsetXml, 'utf8');

// Generate sitemap index that references the pages sitemap
const indexXml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <sitemap>\n    <loc>${baseUrl}/sitemap-pages.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n</sitemapindex>\n`;
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), indexXml, 'utf8');
fs.writeFileSync(path.join(outDir, 'sitemap_index.xml'), indexXml, 'utf8');

console.log('Sitemap index generated: build/sitemap.xml');
console.log('Sitemap pages generated: build/sitemap-pages.xml');

