import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Global code preferences and theme utils
import { useCodePrefs } from '../../context/CodePrefsContext';
import { prismThemes, buildThemeWithFont, codeWrapperStyle } from '../../utils/themes';
import CodeMirror from '@uiw/react-codemirror';
import { go } from '@codemirror/lang-go';
import { oneDark } from '@codemirror/theme-one-dark';

function SoruTemplate({
  title,
  taskDescription,
  taskCode,
  answerCode,
  questionId,
  prevLink,
  nextLink,
  backLink
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const { fontSize, theme } = useCodePrefs();

  useEffect(() => {
    const savedAnswer = localStorage.getItem(`${questionId}-user-answer`);
    if (savedAnswer) setUserAnswer(savedAnswer);
  }, [questionId]);

  const handleUserAnswerChange = (value) => {
    setUserAnswer(value);
    localStorage.setItem(`${questionId}-user-answer`, value);
  };

  const getCustomStyle = (fs) => ({
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    lineHeight: '1.4',
    fontSize: `${fs}px`
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [questionId]);

  return (
    <div className="app-container">
      <h1>{title}</h1>
      <Link to={backLink} className="back-link">Geri</Link>

      <section className="section">
        <h2>Görev</h2>
        <p><strong>Görev:</strong> {taskDescription}</p>
        <SyntaxHighlighter
          language="go"
          style={buildThemeWithFont(prismThemes[theme], fontSize)}
          customStyle={codeWrapperStyle(fontSize)}
        >
          {taskCode}
        </SyntaxHighlighter>
      </section>

      <section className="section">
        <h2>Kendi Cevabınızı Yazın</h2>
        <div className="user-answer-section">
          <CodeMirror
            value={userAnswer}
            height="320px"
            theme={(theme === 'vscDarkPlus' || theme === 'dracula' || theme === 'materialDark') ? oneDark : 'light'}
            extensions={[go()]}
            basicSetup={{ lineNumbers: true, highlightActiveLine: true, highlightActiveLineGutter: true }}
            onChange={(value) => handleUserAnswerChange(value)}
            style={{
              fontSize: `${fontSize}px`,
              border: '1px solid var(--border)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          />
        </div>
      </section>

      <section className="section">
        <h2>Çözüm</h2>
        <button onClick={() => setShowAnswer(!showAnswer)} className="toggle-answer-btn">
          {showAnswer ? 'Cevabı Gizle' : 'Cevabı Göster'}
        </button>
        {showAnswer && (
          <div className="answer-content">
            <SyntaxHighlighter
              language="go"
              style={buildThemeWithFont(prismThemes[theme], fontSize)}
              customStyle={codeWrapperStyle(fontSize)}
            >
              {answerCode}
            </SyntaxHighlighter>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Navigasyon</h2>
        <div className="navigation">
          {prevLink && <Link to={prevLink} className="nav-link" onClick={scrollToTop}>Önceki Soru</Link>}
          {nextLink && <Link to={nextLink} className="nav-link" onClick={scrollToTop}>Sonraki Soru</Link>}
        </div>
      </section>
    </div>
  );
}

export default SoruTemplate;

