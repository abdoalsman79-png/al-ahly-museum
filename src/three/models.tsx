import { useMemo } from 'react';
import * as THREE from 'three';
import { MAT, tintMat } from './materials';
import { TrophyModel as TM } from '../data/types';

const lathe = (pts: [number, number][], seg = 40) => new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), seg);

// Procedural trophies, ~1 unit tall, origin at the base.
export function TrophyMesh({ model, tint }: { model: TM; tint: 'gold' | 'silver' | 'bronze' | 'red' }) {
  const mat = tintMat(tint);
  const geos = useMemo(() => {
    const g: Record<string, THREE.BufferGeometry> = {};
    g.big = lathe([[0, 0], [0.26, 0], [0.26, 0.05], [0.18, 0.1], [0.07, 0.2], [0.05, 0.42], [0.09, 0.5], [0.3, 0.62], [0.36, 0.82], [0.32, 0.98], [0.28, 0.98], [0.28, 0.9], [0.0, 0.9]]);
    g.cup = lathe([[0, 0], [0.2, 0], [0.2, 0.05], [0.1, 0.1], [0.05, 0.25], [0.1, 0.36], [0.26, 0.5], [0.28, 0.72], [0.24, 0.74], [0.2, 0.58], [0, 0.58]]);
    g.lid = lathe([[0, 0], [0.22, 0], [0.12, 0.08], [0.03, 0.2], [0.05, 0.26], [0, 0.3]]);
    g.handle = new THREE.TorusGeometry(0.2, 0.03, 12, 28, Math.PI * 1.15);
    g.handleS = new THREE.TorusGeometry(0.13, 0.025, 10, 24, Math.PI * 1.15);
    const sh = new THREE.Shape(); sh.moveTo(-0.36, 0.34); sh.lineTo(0.36, 0.34); sh.lineTo(0.36, 0); sh.quadraticCurveTo(0.34, -0.3, 0, -0.45); sh.quadraticCurveTo(-0.34, -0.3, -0.36, 0); sh.closePath();
    g.shield = new THREE.ExtrudeGeometry(sh, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 });
    return g;
  }, []);
  if (model === 'bigcup') return (
    <group>
      <mesh geometry={geos.big} material={mat} castShadow />
      <mesh geometry={geos.handle} material={mat} position={[0.34, 0.76, 0]} rotation={[0, 0, -Math.PI * 0.62]} castShadow />
      <mesh geometry={geos.handle} material={mat} position={[-0.34, 0.76, 0]} rotation={[0, 0, Math.PI * 0.62 - Math.PI * 1.15 + Math.PI * 1.15]} scale={[-1, 1, 1]} castShadow />
      <mesh position={[0, 0.03, 0]} material={MAT.dark}><cylinderGeometry args={[0.3, 0.32, 0.06, 32]} /></mesh>
      <mesh position={[0, 0.3, 0]} material={MAT.red}><torusGeometry args={[0.065, 0.018, 8, 20]} /></mesh>
    </group>
  );
  if (model === 'cup') return (
    <group>
      <mesh geometry={geos.cup} material={mat} castShadow />
      <mesh geometry={geos.lid} material={mat} position={[0, 0.7, 0]} castShadow />
      <mesh geometry={geos.handleS} material={mat} position={[0.27, 0.46, 0]} rotation={[0, 0, -Math.PI * 0.6]} />
      <mesh geometry={geos.handleS} material={mat} position={[-0.27, 0.46, 0]} rotation={[0, 0, Math.PI * 0.6]} scale={[-1, 1, 1]} />
      <mesh position={[0, 0.02, 0]} material={MAT.dark}><cylinderGeometry args={[0.26, 0.28, 0.05, 28]} /></mesh>
    </group>
  );
  if (model === 'shield') return (
    <group>
      <mesh position={[0, 0.04, 0]} material={MAT.dark}><boxGeometry args={[0.6, 0.08, 0.3]} /></mesh>
      <mesh position={[0, 0.2, 0]} material={MAT.dark}><boxGeometry args={[0.12, 0.3, 0.1]} /></mesh>
      <mesh geometry={geos.shield} material={mat} position={[0, 0.65, -0.03]} castShadow />
      <mesh position={[0, 0.66, 0.06]} material={MAT.red}><circleGeometry args={[0.22, 5]} /></mesh>
      <mesh position={[0, 0.66, 0.065]} material={mat}><ringGeometry args={[0.14, 0.18, 5]} /></mesh>
    </group>
  );
  if (model === 'plate') return (
    <group>
      <mesh position={[0, 0.03, 0]} material={MAT.dark}><cylinderGeometry args={[0.3, 0.34, 0.06, 28]} /></mesh>
      <mesh position={[0, 0.3, 0]} material={mat}><cylinderGeometry args={[0.04, 0.07, 0.5, 14]} /></mesh>
      <group position={[0, 0.7, 0]} rotation={[Math.PI / 2 - 0.25, 0, 0]}>
        <mesh material={mat} castShadow><cylinderGeometry args={[0.46, 0.4, 0.04, 40]} /></mesh>
        <mesh position={[0, 0.03, 0]} material={MAT.red}><cylinderGeometry args={[0.3, 0.3, 0.02, 40]} /></mesh>
        <mesh position={[0, 0.045, 0]} material={mat}><torusGeometry args={[0.2, 0.012, 8, 40]} /></mesh>
      </group>
    </group>
  );
  if (model === 'medal') return (
    <group>
      <mesh position={[0, 0.06, 0]} material={MAT.velvet}><boxGeometry args={[0.8, 0.12, 0.5]} /></mesh>
      <group position={[0, 0.45, 0.05]} rotation={[-0.25, 0, 0]}>
        <mesh material={mat} castShadow rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.28, 0.28, 0.04, 40]} /></mesh>
        <mesh material={MAT.bronze} position={[0, 0, 0.025]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.2, 0.015, 8, 36]} /></mesh>
        <mesh position={[0, 0.5, -0.02]} material={MAT.red}><boxGeometry args={[0.18, 0.5, 0.01]} /></mesh>
      </group>
    </group>
  );
  return (
    <group>
      <mesh position={[0, 0.03, 0]} material={MAT.dark}><cylinderGeometry args={[0.3, 0.32, 0.06, 28]} /></mesh>
      <mesh position={[0, 0.35, 0]} material={mat} castShadow><cylinderGeometry args={[0.07, 0.12, 0.6, 20]} /></mesh>
      <mesh position={[0, 0.82, 0]} material={mat} castShadow><sphereGeometry args={[0.22, 28, 20]} /></mesh>
      <mesh position={[0, 0.82, 0]} material={MAT.red}><torusGeometry args={[0.22, 0.02, 8, 30]} /></mesh>
      <mesh position={[0.28, 0.8, 0]} rotation={[0, 0, -0.9]} material={mat}><coneGeometry args={[0.07, 0.36, 10]} /></mesh>
      <mesh position={[-0.28, 0.8, 0]} rotation={[0, 0, 0.9]} material={mat}><coneGeometry args={[0.07, 0.36, 10]} /></mesh>
    </group>
  );
}

