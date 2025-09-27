
import React, { useMemo, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prismThemes, buildThemeWithFont, codeWrapperStyle } from '../../utils/themes';
import { useCodePrefs } from '../../context/CodePrefsContext';
import './CodeBlock.css';

const CodeBlock = ({
  children,
  language = 'csharp',
  className = ''
}) => {
  const { fontSize, theme } = useCodePrefs();
  const [copied, setCopied] = useState(false);

  const codeText = useMemo(() => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.join('');
    return String(children ?? '');
  }, [children]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback: create a temporary textarea
      try {
        const ta = document.createElement('textarea');
        ta.value = codeText;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {}
    }
  };

  return (
    <div className={`code-block ${className}`}>
      <button
        type="button"
        className="code-copy-btn"
        onClick={onCopy}
        aria-label="Kodu kopyala"
        title={copied ? 'Kopyalandı' : 'Kodu kopyala'}
      >
        {copied ? 'Kopyalandı' : 'Kopyala'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={buildThemeWithFont(prismThemes[theme], fontSize)}
        customStyle={codeWrapperStyle(fontSize)}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
