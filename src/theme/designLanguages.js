// Central Design Language tokens and helpers

export const designLanguages = {
  default: {
    name: 'Varsayılan',
    tokens: {
      // typography & rhythm
      '--font-sans': "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      '--font-mono': "'Consolas', 'Monaco', 'Courier New', monospace",
      '--font-size-base': '16px',
      '--line-height-base': '1.6',
      // spacing & layout
      '--space-1': '4px',
      '--space-2': '8px',
      '--space-3': '12px',
      '--space-4': '16px',
      '--space-5': '24px',
      '--space-6': '32px',
      '--container-pad': '40px',
      '--section-pad': '30px',
      // controls
      '--control-pad-y': '12px',
      '--control-pad-x': '24px',
      '--control-height': '40px',
      // transitions
      '--ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      '--duration-fast': '150ms',
      '--duration': '250ms',
      '--duration-slow': '450ms',
      '--radius-xs': '3px',
      '--radius-sm': '6px',
      '--radius-md': '8px',
      '--radius-lg': '10px',
      '--radius-xl': '16px',
      '--shadow-sm': '0 2px 6px rgba(0,0,0,0.15)',
      '--shadow-md': '0 4px 12px rgba(0,0,0,0.20)',
      '--shadow-lg': '0 8px 24px rgba(0,0,0,0.35)',
      '--glass-bg': 'rgba(255,255,255,0.06)',
      '--glass-border': 'rgba(255,255,255,0.12)',
      '--glass-shadow': '0 10px 30px rgba(0,0,0,0.35)',
      '--glass-blur': '12px'
    }
  },
  minimalist: {
    name: 'Minimalist',
    tokens: {
      '--font-sans': "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
      '--font-mono': "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
      '--font-size-base': '15px',
      '--line-height-base': '1.65',
      '--space-1': '2px',
      '--space-2': '6px',
      '--space-3': '10px',
      '--space-4': '14px',
      '--space-5': '20px',
      '--space-6': '28px',
      '--container-pad': '32px',
      '--section-pad': '24px',
      '--control-pad-y': '10px',
      '--control-pad-x': '18px',
      '--control-height': '36px',
      '--ease': 'linear',
      '--duration-fast': '120ms',
      '--duration': '180ms',
      '--duration-slow': '280ms',
      '--radius-xs': '0px',
      '--radius-sm': '2px',
      '--radius-md': '4px',
      '--radius-lg': '6px',
      '--radius-xl': '8px',
      '--shadow-sm': 'none',
      '--shadow-md': 'none',
      '--shadow-lg': 'none',
      '--glass-bg': 'rgba(255,255,255,0.04)',
      '--glass-border': 'rgba(255,255,255,0.10)',
      '--glass-shadow': 'none',
      '--glass-blur': '0px'
    }
  },
  gradient: {
    name: 'Modern Gradient',
    tokens: {
      '--font-sans': "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      '--font-mono': "'Consolas', 'Monaco', 'Courier New', monospace",
      '--font-size-base': '16px',
      '--line-height-base': '1.65',
      '--space-1': '4px',
      '--space-2': '10px',
      '--space-3': '14px',
      '--space-4': '18px',
      '--space-5': '26px',
      '--space-6': '36px',
      '--container-pad': '48px',
      '--section-pad': '36px',
      '--control-pad-y': '13px',
      '--control-pad-x': '26px',
      '--control-height': '44px',
      '--ease': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      '--duration-fast': '160ms',
      '--duration': '260ms',
      '--duration-slow': '520ms',
      '--radius-xs': '4px',
      '--radius-sm': '6px',
      '--radius-md': '10px',
      '--radius-lg': '14px',
      '--radius-xl': '20px',
      '--shadow-sm': '0 3px 10px rgba(0,0,0,0.18)',
      '--shadow-md': '0 8px 24px rgba(0,0,0,0.28)',
      '--shadow-lg': '0 16px 40px rgba(0,0,0,0.35)',
      '--glass-bg': 'rgba(255,255,255,0.06)',
      '--glass-border': 'rgba(255,255,255,0.12)',
      '--glass-shadow': '0 10px 30px rgba(0,0,0,0.35)',
      '--glass-blur': '10px'
    }
  },
  glass: {
    name: 'Glassmorphism',
    tokens: {
      '--font-sans': "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      '--font-mono': "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New'",
      '--font-size-base': '16px',
      '--line-height-base': '1.7',
      '--space-1': '4px',
      '--space-2': '8px',
      '--space-3': '12px',
      '--space-4': '18px',
      '--space-5': '28px',
      '--space-6': '40px',
      '--container-pad': '44px',
      '--section-pad': '32px',
      '--control-pad-y': '12px',
      '--control-pad-x': '22px',
      '--control-height': '42px',
      '--ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      '--duration-fast': '160ms',
      '--duration': '260ms',
      '--duration-slow': '520ms',
      '--radius-xs': '6px',
      '--radius-sm': '10px',
      '--radius-md': '12px',
      '--radius-lg': '16px',
      '--radius-xl': '22px',
      '--shadow-sm': '0 2px 10px rgba(0,0,0,0.20)',
      '--shadow-md': '0 10px 30px rgba(0,0,0,0.30)',
      '--shadow-lg': '0 20px 50px rgba(0,0,0,0.40)',
      '--glass-bg': 'rgba(255,255,255,0.08)',
      '--glass-border': 'rgba(255,255,255,0.16)',
      '--glass-shadow': '0 10px 40px rgba(0,0,0,0.45)',
      '--glass-blur': '14px'
    }
  }
};

export const designNames = Object.keys(designLanguages);

export function applyDesignLanguage(designKey) {
  const root = document.documentElement;
  const key = designLanguages[designKey] ? designKey : 'default';
  // Remove previous dl-* class
  const classesToRemove = [];
  root.classList.forEach((c) => { if (c.startsWith('dl-')) classesToRemove.push(c); });
  classesToRemove.forEach((c) => root.classList.remove(c));
  root.classList.add(`dl-${key}`);
  // Apply tokens
  const tokens = designLanguages[key].tokens || {};
  for (const [name, value] of Object.entries(tokens)) {
    root.style.setProperty(name, value);
  }
}

