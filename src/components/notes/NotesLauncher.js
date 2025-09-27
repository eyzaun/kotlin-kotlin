



import React, { useRef, useState } from 'react';
import './Notes.css';

export default function NotesLauncher({ onOpen }) {
  const ref = useRef(null);
  const dragStart = useRef(null);
  const dragged = useRef(false);
  const DRAG_THRESHOLD = 6; // px
  const [pos, setPos] = useState(() => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || (navigator?.maxTouchPoints || 0) > 0);
    return isMobile ? { left: 12, top: 64 } : { right: 16, top: 80 };
  });

  const onPointerDown = (e) => {
    const el = ref.current; if (!el) return;
    el.setPointerCapture?.(e.pointerId);
    const r = el.getBoundingClientRect();
    dragStart.current = { mx: e.clientX, my: e.clientY, ox: r.left, oy: r.top };
    dragged.current = false;
  };
  const onPointerMove = (e) => {
    if (!dragStart.current || !ref.current) return;
    const dx = e.clientX - dragStart.current.mx;
    const dy = e.clientY - dragStart.current.my;
    if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) dragged.current = true;
    const nx = dragStart.current.ox + dx;
    const ny = dragStart.current.oy + dy;
    ref.current.style.left = `${nx}px`;
    ref.current.style.top = `${ny}px`;
    ref.current.style.right = 'auto';
  };
  const onPointerUp = (e) => {
    const el = ref.current; if (!el) return;
    try { el.releasePointerCapture?.(e.pointerId); } catch {}
    // If not dragged, treat as click
    if (!dragged.current) onOpen?.();
    dragStart.current = null; dragged.current = false;
  };

  return (
    <div
      ref={ref}
      className="notes-launcher"
      role="button"
      aria-label="Not Defteri Aç"
      style={pos}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onClick={(e) => e.stopPropagation()}
      title="Notları Aç"
    >
      Notlar
    </div>
  );
}

