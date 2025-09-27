import React, { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prismThemes, buildThemeWithFont, codeWrapperStyle } from '../../utils/themes';
import { useCodePrefs } from '../../context/CodePrefsContext';
import { useUITheme } from '../../context/UIThemeContext';
import { useDesignLanguage } from '../../context/DesignLanguageContext';
import { uiThemes } from '../../theme/uiThemes';

const SettingsPage = () => {
  const { fontSize, setFontSize, theme, setTheme } = useCodePrefs();
  const { uiTheme, setUiTheme, themeNames } = useUITheme();
  const { design, setDesign, designNames, designLanguages } = useDesignLanguage();

  useEffect(() => {
    // ensure scroll to top on page open
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="app-container">
  <h1>Ayarlar</h1>
      <section className="section code-settings">
        <div className="setting-group">
          <label>
            Uygulama Teması:
            <select
              value={uiTheme}
              onChange={(e) => setUiTheme(e.target.value)}
              className="theme-select"
            >
              {themeNames.map((key) => (
                <option key={key} value={key}>{uiThemes[key]?.name || key}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="setting-group">
          <label>
            Tasarım Dili:
            <select
              value={design}
              onChange={(e) => setDesign(e.target.value)}
              className="theme-select"
            >
              {designNames.map((key) => (
                <option key={key} value={key}>{designLanguages[key]?.name || key}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="setting-group">
          <label>
            Yazı Boyutu: {fontSize}px
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="font-size-slider"
            />
          </label>
        </div>
        <div className="setting-group">
          <label>
            Tema:
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              {Object.keys(prismThemes).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="theme-preview">
          <h5>Önizleme:</h5>
          <SyntaxHighlighter
            language="go"
            style={buildThemeWithFont(prismThemes[theme], fontSize)}
            customStyle={codeWrapperStyle(fontSize)}
          >
{`package main
import "fmt"
func main() {
    fmt.Println("Merhaba Dünya!")
}`}
          </SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;

