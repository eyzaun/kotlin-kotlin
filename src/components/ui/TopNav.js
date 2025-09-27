import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './TopNav.css';

const TopNav = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const hideTimer = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // viewport/layout breakpoint
  const [isTouch, setIsTouch] = useState(false);   // input capability for UX decisions
  const dropdownCloseTimer = useRef(null);
  const hoverCloseTimer = useRef(null);
  const lastMoveTimeRef = useRef(0);

  // Header hide/show helpers
  const clearHeaderHide = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };
  const scheduleHeaderHide = (delay = 1500) => {
    clearHeaderHide();
    if (topicsOpen) return; // don't hide while interacting with dropdown
    hideTimer.current = setTimeout(() => setCollapsed(true), delay);
  };

  // Track mobile viewport (layout) and touch capability (UX)
  useEffect(() => {
    const mqViewport = window.matchMedia('(max-width: 1024px)');
    const mqTouch = window.matchMedia('(hover: none) and (pointer: coarse)');
    const update = () => {
      setIsMobile(mqViewport.matches);
      const hasTouch = (typeof window !== 'undefined' && 'ontouchstart' in window)
        || (typeof navigator !== 'undefined' && ((navigator.maxTouchPoints || 0) > 0 || (navigator.msMaxTouchPoints || 0) > 0));
      setIsTouch(mqTouch.matches || hasTouch);
    };
    update();
    mqViewport.addEventListener?.('change', update);
    mqTouch.addEventListener?.('change', update);
    window.addEventListener('resize', update);
    return () => {
      mqViewport.removeEventListener?.('change', update);
      mqTouch.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const isShown = !collapsed; // header visibility

  // Hide logic: after 1.5s away from header (no pointer inside), collapse.
  // Do NOT auto-show on scroll/move; only the peek-tab toggles visibility back.
  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const onPointerEnter = () => {
      // do not auto-show; only prevent premature hide while inside
      clearHeaderHide();
    };
    const onPointerLeave = () => {
      scheduleHeaderHide(1500);
    };

    node.addEventListener('pointerenter', onPointerEnter);
    node.addEventListener('pointerleave', onPointerLeave);

    // Initial visible, then schedule hide after 1.5s if user doesn't interact
    scheduleHeaderHide(1500);

    return () => {
      node.removeEventListener('pointerenter', onPointerEnter);
      node.removeEventListener('pointerleave', onPointerLeave);
      clearHeaderHide();
    };
  }, [topicsOpen]);

  // On route change, close menus; do not force header visible (no auto-show)
  useEffect(() => {
    setTopicsOpen(false);
  }, [location.pathname]);
  // Unified behavior: no separate mobile menu/backdrop/body lock

  // Mobile: hide header on outside tap or on scroll (mirror desktop feel)
  useEffect(() => {
    const onDocTouchStart = (e) => {
      const inside = headerRef.current && headerRef.current.contains(e.target);
      if (!inside) {
        setTopicsOpen(false);
        setHoveredTopic(null);
        scheduleHeaderHide(1500);
      }
    };
    const onScroll = () => {
      scheduleHeaderHide(1500);
    };
    const onTouchMove = () => {
      lastMoveTimeRef.current = Date.now();
    };
    if (isTouch || isMobile) {
      document.addEventListener('touchstart', onDocTouchStart, { passive: true });
      document.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        document.removeEventListener('touchstart', onDocTouchStart);
        document.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, [isTouch, isMobile, scheduleHeaderHide]);

  // Helpers to manage dropdown close timers
  const clearDropdownClose = () => {
    if (dropdownCloseTimer.current) {
      clearTimeout(dropdownCloseTimer.current);
      dropdownCloseTimer.current = null;
    }
  };
  const scheduleDropdownClose = (delay = 1000) => {
    clearDropdownClose();
    dropdownCloseTimer.current = setTimeout(() => {
      setTopicsOpen(false);
      setHoveredTopic(null);
    }, delay);
  };
  const clearHoverClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };
  const scheduleHoverClose = (key, delay = 1000) => {
    clearHoverClose();
    hoverCloseTimer.current = setTimeout(() => {
      setHoveredTopic((cur) => (cur === key ? null : cur));
    }, delay);
  };

  // Clear timers on unmount
  useEffect(() => () => { clearDropdownClose(); clearHoverClose(); }, []);

  // Weeks with their topics and questions
  const weeks = [
    {
      key: 'hafta1',
      label: '1. Hafta - Temelleri Sağlamlaştırma',
      route: '/hafta1',
      topics: [
        { label: 'A. Kotlin Dili Hızlı Başlangıç', route: '/hafta1' },
  { label: '1. Kotlin Syntax Temelleri (Tek Sayfa)', route: '/kotlin-syntax-temelleri' },
        { label: '2. Fonksiyonlar ve Lambda', route: '/fonksiyonlar-lambda' },
        { label: '3. Classes ve Objects', route: '/classes-objects' },
        { label: '4. Collections ve Operators', route: '/collections-operators' },
        { label: 'B. Jetpack Compose Temelleri', route: '/hafta1' },
        { label: '1. Compose Mindset', route: '/compose-mindset' },
        { label: '2. Temel UI Componentleri', route: '/temel-ui-componentleri' },
        { label: '3. State Management Temelleri', route: '/state-management-temelleri' },
        { label: '4. Modifier Sistemi', route: '/modifier-sistemi' },
        { label: 'C. Mimari Yapısı - MVVM & Clean Architecture', route: '/hafta1' },
        { label: '1. MVVM Pattern', route: '/mvvm-pattern' },
        { label: '2. Clean Architecture Katmanları', route: '/clean-architecture-katmanlari' },
        { label: '3. Dependency Injection Temelleri', route: '/dependency-injection-temelleri' },
      ]
    },
    {
      key: 'hafta2',
      label: '2. Hafta - İleri Seviye ve Uygulamalı',
      route: '/hafta2',
      topics: [
        { label: 'D. State Yönetimi ve Event Handling', route: '/hafta2' },
        { label: '1. Event-State Architecture', route: '/event-state-architecture' },
        { label: '2. Side Effects in Compose', route: '/side-effects-compose' },
        { label: '3. Navigation Component', route: '/navigation-component' },
        { label: 'E. Data Management ve API', route: '/hafta2' },
        { label: '1. Retrofit ile REST API', route: '/retrofit-rest-api' },
        { label: '2. Local Storage', route: '/local-storage' },
        { label: '3. Image Loading ve Caching', route: '/image-loading-caching' },
        { label: 'F. UI/UX ve Animations', route: '/hafta2' },
        { label: '1. Material Design 3', route: '/material-design-3' },
        { label: '2. Animasyonlar', route: '/animasyonlar' },
        { label: '3. Responsive Design', route: '/responsive-design' },
        { label: 'G. Best Practices ve Prensipler', route: '/hafta2' },
        { label: '1. SOLID Prensipleri', route: '/solid-prensipleri' },
        { label: '2. Code Organization', route: '/code-organization' },
        { label: '3. Testing Temelleri', route: '/testing-temelleri' },
        { label: 'H. Proje Odaklı Konular', route: '/hafta2' },
        { label: '1. Contact Permissions', route: '/contact-permissions' },
        { label: '2. Swipe Actions Implementation', route: '/swipe-actions-implementation' },
        { label: '3. Search Functionality', route: '/search-functionality' },
      ]
    }
  ];

  return (
    <>
      {/* Peek tab to restore menu when header is collapsed */}
      {collapsed && (
        <button
          className="peek-tab"
          onClick={() => {
            // Avoid accidental opens on mobile right after a scroll/drag gesture
            if (isTouch) {
              const now = Date.now();
              if (now - lastMoveTimeRef.current < 300) return;
            }
            setCollapsed(false);
          }}
          aria-label="Menüyü göster"
        >
          Menü
        </button>
      )}

      <header
        className={`topnav ${isShown ? 'shown' : 'collapsed'}`}
        ref={headerRef}
      >
        <div className="brand">
          <Link to="/">kotlin-kotlin</Link>
        </div>

        <div className="menu-wrapper">
          <nav ref={menuRef} className={`menu`}>
            {/* Removed redundant Home link; brand already navigates home */}

          {/* Konular dropdown (shared for desktop & mobile). On touch, tap week to open its submenu. */}
            <div
              className={`dropdown ${topicsOpen ? 'open' : ''}`}
              onPointerEnter={() => { if (!isTouch) { clearDropdownClose(); setTopicsOpen(true); } }}
              onPointerLeave={() => { if (!isTouch) { scheduleDropdownClose(1000); } }}
            >
              <button
                className="dropdown-toggle"
                onClick={() => { clearDropdownClose(); setTopicsOpen(v => !v); }}
                aria-expanded={topicsOpen}
                aria-haspopup="menu"
              >
                Konular
              </button>
              <div
                className="dropdown-menu"
                role="menu"
                onPointerEnter={() => { if (!isTouch) { clearDropdownClose(); setTopicsOpen(true); } }}
                onPointerLeave={() => { if (!isTouch) { scheduleDropdownClose(1000); } }}
              >
                {weeks.map((week) => (
                  <div
                    key={week.key}
                    className={`topic-row ${week.topics ? 'has-submenu' : ''}`}
                    onPointerEnter={() => { if (!isTouch) { clearHoverClose(); clearDropdownClose(); setTopicsOpen(true); setHoveredTopic(week.key); } }}
                    onPointerLeave={() => { if (!isTouch) { scheduleHoverClose(week.key, 1000); } }}
                  >
                    <>
                      <NavLink
                        to={week.route}
                        role="menuitem"
                        className="menuitem"
                        onClick={(e) => {
                          if (isTouch) {
                            if (hoveredTopic !== week.key) {
                              // First tap: open submenu (do not navigate)
                              e.preventDefault();
                              clearHoverClose();
                              clearDropdownClose();
                              setHoveredTopic(week.key);
                              setTopicsOpen(true);
                            } else {
                              // Second tap on the same week: allow navigation
                              clearDropdownClose();
                              setTopicsOpen(false);
                            }
                          } else {
                            clearDropdownClose();
                            setTopicsOpen(false);
                          }
                        }}
                      >
                        {week.label}
                      </NavLink>
                      {hoveredTopic === week.key && (
                        <div
                          className="submenu"
                          role="menu"
                          onPointerEnter={() => { if (!isTouch) { clearHoverClose(); clearDropdownClose(); setTopicsOpen(true); } }}
                        >
                          <div className="submenu-section">
                            <div className="submenu-title">Konular</div>
                            {(week.topics || []).map((topic) => (
                              <NavLink key={topic.route} to={topic.route} role="menuitem" onClick={() => { clearDropdownClose(); setTopicsOpen(false); }}>{topic.label}</NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </div>
            </div>

            <NavLink to="/ayarlar">Ayarlar</NavLink>

            {/* Auth inline after Ayarlar */}
            {user ? (
              <>
                <NavLink to="/notlarim">Notlarım</NavLink>
                <button onClick={() => { logout(); }} className="nav-button">Çıkış Yap</button>
              </>
            ) : (
              <NavLink to="/giris" className="auth-link">Giriş Yap</NavLink>
            )}
          </nav>
        </div>
        {/* Collapse toggle removed per request */
        }
      </header>
    </>
  );
};

export default TopNav;

