import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotesLauncher from './NotesLauncher';
import NotesOverlay from './NotesOverlay';

export default function NotesWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // On route change, close the overlay
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);


  // Konu/soru sayfası filtresi: root, login, ayarlar, projeler gibi yerlerde göstermeyelim
  const showOnThisPage = useMemo(() => {
    const p = location.pathname;
    if (p === '/' || p.startsWith('/giris') || p.startsWith('/kayit') || p.startsWith('/ayarlar') || p.startsWith('/projeler') || p.startsWith('/kaynaklar') || p.startsWith('/notlarim')) return false;
    // Konu ve soru sayfaları ör: /big-o, /array, /hafta1-quiz, /.../soru1
    return true;
  }, [location.pathname]);

  const topicPath = location.pathname;
  const topicTitle = useMemo(() => {
    const seg = topicPath.split('/').filter(Boolean).pop() || 'Notlar';
    return seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }, [topicPath]);

  if (!showOnThisPage) return null;

  return (
    <>
  <NotesLauncher onOpen={() => setOpen(true)} />
      <NotesOverlay topicPath={topicPath} topicTitle={topicTitle} open={open} onClose={() => setOpen(false)} />
    </>
  );
}



