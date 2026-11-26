import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Sepia, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { useStore } from '../store';
import { Lighting, Architecture, Dust } from './Hall';
import { Trophies, Statues, Frames, Library3D, Relics } from './Exhibits';
import { WarmEnvironment } from './realism';
import { Controller, SceneReady } from './Controller';
import { START, EYE } from './layout';
import { setAmbience } from '../audio';

function Effects() {
  const q = useStore((s) => s.quality); const mood = useStore((s) => s.mood);
  if (q === 'low') return null;
  return (
    <EffectComposer multisampling={q === 'high' ? 4 : 0}>
      <Bloom intensity={mood === 'night' ? 0.85 : 0.5} luminanceThreshold={0.85} luminanceSmoothing={0.3} mipmapBlur />
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
      <Sepia intensity={mood === 'sepia' ? 0.85 : 0} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

export function webglOk(): boolean {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

export default function Museum({ onReady }: { onReady: () => void }) {
  const q = useStore((s) => s.quality); const mood = useStore((s) => s.mood);
  const [key, setKey] = useState(0);
  const roomsOpen = useStore((s) => s.roomsOpen);
  useEffect(() => { setAmbience(mood); }, [mood]);
  return (
    <Canvas
      key={key}
      frameloop={roomsOpen ? 'never' : 'always'}
      shadows={q !== 'low'}
      dpr={q === 'high' ? [1, 2] : q === 'medium' ? [1, 1.4] : 1}
      camera={{ fov: 68, near: 0.1, far: 140, position: [START.x, EYE, START.z] }}
      gl={{ antialias: q !== 'low', powerPreference: 'high-performance', preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); const s = useStore.getState(); s.setQuality('low'); s.showToast('lost'); setTimeout(() => setKey((k) => k + 1), 400); });
      }}
      style={{ touchAction: 'none' }}
    >
      <Suspense fallback={null}>
        <WarmEnvironment />
        <Lighting />
        <Architecture />
        <Trophies />
        <Statues />
        <Frames />
        <Library3D />
        <Relics />
        <Dust />
        <Controller />
        <Effects />
        <SceneReady onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
