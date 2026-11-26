import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useStore, Mood } from '../store';
import { HALL, COLUMNS } from './layout';
import { MAT } from './materials';
import { floorTexture, wallTexture, carpetTexture, crestTexture, signTexture, beamTexture } from './textures';
import { tr } from '../data/i18n';

const MOODS: Record<Mood, { bg: string; fog: string; fogD: number; hemiSky: string; hemiGnd: string; hemi: number; sun: string; sunI: number; point: string; pointI: number; win: string; exposure: number; beam: number }> = {
  heritage: { bg: '#1b110a', fog: '#2b1c11', fogD: 0.011, hemiSky: '#ffe8c0', hemiGnd: '#6a4526', hemi: 0.75, sun: '#ffd8a0', sunI: 1.5, point: '#ffcf8a', pointI: 22, win: '#ffe2a8', exposure: 1.05, beam: 0.9 },
  night: { bg: '#04070f', fog: '#070b18', fogD: 0.016, hemiSky: '#7ea6ff', hemiGnd: '#16213a', hemi: 0.28, sun: '#a8c4ff', sunI: 0.45, point: '#e9f1ff', pointI: 38, win: '#3d5da8', exposure: 0.95, beam: 0.35 },
  sepia: { bg: '#16110b', fog: '#241a10', fogD: 0.013, hemiSky: '#ecdcba', hemiGnd: '#5a4630', hemi: 0.65, sun: '#f0dcb0', sunI: 1.1, point: '#f2d9a0', pointI: 16, win: '#efe0b8', exposure: 1.0, beam: 0.6 }
};

export function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env; scene.environmentIntensity = 0.55;
    return () => { scene.environment = null; env.dispose(); pm.dispose(); };
  }, [gl, scene]);
  return null;
}

export function Lighting() {
  const mood = useStore((s) => s.mood);
  const quality = useStore((s) => s.quality);
  const { scene, gl } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null!);
  const sun = useRef<THREE.DirectionalLight>(null!);
  const points = useRef<(THREE.PointLight | null)[]>([]);
  const target = useRef(MOODS[mood]);
  const tmp = useMemo(() => new THREE.Color(), []);
  useEffect(() => { target.current = MOODS[mood]; }, [mood]);
  useEffect(() => { scene.fog = new THREE.FogExp2(MOODS.heritage.fog, 0.011); scene.background = new THREE.Color(MOODS.heritage.bg); gl.toneMapping = THREE.ACESFilmicToneMapping; }, [scene, gl]);
  useFrame((_, dt) => {
    const t = target.current; const k = 1 - Math.pow(0.02, dt);
    hemi.current.color.lerp(tmp.set(t.hemiSky), k); hemi.current.groundColor.lerp(tmp.set(t.hemiGnd), k); hemi.current.intensity += (t.hemi - hemi.current.intensity) * k;
    sun.current.color.lerp(tmp.set(t.sun), k); sun.current.intensity += (t.sunI - sun.current.intensity) * k;
    points.current.forEach((p) => { if (p) { p.color.lerp(tmp.set(t.point), k); p.intensity += (t.pointI - p.intensity) * k; } });
    (scene.fog as THREE.FogExp2).color.lerp(tmp.set(t.fog), k); (scene.fog as THREE.FogExp2).density += (t.fogD - (scene.fog as THREE.FogExp2).density) * k;
    (scene.background as THREE.Color).lerp(tmp.set(t.bg), k);
    gl.toneMappingExposure += (t.exposure - gl.toneMappingExposure) * k;
  });
  const shadows = quality !== 'low';
  const pts: [number, number, number][] = [[0, 6, -24], [13, 5, 0], [-12, 5, 0], [0, 6, 10], [0, 6, 24]];
  return (
    <>
      <hemisphereLight ref={hemi} args={['#ffe8c0', '#6a4526', 0.75]} />
      <directionalLight ref={sun} position={[-16, 20, 10]} intensity={1.5} castShadow={shadows} shadow-mapSize={quality === 'high' ? [2048, 2048] : [1024, 1024]} shadow-camera-left={-20} shadow-camera-right={20} shadow-camera-top={34} shadow-camera-bottom={-34} shadow-camera-far={70} shadow-bias={-0.0004} />
      {pts.slice(0, quality === 'low' ? 3 : 5).map((p, i) => (
        <pointLight key={i} ref={(el) => { points.current[i] = el; }} position={p} intensity={22} distance={30} decay={1.6} color="#ffcf8a" />
      ))}
    </>
  );
}

