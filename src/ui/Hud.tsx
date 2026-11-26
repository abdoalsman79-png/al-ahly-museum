import { useEffect, useRef } from 'react';
import { useStore, Mood, Quality } from '../store';
import { tr, pick, Key } from '../data/i18n';
import { ERAS } from '../data/types';
import { TROPHIES } from '../data/trophies';
import { FIGURES } from '../data/figures';
import { MOMENTS } from '../data/moments';
import { RELICS } from '../data/relics';
import { WAYPOINTS } from '../three/layout';
import { input, glideTo, teleport } from '../three/Controller';
import { resumeAudio, click } from '../audio';

const TOTAL = TROPHIES.length + FIGURES.length + MOMENTS.length;
const zoneKey = (z: string): Key => ('zone' + z[0].toUpperCase() + z.slice(1)) as Key;
const lineKey = (z: string): Key => ('zone' + z[0].toUpperCase() + z.slice(1) + 'Line') as Key;

function Joystick() {
  const base = useRef<HTMLDivElement>(null); const knob = useRef<HTMLDivElement>(null); const id = useRef(-1);
  const move = (e: React.PointerEvent) => {
    if (e.pointerId !== id.current || !base.current) return; const r = base.current.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2), dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
    input.joyX = dx; input.joyY = -dy; if (knob.current) knob.current.style.transform = `translate(${dx * 34}px,${dy * 34}px)`;
  };
  const end = (e: React.PointerEvent) => { if (e.pointerId !== id.current) return; id.current = -1; input.joyX = 0; input.joyY = 0; if (knob.current) knob.current.style.transform = 'translate(0,0)'; };
  return (
    <div ref={base} dir="ltr" data-testid="touchpad" className="absolute bottom-6 left-5 z-20 h-28 w-28 rounded-full glass touch-none"
      onPointerDown={(e) => { id.current = e.pointerId; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); resumeAudio(); move(e); }} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <div ref={knob} className="absolute left-1/2 top-1/2 -ml-6 -mt-6 h-12 w-12 rounded-full bg-ahly-red border-2 border-ahly-gold" />
    </div>
  );
}

