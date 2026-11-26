import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '../store';
import { tr, pick, Key } from '../data/i18n';
import { ROOMS, Target } from '../data/rooms';
import { TROPHIES } from '../data/trophies';
import { FIGURES } from '../data/figures';
import { MOMENTS } from '../data/moments';
import { RELICS } from '../data/relics';
import { click, chime } from '../audio';
import { Help, Favs } from './Hud';

const IW = 1408, IH = 768;
const TOTAL = TROPHIES.length + FIGURES.length + MOMENTS.length;
type Picker = { kind: 'trophy' | 'statue' | 'frame'; ids: string[]; title: { en: string; ar: string } };
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function PhotoMuseum() {
  const s = useStore(); const lang = s.lang; const t = (k: Key) => tr(lang, k);
  const [roomId, setRoomId] = useState('cabinet');
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('in');
  const [origin, setOrigin] = useState('50% 50%');
  const [picker, setPicker] = useState<Picker | null>(null);
  const [settings, setSettings] = useState(false);
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [view, setViewState] = useState({ zoom: 1, tx: 0, ty: 0 });
  const room = ROOMS.find((r) => r.id === roomId)!;
  const dragRef = useRef<{ id: number; x: number; y: number; moved: number } | null>(null);
  const pts = useRef(new Map<number, { x: number; y: number }>()); const pinch = useRef(0);
  const started = s.started;

  const base = useMemo(() => { const sc = Math.max(vp.w / IW, vp.h / IH); return { sc, dw: IW * sc, dh: IH * sc }; }, [vp]);
  const fit = useCallback((zoom: number, tx: number, ty: number) => {
    const w = base.dw * zoom, h = base.dh * zoom;
    return { zoom, tx: w <= vp.w ? (vp.w - w) / 2 : clamp(tx, vp.w - w, 0), ty: h <= vp.h ? (vp.h - h) / 2 : clamp(ty, vp.h - h, 0) };
  }, [base, vp]);
  const center = useCallback((z = 1, fx = 0.5) => fit(z, (vp.w - base.dw * z) * fx, (vp.h - base.dh * z) / 2), [fit, vp, base]);

  useEffect(() => { const f = () => setVp({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  useEffect(() => { setViewState(center(1, 0.5)); }, [roomId, vp.w, vp.h]); // eslint-disable-line
  useEffect(() => { ROOMS.forEach((r) => { const i = new Image(); i.src = r.src; }); }, []);
  useEffect(() => { if (phase === 'in') { const id = setTimeout(() => setPhase('idle'), 900); return () => clearTimeout(id); } }, [phase, roomId]);

  const goRoom = (id: string, x: number, y: number) => {
    if (phase === 'out' || id === roomId) return;
    setOrigin(`${x}% ${y}%`); setPhase('out'); setPicker(null);
    setTimeout(() => { setRoomId(id); setPhase('in'); }, 650);
  };

  // keys
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const st = useStore.getState(); const key = e.key.toLowerCase();
      if (key === 'escape') { if (st.selected) st.inspect(null); else if (picker) setPicker(null); else if (st.libraryOpen) st.closeLibrary(); else if (st.helpOpen) st.toggleHelp(false); else if (st.favOpen) st.toggleFav(false); return; }
      if (!st.started || e.target instanceof HTMLInputElement) return;
      if (key === 'm') st.toggleMute(); if (key === 'l') st.setLang(st.lang === 'en' ? 'ar' : 'en'); if (key === '?' || key === 'h') st.toggleHelp();
      if (!st.selected && !st.libraryOpen && !picker) {
        const i = ROOMS.findIndex((r) => r.id === roomId);
        if (key === 'arrowright' || key === 'd') goRoom(ROOMS[(i + 1) % ROOMS.length].id, 90, 50);
        if (key === 'arrowleft' || key === 'a') goRoom(ROOMS[(i + ROOMS.length - 1) % ROOMS.length].id, 10, 50);
        if (key === '+' || key === '=') setViewState((v) => fit(clamp(v.zoom * 1.25, 1, 3), v.tx - (vp.w / 2 - v.tx) * 0.25, v.ty - (vp.h / 2 - v.ty) * 0.25));
        if (key === '-') setViewState((v) => fit(clamp(v.zoom / 1.25, 1, 3), v.tx + (vp.w / 2 - v.tx) * 0.2, v.ty + (vp.h / 2 - v.ty) * 0.2));
      }
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }); // eslint-disable-line

  const zoomAt = (cx: number, cy: number, f: number) => setViewState((v) => { const z = clamp(v.zoom * f, 1, 3); const r = z / v.zoom; return fit(z, cx - (cx - v.tx) * r, cy - (cy - v.ty) * r); });
  const onDown = (e: React.PointerEvent) => { pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY }); dragRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 }; if (pts.current.size === 2) { const [a, b] = [...pts.current.values()]; pinch.current = Math.hypot(a.x - b.x, a.y - b.y); } if (e.pointerType === 'touch') s.setTouch(true); };
  const onMove = (e: React.PointerEvent) => {
    if (!pts.current.has(e.pointerId)) return; pts.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.current.size === 2) { const [a, b] = [...pts.current.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y); if (pinch.current) zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, d / pinch.current); pinch.current = d; if (dragRef.current) dragRef.current.moved = 99; return; }
    const d = dragRef.current; if (!d || d.id !== e.pointerId) return; const dx = e.clientX - d.x, dy = e.clientY - d.y; d.x = e.clientX; d.y = e.clientY; d.moved += Math.abs(dx) + Math.abs(dy);
    if (d.moved > 4) setViewState((v) => fit(v.zoom, v.tx + dx, v.ty + dy));
  };
  const onUp = (e: React.PointerEvent) => { pts.current.delete(e.pointerId); if (pts.current.size < 2) pinch.current = 0; };

  const hit = (h: { x: number; y: number; target: Target }) => {
    if (dragRef.current && dragRef.current.moved > 6) return; click();
    const tg = h.target;
    if ('door' in tg) goRoom(tg.door, h.x, h.y);
    else if ('picker' in tg) {
      let ids = tg.picker.ids;
      if (ids[0] === '__cl') ids = TROPHIES.filter((x) => x.id.startsWith('cl-')).map((x) => x.id);
      if (ids[0] === '__other') ids = TROPHIES.filter((x) => !x.id.startsWith('cl-')).map((x) => x.id);
      setPicker({ ...tg.picker, ids });
    } else if ('library' in tg) s.openLibrary();
    else if ('relic' in tg) { const r = RELICS[tg.relic]; if (r && useStore.getState().foundRelic(r.id)) { chime(r.memorial ? 440 : 880); s.showToast('relic:' + r.id); } else if (r) s.inspect({ kind: 'relic', id: r.id }); }
    else s.inspect(tg);
  };

  const filter = s.mood === 'sepia' ? 'sepia(.85) contrast(1.05)' : s.mood === 'night' ? 'brightness(.78) contrast(1.15) saturate(1.15) hue-rotate(-6deg)' : 'none';
  const modal = !!s.selected || s.libraryOpen || !!picker;
  const found = s.relicsFound.size; const toast = s.toast; const relicToast = toast?.startsWith('relic:') ? RELICS.find((r) => r.id === toast.slice(6)) : null;
  const idx = ROOMS.findIndex((r) => r.id === roomId);
  const itemName = (kind: string, id: string) => {
    if (kind === 'trophy') { const x = TROPHIES.find((a) => a.id === id); return x ? `${pick(x.years, lang)} · ${pick(x.name, lang)}` : id; }
    if (kind === 'statue') { const x = FIGURES.find((a) => a.id === id); return x ? `${pick(x.name, lang)} · ${pick(x.role, lang)}` : id; }
    const x = MOMENTS.find((a) => a.id === id); return x ? `${x.year} · ${pick(x.title, lang)}` : id;
  };
  if (!started) return <div className="absolute inset-0 bg-black" />;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" data-testid="photo" style={{ touchAction: 'none' }}
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onWheel={(e) => zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 0.89)}
      onDoubleClick={(e) => zoomAt(e.clientX, e.clientY, view.zoom > 1.2 ? 0.5 : 2)}>
      <style>{`
        @keyframes roomOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(2.1)}}
        @keyframes roomIn{from{opacity:0;transform:scale(1.35)}to{opacity:1;transform:scale(1)}}
        @keyframes glint{0%,100%{opacity:.18;transform:scale(.8)}50%{opacity:.9;transform:scale(1.25)}}
        @keyframes ring{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.9);opacity:0}}`}</style>
      <div key={roomId} className="absolute inset-0" data-testid="stage"
        style={{ transformOrigin: origin, animation: phase === 'out' ? 'roomOut .65s ease-in forwards' : phase === 'in' ? 'roomIn .9s ease-out both' : undefined, filter }}>
        <div className="absolute left-0 top-0" style={{ width: base.dw, height: base.dh, transform: `translate(${view.tx}px,${view.ty}px) scale(${view.zoom})`, transformOrigin: '0 0', willChange: 'transform' }}>
          <img src={room.src} alt={pick(room.title, lang)} draggable={false} className="h-full w-full select-none" data-testid="room-img" />
          {room.hotspots.map((h, i) => {
            const st: React.CSSProperties = { left: `${h.x}%`, top: `${h.y}%`, transform: `translate(-50%,-50%) scale(${1 / view.zoom})` };
            const tg = h.target;
            if ('relic' in tg) {
              const r = RELICS[tg.relic]; if (!r) return null; const done = s.relicsFound.has(r.id);
              return (<button key={i} data-testid="relic-spot" aria-label={t('hiddenRelic')} onClick={(e) => { e.stopPropagation(); hit(h); }} className="absolute h-9 w-9 rounded-full" style={st}>
                <span className="absolute inset-2 rounded-full" style={{ background: done ? 'rgba(212,169,79,.25)' : 'radial-gradient(circle, #fff6c8, #d4a94f 60%, transparent 72%)', animation: done ? undefined : 'glint 2.2s ease-in-out infinite' }} /></button>);
            }
            const door = 'door' in tg;
            return (
              <button key={i} data-testid={door ? 'door' : 'hotspot'} aria-label={h.label ? pick(h.label, lang) : ''} onClick={(e) => { e.stopPropagation(); hit(h); }} className="group absolute" style={st}>
                <span className={'relative flex items-center justify-center rounded-full border-2 border-ahly-gold ' + (door ? 'h-11 w-11 bg-black/55 text-lg' : 'h-8 w-8 bg-ahly-red/75')} style={{ boxShadow: '0 0 18px rgba(212,169,79,.85)' }}>
                  <span className="absolute inset-0 rounded-full border border-ahly-gold" style={{ animation: 'ring 2.4s ease-out infinite' }} />
                  {door ? <span aria-hidden>{(h.x < 50) !== (lang === 'ar') ? '‹' : '›'}</span> : <span aria-hidden className="text-xs">✦</span>}
                </span>
                {h.label && <span className="pointer-events-none absolute left-1/2 top-full mt-1 w-max max-w-[10rem] -translate-x-1/2 rounded-lg bg-black/75 px-2 py-0.5 text-xs text-ahly-paper">{pick(h.label, lang)}</span>}
              </button>);
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(0,0,0,.55)), linear-gradient(to bottom, rgba(0,0,0,.6), transparent 14%, transparent 70%, rgba(0,0,0,.85))' }} />

      {/* top bar */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 p-2 sm:p-3" onPointerDown={(e) => e.stopPropagation()}>
        <div className="glass rounded-full px-3 py-1.5 font-display text-sm font-bold gold hidden md:block">{t('title')}</div>
        <button className="btn" data-testid="library-btn" onClick={() => { click(); s.openLibrary(); }}>📚 {t('library')}</button>
        <div className="flex-1" />
        <div className="glass flex items-center gap-3 rounded-full px-3 py-1.5 text-xs sm:text-sm">
          <span>✦ {t('relics')} <b data-testid="relic-count" className="gold">{found}/{RELICS.length}</b></span>
          <span className="hidden sm:inline">◈ {t('exhibits')} <b data-testid="exhibit-count" className="gold">{s.visited.size}/{TOTAL}</b></span>
        </div>
        <button className="btn" data-testid="fav-btn" onClick={() => s.toggleFav()}>★ {s.favorites.size}</button>
        <button className="btn" data-testid="lang-btn" onClick={() => s.setLang(lang === 'en' ? 'ar' : 'en')}>{t('langBtn')}</button>
        <button className="btn" data-testid="mute-btn" onClick={() => s.toggleMute()}>{s.muted ? '🔇' : '🔊'}</button>
        <button className="btn" data-testid="settings-btn" onClick={() => setSettings(!settings)} aria-label={t('mood')}>⚙</button>
        <button className="btn" data-testid="help-btn" onClick={() => s.toggleHelp()}>?</button>
      </div>
      {settings && (
        <div className="pointer-events-auto absolute end-2 top-14 z-10 flex flex-col items-end gap-1 sm:end-3 sm:top-16" onPointerDown={(e) => e.stopPropagation()}>
          <div className="glass flex items-center gap-1 rounded-full p-0.5 text-xs" data-testid="mood">
            {([['heritage', 'moodHeritage'], ['night', 'moodNight'], ['sepia', 'moodSepia']] as const).map(([m, k]) => <button key={m} data-testid={'mood-' + m} className={'btn !px-2 !py-0.5 !text-xs !border-0 ' + (s.mood === m ? 'btn-on' : '')} onClick={() => s.setMood(m)}>{t(k)}</button>)}
          </div>
          <button className="btn !text-xs" data-testid="to-3d" onClick={() => s.setView('3d')}>{lang === 'ar' ? 'القاعة ثلاثية الأبعاد (تجريبي)' : '3D hall (experimental)'}</button>
        </div>)}

      {/* title + zoom */}
      {!modal && (
        <div className="pointer-events-none absolute inset-x-0 bottom-20 px-4 text-center sm:bottom-24" key={roomId + lang}>
          <h2 className="font-display text-xl font-bold gold drop-shadow sm:text-3xl fade-up" data-testid="room-title">{pick(room.title, lang)}</h2>
          <p className="mx-auto mt-1 hidden max-w-2xl text-sm text-ahly-paper/85 sm:block">{pick(room.text, lang)}</p>
        </div>)}
      <div className="pointer-events-auto absolute bottom-3 inset-x-0 flex items-center justify-center gap-2 px-2" onPointerDown={(e) => e.stopPropagation()}>
        <button className="btn" onClick={() => goRoom(ROOMS[(idx + ROOMS.length - 1) % ROOMS.length].id, 10, 50)} aria-label={t('tourPrev')}>{lang === 'ar' ? '›' : '‹'}</button>
        <div className="glass flex max-w-[78vw] gap-1 overflow-x-auto rounded-full p-1">
          {ROOMS.map((r) => <button key={r.id} data-testid={'room-' + r.id} className={'btn whitespace-nowrap !text-xs !border-0 ' + (r.id === roomId ? 'btn-on' : '')} onClick={() => goRoom(r.id, 50, 50)}>{pick(r.title, lang)}</button>)}
        </div>
        <button className="btn" onClick={() => goRoom(ROOMS[(idx + 1) % ROOMS.length].id, 90, 50)} aria-label={t('tourNext')}>{lang === 'ar' ? '‹' : '›'}</button>
        <button className="btn hidden sm:inline-flex" onClick={() => zoomAt(vp.w / 2, vp.h / 2, 1.4)} aria-label="zoom in">＋</button>
        <button className="btn hidden sm:inline-flex" onClick={() => zoomAt(vp.w / 2, vp.h / 2, 0.7)} aria-label="zoom out">－</button>
      </div>

      {picker && (
        <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center bg-black/55 p-3" onPointerDown={(e) => e.stopPropagation()} onClick={() => setPicker(null)} data-testid="picker">
          <div className="glass fade-up max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl p-4 scroll" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between"><h3 className="font-display text-lg gold">{pick(picker.title, lang)}</h3><button className="btn" onClick={() => setPicker(null)}>✕</button></div>
            <ul className="space-y-1.5">{picker.ids.map((id) => (
              <li key={id}><button className="w-full rounded-lg bg-white/5 p-2 text-start text-sm hover:bg-ahly-deep/80" data-testid="picker-item" onClick={() => { click(); setPicker(null); s.inspect({ kind: picker.kind, id }); }}>{itemName(picker.kind, id)}{s.visited.has(`${picker.kind}:${id}`) && <span className="ms-2 text-xs gold">✓</span>}</button></li>))}</ul>
          </div>
        </div>)}
      {relicToast && (
        <div className="pointer-events-auto absolute inset-x-0 top-20 z-20 mx-auto w-[min(92%,26rem)] pop" data-testid="relic-toast" onPointerDown={(e) => e.stopPropagation()}>
          <div className="glass rounded-2xl p-4 text-center" style={{ boxShadow: '0 0 40px rgba(212,169,79,.5)' }}>
            <div className="text-xs gold tracking-widest">✦ {t('relicDiscovered')} · {relicToast.year}</div>
            <div className="font-display text-lg font-bold">{pick(relicToast.title, lang)}</div>
            <p className="mt-1 text-sm text-ahly-paper/80">{pick(relicToast.story, lang)}</p>
          </div>
        </div>)}
      {s.helpOpen && <div className="pointer-events-auto absolute inset-0 z-30"><Help /></div>}
      {s.favOpen && <div className="pointer-events-auto absolute inset-0 z-30 pointer-events-none"><Favs /></div>}
    </div>
  );
}
