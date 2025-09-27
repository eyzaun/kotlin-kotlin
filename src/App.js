import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Hafta1 from "./components/haftalar/Hafta1";
import Hafta2 from "./components/haftalar/Hafta2";
import TopNav from "./components/ui/TopNav";
import { CodePrefsProvider } from "./context/CodePrefsContext";
import { UIThemeProvider } from "./context/UIThemeContext";
import { DesignLanguageProvider } from "./context/DesignLanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import SettingsPage from "./components/settings/SettingsPage";
import Login from "./components/auth/Login";
import AllNotes from "./components/notes/AllNotes";
import "./design/design.css";
import NotesWidget from "./components/notes/NotesWidget";

// Lazy load topic components
const KotlinSyntaxTemelleri = React.lazy(() => import('./components/konular/kotlin-syntax-temelleri/Index'));
const FonksiyonlarLambda = React.lazy(() => import('./components/konular/fonksiyonlar-lambda/Index'));
const ClassesObjects = React.lazy(() => import('./components/konular/classes-objects/Index'));
const CollectionsOperators = React.lazy(() => import('./components/konular/collections-operators/Index'));
const ComposeMindset = React.lazy(() => import('./components/konular/compose-mindset/Index'));
const TemelUI = React.lazy(() => import('./components/konular/temel-ui-componentleri/Index'));
const StateManagement = React.lazy(() => import('./components/konular/state-management-temelleri/Index'));
const PaddingMarginSize = React.lazy(() => import('./components/konular/modifier-sistemi/PaddingMarginSize'));
const BackgroundBorderClip = React.lazy(() => import('./components/konular/modifier-sistemi/BackgroundBorderClip'));
const ClickableSwipeable = React.lazy(() => import('./components/konular/modifier-sistemi/ClickableSwipeable'));
const ModelViewViewModel = React.lazy(() => import('./components/konular/mvvm-pattern/ModelViewViewModel'));
const ViewModelLifecycle = React.lazy(() => import('./components/konular/mvvm-pattern/ViewModelLifecycle'));
const LiveDataStateFlow = React.lazy(() => import('./components/konular/mvvm-pattern/LiveDataStateFlow'));
const PresentationLayer = React.lazy(() => import('./components/konular/clean-architecture-katmanlari/PresentationLayer'));
const DomainLayer = React.lazy(() => import('./components/konular/clean-architecture-katmanlari/DomainLayer'));
const DataLayer = React.lazy(() => import('./components/konular/clean-architecture-katmanlari/DataLayer'));
const HiltDaggerBasics = React.lazy(() => import('./components/konular/dependency-injection-temelleri/HiltDaggerBasics'));
const InjectProvidesModule = React.lazy(() => import('./components/konular/dependency-injection-temelleri/InjectProvidesModule'));
const ViewModelInjection = React.lazy(() => import('./components/konular/dependency-injection-temelleri/ViewModelInjection'));
const UIEventsUIState = React.lazy(() => import('./components/konular/event-state-architecture/UIEventsUIState'));
const SealedClassInterface = React.lazy(() => import('./components/konular/event-state-architecture/SealedClassInterface'));
const DataClassStates = React.lazy(() => import('./components/konular/event-state-architecture/DataClassStates'));
const StateFlowSharedFlow = React.lazy(() => import('./components/konular/event-state-architecture/StateFlowSharedFlow'));
const LaunchedEffect = React.lazy(() => import('./components/konular/side-effects-compose/LaunchedEffect'));
const DisposableEffect = React.lazy(() => import('./components/konular/side-effects-compose/DisposableEffect'));
const SideEffect = React.lazy(() => import('./components/konular/side-effects-compose/SideEffect'));
const RememberCoroutineScope = React.lazy(() => import('./components/konular/side-effects-compose/RememberCoroutineScope'));
const NavHostNavController = React.lazy(() => import('./components/konular/navigation-component/NavHostNavController'));
const ArgumentsPassing = React.lazy(() => import('./components/konular/navigation-component/ArgumentsPassing'));
const BottomNavigation = React.lazy(() => import('./components/konular/navigation-component/BottomNavigation'));
const RetrofitSetup = React.lazy(() => import('./components/konular/retrofit-rest-api/RetrofitSetup'));
const Interceptors = React.lazy(() => import('./components/konular/retrofit-rest-api/Interceptors'));
const ResponseHandling = React.lazy(() => import('./components/konular/retrofit-rest-api/ResponseHandling'));
const CoroutinesAsync = React.lazy(() => import('./components/konular/retrofit-rest-api/CoroutinesAsync'));
const RoomDatabase = React.lazy(() => import('./components/konular/local-storage/RoomDatabase'));
const EntityDaoDatabase = React.lazy(() => import('./components/konular/local-storage/EntityDaoDatabase'));
const CacheStrategies = React.lazy(() => import('./components/konular/local-storage/CacheStrategies'));
const DataStorePreferences = React.lazy(() => import('./components/konular/local-storage/DataStorePreferences'));
const CoilLibrary = React.lazy(() => import('./components/konular/image-loading-caching/CoilLibrary'));
const ImageCaching = React.lazy(() => import('./components/konular/image-loading-caching/ImageCaching'));
const BitmapOptimization = React.lazy(() => import('./components/konular/image-loading-caching/BitmapOptimization'));
const ThemeYapisi = React.lazy(() => import('./components/konular/material-design-3/ThemeYapisi'));
const DarkLightTheme = React.lazy(() => import('./components/konular/material-design-3/DarkLightTheme'));
const DynamicColors = React.lazy(() => import('./components/konular/material-design-3/DynamicColors'));
const LottieIntegration = React.lazy(() => import('./components/konular/animasyonlar/LottieIntegration'));
const AnimateFloatColor = React.lazy(() => import('./components/konular/animasyonlar/AnimateFloatColor'));
const AnimatedVisibility = React.lazy(() => import('./components/konular/animasyonlar/AnimatedVisibility'));
const SwipeToDelete = React.lazy(() => import('./components/konular/animasyonlar/SwipeToDelete'));
const ScreenSizes = React.lazy(() => import('./components/konular/responsive-design/ScreenSizes'));
const OrientationChanges = React.lazy(() => import('./components/konular/responsive-design/OrientationChanges'));
const WindowSizeClasses = React.lazy(() => import('./components/konular/responsive-design/WindowSizeClasses'));
const SingleResponsibility = React.lazy(() => import('./components/konular/solid-prensipleri/SingleResponsibility'));
const OpenClosed = React.lazy(() => import('./components/konular/solid-prensipleri/OpenClosed'));
const LiskovSubstitution = React.lazy(() => import('./components/konular/solid-prensipleri/LiskovSubstitution'));
const InterfaceSegregation = React.lazy(() => import('./components/konular/solid-prensipleri/InterfaceSegregation'));
const DependencyInversion = React.lazy(() => import('./components/konular/solid-prensipleri/DependencyInversion'));
const PackageStructure = React.lazy(() => import('./components/konular/code-organization/PackageStructure'));
const DRYPrinciple = React.lazy(() => import('./components/konular/code-organization/DRYPrinciple'));
const KISSPrinciple = React.lazy(() => import('./components/konular/code-organization/KISSPrinciple'));
const UnitTestBasics = React.lazy(() => import('./components/konular/testing-temelleri/UnitTestBasics'));
const ViewModelTesting = React.lazy(() => import('./components/konular/testing-temelleri/ViewModelTesting'));
const UITestingCompose = React.lazy(() => import('./components/konular/testing-temelleri/UITestingCompose'));
const RuntimePermissions = React.lazy(() => import('./components/konular/contact-permissions/RuntimePermissions'));
const ContactsProviderAPI = React.lazy(() => import('./components/konular/contact-permissions/ContactsProviderAPI'));
const SwipeableModifier = React.lazy(() => import('./components/konular/swipe-actions-implementation/SwipeableModifier'));
const DeleteEditActions = React.lazy(() => import('./components/konular/swipe-actions-implementation/DeleteEditActions'));
const SearchHistory = React.lazy(() => import('./components/konular/search-functionality/SearchHistory'));
const DebounceThrottle = React.lazy(() => import('./components/konular/search-functionality/DebounceThrottle'));
const FilteringGrouping = React.lazy(() => import('./components/konular/search-functionality/FilteringGrouping'));

