import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNotes } from '../../context/NotesContext';
import { useAuth } from '../../context/AuthContext';
import CodeBlock from '../ui/CodeBlock';
import './Notes.css';

const Notes = ({ topicPath, topicTitle }) => {
  const { user } = useAuth();
  const { getNote, saveNote, uploadImage, deleteImage } = useNotes();
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('snow');
  const quillRef = useRef(null);
  const overlayRef = useRef(null);
  const dragPos = useRef({ x: 0, y: 0 });
  const dragStart = useRef(null);

  // Load existing note
  useEffect(() => {
    if (user && topicPath) {
      const existingNote = getNote(topicPath);
      if (existingNote) {
        setContent(existingNote.content || '');
        setLastSaved(existingNote.updatedAt);
      } else {
        setContent('');
        setLastSaved(null);
      }
    }
  }, [user, topicPath, getNote]);

  // Auto-save functionality
  useEffect(() => {
    if (!user || !topicPath) return;

    const timeoutId = setTimeout(async () => {
      if (content.trim()) {
        setSaving(true);
        const result = await saveNote(topicPath, topicTitle, content);
        if (result.success) {
          setLastSaved(new Date());
        }
        setSaving(false);
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [content, user, topicPath, topicTitle, saveNote]);

  const handleImageUpload = async (file) => {
    alert('Resim yükleme özelliği şu anda kullanılamıyor.');
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'code-block'],
        ['link'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background',
    'blockquote', 'code-block', 'link'
  ];

  const startDrag = (e) => {
    if (!overlayRef.current) return;
    const rect = overlayRef.current.getBoundingClientRect();
    dragStart.current = { mx: e.clientX, my: e.clientY, ox: rect.left, oy: rect.top };
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);
  };

  const onDrag = (e) => {
    if (!dragStart.current || !overlayRef.current) return;
    const nx = dragStart.current.ox + (e.clientX - dragStart.current.mx);
    const ny = dragStart.current.oy + (e.clientY - dragStart.current.my);
    dragPos.current = { x: nx, y: ny };
    overlayRef.current.style.left = `${nx}px`;
    overlayRef.current.style.top = `${ny}px`;
    overlayRef.current.style.right = 'auto';
  };

  const endDrag = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', endDrag);
    dragStart.current = null;
  };

  return (
    <>
      {/* Floating toggle button always visible */}
      <button className="notes-fab" onClick={() => setOpen(v => !v)} aria-label="Notlar">
        Notlar
      </button>

      {/* Overlay editor */}
      {open && (
        <div
          ref={overlayRef}
          className="notes-overlay"
          role="dialog"
          aria-label="Notlar"
          style={{}}
        >
          <div className="notes-overlay-header" onMouseDown={startDrag}>
            <div className="notes-overlay-title">{topicTitle || 'Notlar'}</div>
            <div className="notes-overlay-actions">
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="snow">Light</option>
                <option value="bubble">Minimal</option>
              </select>
              <button onClick={() => setOpen(false)} aria-label="Kapat">Kapat</button>
            </div>
          </div>
          <div className="notes-overlay-body">
            {!user ? (
              <div className="notes-login-prompt">
                <p>Notlarınızı kaydetmek için <a href="/giris">giriş yapın</a></p>
              </div>
            ) : (
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                theme={theme}
                modules={modules}
                formats={formats}
                placeholder="Notlarınızı buraya yazın... Kod blokları için 'code-block' butonunu kullanın."
              />
            )}
            {!saving && lastSaved && (
              <div className="saved" style={{ paddingTop: 6 }}>Son kayıt: {lastSaved.toLocaleTimeString('tr-TR')}</div>
            )}
            {saving && <div className="saving" style={{ paddingTop: 6 }}>Kaydediliyor...</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
