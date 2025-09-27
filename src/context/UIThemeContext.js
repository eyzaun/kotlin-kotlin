import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { applyThemeTokens, themeNames } from '../theme/uiThemes';

const UIThemeContext = createContext(null);

const DEFAULT_THEME = 'dark';

export const UIThemeProvider = ({ children }) => {
  const [uiTheme, setUiTheme] = useState(DEFAULT_THEME);

  // Load persisted selection
  useEffect(() => {
    const saved = localStorage.getItem('uiTheme');
    if (saved && themeNames.includes(saved)) {
      setUiTheme(saved);
    }
  }, []);

  // Apply to document as CSS variables and persist
  useEffect(() => {
    applyThemeTokens(uiTheme);
    localStorage.setItem('uiTheme', uiTheme);
  }, [uiTheme]);

  const value = useMemo(() => ({ uiTheme, setUiTheme, themeNames }), [uiTheme]);
  return <UIThemeContext.Provider value={value}>{children}</UIThemeContext.Provider>;
};

export const useUITheme = () => {
  const ctx = useContext(UIThemeContext);
  if (!ctx) throw new Error('useUITheme must be used within UIThemeProvider');
  return ctx;
};

