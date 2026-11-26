import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store';
import { tr, pick, Key } from '../data/i18n';
import { ERAS, L } from '../data/types';
import { TROPHIES } from '../data/trophies';
import { FIGURES } from '../data/figures';
import { MOMENTS } from '../data/moments';
import { RELICS } from '../data/relics';
import { TrophyMesh, Bust } from '../three/models';
import { Environment } from '../three/Hall';
import { speak, stopSpeak, click } from '../audio';

function Spin({ children, scale }: { children: React.ReactNode; scale: number }) {
  const g = useRef<THREE.Group>(null); const drag = useRef(false); const last = useRef(0); const vel = useRef(0.6);
  const { gl } = useThree2();
  useEffect(() => {
    const el = gl.domElement;
    const d = (e: PointerEvent) => { drag.current = true; last.current = e.clientX; el.setPointerCapture(e.pointerId); };
    const m = (e: PointerEvent) => { if (!drag.current || !g.current) return; g.current.rotation.y += (e.clientX - last.current) * 0.012; last.current = e.clientX; };
    const u = () => { drag.current = false; };
    el.addEventListener('pointerdown', d); el.addEventListener('pointermove', m); el.addEventListener('pointerup', u); el.addEventListener('pointercancel', u);
    return () => { el.removeEventListener('pointerdown', d); el.removeEventListener('pointermove', m); el.removeEventListener('pointerup', u); el.removeEventListener('pointercancel', u); };
  }, [gl]);
  useFrame((_, dt) => { if (g.current && !drag.current) g.current.rotation.y += dt * vel.current; });
  return <group ref={g} scale={scale}>{children}</group>;
}
import { useThree as useThree2 } from '@react-three/fiber';

function Turntable({ children, scale = 1, y = 0.9 }: { children: React.ReactNode; scale?: number; y?: number }) {
  return (
    <div className="h-56 w-full cursor-grab overflow-hidden rounded-xl" style={{ background: 'radial-gradient(circle at 50% 40%, #4a1620, #120a0c)' }} data-testid="turntable" aria-label="360">
      <Canvas dpr={[1, 1.5]} camera={{ fov: 35, position: [0, y + 0.3, 3.6] }} gl={{ antialias: true }} onCreated={({ camera }) => camera.lookAt(0, y, 0)}>
        <Environment />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 4]} intensity={2.2} />
        <pointLight position={[-3, 2, -2]} intensity={14} color="#d4a94f" />
        <Spin scale={scale}>{children}</Spin>
      </Canvas>
    </div>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (<section className="mt-4"><h3 className="text-xs font-bold tracking-widest gold uppercase">{title}</h3><p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-ahly-paper/90">{children}</p></section>);
}
function Sources({ list }: { list: string[] }) {
  const lang = useStore((s) => s.lang);
  if (!list?.length) return null;
  return (<section className="mt-4"><h3 className="text-xs font-bold tracking-widest gold uppercase">{tr(lang, 'sources')}</h3>
    <ul className="mt-1 space-y-0.5 text-xs">{list.map((u) => <li key={u} dir="ltr" className="truncate"><a className="underline text-ahly-paper/70 hover:text-ahly-gold" href={u} target="_blank" rel="noreferrer">{u.replace(/^https?:\/\/(web\.archive\.org\/web\/\d+\/)?(www\.)?/, '')}</a></li>)}</ul></section>);
}

