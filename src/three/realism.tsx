import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { MAT } from './materials';
import { canvasTex } from './textures';
import { FIGURES } from '../data/figures';

// ---------- warm studio environment: dark room with soft spot panels, so metals get real highlights
export function WarmEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const room = new THREE.Scene();
    room.add(new THREE.Mesh(new THREE.BoxGeometry(30, 12, 30), new THREE.MeshBasicMaterial({ color: '#3a2a20', side: THREE.BackSide })));
    const panel = (x: number, z: number, i: number, c = '#ffe2b0') => { const m = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.4), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide })); m.rotation.x = Math.PI / 2; m.position.set(x, 5.8, z); room.add(m); };
    for (let x = -9; x <= 9; x += 6) for (let z = -9; z <= 9; z += 6) panel(x, z, 9);
    const wallP = (x: number, y: number, c: string, i: number) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide })); m.position.set(x, y, -14.5); room.add(m); };
    wallP(-8, 2.5, '#9a1428', 1.6); wallP(8, 2.5, '#fff0d8', 3);
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(room, 0.03).texture;
    scene.environment = env; scene.environmentIntensity = 0.75;
    return () => { scene.environment = null; env.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}

// ---------- materials
const bronzeMat = new THREE.MeshPhysicalMaterial({ color: '#8a5526', metalness: 1, roughness: 0.34, clearcoat: 0.15, clearcoatRoughness: 0.4, envMapIntensity: 1.5 });
const goldBronze = new THREE.MeshPhysicalMaterial({ color: '#c79a45', metalness: 1, roughness: 0.3, clearcoat: 0.2, envMapIntensity: 1.5 });
const marbleBust = new THREE.MeshPhysicalMaterial({ color: '#efe9dc', metalness: 0, roughness: 0.25, clearcoat: 0.4, envMapIntensity: 1 });
const shirtRed = new THREE.MeshStandardMaterial({ color: '#b11326', roughness: 0.75, metalness: 0 });
const woodDark = new THREE.MeshPhysicalMaterial({ color: '#4a2214', roughness: 0.38, clearcoat: 0.55, clearcoatRoughness: 0.25, envMapIntensity: 1 });
const woodTrim = new THREE.MeshPhysicalMaterial({ color: '#341508', roughness: 0.35, clearcoat: 0.6, envMapIntensity: 1 });
export const BRASS_PLATE = new THREE.MeshPhysicalMaterial({ color: '#d2a84b', metalness: 1, roughness: 0.22, envMapIntensity: 1.6 });

// ---------- head: displaced icosphere with brow, nose, cheeks, jaw, chin, ears
function headGeo(): THREE.BufferGeometry {
  const g = new THREE.IcosahedronGeometry(0.115, 5); const p = g.attributes.position as THREE.BufferAttribute; const v = new THREE.Vector3();
  const bump = (x: number, y: number, z: number, cx: number, cy: number, cz: number, s: number) => Math.exp(-(((x - cx) ** 2 + (y - cy) ** 2 + (z - cz) ** 2) / (s * s)));
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i).normalize(); let { x, y, z } = v;
    let r = 1; const ax = Math.abs(x);
    let sx = 0.82, sy = 1.12, sz = 0.98;
    if (y < -0.1) { sx *= 1 + (y + 0.1) * 0.35; }                 // jaw taper
    r += 0.16 * bump(ax, y, z, 0, -0.05, 1, 0.22) * (z > 0 ? 1 : 0); // nose
    r += 0.06 * bump(ax, y, z, 0.38, 0.28, 0.86, 0.2) * (z > 0 ? 1 : 0); // brow
    r -= 0.05 * bump(ax, y, z, 0.36, 0.12, 0.9, 0.14) * (z > 0 ? 1 : 0); // eye sockets
    r += 0.05 * bump(ax, y, z, 0.62, -0.18, 0.7, 0.22) * (z > 0 ? 1 : 0); // cheeks
    r += 0.07 * bump(ax, y, z, 0, -0.82, 0.55, 0.2) * (z > 0 ? 1 : 0); // chin
    r -= 0.03 * bump(ax, y, z, 0, -0.42, 1, 0.16) * (z > 0 ? 1 : 0); // mouth line
    r += 0.025 * bump(ax, y, z, 0, 0.92, 0.3, 0.3);                  // crown
    const d = r * 0.115;
    p.setXYZ(i, x * d * sx / 0.9 * 0.9, y * d * sy, z * d * sz);
  }
  g.computeVertexNormals(); return g;
}
const HEAD = headGeo();
const cap = (r: number, h: number) => new THREE.CapsuleGeometry(r, h, 6, 16);

