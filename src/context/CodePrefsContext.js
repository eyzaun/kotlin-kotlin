import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CodePrefsContext = createContext(null);

const DEFAULTS = {
  fontSize: 14,
  theme: 'vscDarkPlus'
};

export const CodePrefsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(DEFAULTS.fontSize);
  const [theme, setTheme] = useState(DEFAULTS.theme);

  // load from localStorage
  useEffect(() => {
    const savedFont = localStorage.getItem('codeFontSize');
    const savedTheme = localStorage.getItem('codeTheme');
    if (savedFont) setFontSize(parseInt(savedFont));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // persist changes
  useEffect(() => {
    localStorage.setItem('codeFontSize', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('codeTheme', theme);
  }, [theme]);

  const value = useMemo(() => ({ fontSize, setFontSize, theme, setTheme }), [fontSize, theme]);
  return <CodePrefsContext.Provider value={value}>{children}</CodePrefsContext.Provider>;
};

export const useCodePrefs = () => {
  const ctx = useContext(CodePrefsContext);
  if (!ctx) throw new Error('useCodePrefs must be used within CodePrefsProvider');
  return ctx;
};

