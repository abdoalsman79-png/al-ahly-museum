import { useStore } from '../store';
import { tr } from '../data/i18n';

export function Intro({ ready, onEnter }: { ready: boolean; onEnter: () => void }) {
  const lang = useStore((s) => s.lang); const setLang = useStore((s) => s.setLang); const started = useStore((s) => s.started);
  if (started) return (<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 text-sm gold">{tr(lang, 'loading')}</div>);
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-y-auto p-4" style={{ background: 'linear-gradient(rgba(10,4,6,.72), rgba(10,4,6,.9)), url(/rooms/cabinet.jpg) center/cover' }}>
      <div className="fade-up max-w-xl text-center">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-4 border-ahly-gold bg-ahly-red shadow-2xl" aria-hidden>
          <svg viewBox="0 0 64 64" width="52" height="52"><polygon fill="#d4a94f" points="32,6 39,25 59,25 43,37 49,57 32,45 15,57 21,37 5,25 25,25" /></svg>
        </div>
        <p className="text-xs tracking-[0.35em] gold mb-2">{tr(lang, 'subtitle')}</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-ahly-paper">{tr(lang, 'title')}</h1>
        <p className="mt-4 text-base text-ahly-paper/80">{tr(lang, 'introLine')}</p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <button className="btn !px-7 !py-3 !text-lg btn-on disabled:opacity-60" disabled={!ready} onClick={onEnter} data-testid="enter">{ready ? tr(lang, 'enter') : tr(lang, 'loading')}</button>
          <button className="btn" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} data-testid="intro-lang">{tr(lang, 'langBtn')}</button>
        </div>
        <p className="mt-6 text-xs text-ahly-paper/50">{tr(lang, 'note')}</p>
      </div>
    </div>
  );
}