export function Statue({ look, tone, pose }: { look: 'tarboosh' | 'bare' | 'hat' | 'coach'; tone: 'bronze' | 'marble' | 'gold'; pose: number }) {
  const skin = tone === 'gold' ? goldBronze : bronzeMat;
  const kit = pose === 1; // footballer in red shirt
  const cloth = kit ? shirtRed : skin;
  const G = useMemo(() => ({ torso: cap(0.2, 0.34), leg: cap(0.075, 0.62), arm: cap(0.052, 0.4), shoe: new THREE.SphereGeometry(0.09, 16, 12) }), []);
  const legSpread = kit ? 0.13 : 0.1;
  return (
    <group scale={1.38}>
      {/* legs */}
      {[-1, 1].map((s) => (<group key={s}>
        <mesh geometry={G.leg} material={kit ? skin : skin} position={[s * legSpread, 0.45, kit && s > 0 ? 0.06 : 0]} rotation={[kit && s > 0 ? -0.35 : 0, 0, s * 0.02]} castShadow />
        <mesh geometry={G.shoe} material={MAT.dark} position={[s * legSpread, 0.07, 0.07 + (kit && s > 0 ? 0.12 : 0)]} scale={[0.85, 0.6, 1.5]} castShadow />
      </group>))}
      {/* suit trousers / shorts overlay */}
      {!kit && [-1, 1].map((s) => (<mesh key={s} geometry={cap(0.088, 0.6)} material={cloth} position={[s * legSpread, 0.5, 0]} castShadow />))}
      {kit && <mesh position={[0, 0.84, 0]} material={skin}><cylinderGeometry args={[0.2, 0.23, 0.2, 20]} /></mesh>}
      {/* torso */}
      <mesh geometry={G.torso} material={cloth} position={[0, 1.18, 0]} scale={[1.3, 1, 0.8]} castShadow />
      {!kit && <mesh position={[0, 1.0, 0.13]} material={skin} scale={[1, 1, 1]}><boxGeometry args={[0.02, 0.5, 0.02]} /></mesh>}
      {!kit && <mesh position={[0, 1.2, 0.15]} material={shirtRed} rotation={[0, 0, 0]}><boxGeometry args={[0.04, 0.3, 0.01]} /></mesh>}
      {/* shoulders and arms */}
      {[-1, 1].map((s) => (<group key={s} position={[s * 0.27, 1.38, 0]}>
        <mesh geometry={G.arm} material={cloth} rotation={[kit ? (s > 0 ? -0.8 : 0.5) : -0.6, 0, s * (kit ? 0.5 : 0.2)]} position={[s * 0.02, -0.17, kit ? 0 : 0.08]} castShadow />
        <mesh position={[s * (kit ? 0.15 : 0.04), -0.38, kit ? 0.05 : 0.2]} material={skin}><sphereGeometry args={[0.055, 12, 10]} /></mesh>
      </group>))}
      {/* neck + head */}
      <mesh position={[0, 1.54, 0]} material={skin} castShadow><cylinderGeometry args={[0.06, 0.07, 0.1, 14]} /></mesh>
      <mesh geometry={HEAD} material={skin} position={[0, 1.66, 0.01]} castShadow />
      {[-1, 1].map((s) => (<mesh key={s} position={[s * 0.1, 1.66, 0]} scale={[0.35, 1, 0.6]} material={skin}><sphereGeometry args={[0.04, 10, 8]} /></mesh>))}
      {/* hair / headgear */}
      {(look === 'bare' || look === 'coach') && <mesh position={[0, 1.7, -0.012]} scale={[0.93, 0.8, 1]} material={skin}><sphereGeometry args={[0.116, 24, 14, 0, Math.PI * 2, 0, Math.PI * 0.46]} /></mesh>}
      {look === 'tarboosh' && <group position={[0, 1.78, 0]}><mesh material={shirtRed}><cylinderGeometry args={[0.075, 0.1, 0.11, 24]} /></mesh><mesh position={[0.05, -0.04, 0]} material={MAT.dark}><boxGeometry args={[0.01, 0.1, 0.01]} /></mesh></group>}
      {look === 'hat' && <group position={[0, 1.78, 0]}><mesh material={MAT.dark}><cylinderGeometry args={[0.1, 0.11, 0.1, 24]} /></mesh><mesh position={[0, -0.05, 0]} material={MAT.dark}><cylinderGeometry args={[0.16, 0.16, 0.012, 24]} /></mesh></group>}
      {/* club crest on chest */}
      <mesh position={[0.1, 1.32, 0.15]} material={shirtRed}><circleGeometry args={[0.028, 14]} /></mesh>
    </group>
  );
}

