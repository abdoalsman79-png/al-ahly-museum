import { lazy, Suspense, useEffect, useState } from 'react';
import { useStore } from './store';
import { tr } from './data/i18n';
import { webglOk } from './three/Museum';
import { Hud } from './ui/Hud';
import { Drawer } from './ui/Drawer';
import { LibraryPanel } from './ui/LibraryPanel';
import { Intro } from './ui/Intro';
import { PhotoMuseum } from './ui/PhotoMuseum';
import { initAudio, resumeAudio, setMuted, setAmbience, chime } from './audio';
import { teleport, player, glideTo } from './three/Controller';
import { RELICS } from './data/relics';

const Museum = lazy(() => import('./three/Museum'));

export default function App() {
  const lang = useStore((s) => s.lang);
  const started = useStore((s) => s.started);
  const view = useStore((s) => s.view);
  const muted = useStore((s) => s.muted);
  const mood = useStore((s) => s.mood);
  const toast = useStore((s) => s.toast);
  const [ready, setReady] = useState(false);
  const [gl] = useState(webglOk);

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; document.title = `${tr(lang, 'title')}`; }, [lang]);
  useEffect(() => { setMuted(muted); }, [muted]);
  useEffect(() => { setAmbience(mood); }, [mood]);
  useEffect(() => {
    Promise.all([document.fonts.load('700 24px Cairo', 'أبجد abc'), document.fonts.load('400 24px Cairo', 'أبجد abc'), document.fonts.load('600 24px Cairo', 'أبجد abc'), document.fonts.load('700 24px "Playfair Display"', 'abc')]).catch(() => undefined);
  }, []);
  useEffect(() => {
    if (!toast) return; const id = setTimeout(() => useStore.getState().showToast(null), toast === 'lost' ? 5000 : 3600); return () => clearTimeout(id);
  }, [toast]);
  // test / debug hook (read-only helpers for QA)
  useEffect(() => { (window as unknown as { __museum: unknown }).__museum = { store: useStore, player, teleport, glideTo, relics: RELICS, chime }; }, []);

  const begin = () => { const ok = initAudio(); resumeAudio(); if (!ok) useStore.getState().showToast('audio'); setAmbience(useStore.getState().mood); useStore.getState().start(); };

  if (!gl) return (<div className="h-full flex items-center justify-center p-8 text-center"><div className="glass rounded-2xl p-8 max-w-md"><h1 className="font-display text-2xl gold mb-3">{tr(lang, 'title')}</h1><p>{tr(lang, 'noWebgl')}</p></div></div>);
  return (
    <div className="relative h-full w-full select-none">
      {view === '3d' && <Suspense fallback={null}><Museum onReady={() => setReady(true)} /></Suspense>}
      {view === '3d' ? <Hud /> : <PhotoMuseum />}
      <Drawer />
      <LibraryPanel />
      {(!started || (view === '3d' && !ready)) && <Intro ready={view === '3d' ? ready : true} onEnter={begin} />}
    </div>
  );
}
