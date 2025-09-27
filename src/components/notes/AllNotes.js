
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../seo';
import { useCodePrefs } from '../../context/CodePrefsContext';
import { useUITheme } from '../../context/UIThemeContext';
import { uiThemes } from '../../theme/uiThemes';
import CodeBlock from '../ui/CodeBlock';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AllNotes() {
  const { user } = useAuth();
  const { getAllNotes, loading, deleteNote, saveNote } = useNotes();
  const allNotes = getAllNotes();
  const { fontSize } = useCodePrefs();
  const { uiTheme } = useUITheme();
  const themeTokens = (uiThemes[uiTheme] || uiThemes.dark).tokens;

  // Render Quill HTML content, replacing code blocks with shared CodeBlock component (Prism)
  const renderContentWithCode = (html) => {
    if (!html) return null;
    const blocks = [];
    const parts = [];
    // Patterns for Quill+HLJS and generic pre>code
    const regex = /(<pre[^>]*class="[^"]*ql-syntax[^"]*"[^>]*>)([\s\S]*?)(<\/pre>)|(<pre[^>]*>\s*<code[^>]*class="[^"]*language-([a-z0-9#+-]+)[^"]*"[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/gi;
    let lastIndex = 0;
    let m;
    const decode = (s) => s
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    while ((m = regex.exec(html)) !== null) {
      const idx = m.index;
      if (idx > lastIndex) parts.push({ type: 'html', content: html.slice(lastIndex, idx) });
      if (m[1]) {
        // Quill hljs block: <pre class="ql-syntax">code</pre>
        const codeHtml = m[2] || '';
        const codeText = decode(codeHtml);
        parts.push({ type: 'code', lang: 'csharp', code: codeText });
      } else if (m[4]) {
        const lang = (m[5] || 'csharp').toLowerCase();
        const codeHtml = m[6] || '';
        const codeText = decode(codeHtml);
        parts.push({ type: 'code', lang, code: codeText });
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < html.length) parts.push({ type: 'html', content: html.slice(lastIndex) });

    parts.forEach((p, i) => {
      if (p.type === 'html') {
        blocks.push(<div key={`h-${i}`} dangerouslySetInnerHTML={{ __html: p.content }} />);
      } else if (p.type === 'code') {
        blocks.push(
          <CodeBlock key={`c-${i}`} language={p.lang}>
            {p.code}
          </CodeBlock>
        );
      }
    });
    return blocks;
  };

  // Inline editor state per note
  const [editing, setEditing] = useState({}); // { [topicPath]: html }
  const [saving, setSaving] = useState({}); // { [topicPath]: boolean }
  const startEdit = (note) => {
    setEditing((e) => ({ ...e, [note.topicPath]: note.content || '' }));
  };
  const cancelEdit = (note) => {
    setEditing((e) => {
      const c = { ...e };
      delete c[note.topicPath];
      return c;
    });
  };
  const onChangeEdit = (note, value) => {
    setEditing((e) => ({ ...e, [note.topicPath]: value }));
  };
  const onSaveEdit = async (note) => {
    const html = editing[note.topicPath] ?? '';
    try {
      setSaving((s) => ({ ...s, [note.topicPath]: true }));
      await saveNote(note.topicPath, note.topicTitle, html);
      // hide editor after save; NotesContext onSnapshot will refresh content
      cancelEdit(note);
    } finally {
      setSaving((s) => ({ ...s, [note.topicPath]: false }));
    }
  };

  // Canonical topic order derived from TopNav weeks/topics
  const topicOrder = [
    // Hafta 1
    'big-o', 'array', 'linkedlist', 'stack', 'queue', 'hashmap',
    // Hafta 2
    'binary-tree', 'bst', 'dfs', 'bfs', 'sorting', 'bst-advanced',
    // Hafta 3
    'dynamic-programming', 'greedy', 'sliding-window', 'union-find', 'topological-sort', 'recursion-backtracking',
    // Hafta 4
    'sql-crud', 'sql-filtering', 'sql-joins', 'sql-groupby', 'sql-subqueries', 'sql-views-index', 'sql-acid',
    // Hafta 5
    'normalization', 'index-performance', 'transaction-isolation', 'explain-plan', 'nosql', 'mongodb',
    // Hafta 6
    'process-thread', 'cpu-scheduling', 'context-switching', 'memory-management', 'synchronization', 'deadlock', 'producer-consumer',
    // Hafta 7
    'git-basics', 'git-workflow', 'git-advanced', 'clean-code', 'solid', 'unit-testing', 'test-coverage',
    // Hafta 8
    'docker', 'cicd', 'design-patterns-repository', 'design-patterns-factory', 'design-patterns-strategy', 'design-patterns-observer', 'design-patterns-decorator', 'capstone'
  ];

  const topicRank = topicOrder.reduce((acc, key, idx) => { acc[key] = idx; return acc; }, {});

  const parsePath = (p) => {
    const segs = (p || '').replace(/^\//, '').split('/');
    const base = segs[0] || '';
    const sub = segs[1] || '';
    let soruNum = null;
    const m = /^soru(\d+)$/i.exec(sub);
    if (m) soruNum = parseInt(m[1], 10);
    return { base, sub, segs, soruNum };
  };

  const sortedNotes = [...allNotes].sort((a, b) => {
    const pa = parsePath(a.topicPath);
    const pb = parsePath(b.topicPath);

    const ra = topicRank.hasOwnProperty(pa.base) ? topicRank[pa.base] : Number.MAX_SAFE_INTEGER;
    const rb = topicRank.hasOwnProperty(pb.base) ? topicRank[pb.base] : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) return ra - rb; // order by topic sequence

    // Within the same topic: main page (no sub) first
    const aIsMain = pa.segs.length <= 1 || !pa.sub;
    const bIsMain = pb.segs.length <= 1 || !pb.sub;
    if (aIsMain !== bIsMain) return aIsMain ? -1 : 1;

    // Then soru pages in numeric order if available
    if (pa.soruNum != null && pb.soruNum != null) return pa.soruNum - pb.soruNum;
    if (pa.soruNum != null) return -1;
    if (pb.soruNum != null) return 1;

    // Fallback: lexicographic on subpath, then by updatedAt to stabilize
    if (pa.sub !== pb.sub) return pa.sub.localeCompare(pb.sub);
    const toDate = (v) => (v?.toDate ? v.toDate() : v instanceof Date ? v : v ? new Date(v) : new Date(0));
    return toDate(b.updatedAt) - toDate(a.updatedAt);
  });

  const handleDeleteNote = async (topicPath) => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      await deleteNote(topicPath);
    }
  };

  // Build combined HTML for preview and download
  const combinedBodyHTML = useMemo(() => {
    if (!sortedNotes.length) return '';
    const parts = [];
    parts.push(`<h1 style=\"margin:0 0 12px 0;color:${themeTokens['--primary']};font-size:22px;\">Tüm Notlarım</h1>`);
    const dateStr = new Date().toLocaleString('tr-TR');
    parts.push(`<div style=\"color:${themeTokens['--muted']};font-size:12px;margin:0 0 16px 0;\">Oluşturma zamanı: ${dateStr}</div>`);
    sortedNotes.forEach((n, idx) => {
      const safeTitle = n.topicTitle || n.topicPath || `Not ${idx + 1}`;
      parts.push(`<h2 style=\"color:${themeTokens['--primary']};font-size:18px;margin:18px 0 8px 0;\">${safeTitle}</h2>`);
      parts.push(`<div style=\"color:${themeTokens['--text']};line-height:1.6;\">${n.content || ''}</div>`);
      if (idx !== sortedNotes.length - 1) parts.push(`<hr style=\"border:none;border-top:1px solid ${themeTokens['--border']};margin:16px 0;\"/>`);
    });
    return parts.join('');
  }, [sortedNotes, themeTokens]);

  const combinedFullHTML = useMemo(() => {
    const body = combinedBodyHTML || '';
    const t = themeTokens;
    const css = `body{background:${t['--bg']};color:${t['--text']};margin:20px;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', 'Fira Sans', Arial, 'Noto Sans', sans-serif;}a{color:${t['--link'] || t['--primary']}}pre{background:${t['--surface-2']};border:1px solid ${t['--border']};border-radius:4px;padding:12px;overflow:auto}code{font-family:'Fira Code','Monaco','Consolas',monospace}img{max-width:100%;height:auto;border-radius:4px}blockquote{border-left:3px solid ${t['--primary']};padding-left:12px;color:${t['--muted']}}`;
    return `<!doctype html><html lang="tr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Tüm Notlarım</title><style>${css}</style></head><body>${body}</body></html>`;
  }, [combinedBodyHTML, themeTokens]);

  const [showCombined, setShowCombined] = useState(false);

  const handleDownloadCombined = () => {
    const blob = new Blob([combinedFullHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const stamp = new Date().toISOString().slice(0,19).replace(/[:T]/g,'-');
    a.download = `tum-notlarim-${stamp}.html`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  if (!user) {
    return (
      <div className="app-container">
        <SEO
          title="Notlarım - İki Ay"
          description="Kişisel notlarınızı görüntüleyin"
          canonical="https://kotlin-kotlin.web.app/notlarim"
        />
        <div className="login-prompt">
          <h1>Notlarınızı görmek için giriş yapın</h1>
          <Link to="/giris" className="auth-link">Giriş Yap</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <SEO
        title="Notlarım - İki Ay"
        description="Kişisel notlarınızı görüntüleyin ve yönetin"
        canonical="https://kotlin-kotlin.web.app/notlarim"
      />

      <div className="content-header">
        <h1>Notlarım</h1>
        <Link to="/" className="back-link">Ana Sayfa</Link>
      </div>

      {loading ? (
        <div className="loading">Notlar yükleniyor...</div>
      ) : allNotes.length === 0 ? (
        <div className="empty-state">
          <h2>Henüz notunuz yok</h2>
          <p>Konu sayfalarında notlarınızı almaya başlayın!</p>
          <Link to="/hafta1" className="cta-button">Konulara Göz At</Link>
        </div>
      ) : (
        <>
          {/* Combined note tools */}
          <div className="combined-note">
            <div className="combined-actions">
              <button type="button" className="edit-button" onClick={() => setShowCombined((v) => !v)}>
                {showCombined ? 'Gizle' : 'Birleştirilen Notu Göster'}
              </button>
              <button type="button" className="edit-button" onClick={handleDownloadCombined}>
                İndir (.html)
              </button>
            </div>
            {showCombined && (
              <div className="combined-note-content" style={{ '--code-font-size': `${fontSize}px` }}>
                {/* React-rendered view with shared CodeBlock for accurate theming */}
                <h1 style={{ margin: 0, marginBottom: 12, color: 'var(--primary)', fontSize: 22 }}>Tüm Notlarım</h1>
                <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 16 }}>Oluşturma zamanı: {new Date().toLocaleString('tr-TR')}</div>
                {sortedNotes.map((n, idx) => (
                  <div key={n.id || idx}>
                    <h2 style={{ color: 'var(--primary)', fontSize: 18, margin: '18px 0 8px 0' }}>{n.topicTitle || n.topicPath || `Not ${idx + 1}`}</h2>
                    <div>{renderContentWithCode(n.content)}</div>
                    {idx !== sortedNotes.length - 1 && <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="notes-list show-full" style={{ '--code-font-size': `${fontSize}px` }}>
          {sortedNotes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <h3>
                  <span className="note-title-link" role="heading" aria-level={3}>
                    {note.topicTitle}
                  </span>
                </h3>
                <div className="note-actions">
                  {editing[note.topicPath] === undefined ? (
                    <button onClick={() => startEdit(note)} className="edit-button">
                      Düzenle
                    </button>
                  ) : (
                    <>
                      <button onClick={() => onSaveEdit(note)} className="edit-button" disabled={!!saving[note.topicPath]}>
                        {saving[note.topicPath] ? 'Kaydediliyor…' : 'Kaydet'}
                      </button>
                      <button onClick={() => cancelEdit(note)} className="delete-button" style={{ background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                        Vazgeç
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteNote(note.topicPath)}
                    className="delete-button"
                  >
                    Sil
                  </button>
                </div>
              </div>

              <div className="note-meta">
                <span className="note-date">
                  Son güncelleme: {note.updatedAt.toDate().toLocaleDateString('tr-TR')}
                </span>
              </div>

              {editing[note.topicPath] !== undefined ? (
                <div className="note-editor-inline">
                  <ReactQuill
                    theme="snow"
                    value={editing[note.topicPath]}
                    onChange={(v) => onChangeEdit(note, v)}
                    placeholder="Notunuzu düzenleyin..."
                  />
                </div>
              ) : (
                <div className="note-preview full">
                  {renderContentWithCode(note.content)}
                </div>
              )}
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AllNotes;
