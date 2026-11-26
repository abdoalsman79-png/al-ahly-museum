import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { tr, pick } from '../data/i18n';
import { ROOMS, Target } from '../data/rooms';
import { click } from '../audio';

export function RoomsViewer() {
  const s = useStore(); const lang = s.lang;
  const [auto, setAuto] = useState(false); const [loaded, setLoaded] = useState(false);
  const i = s.roomIndex; const room = ROOMS[i];
  useEffect(() => { setLoaded(false); }, [i]);
  useEffect(() => { if (!s.roomsOpen || !auto) return; const id = setTimeout(() => s.setRoom((i + 1) % ROOMS.length), 7000); return () => clearTimeout(id); }, [s.roomsOpen, auto, i]); // eslint-disable-line
  useEffect(() => {
    if (!s.roomsOpen) return;
    const k = (e: KeyboardEvent) => { if (s.selected) return; if (e.key === 'ArrowRight') s.setRoom((i + (lang === 'ar' ? -1 : 1) + ROOMS.length) % ROOMS.length); if (e.key === 'ArrowLeft') s.setRoom((i + (lang === 'ar' ? 1 : -1) + ROOMS.length) % ROOMS.length); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [s.roomsOpen, i, lang, s.selected]); // eslint-disable-line
  if (!s.roomsOpen) return null;
  const go = (t: Target) => {
    click();
    if ('goto' in t) { s.closeRooms(); s.setMode('tour'); s.setTour(t.goto, false); }
    else s.inspect(t);
  };
  const style = { '--z0': room.from.z, '--z1': room.to.z, '--o0': `${room.from.x}% ${room.from.y}%`, '--o1': `${room.to.x}% ${room.to.y}%` } as React.CSSProperties;
  const hasHot = room.hotspots.length > 0;
  return (
    <div className="absolute inset-0 z-20 bg-black" data-testid="rooms" role="dialog" aria-label={tr(lang, 'title')}>
      <style>{`@keyframes kb{from{transform:scale(var(--z0));transform-origin:var(--o0)}to{transform:scale(var(--z1));transform-origin:var(--o1)}}`}</style>
      <div className="absolute inset-0 overflow-hidden">
        <div key={room.id} className="absolute inset-0" style={{ ...style, animation: 'kb 18s ease-in-out forwards' }}>
          <img src={room.src} alt={pick(room.title, lang)} onLoad={() => setLoaded(true)} data-testid="room-img"
            className={'h-full w-full object-cover transition-opacity duration-700 ' + (loaded ? 'opacity-100' : 'opacity-0')} />
          <HotspotLayer hotspots={room.hotspots} lang={lang} onPick={go} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.55), transparent 18%, transparent 62%, rgba(0,0,0,.8))' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 pb-5 sm:p-8">
        <div className="mx-auto max-w-3xl text-center fade-up" key={room.id + lang}>
          <div className="text-xs tracking-widest gold">{i + 1} / {ROOMS.length}</div>
          <h2 className="font-display text-xl font-bold sm:text-3xl" data-testid="room-title">{pick(room.title, lang)}</h2>
          <p className="mt-1 text-sm text-ahly-paper/85">{pick(room.text, lang)}</p>
          {hasHot && <p className="mt-1 text-xs text-ahly-gold/80">{lang === 'ar' ? 'المس النقاط المضيئة لفتح التفاصيل' : 'Tap the glowing dots to open details'}</p>}
        </div>
      </div>
      <div className="absolute inset-x-0 top-3 flex items-center justify-center gap-2 px-2 sm:top-4">
        <button className="btn" data-testid="room-prev" onClick={() => s.setRoom((i + ROOMS.length - 1) % ROOMS.length)}>{lang === 'ar' ? '›' : '‹'} {tr(lang, 'tourPrev')}</button>
        <button className={'btn ' + (auto ? 'btn-on' : '')} data-testid="room-auto" onClick={() => setAuto(!auto)}>{auto ? tr(lang, 'tourPause') : tr(lang, 'tourAuto')}</button>
        <button className="btn" data-testid="room-next" onClick={() => s.setRoom((i + 1) % ROOMS.length)}>{tr(lang, 'tourNext')} {lang === 'ar' ? '‹' : '›'}</button>
        <button className="btn" data-testid="room-close" onClick={() => s.closeRooms()}>{tr(lang, 'close')} ✕</button>
      </div>
    </div>
  );
}

// object-cover maps the 1408x768 image; compute the displayed rect so dots land on the right pixels.
function HotspotLayer({ hotspots, lang, onPick }: { hotspots: { x: number; y: number; label: { en: string; ar: string }; target: Target }[]; lang: 'en' | 'ar'; onPick: (t: Target) => void }) {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => { const f = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  const iw = 1408, ih = 768; const sc = Math.max(vp.w / iw, vp.h / ih); const dw = iw * sc, dh = ih * sc; const ox = (vp.w - dw) / 2, oy = (vp.h - dh) / 2;
  return (
    <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
      {hotspots.map((h) => (
        <button key={h.label.en} className="pointer-events-auto group absolute -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-ahly-gold bg-ahly-red/70" style={{ left: ox + (h.x / 100) * dw, top: oy + (h.y / 100) * dh, boxShadow: '0 0 18px rgba(212,169,79,.9)', animation: 'pop .6s ease both' }}
          aria-label={h.label[lang]} data-testid="hotspot" onClick={() => onPick(h.target)}>
          <span className="pointer-events-none absolute left-1/2 top-9 w-max max-w-[11rem] -translate-x-1/2 rounded-lg bg-black/75 px-2 py-1 text-xs text-ahly-paper opacity-90">{h.label[lang]}</span>
        </button>))}
    </div>
  );
}
