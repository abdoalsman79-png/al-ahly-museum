import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import { TROPHIES } from '../data/trophies';
import { FIGURES } from '../data/figures';
import { MOMENTS } from '../data/moments';
import { RELICS } from '../data/relics';
import { TROPHY_SLOTS, STATUE_SLOTS, FRAME_SLOTS, SHELVES } from './layout';
import { TrophyMesh, Bust } from './models';
import { MAT } from './materials';
import { trophyPlaque, figurePlaque, posterTexture, relicTexture, signTexture } from './textures';
import { regRef } from './registry';
import { tr } from '../data/i18n';

const useDispose = (...t: (THREE.Texture | null | undefined)[]) => useEffect(() => () => t.forEach((x) => x?.dispose()), t);

function Pulse({ children, active }: { children: React.ReactNode; active: boolean }) {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => { if (g.current) { const s = 1 + (active ? 0.03 + Math.sin(clock.elapsedTime * 5) * 0.015 : 0); g.current.scale.setScalar(s); } });
  return <group ref={g}>{children}</group>;
}

function TrophyCase({ i }: { i: number }) {
  const t = TROPHIES[i]; const slot = TROPHY_SLOTS[i];
  const lang = useStore((s) => s.lang);
  const focus = useStore((s) => s.focus);
  const visited = useStore((s) => s.visited.has(`trophy:${t.id}`));
  const tex = useMemo(() => trophyPlaque(t, lang), [t, lang]);
  useDispose(tex);
  const ref = useRef<THREE.Group>(null!);
  const active = focus?.kind === 'trophy' && focus.id === t.id;
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * (active ? 1.2 : 0.25); });
  return (
    <group position={[slot.x, 0, slot.z]} ref={regRef('trophy', t.id)}>
      <mesh position={[0, 0.5, 0]} material={MAT.marble} castShadow receiveShadow><boxGeometry args={[1.5, 1, 1.5]} /></mesh>
      <mesh position={[0, 1.01, 0]} material={MAT.brass}><boxGeometry args={[1.58, 0.05, 1.58]} /></mesh>
      <mesh position={[0, 0.3, 0.76]}><planeGeometry args={[1.2, 0.375]} /><meshStandardMaterial map={tex} metalness={0.6} roughness={0.35} /></mesh>
      <Pulse active={active}>
        <group ref={ref} position={[0, 1.04, 0]} scale={1.15}><TrophyMesh model={t.model} tint={t.tint} /></group>
      </Pulse>
      <mesh position={[0, 1.95, 0]} material={MAT.glass}><boxGeometry args={[1.5, 1.8, 1.5]} /></mesh>
      {[[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]].map(([x, z], k) => (<mesh key={k} position={[x, 1.95, z]} material={MAT.brass}><boxGeometry args={[0.05, 1.8, 0.05]} /></mesh>))}
      <mesh position={[0, 2.88, 0]} material={MAT.brass}><boxGeometry args={[1.58, 0.06, 1.58]} /></mesh>
      <mesh position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.6, 0.68, 40]} /><meshBasicMaterial color={active ? '#ffe9a0' : visited ? '#6fbf73' : '#d4a94f'} transparent opacity={active ? 0.95 : 0.5} /></mesh>
    </group>
  );
}
export function Trophies() { return <>{TROPHIES.map((_, i) => <TrophyCase key={i} i={i} />)}</>; }

function StatueStand({ i }: { i: number }) {
  const f = FIGURES[i]; const slot = STATUE_SLOTS[i];
  const lang = useStore((s) => s.lang); const focus = useStore((s) => s.focus);
  const tex = useMemo(() => figurePlaque(f, lang), [f, lang]); useDispose(tex);
  const active = focus?.kind === 'statue' && focus.id === f.id;
  return (
    <group position={[slot.x, 0, slot.z]} ref={regRef('statue', f.id)}>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <Pulse active={active}><Bust tone={f.tone} look={f.look} /></Pulse>
        <mesh position={[0, 0.7, 0.51]}><planeGeometry args={[0.8, 0.3]} /><meshStandardMaterial map={tex} metalness={0.6} roughness={0.3} /></mesh>
      </group>
      <mesh position={[-1.6, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.9, 1.05, 40]} /><meshBasicMaterial color={active ? '#ffe9a0' : '#d4a94f'} transparent opacity={active ? 0.9 : 0.4} /></mesh>
    </group>
  );
}
export function Statues() {
  return (<>
    {FIGURES.map((_, i) => <StatueStand key={i} i={i} />)}
    {STATUE_SLOTS.map((s, i) => (<mesh key={i} position={[16.6, 4, s.z]} rotation={[0, -Math.PI / 2, 0]}><planeGeometry args={[2.4, 4.4]} /><meshStandardMaterial color="#3a0b14" roughness={0.9} /></mesh>))}
  </>);
}

