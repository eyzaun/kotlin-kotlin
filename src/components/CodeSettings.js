import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs, ghcolors, dracula, materialDark, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeSettings = ({ onSettingsChange }) => {
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('vscDarkPlus');

  // Önbellekten ayarları yükle
  useEffect(() => {
    const savedFontSize = localStorage.getItem('codeFontSize');
    const savedTheme = localStorage.getItem('codeTheme');

    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Ayarları önbelleğe kaydet ve üst componente ilet
  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem('codeFontSize', newSize);
    onSettingsChange({ fontSize: newSize, theme });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('codeTheme', newTheme);
    onSettingsChange({ fontSize, theme: newTheme });
  };

  const themes = {
    vscDarkPlus: { name: 'VS Code Dark Plus', style: vscDarkPlus },
    vs: { name: 'Visual Studio', style: vs },
    ghcolors: { name: 'GitHub Colors', style: ghcolors },
    dracula: { name: 'Dracula', style: dracula },
    materialDark: { name: 'Material Dark', style: materialDark },
    materialLight: { name: 'Material Light', style: materialLight }
  };

  // VS Code Dark Plus için özel font-size düzeltmesi
  const buildThemeWithFont = (themeKey, fontSize) => {
    const base = (themes[themeKey] && themes[themeKey].style) || vs;
    const merged = { ...base };
    const preKeys = ['pre[class*"language-"]', 'pre[class*="language-"]'];
    const codeKeys = ['code[class*"language-"]', 'code[class*="language-"]'];
    const find = (keys) => keys.find(k => Object.prototype.hasOwnProperty.call(merged, k));
    const pk = find(preKeys);
    const ck = find(codeKeys);
    if (pk) merged[pk] = { ...(merged[pk] || {}), fontSize: `${fontSize}px` };
    else merged['pre[class*="language-"]'] = { fontSize: `${fontSize}px` };
    if (ck) merged[ck] = { ...(merged[ck] || {}), fontSize: `${fontSize}px` };
    else merged['code[class*="language-"]'] = { fontSize: `${fontSize}px` };
    return merged;
  };

  const getCustomStyle = (theme, fontSize) => ({
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    lineHeight: '1.4',
    fontSize: `${fontSize}px`
  });

  return (
    <div className="code-settings">
  <h4>Kod Ayarları</h4>
      <div className="setting-group">
        <label>
          Yazı Boyutu: {fontSize}px
          <input
            type="range"
            min="10"
            max="24"
            value={fontSize}
            onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
            className="font-size-slider"
          />
        </label>
      </div>
      <div className="setting-group">
        <label>
          Tema:
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
            className="theme-select"
          >
            {Object.entries(themes).map(([key, { name }]) => (
              <option key={key} value={key}>{name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="theme-preview">
        <h5>Önizleme:</h5>
        <SyntaxHighlighter
          language="go"
          // pass modified theme so the preview shows the actual font size
          style={buildThemeWithFont(theme, fontSize)}
          customStyle={getCustomStyle(theme, fontSize)}
        >
{`package main
import "fmt"
func main() {
    fmt.Println("Merhaba Dünya!")
}`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeSettings;