export function Hud() {
  const s = useStore(); const lang = s.lang; const t = (k: Key) => tr(lang, k);
  const touchCapable = useRef(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
  useEffect(() => { if (touchCapable.current) s.setTouch(true); }, []); // eslint-disable-line
  if (!s.started) return null;
  const found = s.relicsFound.size; const visited = s.visited.size;
  const focus = s.focus;
  const focusLabel = (() => {
    if (!focus) return '';
    if (focus.kind === 'trophy') return pick(TROPHIES.find((x) => x.id === focus.id)!.name, lang);
    if (focus.kind === 'statue') return pick(FIGURES.find((x) => x.id === focus.id)!.name, lang);
    if (focus.kind === 'frame') return pick(MOMENTS.find((x) => x.id === focus.id)!.title, lang);
    if (focus.kind === 'shelf') return t(({ chronicles: 'chronShelf', almanacs: 'almShelf', press: 'pressShelf', timeline: 'timeShelf' } as Record<string, Key>)[focus.id] ?? 'shelfKind');
    return '';
  })();
  const moods: [Mood, Key][] = [['heritage', 'moodHeritage'], ['night', 'moodNight'], ['sepia', 'moodSepia']];
  const quals: Quality[] = ['high', 'medium', 'low'];
  const toast = s.toast;
  const relic = toast?.startsWith('relic:') ? RELICS.find((r) => r.id === toast.slice(6)) : null;
  const modal = !!s.selected || s.libraryOpen;
  return (
    <div className="pointer-events-none absolute inset-0 z-10" data-testid="hud">
      {/* top bar */}
      <div className="pointer-events-auto absolute inset-x-0 top-0 flex flex-wrap items-center gap-2 p-2 sm:p-3">
        <div className="glass rounded-full px-3 py-1.5 font-display text-sm font-bold gold hidden md:block">{t('title')}</div>
        <div className="glass flex rounded-full p-0.5" role="tablist" aria-label="mode">
          {(['walk', 'tour', 'library'] as const).map((m) => (
            <button key={m} role="tab" aria-selected={s.mode === m} data-testid={'mode-' + m} className={'btn !border-0 ' + (s.mode === m ? 'btn-on' : '')}
              onClick={() => { click(); if (m === 'library') s.openLibrary(); else { if (s.libraryOpen) s.closeLibrary(); s.setMode(m); } }}>{t(m)}</button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="glass flex items-center gap-3 rounded-full px-3 py-1.5 text-xs sm:text-sm" data-testid="counters">
          <span title={t('relicsFound')}>✦ {t('relics')} <b data-testid="relic-count" className="gold">{found}/{RELICS.length}</b></span>
          <span className="hidden sm:inline" title={t('progress')}>◈ {t('exhibits')} <b data-testid="exhibit-count" className="gold">{visited}/{TOTAL}</b></span>
        </div>
        <button className="btn" data-testid="fav-btn" onClick={() => s.toggleFav()} aria-label={t('favorites')}>★ {s.favorites.size}</button>
        <button className="btn" data-testid="lang-btn" onClick={() => s.setLang(lang === 'en' ? 'ar' : 'en')} aria-label="language">{t('langBtn')}</button>
        <button className="btn" data-testid="mute-btn" onClick={() => s.toggleMute()} aria-label={s.muted ? t('unmute') : t('mute')}>{s.muted ? '🔇' : '🔊'}</button>
        <button className="btn" data-testid="help-btn" onClick={() => s.toggleHelp()} aria-label={t('help')}>?</button>
      </div>
      {/* second row: quality + mood */}
      <div className="pointer-events-auto absolute end-2 top-[3.4rem] z-10 flex flex-col items-end gap-1 sm:end-3 sm:top-[3.9rem]">
        <div className="glass flex items-center gap-1 rounded-full p-0.5 text-xs" data-testid="quality">
          <span className="px-2 text-ahly-paper/60">{t('quality')}</span>
          {quals.map((q) => <button key={q} data-testid={'q-' + q} className={'btn !px-2 !py-0.5 !text-xs !border-0 ' + (s.quality === q ? 'btn-on' : '')} onClick={() => s.setQuality(q)}>{t(q)}</button>)}
        </div>
        <div className="glass flex items-center gap-1 rounded-full p-0.5 text-xs" data-testid="mood">
          {moods.map(([m, k]) => <button key={m} data-testid={'mood-' + m} className={'btn !px-2 !py-0.5 !text-xs !border-0 ' + (s.mood === m ? 'btn-on' : '')} onClick={() => s.setMood(m)}>{t(k)}</button>)}
        </div>
      </div>
      {/* zone banner */}
      {!modal && (
        <div key={s.zone} className="fade-up absolute inset-x-0 top-[3.6rem] mx-auto w-fit max-w-[70%] text-center sm:top-16" data-testid="zone-banner">
          <div className="font-display text-lg gold sm:text-2xl drop-shadow">{t(zoneKey(s.zone))}</div>
          <div className="hidden text-xs text-ahly-paper/70 sm:block">{t(lineKey(s.zone))}</div>
        </div>
      )}
      {/* era filter */}
      {!modal && s.zone === 'gallery' && (
        <div className="pointer-events-auto absolute start-2 top-28 flex max-w-[60%] flex-wrap gap-1 sm:start-3 sm:top-32" data-testid="era-filter">
          <button className={'btn !text-xs ' + (s.era === 'all' ? 'btn-on' : '')} onClick={() => s.setEra('all')}>{t('allEras')}</button>
          {ERAS.map((e) => <button key={e.id} data-testid={'era-' + e.id} className={'btn !text-xs ' + (s.era === e.id ? 'btn-on' : '')} onClick={() => s.setEra(e.id)}>{pick(e.label, lang)}</button>)}
        </div>
      )}
      {/* crosshair + prompt */}
      {!modal && !s.touch && <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ahly-gold/70" />}
      {!modal && focus && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-28 flex justify-center sm:bottom-24" data-testid="prompt">
          <button className="glass pop rounded-2xl px-5 py-2 text-center" onClick={() => { click(); s.inspect(focus); }}>
            <div className="font-semibold gold">{focusLabel}</div>
            <div className="text-sm">{focus.kind === 'shelf' ? t('openLibrary') : s.touch ? t('inspectTouch') : t('inspect')}</div>
          </button>
        </div>
      )}
      {/* tour controls */}
      {s.mode === 'tour' && !modal && (
        <div className="pointer-events-auto absolute inset-x-0 bottom-3 flex flex-wrap items-center justify-center gap-2 px-2" data-testid="tour-controls">
          <button className="btn" onClick={() => s.setTour((s.tourIndex + WAYPOINTS.length - 1) % WAYPOINTS.length)}>‹ {t('tourPrev')}</button>
          <div className="glass flex gap-1 rounded-full p-1">
            {WAYPOINTS.map((w, i) => <button key={w.id} data-testid={'wp-' + w.id} className={'btn !px-2 !py-0.5 !text-xs !border-0 ' + (i === s.tourIndex ? 'btn-on' : '')} onClick={() => { s.setTour(i); glideTo(i); }}>{t(zoneKey(w.id))}</button>)}
          </div>
          <button className="btn" onClick={() => s.setTour((s.tourIndex + 1) % WAYPOINTS.length)}>{t('tourNext')} ›</button>
          <button className={'btn ' + (s.tourAuto ? 'btn-on' : '')} onClick={() => s.setTour(s.tourIndex, !s.tourAuto)}>{s.tourAuto ? t('tourPause') : t('tourAuto')}</button>
          <button className="btn" onClick={() => s.setMode('walk')}>{t('tourWalk')}</button>
        </div>
      )}
      {s.touch && !modal && <Joystick />}
      {s.touch && !modal && <div className="absolute bottom-8 end-5 text-xs text-ahly-paper/40">{t('tapLook')}</div>}
      {/* toasts */}
      {relic && (
        <div className="pointer-events-auto absolute inset-x-0 top-24 mx-auto w-[min(92%,26rem)] pop" data-testid="relic-toast">
          <div className="glass rounded-2xl p-4 text-center" style={{ boxShadow: '0 0 40px rgba(212,169,79,.5)' }}>
            <div className="text-xs gold tracking-widest">✦ {t('relicDiscovered')} · {relic.year}</div>
            <div className="font-display text-lg font-bold">{pick(relic.title, lang)}</div>
            <p className="mt-1 text-sm text-ahly-paper/80">{pick(relic.story, lang)}</p>
          </div>
        </div>
      )}
      {toast === 'lost' && <div className="glass absolute inset-x-0 top-24 mx-auto w-fit rounded-xl px-4 py-2 text-sm">{t('contextLost')}</div>}
      {toast === 'audio' && <div className="glass absolute inset-x-0 top-24 mx-auto w-fit rounded-xl px-4 py-2 text-sm">{t('audioUnavailable')}</div>}
      {s.helpOpen && <Help />}
      {s.favOpen && <Favs />}
    </div>
  );
}

function Help() {
  const s = useStore(); const lang = s.lang; const t = (k: Key) => tr(lang, k);
  return (
    <div className="pointer-events-auto absolute inset-0 z-30 flex items-center justify-center bg-black/50 p-4" onClick={() => s.toggleHelp(false)} data-testid="help-modal">
      <div className="glass fade-up max-w-md rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-xl gold mb-3">{t('helpTitle')}</h2>
        <ul className="space-y-2 text-sm">{(['helpMove', 'helpLook', 'helpInspect', 'helpModes', 'helpEsc'] as Key[]).map((k) => <li key={k}>• {t(k)}</li>)}</ul>
        <button className="btn mt-4" onClick={() => s.toggleHelp(false)}>{t('close')}</button>
      </div>
    </div>
  );
}

function Favs() {
  const s = useStore(); const lang = s.lang; const t = (k: Key) => tr(lang, k);
  const items = [...s.favorites].map((key) => { const [kind, id] = key.split(':'); let name = ''; let era = '';
    if (kind === 'trophy') name = pick(TROPHIES.find((x) => x.id === id)?.name ?? { en: id, ar: id }, lang);
    if (kind === 'statue') name = pick(FIGURES.find((x) => x.id === id)?.name ?? { en: id, ar: id }, lang);
    if (kind === 'frame') { const m = MOMENTS.find((x) => x.id === id); name = m ? `${m.year} · ${pick(m.title, lang)}` : id; }
    return { key, kind, id, name, era }; });
  return (
    <div className="pointer-events-auto absolute inset-y-0 end-0 z-30 w-[min(92%,22rem)] glass fade-up p-4 overflow-y-auto scroll" data-testid="fav-drawer">
      <div className="mb-3 flex items-center justify-between"><h2 className="font-display text-lg gold">★ {t('favorites')}</h2><button className="btn" onClick={() => s.toggleFav(false)}>{t('close')}</button></div>
      {items.length === 0 && <p className="text-sm text-ahly-paper/70">{t('favoritesEmpty')}</p>}
      <ul className="space-y-2">{items.map((i) => (
        <li key={i.key} className="flex items-center gap-2 rounded-lg bg-white/5 p-2 text-sm">
          <button className="flex-1 text-start" onClick={() => s.inspect({ kind: i.kind as never, id: i.id })}>{i.name}</button>
          <button className="btn !px-2 !py-0.5" onClick={() => s.toggleFavorite(i.key)} aria-label={t('removeFav')}>✕</button>
        </li>))}</ul>
    </div>
  );
}
void teleport;