function Frame({ i }: { i: number }) {
  const m = MOMENTS.slice().sort((a, b) => a.year - b.year)[i]; const slot = FRAME_SLOTS[i];
  const lang = useStore((s) => s.lang); const era = useStore((s) => s.era); const focus = useStore((s) => s.focus);
  const visited = useStore((s) => s.visited.has(`frame:${m.id}`));
  const tex = useMemo(() => posterTexture(m, lang), [m, lang]); useDispose(tex);
  const dim = era !== 'all' && era !== m.era;
  const active = focus?.kind === 'frame' && focus.id === m.id;
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame((_, dt) => { if (mat.current) { const t = dim ? 0.12 : active ? 1.15 : 0.6; mat.current.emissiveIntensity += (t - mat.current.emissiveIntensity) * (1 - Math.pow(0.01, dt)); } });
  const W = 2.0, H = 1.5;
  return (
    <group position={[slot.x, slot.y, slot.z]} rotation={[0, Math.PI / 2, 0]} ref={regRef('frame', m.id)}>
      <mesh position={[0, 0, -0.05]} material={MAT.gold}><boxGeometry args={[W + 0.25, H + 0.25, 0.08]} /></mesh>
      <mesh position={[0, 0, 0]}><planeGeometry args={[W, H]} /><meshStandardMaterial ref={mat} map={tex} emissive="#ffffff" emissiveMap={tex} emissiveIntensity={0.6} roughness={0.5} /></mesh>
      {dim && <mesh position={[0, 0, 0.01]}><planeGeometry args={[W, H]} /><meshBasicMaterial color="#000" transparent opacity={0.6} /></mesh>}
      <mesh position={[0, -H / 2 - 0.22, 0.02]}><boxGeometry args={[0.3, 0.05, 0.04]} /><meshBasicMaterial color={visited ? '#6fbf73' : active ? '#ffe9a0' : '#a8863a'} /></mesh>
      <mesh position={[0, H / 2 + 0.28, 0.2]} rotation={[0.5, 0, 0]} material={MAT.brass}><boxGeometry args={[0.9, 0.06, 0.2]} /></mesh>
    </group>
  );
}
export function Frames() { return <>{FRAME_SLOTS.map((_, i) => <Frame key={i} i={i} />)}</>; }

