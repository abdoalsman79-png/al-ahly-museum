import { create } from 'zustand';
import { EraId, Lang } from './data/types';
import { Kind } from './three/layout';

export type Mode = 'walk' | 'tour' | 'library';
export type Quality = 'high' | 'medium' | 'low';
export type Mood = 'heritage' | 'night' | 'sepia';
export type LibTab = 'chronicles' | 'almanacs' | 'press' | 'timeline';
export interface Sel { kind: Kind; id: string }

const load = (k: string): string[] => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } };
const save = (k: string, v: Set<string>) => { try { localStorage.setItem(k, JSON.stringify([...v])); } catch { /* ignore */ } };
const initLang = (): Lang => {
  try { const s = localStorage.getItem('ahly-lang'); if (s === 'ar' || s === 'en') return s; } catch { /* ignore */ }
  return typeof navigator !== 'undefined' && navigator.language?.startsWith('ar') ? 'ar' : 'en';
};
const initQuality = (): Quality => {
  try { const s = localStorage.getItem('ahly-quality'); if (s === 'high' || s === 'medium' || s === 'low') return s; } catch { /* ignore */ }
  const mobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  return mobile ? 'medium' : 'high';
};

interface S {
  lang: Lang; started: boolean; mode: Mode; quality: Quality; mood: Mood; muted: boolean;
  era: EraId | 'all'; selected: Sel | null; focus: Sel | null; helpOpen: boolean; favOpen: boolean;
  libraryOpen: boolean; libTab: LibTab; tourIndex: number; tourAuto: boolean; zone: string; toast: string | null;
  relicsFound: Set<string>; visited: Set<string>; favorites: Set<string>; justFound: string | null; touch: boolean;
  setLang: (l: Lang) => void; start: () => void; setMode: (m: Mode) => void; setQuality: (q: Quality) => void;
  setMood: (m: Mood) => void; toggleMute: () => void; setEra: (e: EraId | 'all') => void;
  inspect: (s: Sel | null) => void; setFocus: (s: Sel | null) => void; toggleHelp: (v?: boolean) => void; toggleFav: (v?: boolean) => void;
  openLibrary: (tab?: LibTab) => void; closeLibrary: () => void; setTour: (i: number, auto?: boolean) => void;
  setZone: (z: string) => void; showToast: (m: string | null) => void; foundRelic: (id: string) => boolean;
  toggleFavorite: (key: string) => void; setTouch: (t: boolean) => void;
}

export const useStore = create<S>((set, get) => ({
  lang: initLang(), started: false, mode: 'walk', quality: initQuality(), mood: 'heritage', muted: false,
  era: 'all', selected: null, focus: null, helpOpen: false, favOpen: false, libraryOpen: false, libTab: 'chronicles',
  tourIndex: 0, tourAuto: false, zone: 'nave', toast: null,
  relicsFound: new Set(load('ahly-relics')), visited: new Set(load('ahly-visited')), favorites: new Set(load('ahly-favs')),
  justFound: null, touch: false,
  setLang: (lang) => { try { localStorage.setItem('ahly-lang', lang); } catch { /* ignore */ } set({ lang }); },
  start: () => set({ started: true }),
  setMode: (mode) => set({ mode, libraryOpen: mode === 'library', selected: null, tourAuto: false }),
  setQuality: (quality) => { try { localStorage.setItem('ahly-quality', quality); } catch { /* ignore */ } set({ quality }); },
  setMood: (mood) => set({ mood }),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
  setEra: (era) => set({ era }),
  inspect: (sel) => {
    if (!sel) { set({ selected: null }); return; }
    if (sel.kind === 'shelf') { get().openLibrary(sel.id === 'chronicles' ? 'chronicles' : sel.id === 'almanacs' ? 'almanacs' : sel.id === 'press' ? 'press' : 'timeline'); return; }
    const visited = new Set(get().visited); visited.add(`${sel.kind}:${sel.id}`); save('ahly-visited', visited);
    set({ selected: sel, visited, helpOpen: false, favOpen: false });
  },
  setFocus: (focus) => { const f = get().focus; if (f?.id !== focus?.id || f?.kind !== focus?.kind) set({ focus }); },
  toggleHelp: (v) => set((s) => ({ helpOpen: v ?? !s.helpOpen })),
  toggleFav: (v) => set((s) => ({ favOpen: v ?? !s.favOpen, selected: null })),
  openLibrary: (tab) => set((s) => ({ libraryOpen: true, mode: 'library', libTab: tab ?? s.libTab, selected: null })),
  closeLibrary: () => set({ libraryOpen: false, mode: 'walk' }),
  setTour: (tourIndex, auto) => set((s) => ({ tourIndex, tourAuto: auto ?? s.tourAuto })),
  setZone: (zone) => set({ zone }),
  showToast: (toast) => set({ toast }),
  foundRelic: (id) => {
    const s = get(); if (s.relicsFound.has(id)) return false;
    const r = new Set(s.relicsFound); r.add(id); save('ahly-relics', r);
    set({ relicsFound: r, justFound: id }); return true;
  },
  toggleFavorite: (key) => { const f = new Set(get().favorites); f.has(key) ? f.delete(key) : f.add(key); save('ahly-favs', f); set({ favorites: f }); },
  setTouch: (touch) => set({ touch })
}));