export function Drawer() {
  const s = useStore(); const lang = s.lang; const t = (k: Key) => tr(lang, k); const p = (l: L) => pick(l, lang);
  const sel = s.selected; const [speaking, setSpeaking] = useState(false);
  useEffect(() => { stopSpeak(); setSpeaking(false); }, [sel?.id, lang]);
  useEffect(() => () => stopSpeak(), []);
  if (!sel) return null;
  const favKey = `${sel.kind}:${sel.id}`; const isFav = s.favorites.has(favKey);
  let title = '', kind = '', body: React.ReactNode = null, listen = '';
  if (sel.kind === 'trophy') {
    const x = TROPHIES.find((a) => a.id === sel.id)!; title = p(x.name); kind = t('trophyKind');
    listen = [p(x.name), p(x.years), p(x.decisive), p(x.won), p(x.significance)].join('. ');
    body = (<>
      <Turntable scale={1.3}><TrophyMesh model={x.model} tint={x.tint} /></Turntable>
      <p className="mt-1 text-center text-[11px] text-ahly-paper/50">↔ {t('turntable')}</p>
      <div className="mt-2 flex flex-wrap gap-2 text-xs"><span className="btn !py-0.5">{p(x.years)}</span><span className="btn !py-0.5">{p(ERAS.find((e) => e.id === x.era)!.label)}</span></div>
      <Sec title={t('tournament')}>{p(x.context)}</Sec><Sec title={t('decisive')}>{p(x.decisive)}</Sec><Sec title={t('won')}>{p(x.won)}</Sec>
      <Sec title={t('sacrifice')}>{p(x.sacrifice)}</Sec><Sec title={t('significance')}>{p(x.significance)}</Sec><Sources list={x.sources} /></>);
  } else if (sel.kind === 'statue') {
    const x = FIGURES.find((a) => a.id === sel.id)!; title = p(x.name); kind = t('statueKind');
    listen = [p(x.name), p(x.role), p(x.philosophy), p(x.impact)].join('. ');
    body = (<>
      <Turntable scale={0.62} y={0.82}><Bust tone={x.tone} look={x.look} /></Turntable>
      <p className="mt-2 text-sm"><span className="gold">{p(x.role)}</span> · {p(x.lifespan)}</p>
      <p className="text-xs text-ahly-paper/70">{t('knownAs')}: {p(x.epithet)}</p>
      <Sec title={t('philosophy')}>{p(x.philosophy)}</Sec><Sec title={t('impactLabel')}>{p(x.impact)}</Sec>
      <section className="mt-4"><h3 className="text-xs font-bold tracking-widest gold uppercase">{t('milestones')}</h3>
        <ol className="mt-1 space-y-1 border-s border-ahly-gold/40 ps-3 text-sm">{x.milestones.map((m) => <li key={m.year}><b className="gold">{m.year}</b> {p(m.text)}</li>)}</ol></section><Sources list={x.sources} /></>);
  } else if (sel.kind === 'frame') {
    const x = MOMENTS.find((a) => a.id === sel.id)!; title = p(x.title); kind = x.kind === 'legend' ? t('legendTag') : t('momentTag');
    listen = [p(x.title), String(x.year), p(x.story)].join('. ');
    const pos = ((x.year - 1907) / (2026 - 1907)) * 100;
    body = (<>
      <div className="mt-1 flex flex-wrap gap-2 text-xs"><span className="btn !py-0.5">{x.year}</span><span className="btn !py-0.5">{p(x.tag)}</span><span className="btn !py-0.5">{p(ERAS.find((e) => e.id === x.era)!.label)}</span></div>
      <Sec title={kind}>{p(x.story)}</Sec>
      {x.stats.length > 0 && <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">{x.stats.map((st, i) => <div key={i} className="rounded-lg bg-white/5 p-2"><dt className="text-[11px] text-ahly-paper/60">{p(st.label)}</dt><dd className="font-semibold">{p(st.value)}</dd></div>)}</dl>}
      <section className="mt-4"><h3 className="text-xs font-bold tracking-widest gold uppercase">{t('placement')}</h3>
        <div dir="ltr" className="relative mt-3 h-1.5 rounded bg-white/15"><div className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ahly-paper bg-ahly-red" style={{ left: pos + '%' }} />
          <div className="absolute -bottom-5 left-0 text-[10px] text-ahly-paper/60">1907</div><div className="absolute -bottom-5 right-0 text-[10px] text-ahly-paper/60">2026</div></div></section><div className="h-4" /><Sources list={x.sources} /></>);
  } else if (sel.kind === 'relic') {
    const x = RELICS.find((a) => a.id === sel.id)!; title = p(x.title); kind = t('relicKind'); listen = p(x.story);
    body = (<><div className="mt-2 text-xs gold">{x.year}</div><Sec title={t('hiddenRelic')}>{p(x.story)}</Sec><Sources list={x.sources} /></>);
  }
  const canFav = sel.kind !== 'relic';
  return (
    <aside className="glass fade-up absolute inset-y-0 end-0 z-30 flex w-[min(100%,26rem)] flex-col" role="dialog" aria-modal="true" aria-label={title} data-testid="drawer">
      <header className="flex items-start gap-2 border-b border-ahly-gold/25 p-4">
        <div className="flex-1"><div className="text-[11px] tracking-widest gold uppercase">{sel.kind === 'trophy' ? t('dossier') : kind}</div><h2 className="font-display text-xl font-bold leading-snug" data-testid="drawer-title">{title}</h2></div>
        <button className="btn" onClick={() => s.inspect(null)} aria-label={t('close')} data-testid="drawer-close">✕</button>
      </header>
      <div className="scroll flex-1 overflow-y-auto p-4">{body}</div>
      <footer className="flex gap-2 border-t border-ahly-gold/25 p-3">
        {canFav && <button className={'btn ' + (isFav ? 'btn-on' : '')} onClick={() => { click(); s.toggleFavorite(favKey); }} data-testid="fav-toggle">{isFav ? '★ ' + t('removeFav') : '☆ ' + t('addFav')}</button>}
        <button className="btn" onClick={() => { if (speaking) { stopSpeak(); setSpeaking(false); } else { const ok = speak(listen, lang, () => setSpeaking(false)); if (ok) setSpeaking(true); else s.showToast('audio'); } }}>{speaking ? '■ ' + t('stopListen') : '🔈 ' + t('listen')}</button>
      </footer>
    </aside>
  );
}