function Shelf({ id, x, z, label }: { id: string; x: number; z: number; label: 'chronShelf' | 'almShelf' | 'pressShelf' | 'timeShelf' }) {
  const lang = useStore((s) => s.lang); const focus = useStore((s) => s.focus); const libOpen = useStore((s) => s.libraryOpen); const libTab = useStore((s) => s.libTab);
  const active = focus?.kind === 'shelf' && focus.id === id;
  const tex = useMemo(() => signTexture(tr(lang, label), lang, 640, 120), [lang, label]); useDispose(tex);
  const open = (libOpen && ((id === 'chronicles' && libTab === 'chronicles') || (id === 'almanacs' && libTab === 'almanacs') || (id === 'press' && libTab === 'press') || (id === 'timeline' && libTab === 'timeline'))) || active;
  const books = useRef<THREE.Mesh[]>([]);
  const colors = ['#7a0a1c', '#1f3a5a', '#3d5a2a', '#5a3a1a', '#8a6d3b', '#4a1a4a', '#a3302a'];
  const bookData = useMemo(() => Array.from({ length: 5 * 14 }).map((_, i) => ({ r: Math.floor(i / 14), c: i % 14, h: 0.7 + Math.random() * 0.25, w: 0.18 + Math.random() * 0.1, col: colors[(i * 7) % colors.length], feat: (i % 14 === 3 || i % 14 === 8) })), []);
  useFrame((_, dt) => { books.current.forEach((b) => { if (!b) return; const f = b.userData.feat as boolean; const tz = f && open ? 0.45 : 0; b.position.z += (tz - b.position.z) * (1 - Math.pow(0.001, dt)); }); });
  if (id === 'timeline') {
    return (
      <group position={[x, 0, z]} ref={regRef('shelf', id)}>
        <mesh position={[0, 0.6, 0]} material={MAT.wood} castShadow><cylinderGeometry args={[1.4, 1.5, 1.2, 40]} /></mesh>
        <mesh position={[0, 1.22, 0]} material={MAT.brass}><cylinderGeometry args={[1.5, 1.5, 0.06, 40]} /></mesh>
        <mesh position={[0, 1.35, 0]} rotation={[-Math.PI / 2 + 0.3, 0, 0]}><planeGeometry args={[1.8, 1.1]} /><meshStandardMaterial color="#e9dcb8" emissive="#6b4d1a" emissiveIntensity={open ? 0.7 : 0.2} /></mesh>
        <mesh position={[0, 2.0, 0]} material={MAT.gold}><torusGeometry args={[0.6, 0.03, 10, 40]} /></mesh>
        <mesh position={[0, 2.0, 0]}><sphereGeometry args={[0.32, 24, 18]} /><meshStandardMaterial color="#d6b25a" emissive="#d6a23a" emissiveIntensity={open ? 1.2 : 0.5} metalness={0.6} roughness={0.3} /></mesh>
        <mesh position={[0, 1.4, 1.6]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.8, 1.95, 48]} /><meshBasicMaterial color="#d4a94f" transparent opacity={0.0} /></mesh>
      </group>
    );
  }
  return (
    <group position={[x, 0, z]} ref={regRef('shelf', id)}>
      <mesh position={[0, 3.4, 0.2]} material={MAT.wood} castShadow><boxGeometry args={[8, 6.8, 0.8]} /></mesh>
      {[0, 1, 2, 3, 4].map((r) => (<mesh key={r} position={[0, 0.9 + r * 1.25, -0.2]} material={MAT.dark}><boxGeometry args={[7.7, 0.08, 0.6]} /></mesh>))}
      {bookData.map((b, i) => (
        <mesh key={i} ref={(m) => { if (m) { books.current[i] = m; m.userData.feat = b.feat; } }} position={[-3.5 + b.c * 0.52, 0.98 + b.r * 1.25 + b.h / 2 * 0.9, -0.2]}>
          <boxGeometry args={[b.w * 1.4, b.h * 0.9, 0.42]} /><meshStandardMaterial color={b.col} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 7.3, -0.1]}><planeGeometry args={[5.6, 1.05]} /><meshStandardMaterial map={tex} emissive="#3a2008" emissiveMap={tex} emissiveIntensity={open ? 1 : 0.6} /></mesh>
      <mesh position={[0, 0.4, -0.6]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.01, 0.02, 4]} /><meshBasicMaterial visible={false} /></mesh>
    </group>
  );
}
export function Library3D() {
  return (<>
    {SHELVES.map((s) => <Shelf key={s.id} {...s} />)}
    {[-1, 1].map((sx) => (<mesh key={sx} position={[sx * 16.3, 3.4, 25]} material={MAT.wood}><boxGeometry args={[1.0, 6.8, 9]} /></mesh>))}
    <mesh position={[0, 0.03, 25]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[4.5, 48]} /><meshStandardMaterial color="#5c0a18" roughness={0.9} /></mesh>
    <mesh position={[0, 0.036, 25]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[4.2, 4.4, 48]} /><meshStandardMaterial color="#d4a94f" metalness={1} roughness={0.3} /></mesh>
  </>);
}

function RelicDisc({ i }: { i: number }) {
  const r = RELICS[i];
  const found = useStore((s) => s.relicsFound.has(r.id)); const just = useStore((s) => s.justFound === r.id); const focus = useStore((s) => s.focus);
  const tex = useMemo(() => relicTexture(r.year, found, !!r.memorial), [r, found]); useDispose(tex);
  const glow = useRef<THREE.Mesh>(null!); const disc = useRef<THREE.Group>(null!);
  const t0 = useRef(0);
  useEffect(() => { if (just) t0.current = performance.now(); }, [just]);
  const [, force] = useState(0);
  useEffect(() => { const id = setInterval(() => force((n) => n + 1), 5000); return () => clearInterval(id); }, []);
  useFrame(({ clock }) => {
    const age = (performance.now() - t0.current) / 1000;
    const m = glow.current.material as THREE.MeshBasicMaterial;
    if (just && age < 2.5) { glow.current.scale.setScalar(1 + age * 1.6); m.opacity = Math.max(0, 0.9 - age * 0.36); }
    else { glow.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2 + i) * 0.06); m.opacity = found ? 0.25 : 0.12 + (focus?.id === r.id ? 0.4 : 0.1) * (0.6 + Math.sin(clock.elapsedTime * 3 + i) * 0.4); }
    if (disc.current) disc.current.position.y = just && age < 1 ? Math.sin(age * Math.PI) * 0.15 : 0;
  });
  return (
    <group position={[r.x, 0.025, r.z]} ref={regRef('relic', r.id)}>
      <group ref={disc}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><circleGeometry args={[0.62, 40]} /><meshStandardMaterial map={tex} metalness={0.75} roughness={0.4} emissive={found ? '#8a5a18' : '#2a1808'} emissiveIntensity={found ? 0.6 : 0.25} /></mesh>
      </group>
      <mesh ref={glow} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}><ringGeometry args={[0.62, 0.9, 40]} /><meshBasicMaterial color={r.memorial ? '#cfd8e8' : '#ffd878'} transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
    </group>
  );
}
export function Relics() { return <>{RELICS.map((_, i) => <RelicDisc key={i} i={i} />)}</>; }
