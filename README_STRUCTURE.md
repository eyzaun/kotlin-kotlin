Project structure guide

This project follows a clean, topic-oriented structure under src/components. Canonical locations:

- ui/: Shared UI components (navigation, headers, etc.)
- templates/: Reusable view templates
- haftalar/: Weekly overview pages (Hafta1, Hafta2)
- konular/: Topic pages organized by Kotlin learning modules
  - kotlin-syntax-temelleri/: Variables, NullSafety, DataTypes
  - fonksiyonlar-lambda/: ExtensionFunctions, HigherOrderFunctions, LambdaExpressions
  - classes-objects/: DataClasses, SealedClasses, CompanionObjects
  - collections-operators/: ListSetMap, FilterMapForEach
  - compose-mindset/: DeclarativeUI, ComposableFunctions, Recomposition
  - temel-ui-componentleri/: TextButtonTextField, Layouts, Lists, Cards
  - state-management-temelleri/: RememberMutableStateOf, StateHoisting, RememberSaveable, DerivedStateOf
  - modifier-sistemi/: PaddingMarginSize, BackgroundBorderClip, ClickableSwipeable
  - mvvm-pattern/: ModelViewViewModel, ViewModelLifecycle, LiveDataStateFlow
  - clean-architecture-katmanlari/: PresentationLayer, DomainLayer, DataLayer
  - dependency-injection-temelleri/: HiltDaggerBasics, InjectProvidesModule, ViewModelInjection
  - event-state-architecture/: UIEventsUIState, SealedClassInterface, DataClassStates, StateFlowSharedFlow
  - side-effects-compose/: LaunchedEffect, DisposableEffect, SideEffect, RememberCoroutineScope
  - navigation-component/: NavHostNavController, ArgumentsPassing, BottomNavigation
  - retrofit-rest-api/: RetrofitSetup, Interceptors, ResponseHandling, CoroutinesAsync
  - local-storage/: RoomDatabase, EntityDaoDatabase, CacheStrategies, DataStorePreferences
  - image-loading-caching/: CoilLibrary, ImageCaching, BitmapOptimization
  - material-design-3/: ThemeYapisi, DarkLightTheme, DynamicColors
  - animasyonlar/: LottieIntegration, AnimateFloatColor, AnimatedVisibility, SwipeToDelete
  - responsive-design/: ScreenSizes, OrientationChanges, WindowSizeClasses
  - solid-prensipleri/: SingleResponsibility, OpenClosed, LiskovSubstitution, InterfaceSegregation, DependencyInversion
  - code-organization/: PackageStructure, DRYPrinciple, KISSPrinciple
  - testing-temelleri/: UnitTestBasics, ViewModelTesting, UITestingCompose
  - contact-permissions/: RuntimePermissions, ContactsProviderAPI
  - swipe-actions-implementation/: SwipeableModifier, DeleteEditActions
  - search-functionality/: SearchHistory, DebounceThrottle, FilteringGrouping
- home/: Home page
- settings/: App-wide settings
- notes/: Notes functionality
- auth/: Authentication components

Notes

- No legacy re-export stubs. Each component file is the source of truth.
- Avoid duplicate "pages" directories. All routable views live directly under the folders above.
- Keep shared code in utils/ and context/ at src/ level.
- When adding a new topic or question set, mirror the existing folder naming and route patterns.