const toneMat = { bronze: MAT.bronze, marble: MAT.marble, gold: MAT.gold } as const;

// Stylised bust on a stone plinth. Faceless by design.
export function Bust({ tone, look }: { tone: 'bronze' | 'marble' | 'gold'; look: 'tarboosh' | 'bare' | 'hat' | 'coach' }) {
  const mat = toneMat[tone];
  const torso = useMemo(() => lathe([[0, 0], [0.5, 0], [0.5, 0.06], [0.42, 0.2], [0.3, 0.42], [0.18, 0.5], [0.13, 0.62], [0, 0.62]], 32), []);
  return (
    <group>
      <mesh position={[0, 0.12, 0]} material={MAT.stone} castShadow receiveShadow><boxGeometry args={[1.4, 0.24, 1.4]} /></mesh>
      <mesh position={[0, 0.74, 0]} material={MAT.marble} castShadow receiveShadow><boxGeometry args={[1.0, 1.0, 1.0]} /></mesh>
      <mesh position={[0, 1.28, 0]} material={MAT.brass}><boxGeometry args={[1.1, 0.08, 1.1]} /></mesh>
      <group position={[0, 1.32, 0]}>
        <mesh geometry={torso} material={mat} scale={[1.15, 1, 0.7]} castShadow />
        <mesh position={[0, 0.82, 0]} scale={[0.9, 1.12, 1]} material={mat} castShadow><sphereGeometry args={[0.24, 32, 24]} /></mesh>
        <mesh position={[0, 0.78, 0.22]} material={mat}><coneGeometry args={[0.04, 0.12, 10]} /></mesh>
        {look === 'tarboosh' && (<group position={[0, 1.02, 0]}><mesh material={MAT.red}><cylinderGeometry args={[0.15, 0.19, 0.2, 24]} /></mesh><mesh position={[0.1, -0.02, 0]} material={MAT.dark}><boxGeometry args={[0.02, 0.2, 0.02]} /></mesh></group>)}
        {look === 'hat' && (<group position={[0, 1.03, 0]}><mesh material={MAT.dark}><cylinderGeometry args={[0.2, 0.2, 0.22, 24]} /></mesh><mesh position={[0, -0.1, 0]} material={MAT.dark}><cylinderGeometry args={[0.3, 0.3, 0.03, 24]} /></mesh></group>)}
        {(look === 'bare' || look === 'coach') && (<mesh position={[0, 0.94, -0.03]} scale={[1, 0.55, 1]} material={MAT.dark}><sphereGeometry args={[0.245, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>)}
        {look === 'coach' && (<mesh position={[0, 0.42, 0.2]} material={MAT.red}><boxGeometry args={[0.07, 0.3, 0.02]} /></mesh>)}
      </group>
    </group>
  );
}
