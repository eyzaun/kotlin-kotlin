import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import hljs from 'highlight.js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import { useCodePrefs } from '../../context/CodePrefsContext';
import './Notes.css';

export default function NotesOverlay({ topicPath, topicTitle, open, onClose }) {
  const { user } = useAuth();
  const { getNote, saveNote, uploadImage } = useNotes();
  const { fontSize, theme: codeTheme } = useCodePrefs();
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  // Background transparency (percentage 30-100), persisted
  const [opacityPct, setOpacityPct] = useState(90);
  // Quill's own UI theme (snow/bubble), avoid name clash with code theme
  const [quillTheme] = useState('snow');
  const overlayRef = useRef(null);
  const dragStart = useRef(null);
  const resizeStart = useRef(null);
  const quillRef = useRef(null);
  const lastSavedContentRef = useRef('');
  const loadedForRef = useRef({ userId: null, topicPath: null });

  // Hydrate editor when opened for a given topic/user, but do not override local typing
  useEffect(() => {
    if (!open || !user || !topicPath) return;
    const keyChanged =
      loadedForRef.current.userId !== user.uid ||
      loadedForRef.current.topicPath !== topicPath;

    if (keyChanged) {
      const existing = getNote(topicPath);
      const serverContent = existing?.content || '';
      // Only set if local content is empty or equals last saved; avoid clobbering typing
      if (content === '' || content === lastSavedContentRef.current) {
        setContent(serverContent);
        lastSavedContentRef.current = serverContent;
        const d = existing?.updatedAt?.toDate
          ? existing.updatedAt.toDate()
          : existing?.updatedAt || null;
        setLastSaved(d || null);
      }
      loadedForRef.current = { userId: user.uid, topicPath };
    }
  }, [open, user, topicPath, getNote, content]);

  useEffect(() => {
    if (!user || !topicPath || !open) return;
    // Avoid saving if nothing changed
    if (content === lastSavedContentRef.current) return;

    const t = setTimeout(async () => {
      // Still unchanged? bail
      if (content === lastSavedContentRef.current) return;
      // Ensure editor mounted
      if (!quillRef.current?.getEditor?.()) return;
      setSaving(true);
      const res = await saveNote(topicPath, topicTitle, content);
      if (res.success) {
        setLastSaved(new Date());
        lastSavedContentRef.current = content;
      }
      setSaving(false);
    }, 1200);
    return () => clearTimeout(t);
  }, [content, user, topicPath, topicTitle, saveNote, open]);

  const startDrag = (e) => {
    if (!overlayRef.current) return;
    // Ignore right/middle clicks and interactions on controls inside header (e.g., Kapat)
  if (e.button !== 0) return;
    const target = e.target;
    if (target && (target.closest('button, a, select, input, textarea') || target.closest('.notes-overlay-actions'))) {
      return;
    }
    const r = overlayRef.current.getBoundingClientRect();
    dragStart.current = { id: e.pointerId, mx: e.clientX, my: e.clientY, ox: r.left, oy: r.top };
    // Capture on the header element to ensure consistent events across browsers
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
    overlayRef.current.classList.add('dragging');
  };
  const onDrag = (e) => {
    if (!dragStart.current || !overlayRef.current) return;
    // If primary button no longer held, end drag (prevents sticky on hover)
    if (e.buttons !== undefined && (e.buttons & 1) === 0) {
      endDrag(e);
      return;
    }
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    let nx = dragStart.current.ox + dx;
    let ny = dragStart.current.oy + dy;
    // clamp to viewport
    const r = overlayRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - Math.max(120, r.width * 0.2);
    const maxY = window.innerHeight - 80;
    nx = Math.max(8 - r.width * 0.8, Math.min(nx, maxX));
    ny = Math.max(8, Math.min(ny, maxY));
    overlayRef.current.style.left = `${nx}px`;
    overlayRef.current.style.top = `${ny}px`;
    overlayRef.current.style.right = 'auto';
  };
  const endDrag = (e) => {
    try { e.currentTarget?.releasePointerCapture?.(dragStart.current?.id); } catch {}
    try { overlayRef.current?.releasePointerCapture?.(dragStart.current?.id); } catch {}
    // Persist position
    if (overlayRef.current) {
      const r = overlayRef.current.getBoundingClientRect();
      try { localStorage.setItem('notesOverlayPos', JSON.stringify({ x: r.left, y: r.top })); } catch {}
    }
    dragStart.current = null;
    overlayRef.current?.classList?.remove('dragging');
  };
  const cancelDrag = (e) => {
    try { e.currentTarget?.releasePointerCapture?.(dragStart.current?.id); } catch {}
    try { overlayRef.current?.releasePointerCapture?.(dragStart.current?.id); } catch {}
    dragStart.current = null;
    overlayRef.current?.classList?.remove('dragging');
  };

  // Resizing logic
  const startResize = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!overlayRef.current) return;
  // Only start resize with primary (left) button
  if (e.button !== undefined && e.button !== 0) return;
    const r = overlayRef.current.getBoundingClientRect();
    resizeStart.current = { id: e.pointerId, mx: e.clientX, my: e.clientY, w: r.width, h: r.height };
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch {}
  };
  const onResize = (e) => {
    if (!resizeStart.current || !overlayRef.current) return;
    // If button released during resize, end it
    if (e.buttons !== undefined && (e.buttons & 1) === 0) {
      endResize(e);
      return;
    }
    const dw = e.clientX - resizeStart.current.mx;
    const dh = e.clientY - resizeStart.current.my;
    const newW = Math.max(320, Math.min(window.innerWidth - 24, Math.round(resizeStart.current.w + dw)));
    const newH = Math.max(240, Math.min(window.innerHeight - 64, Math.round(resizeStart.current.h + dh)));
    overlayRef.current.style.width = `${newW}px`;
    overlayRef.current.style.height = `${newH}px`;
  };
  const endResize = (e) => {
    try { e.currentTarget?.releasePointerCapture?.(resizeStart.current?.id); } catch {}
    try { overlayRef.current?.releasePointerCapture?.(resizeStart.current?.id); } catch {}
    if (overlayRef.current) {
      const r = overlayRef.current.getBoundingClientRect();
      localStorage.setItem('notesOverlaySize', JSON.stringify({ w: r.width, h: r.height }));
    }
    resizeStart.current = null;
  };

  // Restore persisted size and position on open; if no pos, place slightly inset from right
  useEffect(() => {
    if (!open || !overlayRef.current) return;
    try {
      const raw = localStorage.getItem('notesOverlaySize');
      if (raw) {
        const { w, h } = JSON.parse(raw);
        if (w && h) {
          overlayRef.current.style.width = `${w}px`;
          overlayRef.current.style.height = `${h}px`;
        }
      }
      const posRaw = localStorage.getItem('notesOverlayPos');
      if (posRaw) {
        const { x, y } = JSON.parse(posRaw);
        if (typeof x === 'number' && typeof y === 'number') {
          overlayRef.current.style.left = `${x}px`;
          overlayRef.current.style.top = `${y}px`;
          overlayRef.current.style.right = 'auto';
          return; // position restored
        }
      }
      // If no stored position, compute left so it's slightly inset from right
      const r = overlayRef.current.getBoundingClientRect();
      const inset = 32;
      const left = Math.max(8, window.innerWidth - r.width - inset);
      overlayRef.current.style.left = `${left}px`;
      overlayRef.current.style.right = 'auto';
      // top already set via CSS; keep it
    } catch {}
  }, [open]);

  // Restore persisted opacity on open
  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem('notesOverlayOpacityPct');
      if (raw) {
        const v = parseInt(raw, 10);
        if (!Number.isNaN(v) && v >= 30 && v <= 100) setOpacityPct(v);
      }
    } catch {}
  }, [open]);

  const onChangeOpacity = (e) => {
    const v = parseInt(e.target.value, 10);
    if (Number.isNaN(v)) return;
    const clamped = Math.min(100, Math.max(30, v));
    setOpacityPct(clamped);
    try { localStorage.setItem('notesOverlayOpacityPct', String(clamped)); } catch {}
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      const file = input.files && input.files[0];
      if (!file) return;
      // Basic type guard
      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir görsel dosya seçin.');
        return;
      }

      // Client-side resize/compress limits
      const MAX_MB = 1.0; // target size limit after compression
      const MAX_BYTES = MAX_MB * 1024 * 1024;
      const MAX_DIM = 1600; // max width/height

      const compressImage = async (f) => new Promise((resolve) => {
        try {
          const img = new Image();
          const url = URL.createObjectURL(f);
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;
            const scale = Math.min(1, MAX_DIM / Math.max(width, height));
            width = Math.round(width * scale);
            height = Math.round(height * scale);
            canvas.width = width; canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            // try jpeg for better compression; fallback to png if needed
            const qualitySteps = [0.8, 0.7, 0.6, 0.5];
            const tryExport = (i) => {
              const q = qualitySteps[i] ?? 0.5;
              canvas.toBlob((blob) => {
                if (!blob) return resolve(f);
                if (blob.size <= MAX_BYTES || i === qualitySteps.length) {
                  resolve(new File([blob], f.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
                } else {
                  tryExport(i + 1);
                }
              }, 'image/jpeg', q);
            };
            tryExport(0);
          };
          img.onerror = () => resolve(f);
          img.src = url;
        } catch {
          resolve(f);
        }
      });

      const toUpload = file.size > MAX_BYTES || file.type !== 'image/jpeg' ? await compressImage(file) : file;
      if (toUpload.size > MAX_BYTES) {
        alert(`Görsel ${MAX_MB}MB sınırını aşıyor. Lütfen daha küçük bir görsel yükleyin.`);
        return;
      }

      const res = await uploadImage(toUpload);
      if (res.success) {
        const editor = quillRef.current?.getEditor?.();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', res.url, 'user');
        }
      } else {
        alert(res.error || 'Resim yüklenemedi');
      }
    };
    input.click();
  }, [uploadImage]);

  const modules = useMemo(() => ({
    toolbar: {
      container: '#notes-toolbar',
      handlers: { image: imageHandler }
    },
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value
    }
  }), [imageHandler]);
  const formats = useMemo(() => (
    ['header','bold','italic','underline','strike','list','bullet','color','background','blockquote','code-block','link','image']
  ), []);

  // Dynamically apply a highlight.js theme that matches code settings
  useEffect(() => {
    (async () => {
      try {
        switch (codeTheme) {
          case 'vscDarkPlus':
            await import('highlight.js/styles/vs2015.css');
            break;
          case 'vs':
            await import('highlight.js/styles/vs.css');
            break;
          case 'ghcolors':
            await import('highlight.js/styles/github.css');
            break;
          case 'dracula':
            // Use a widely available dark theme instead of dracula to avoid missing css issue
            await import('highlight.js/styles/atom-one-dark.css');
            break;
          case 'materialDark':
            await import('highlight.js/styles/monokai.css');
            break;
          case 'materialLight':
            await import('highlight.js/styles/atom-one-light.css');
            break;
          default:
            await import('highlight.js/styles/github.css');
            break;
        }
      } catch (e) {
        // Fallback if theme fails to load
        await import('highlight.js/styles/atom-one-dark.css');
      }
    })();
  }, [codeTheme]);

  // Focus editor when opened
  useEffect(() => {
    if (open && user) {
      const editor = quillRef.current?.getEditor?.();
      if (editor) {
        setTimeout(() => editor.focus(), 0);
      }
    }
  }, [open, user]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="notes-overlay"
      role="dialog"
      aria-label="Notlar"
      style={{ '--code-font-size': `${fontSize}px`, '--notes-bg-alpha': String(opacityPct / 100) }}
    >
  <div className="notes-overlay-header" onPointerDown={startDrag} onPointerMove={onDrag} onPointerUp={endDrag} onPointerCancel={cancelDrag} style={{ touchAction: 'none' }}>
        <div className="notes-overlay-title">{topicTitle || 'Notlar'}</div>
        <div className="notes-overlay-actions">
          <div className="notes-status-indicator" title={lastSaved ? (saving ? 'Kaydediliyor…' : `Son kayıt: ${(lastSaved?.toLocaleTimeString ? lastSaved : new Date(lastSaved)).toLocaleTimeString('tr-TR')}`) : 'Henüz kayıt yok'}>
            {saving ? (
              <span className="saving">Kaydediliyor…</span>
            ) : (
              <span className="saved">
                {lastSaved ? `Son kayıt: ${(
                  (lastSaved?.toLocaleTimeString ? lastSaved : new Date(lastSaved))
                ).toLocaleTimeString('tr-TR')}` : 'Henüz kayıt yok'}
              </span>
            )}
          </div>
          <label className="opacity-label" title={`Şeffaflık: %${opacityPct}`}>
            Şeffaflık
            <input
              type="range"
              min="30"
              max="100"
              value={opacityPct}
              onChange={onChangeOpacity}
              aria-label="Şeffaflık"
            />
            <span className="opacity-value">%{opacityPct}</span>
          </label>
          <button onClick={onClose} aria-label="Kapat">Kapat</button>
        </div>
      </div>
      {/* Quill toolbar host directly under header to act like its second row */}
      <div className="notes-toolbar-host">
        <div id="notes-toolbar" className="ql-toolbar ql-snow">
          <span className="ql-formats">
            <select className="ql-header">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option selected></option>
            </select>
          </span>
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
          </span>
          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>
          <span className="ql-formats">
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
          </span>
          <span className="ql-formats">
            <button className="ql-clean"></button>
          </span>
        </div>
      </div>
      <div className="notes-overlay-body">
        {!user ? (
          <div className="notes-login-prompt">
            <p>Notlarınızı kaydetmek için <a href="/giris">giriş yapın</a></p>
          </div>
        ) : (
          <div className="notes-editor">
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={setContent}
              theme={quillTheme}
              modules={modules}
              formats={formats}
              placeholder="Notlarınızı yazın. Kod için code-block kullanın."
            />
          </div>
        )}
      </div>
  <div className="resize-handle" onPointerDown={startResize} onPointerMove={onResize} onPointerUp={endResize} onPointerCancel={endResize} style={{ touchAction: 'none' }} />
    </div>
  );
}