// ---------- carved wood plinth with raised panel and brass plaque slot
export function Plinth({ w = 1.5, h = 0.95, plaque }: { w?: number; h?: number; plaque?: THREE.Texture }) {
  return (
    <group>
      <mesh position={[0, 0.07, 0]} material={woodTrim} castShadow receiveShadow><boxGeometry args={[w + 0.2, 0.14, w + 0.2]} /></mesh>
      <mesh position={[0, 0.14 + (h - 0.34) / 2, 0]} material={woodDark} castShadow receiveShadow><boxGeometry args={[w, h - 0.34, w]} /></mesh>
      {[0, 1, 2, 3].map((k) => (
        <group key={k} rotation={[0, k * Math.PI / 2, 0]}>
          <mesh position={[0, h / 2 - 0.05, w / 2 + 0.012]} material={woodTrim}><boxGeometry args={[w * 0.78, h * 0.5, 0.03]} /></mesh>
          <mesh position={[0, h / 2 - 0.05, w / 2 + 0.032]} material={woodDark}><boxGeometry args={[w * 0.7, h * 0.42, 0.02]} /></mesh>
        </group>))}
      <mesh position={[0, h - 0.13, 0]} material={woodTrim} castShadow><boxGeometry args={[w + 0.12, 0.07, w + 0.12]} /></mesh>
      <mesh position={[0, h - 0.04, 0]} material={woodTrim} castShadow receiveShadow><boxGeometry args={[w + 0.24, 0.08, w + 0.24]} /></mesh>
      {plaque && <mesh position={[0, h / 2 - 0.06, w / 2 + 0.047]}><planeGeometry args={[w * 0.58, w * 0.58 * 0.37]} /><meshStandardMaterial map={plaque} metalness={0.85} roughness={0.3} envMapIntensity={1.2} /></mesh>}
    </group>
  );
}

// ---------- velvet drape: folded plane with sheen
export function Drape({ width, height }: { width: number; height: number }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height, 160, 4); const p = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i); p.setZ(i, Math.sin(x * 5.2) * 0.1 + Math.sin(x * 11.3 + 1) * 0.04); }
    g.computeVertexNormals(); return g;
  }, [width, height]);
  const tex = useMemo(() => canvasTex(512, 64, (c, w, h) => { const g = c.createLinearGradient(0, 0, w, 0); for (let i = 0; i <= 40; i++) g.addColorStop(i / 40, i % 2 ? '#7a0c1e' : '#4a0612'); c.fillStyle = g; c.fillRect(0, 0, w, h); }, [1, 1]), []);
  return <mesh geometry={geo} receiveShadow><meshPhysicalMaterial map={tex} color="#c8c8c8" roughness={0.85} sheen={1} sheenColor={new THREE.Color('#d6405a')} sheenRoughness={0.4} /></mesh>;
}

// ---------- flag on brass pole
export function Flag() {
  const tex = useMemo(() => canvasTex(256, 512, (c, w, h) => {
    c.fillStyle = '#b3102a'; c.fillRect(0, 0, w, h); c.fillStyle = '#111'; c.fillRect(0, h * 0.68, w, h * 0.32);
    c.fillStyle = '#d4a94f'; c.beginPath(); c.arc(w / 2, h * 0.42, 54, 0, 7); c.fill(); c.fillStyle = '#b3102a'; c.beginPath(); c.arc(w / 2, h * 0.42, 44, 0, 7); c.fill();
    c.fillStyle = '#f3e9d2'; c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 11 : 28; const a = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(w / 2 + Math.cos(a) * r, h * 0.42 + Math.sin(a) * r); } c.fill();
  }), []);
  const geo = useMemo(() => { const g = new THREE.PlaneGeometry(0.75, 1.5, 12, 24); const p = g.attributes.position as THREE.BufferAttribute; for (let i = 0; i < p.count; i++) p.setZ(i, Math.sin(p.getY(i) * 5) * 0.05 + p.getX(i) * 0.05); g.computeVertexNormals(); return g; }, []);
  return (
    <group>
      <mesh position={[0, 1.8, 0]} material={MAT.brass}><cylinderGeometry args={[0.025, 0.03, 3.6, 10]} /></mesh>
      <mesh position={[0, 3.62, 0]} material={MAT.brass}><sphereGeometry args={[0.06, 12, 10]} /></mesh>
      <mesh position={[0, 0.06, 0]} material={MAT.brass}><cylinderGeometry args={[0.18, 0.22, 0.12, 20]} /></mesh>
      <mesh geometry={geo} position={[0.4, 2.7, 0]}><meshStandardMaterial map={tex} side={THREE.DoubleSide} roughness={0.7} /></mesh>
    </group>
  );
}

export function useTex(url: string, repeat?: [number, number]) {
  const t = useLoader(THREE.TextureLoader, url); useMemo(() => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); } }, [t, repeat]);
  return t;
}
void FIGURES; void useFrame;