function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <CodePrefsProvider>
          <UIThemeProvider>
            <DesignLanguageProvider>
          <Router>
            <TopNav />
            {/* Global Notes widget (launcher + overlay) */}
            <NotesWidget />
            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hafta1" element={<Hafta1 />} />
          <Route path="/hafta2" element={<Hafta2 />} />
          <Route path="/giris" element={<Login />} />
          <Route path="/kayit" element={<Login />} />
          <Route path="/notlarim" element={<AllNotes />} />
          <Route path="/ayarlar" element={<SettingsPage />} />
          {/* Kotlin Syntax Temelleri */}
          <Route path="/kotlin-syntax-temelleri" element={<React.Suspense fallback={<div>Loading...</div>}><KotlinSyntaxTemelleri /></React.Suspense>} />
          {/* Fonksiyonlar ve Lambda (tek sayfa) */}
          <Route path="/fonksiyonlar-lambda" element={<React.Suspense fallback={<div>Loading...</div>}><FonksiyonlarLambda /></React.Suspense>} />
          {/* Classes ve Objects (tek sayfa) */}
          <Route path="/classes-objects" element={<React.Suspense fallback={<div>Loading...</div>}><ClassesObjects /></React.Suspense>} />
          {/* Collections ve Operators (tek sayfa) */}
          <Route path="/collections-operators" element={<React.Suspense fallback={<div>Loading...</div>}><CollectionsOperators /></React.Suspense>} />
          {/* Compose Mindset (tek sayfa) */}
          <Route path="/compose-mindset" element={<React.Suspense fallback={<div>Loading...</div>}><ComposeMindset /></React.Suspense>} />
          {/* Temel UI Componentleri (tek sayfa) */}
          <Route path="/temel-ui-componentleri" element={<React.Suspense fallback={<div>Loading...</div>}><TemelUI /></React.Suspense>} />
          {/* State Management Temelleri (tek sayfa) */}
          <Route path="/state-management-temelleri" element={<React.Suspense fallback={<div>Loading...</div>}><StateManagement /></React.Suspense>} />
          {/* Modifier Sistemi */}
          <Route path="/paddingmarginsize" element={<React.Suspense fallback={<div>Loading...</div>}><PaddingMarginSize /></React.Suspense>} />
          <Route path="/backgroundborderclip" element={<React.Suspense fallback={<div>Loading...</div>}><BackgroundBorderClip /></React.Suspense>} />
          <Route path="/clickableswipeable" element={<React.Suspense fallback={<div>Loading...</div>}><ClickableSwipeable /></React.Suspense>} />
          {/* MVVM Pattern */}
          <Route path="/modelviewviewmodel" element={<React.Suspense fallback={<div>Loading...</div>}><ModelViewViewModel /></React.Suspense>} />
          <Route path="/viewmodellifecycle" element={<React.Suspense fallback={<div>Loading...</div>}><ViewModelLifecycle /></React.Suspense>} />
          <Route path="/livedatastateflow" element={<React.Suspense fallback={<div>Loading...</div>}><LiveDataStateFlow /></React.Suspense>} />
          {/* Clean Architecture Katmanları */}
          <Route path="/presentationlayer" element={<React.Suspense fallback={<div>Loading...</div>}><PresentationLayer /></React.Suspense>} />
          <Route path="/domainlayer" element={<React.Suspense fallback={<div>Loading...</div>}><DomainLayer /></React.Suspense>} />
          <Route path="/datalayer" element={<React.Suspense fallback={<div>Loading...</div>}><DataLayer /></React.Suspense>} />
          {/* Dependency Injection Temelleri */}
          <Route path="/hiltdaggerbasics" element={<React.Suspense fallback={<div>Loading...</div>}><HiltDaggerBasics /></React.Suspense>} />
          <Route path="/injectprovidesmodule" element={<React.Suspense fallback={<div>Loading...</div>}><InjectProvidesModule /></React.Suspense>} />
          <Route path="/viewmodelinjection" element={<React.Suspense fallback={<div>Loading...</div>}><ViewModelInjection /></React.Suspense>} />
          {/* Event-State Architecture */}
          <Route path="/uieventsuistate" element={<React.Suspense fallback={<div>Loading...</div>}><UIEventsUIState /></React.Suspense>} />
          <Route path="/sealedclassinterface" element={<React.Suspense fallback={<div>Loading...</div>}><SealedClassInterface /></React.Suspense>} />
          <Route path="/dataclassstates" element={<React.Suspense fallback={<div>Loading...</div>}><DataClassStates /></React.Suspense>} />
          <Route path="/stateflowsharedflow" element={<React.Suspense fallback={<div>Loading...</div>}><StateFlowSharedFlow /></React.Suspense>} />
          {/* Side Effects in Compose */}
          <Route path="/launchedeffect" element={<React.Suspense fallback={<div>Loading...</div>}><LaunchedEffect /></React.Suspense>} />
          <Route path="/disposableeffect" element={<React.Suspense fallback={<div>Loading...</div>}><DisposableEffect /></React.Suspense>} />
          <Route path="/sideeffect" element={<React.Suspense fallback={<div>Loading...</div>}><SideEffect /></React.Suspense>} />
          <Route path="/remembercoroutinescope" element={<React.Suspense fallback={<div>Loading...</div>}><RememberCoroutineScope /></React.Suspense>} />
          {/* Navigation Component */}
          <Route path="/navhostnavcontroller" element={<React.Suspense fallback={<div>Loading...</div>}><NavHostNavController /></React.Suspense>} />
          <Route path="/argumentspassing" element={<React.Suspense fallback={<div>Loading...</div>}><ArgumentsPassing /></React.Suspense>} />
          <Route path="/bottomnavigation" element={<React.Suspense fallback={<div>Loading...</div>}><BottomNavigation /></React.Suspense>} />
          {/* Retrofit ile REST API */}
          <Route path="/retrofitsetup" element={<React.Suspense fallback={<div>Loading...</div>}><RetrofitSetup /></React.Suspense>} />
          <Route path="/interceptors" element={<React.Suspense fallback={<div>Loading...</div>}><Interceptors /></React.Suspense>} />
          <Route path="/responsehandling" element={<React.Suspense fallback={<div>Loading...</div>}><ResponseHandling /></React.Suspense>} />
          <Route path="/coroutinesasync" element={<React.Suspense fallback={<div>Loading...</div>}><CoroutinesAsync /></React.Suspense>} />
          {/* Local Storage */}
          <Route path="/roomdatabase" element={<React.Suspense fallback={<div>Loading...</div>}><RoomDatabase /></React.Suspense>} />
          <Route path="/entitydaodatabase" element={<React.Suspense fallback={<div>Loading...</div>}><EntityDaoDatabase /></React.Suspense>} />
          <Route path="/cachestrategies" element={<React.Suspense fallback={<div>Loading...</div>}><CacheStrategies /></React.Suspense>} />
          <Route path="/datastorepreferences" element={<React.Suspense fallback={<div>Loading...</div>}><DataStorePreferences /></React.Suspense>} />
          {/* Image Loading ve Caching */}
          <Route path="/coillibrary" element={<React.Suspense fallback={<div>Loading...</div>}><CoilLibrary /></React.Suspense>} />
          <Route path="/imagecaching" element={<React.Suspense fallback={<div>Loading...</div>}><ImageCaching /></React.Suspense>} />
          <Route path="/bitmapoptimization" element={<React.Suspense fallback={<div>Loading...</div>}><BitmapOptimization /></React.Suspense>} />
          {/* Material Design 3 */}
          <Route path="/themeyapisi" element={<React.Suspense fallback={<div>Loading...</div>}><ThemeYapisi /></React.Suspense>} />
          <Route path="/darklighttheme" element={<React.Suspense fallback={<div>Loading...</div>}><DarkLightTheme /></React.Suspense>} />
          <Route path="/dynamiccolors" element={<React.Suspense fallback={<div>Loading...</div>}><DynamicColors /></React.Suspense>} />
          {/* Animasyonlar */}
          <Route path="/lottieintegration" element={<React.Suspense fallback={<div>Loading...</div>}><LottieIntegration /></React.Suspense>} />
          <Route path="/animatefloatcolor" element={<React.Suspense fallback={<div>Loading...</div>}><AnimateFloatColor /></React.Suspense>} />
          <Route path="/animatedvisibility" element={<React.Suspense fallback={<div>Loading...</div>}><AnimatedVisibility /></React.Suspense>} />
          <Route path="/swipetodelete" element={<React.Suspense fallback={<div>Loading...</div>}><SwipeToDelete /></React.Suspense>} />
          {/* Responsive Design */}
          <Route path="/screensizes" element={<React.Suspense fallback={<div>Loading...</div>}><ScreenSizes /></React.Suspense>} />
          <Route path="/orientationchanges" element={<React.Suspense fallback={<div>Loading...</div>}><OrientationChanges /></React.Suspense>} />
          <Route path="/windowsizeclasses" element={<React.Suspense fallback={<div>Loading...</div>}><WindowSizeClasses /></React.Suspense>} />
          {/* SOLID Prensipleri */}
          <Route path="/singleresponsibility" element={<React.Suspense fallback={<div>Loading...</div>}><SingleResponsibility /></React.Suspense>} />
          <Route path="/openclosed" element={<React.Suspense fallback={<div>Loading...</div>}><OpenClosed /></React.Suspense>} />
          <Route path="/liskovsubstitution" element={<React.Suspense fallback={<div>Loading...</div>}><LiskovSubstitution /></React.Suspense>} />
          <Route path="/interfacesegregation" element={<React.Suspense fallback={<div>Loading...</div>}><InterfaceSegregation /></React.Suspense>} />
          <Route path="/dependencyinversion" element={<React.Suspense fallback={<div>Loading...</div>}><DependencyInversion /></React.Suspense>} />
          {/* Code Organization */}
          <Route path="/packagestructure" element={<React.Suspense fallback={<div>Loading...</div>}><PackageStructure /></React.Suspense>} />
          <Route path="/dryprinciple" element={<React.Suspense fallback={<div>Loading...</div>}><DRYPrinciple /></React.Suspense>} />
          <Route path="/kissprinciple" element={<React.Suspense fallback={<div>Loading...</div>}><KISSPrinciple /></React.Suspense>} />
          {/* Testing Temelleri */}
          <Route path="/unittestbasics" element={<React.Suspense fallback={<div>Loading...</div>}><UnitTestBasics /></React.Suspense>} />
          <Route path="/viewmodeltesting" element={<React.Suspense fallback={<div>Loading...</div>}><ViewModelTesting /></React.Suspense>} />
          <Route path="/uitestingcompose" element={<React.Suspense fallback={<div>Loading...</div>}><UITestingCompose /></React.Suspense>} />
          {/* Contact Permissions */}
          <Route path="/runtimepermissions" element={<React.Suspense fallback={<div>Loading...</div>}><RuntimePermissions /></React.Suspense>} />
          <Route path="/contactsproviderapi" element={<React.Suspense fallback={<div>Loading...</div>}><ContactsProviderAPI /></React.Suspense>} />
          {/* Swipe Actions Implementation */}
          <Route path="/swipeablemodifier" element={<React.Suspense fallback={<div>Loading...</div>}><SwipeableModifier /></React.Suspense>} />
          <Route path="/deleteeditactions" element={<React.Suspense fallback={<div>Loading...</div>}><DeleteEditActions /></React.Suspense>} />
          {/* Search Functionality */}
          <Route path="/searchhistory" element={<React.Suspense fallback={<div>Loading...</div>}><SearchHistory /></React.Suspense>} />
          <Route path="/debouncethrottle" element={<React.Suspense fallback={<div>Loading...</div>}><DebounceThrottle /></React.Suspense>} />
          <Route path="/filteringgrouping" element={<React.Suspense fallback={<div>Loading...</div>}><FilteringGrouping /></React.Suspense>} />
        </Routes>
        </Router>
            </DesignLanguageProvider>
        </UIThemeProvider>
      </CodePrefsProvider>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
