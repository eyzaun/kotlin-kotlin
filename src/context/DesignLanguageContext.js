import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { designLanguages, designNames, applyDesignLanguage } from '../theme/designLanguages';

const DesignLanguageContext = createContext(null);

export function DesignLanguageProvider({ children }) {
  const [design, setDesign] = useState(() => {
    try {
      return localStorage.getItem('designLanguage') || 'default';
    } catch {}
    return 'default';
  });

  useEffect(() => {
    applyDesignLanguage(design);
    try { localStorage.setItem('designLanguage', design); } catch {}
  }, [design]);

  const value = useMemo(() => ({ design, setDesign, designNames, designLanguages }), [design]);
  return (
    <DesignLanguageContext.Provider value={value}>
      {children}
    </DesignLanguageContext.Provider>
  );
}

export function useDesignLanguage() {
  const ctx = useContext(DesignLanguageContext);
  if (!ctx) throw new Error('useDesignLanguage must be used within DesignLanguageProvider');
  return ctx;
}