export function Architecture() {
  const lang = useStore((s) => s.lang);
  const quality = useStore((s) => s.quality);
  const mood = useStore((s) => s.mood);
  const floorTex = useMemo(() => { const t = floorTexture(); t.repeat.set(HALL.w / 4, HALL.l / 4); return t; }, []);
  const wallTex = useMemo(() => wallTexture(), []);
  const carpet = useMemo(carpetTexture, []);
  const crest = useMemo(() => crestTexture(lang), [lang]);
  const beam = useMemo(beamTexture, []);
  const sign = useMemo(() => signTexture(tr(lang, 'library'), lang, 768, 140), [lang]);
  const sign2 = useMemo(() => signTexture(tr(lang, 'zoneVault'), lang, 768, 140), [lang]);
  const winCol = MOODS[mood].win;
  const winRefs = useRef<THREE.MeshBasicMaterial[]>([]);
  useFrame((_, dt) => { const c = new THREE.Color(winCol); winRefs.current.forEach((m) => m && m.color.lerp(c, 1 - Math.pow(0.03, dt))); });
  const { w, l, wallH, rise } = HALL;
  const halfW = w / 2, halfL = l / 2;
  const archZ = useMemo(() => [-28, -20, -12, -4, 4, 12, 20, 28], []);
  const winZ = useMemo(() => [-28, -20, -12, -4, 4, 12, 20, 28], []);
  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[w, l]} /><meshStandardMaterial map={floorTex} roughness={0.12} metalness={0.08} envMapIntensity={1.1} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]} receiveShadow><planeGeometry args={[6, 60]} /><meshStandardMaterial map={carpet} roughness={0.9} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}><circleGeometry args={[3, 64]} /><meshStandardMaterial map={crest} roughness={0.35} metalness={0.15} /></mesh>
      {/* walls */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * halfW, wallH / 2, 0]} rotation={[0, -s * Math.PI / 2, 0]} receiveShadow><planeGeometry args={[l, wallH]} /><meshStandardMaterial map={wallTex} roughness={0.85} /></mesh>
          <mesh position={[s * (halfW - 0.05), 0.75, 0]} rotation={[0, -s * Math.PI / 2, 0]}><planeGeometry args={[l, 1.5]} /><meshStandardMaterial color="#3a2417" roughness={0.45} metalness={0.1} /></mesh>
          <mesh position={[s * (halfW - 0.1), 1.52, 0]} material={MAT.brass}><boxGeometry args={[0.16, 0.08, l]} /></mesh>
          <mesh position={[s * (halfW - 0.2), wallH - 0.1, 0]} material={MAT.gold}><boxGeometry args={[0.4, 0.3, l]} /></mesh>
        </group>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0, wallH / 2, s * halfL]} rotation={[0, s > 0 ? Math.PI : 0, 0]} receiveShadow><planeGeometry args={[w, wallH + 3]} /><meshStandardMaterial map={wallTex} roughness={0.85} /></mesh>
      ))}
      {/* vault ceiling */}
      <group position={[0, wallH, 0]} scale={[1, rise / (w / 2), 1]} rotation={[0, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[w / 2, w / 2, l, 48, 1, true, -Math.PI / 2, Math.PI]} /><meshStandardMaterial color="#e8d9b6" side={THREE.BackSide} roughness={0.9} /></mesh>
      </group>
      {archZ.map((z) => (
        <group key={z} position={[0, wallH, z]} scale={[1, rise / (w / 2), 1]}>
          <mesh material={MAT.gold}><torusGeometry args={[w / 2 - 0.1, 0.28, 8, 48, Math.PI]} /></mesh>
        </group>
      ))}
      {/* columns */}
      {COLUMNS.map((c, i) => (
        <group key={i} position={[c.x, 0, c.z]}>
          <mesh position={[0, 0.25, 0]} material={MAT.stone} castShadow><boxGeometry args={[1.5, 0.5, 1.5]} /></mesh>
          <mesh position={[0, wallH / 2, 0]} material={MAT.marble} castShadow><cylinderGeometry args={[0.52, 0.6, wallH, 24]} /></mesh>
          <mesh position={[0, wallH - 0.3, 0]} material={MAT.gold}><boxGeometry args={[1.3, 0.6, 1.3]} /></mesh>
          <mesh position={[0, 0.55, 0]} material={MAT.brass}><cylinderGeometry args={[0.64, 0.64, 0.12, 24]} /></mesh>
        </group>
      ))}
      {/* clerestory windows + beams */}
      {winZ.map((z) => [-1, 1].map((s) => (
        <group key={`${z}${s}`}>
          <mesh position={[s * (halfW - 0.06), wallH - 2.2, z]} rotation={[0, -s * Math.PI / 2, 0]}>
            <planeGeometry args={[2.4, 3.4]} /><meshBasicMaterial ref={(m) => { if (m) winRefs.current.push(m); }} color="#ffe2a8" />
          </mesh>
          {quality !== 'low' && (
            <mesh position={[s * (halfW - 4.5), 4.7, z]} rotation={[0, -s * Math.PI / 2, 0]}>
              <planeGeometry args={[2.2, 11]} />
              <meshBasicMaterial map={beam} transparent opacity={MOODS[mood].beam * 0.35} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
      )))}
      {/* chandeliers */}
      {[-20, -4, 12, 26].map((z) => (
        <group key={z} position={[0, wallH + rise - 3.5, z]}>
          <mesh material={MAT.brass}><torusGeometry args={[1.2, 0.07, 10, 32]} /></mesh>
          <mesh position={[0, 1.8, 0]} material={MAT.brass}><cylinderGeometry args={[0.02, 0.02, 3.6, 6]} /></mesh>
          {Array.from({ length: 8 }).map((_, i) => (<mesh key={i} position={[Math.cos(i * Math.PI / 4) * 1.2, 0.12, Math.sin(i * Math.PI / 4) * 1.2]}><sphereGeometry args={[0.1, 10, 8]} /><meshBasicMaterial color="#fff1c8" /></mesh>))}
        </group>
      ))}
      {/* signs */}
      <mesh position={[0, 7.4, 17]}><planeGeometry args={[7.5, 1.4]} /><meshStandardMaterial map={sign} emissive="#3a2008" emissiveMap={sign} emissiveIntensity={0.7} /></mesh>
      <mesh position={[0, 7.4, 16.9]} rotation={[0, Math.PI, 0]}><planeGeometry args={[7.5, 1.4]} /><meshStandardMaterial color="#2a0a10" /></mesh>
      <mesh position={[0, 7.2, -16.9]} rotation={[0, 0, 0]}><planeGeometry args={[7.5, 1.4]} /><meshStandardMaterial map={sign2} emissive="#3a2008" emissiveMap={sign2} emissiveIntensity={0.7} /></mesh>
      <mesh position={[0, 7.2, -17]} rotation={[0, Math.PI, 0]}><planeGeometry args={[7.5, 1.4]} /><meshStandardMaterial color="#2a0a10" /></mesh>
      {/* arch pillars for library gate */}
      {[-5, 5].map((x) => (
        <group key={x} position={[x, 0, 18]}>
          <mesh position={[0, 3.5, 0]} material={MAT.marble} castShadow><cylinderGeometry args={[0.4, 0.45, 7, 20]} /></mesh>
          <mesh position={[0, 0.2, 0]} material={MAT.brass}><boxGeometry args={[1.1, 0.4, 1.1]} /></mesh>
        </group>
      ))}
      <mesh position={[0, 7.0, 18]} material={MAT.brass}><boxGeometry args={[10.8, 0.5, 0.8]} /></mesh>
      {/* dais under the vault */}
      <mesh position={[0, 0.1, -25]} receiveShadow><boxGeometry args={[19, 0.2, 14]} /><meshStandardMaterial color="#5c0a18" roughness={0.85} /></mesh>
      <mesh position={[0, 0.21, -18.1]}><boxGeometry args={[19, 0.04, 0.2]} /><meshStandardMaterial color="#d4a94f" metalness={1} roughness={0.3} /></mesh>
      {/* north wall crest */}
      <mesh position={[0, 5, -31.9]}><circleGeometry args={[3.2, 64]} /><meshStandardMaterial map={crest} emissive="#401010" emissiveMap={crest} emissiveIntensity={0.5} /></mesh>
    </group>
  );
}

export function Dust() {
  const quality = useStore((s) => s.quality);
  const count = quality === 'high' ? 500 : quality === 'medium' ? 220 : 0;
  const ref = useRef<THREE.Points>(null!);
  const pos = useMemo(() => { const a = new Float32Array(count * 3); for (let i = 0; i < count; i++) { a[i * 3] = (Math.random() - 0.5) * 32; a[i * 3 + 1] = Math.random() * 9; a[i * 3 + 2] = (Math.random() - 0.5) * 62; } return a; }, [count]);
  useFrame((_, dt) => { if (!ref.current || !count) return; const p = ref.current.geometry.attributes.position as THREE.BufferAttribute; for (let i = 0; i < count; i++) { let y = p.getY(i) - dt * 0.05; if (y < 0) y = 9; p.setY(i, y); p.setX(i, p.getX(i) + Math.sin(performance.now() / 4000 + i) * dt * 0.02); } p.needsUpdate = true; });
  if (!count) return null;
  return (<points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} /></bufferGeometry><pointsMaterial size={0.05} color="#ffe9b8" transparent opacity={0.5} depthWrite={false} sizeAttenuation /></points>);
}
