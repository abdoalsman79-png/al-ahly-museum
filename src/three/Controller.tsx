import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../store';
import { BOUNDS, COLLIDERS, EYE, SPOTS, START, WAYPOINTS, zoneAt } from './layout';
import { RELICS } from '../data/relics';
import { roots } from './registry';
import { chime, click, footstep } from '../audio';

export const player = { x: START.x, z: START.z, yaw: START.yaw, pitch: START.pitch, tyaw: START.yaw, tpitch: START.pitch, vx: 0, vz: 0, bob: 0 };
export const input = { f: 0, s: 0, run: false, joyX: 0, joyY: 0, pointerX: 0, pointerY: 0, hasPointer: false, locked: false };
export const keys = new Set<string>();

// tour glide state
const glide = { active: false, t: 0, dur: 2.6, from: { x: 0, z: 0, yaw: 0, pitch: 0 }, to: { x: 0, z: 0, yaw: 0, pitch: 0 } };
const wrapAngle = (a: number) => { while (a > Math.PI) a -= Math.PI * 2; while (a < -Math.PI) a += Math.PI * 2; return a; };
export function lookAtAngles(px: number, pz: number, lx: number, ly: number, lz: number) {
  const dx = lx - px, dz = lz - pz;
  return { yaw: Math.atan2(-dx, -dz), pitch: Math.atan2(ly - EYE, Math.hypot(dx, dz)) };
}
export function glideTo(i: number) {
  const w = WAYPOINTS[i]; const a = lookAtAngles(w.pos[0], w.pos[1], w.look[0], w.look[1], w.look[2]);
  glide.active = true; glide.t = 0; glide.from = { x: player.x, z: player.z, yaw: player.yaw, pitch: player.pitch };
  glide.to = { x: w.pos[0], z: w.pos[1], yaw: player.yaw + wrapAngle(a.yaw - player.yaw), pitch: a.pitch };
  const d = Math.hypot(glide.to.x - player.x, glide.to.z - player.z);
  glide.dur = Math.min(4.5, 1.6 + d * 0.09);
}
export const teleport = (x: number, z: number, yaw?: number) => { player.x = x; player.z = z; if (yaw !== undefined) { player.yaw = player.tyaw = yaw; } glide.active = false; };

const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const ray = new THREE.Raycaster();
const fwd = new THREE.Vector3();

function spotOf(o: THREE.Object3D | null): { kind: string; id: string } | null {
  while (o) { if (o.userData.spot) return o.userData.spot; o = o.parent; }
  return null;
}

export function Controller() {
  const { camera, gl, scene } = useThree();
  const hold = useRef(0);
  const lastRay = useRef(0);
  const zoneRef = useRef('');
  const stepAcc = useRef(0);
  const tourTimer = useRef(0);

  useEffect(() => { camera.rotation.order = 'YXZ'; }, [camera]);

  // input listeners
  useEffect(() => {
    const el = gl.domElement;
    let dragging = false, moved = 0, lx = 0, ly = 0, pid = -1, downX = 0, downY = 0;
    const st = useStore.getState;
    const pick = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      ray.setFromCamera(new THREE.Vector2(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1), camera);
      const hits = ray.intersectObjects([...roots], true);
      for (const h of hits) { if (h.distance > 22) break; const s = spotOf(h.object); if (s) return s; }
      return null;
    };
    const onDown = (e: PointerEvent) => { if (st().libraryOpen) return; dragging = true; moved = 0; lx = downX = e.clientX; ly = downY = e.clientY; pid = e.pointerId; el.setPointerCapture?.(pid); if (e.pointerType === 'touch') st().setTouch(true); };
    const onMove = (e: PointerEvent) => {
      input.pointerX = e.clientX; input.pointerY = e.clientY; input.hasPointer = e.pointerType !== 'touch';
      if (document.pointerLockElement === el) { player.tyaw -= e.movementX * 0.0022; player.tpitch = THREE.MathUtils.clamp(player.tpitch - e.movementY * 0.0022, -1.1, 1.1); glide.active = false; return; }
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 6) { player.tyaw -= dx * 0.0036; player.tpitch = THREE.MathUtils.clamp(player.tpitch - dy * 0.0036, -1.1, 1.1); glide.active = false; }
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return; dragging = false; try { el.releasePointerCapture?.(pid); } catch { /* ignore */ }
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 8 && moved < 10) {
        const s = pick(e.clientX, e.clientY);
        if (s) { click(); st().inspect(s as never); }
      }
    };
    const onLeave = () => { input.hasPointer = false; };
    const onClickLocked = () => { if (document.pointerLockElement === el && !dragging) { const f = st().focus; if (f) { click(); st().inspect(f); } } };
    el.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); el.addEventListener('pointerleave', onLeave); el.addEventListener('click', onClickLocked);
    const onKey = (e: KeyboardEvent) => {
      const s = st(); const k = e.key.toLowerCase();
      if (e.type === 'keydown') {
        if (k === 'escape') { if (s.selected) s.inspect(null); else if (s.libraryOpen) s.closeLibrary(); else if (s.helpOpen) s.toggleHelp(false); else if (s.favOpen) s.toggleFav(false); return; }
        if (!s.started) return;
        if (k === 'm') { s.toggleMute(); return; }
        if (k === 'l' && !(e.target instanceof HTMLInputElement)) { s.setLang(s.lang === 'en' ? 'ar' : 'en'); return; }
        if (k === '?' || k === 'h') { s.toggleHelp(); return; }
        if (k === 'f') { if (document.pointerLockElement === el) document.exitPointerLock(); else el.requestPointerLock?.(); return; }
        if (e.target instanceof HTMLInputElement) return;
        if (k === 'e' || k === 'enter') { if (s.focus && !s.selected && !s.libraryOpen) { click(); s.inspect(s.focus); } return; }
        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(k)) {
          if (s.mode === 'tour') { s.setMode('walk'); }
          if (k.startsWith('arrow')) e.preventDefault();
          keys.add(k);
        }
      } else keys.delete(k);
    };
    window.addEventListener('keydown', onKey); window.addEventListener('keyup', onKey);
    const onBlur = () => keys.clear(); window.addEventListener('blur', onBlur);
    return () => {
      el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); el.removeEventListener('pointerleave', onLeave); el.removeEventListener('click', onClickLocked);
      window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey); window.removeEventListener('blur', onBlur);
    };
  }, [gl, camera]);

  // tour waypoint changes
  const tourIndex = useStore((s) => s.tourIndex);
  const mode = useStore((s) => s.mode);
  const tourAuto = useStore((s) => s.tourAuto);
  useEffect(() => { if (mode === 'tour') { glideTo(tourIndex); tourTimer.current = 0; } }, [tourIndex, mode]);
  useEffect(() => { if (mode === 'library') glideTo(4); }, [mode]);

  useFrame((_, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05); const s = useStore.getState();
    // keyboard to axes
    const kf = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
    const ks = (keys.has('d') ? 1 : 0) - (keys.has('a') ? 1 : 0);
    const turn = (keys.has('arrowleft') ? 1 : 0) - (keys.has('arrowright') ? 1 : 0);
    if (turn) { player.tyaw += turn * dt * 1.8; glide.active = false; }
    const f = THREE.MathUtils.clamp(kf + input.joyY, -1, 1), sd = THREE.MathUtils.clamp(ks + input.joyX, -1, 1);
    const inputActive = !s.libraryOpen && !s.selected && s.started;
    if (glide.active) {
      glide.t += dt / glide.dur; const e = ease(Math.min(1, glide.t));
      player.x = glide.from.x + (glide.to.x - glide.from.x) * e; player.z = glide.from.z + (glide.to.z - glide.from.z) * e;
      player.yaw = player.tyaw = glide.from.yaw + (glide.to.yaw - glide.from.yaw) * e; player.pitch = player.tpitch = glide.from.pitch + (glide.to.pitch - glide.from.pitch) * e;
      if (glide.t >= 1) { glide.active = false; tourTimer.current = 0; }
      if (f || sd) { glide.active = false; if (s.mode === 'tour') s.setMode('walk'); }
    } else if (inputActive && (f || sd)) {
      const speed = (keys.has('shift') ? 6 : 3.6);
      const sin = Math.sin(player.yaw), cos = Math.cos(player.yaw);
      const tvx = (-sin * f + cos * sd) * speed, tvz = (-cos * f - sin * sd) * speed;
      player.vx += (tvx - player.vx) * Math.min(1, dt * 10); player.vz += (tvz - player.vz) * Math.min(1, dt * 10);
    } else { player.vx *= Math.max(0, 1 - dt * 12); player.vz *= Math.max(0, 1 - dt * 12); }
    if (!glide.active) {
      let nx = player.x + player.vx * dt, nz = player.z + player.vz * dt;
      nx = THREE.MathUtils.clamp(nx, BOUNDS.minX, BOUNDS.maxX); nz = THREE.MathUtils.clamp(nz, BOUNDS.minZ, BOUNDS.maxZ);
      for (let it = 0; it < 2; it++) for (const c of COLLIDERS) {
        const dx = nx - c.x, dz = nz - c.z, d = Math.hypot(dx, dz), min = c.r + 0.42;
        if (d < min && d > 1e-4) { nx = c.x + (dx / d) * min; nz = c.z + (dz / d) * min; }
      }
      player.x = nx; player.z = nz;
    }
    const sp = Math.hypot(player.vx, player.vz);
    if (sp > 0.5) { player.bob += dt * sp * 2.1; stepAcc.current += dt * sp; if (stepAcc.current > 1.6) { stepAcc.current = 0; footstep(); } }
    // look damping
    if (!glide.active) { const k = 1 - Math.pow(0.0005, dt); player.yaw += (player.tyaw - player.yaw) * k; player.pitch += (player.tpitch - player.pitch) * k; }
    camera.position.set(player.x, EYE + Math.sin(player.bob) * 0.025 * Math.min(1, sp / 3), player.z);
    camera.rotation.set(player.pitch, player.yaw, 0);

    // tour auto advance
    if (s.mode === 'tour' && s.tourAuto && !glide.active) { tourTimer.current += dt; if (tourTimer.current > 6.5) s.setTour((s.tourIndex + 1) % WAYPOINTS.length); }

    // zone
    const z = zoneAt(player.x, player.z);
    const zz = glide.active ? zoneRef.current : z;
    if (zz !== zoneRef.current) { zoneRef.current = zz; s.setZone(zz); }
    if (s.mode === 'tour' && !glide.active) { const id = WAYPOINTS[s.tourIndex].id; if (id !== zoneRef.current) { zoneRef.current = id; s.setZone(id); } }

    // relics proximity
    for (const r of RELICS) { if (Math.hypot(player.x - r.x, player.z - r.z) < 1.0 && !s.relicsFound.has(r.id) && s.mode !== 'library' && !glide.active) { if (s.foundRelic(r.id)) { chime(r.memorial ? 440 : 880); s.showToast('relic:' + r.id); } } }

    // focus detection (throttled)
    hold.current += dt;
    if (hold.current - lastRay.current > 0.08) {
      lastRay.current = hold.current;
      let best: { kind: string; id: string } | null = null;
      if (inputActive) {
        const el = gl.domElement; const rr = el.getBoundingClientRect();
        const locked = document.pointerLockElement === el;
        const ndc = locked || !input.hasPointer ? new THREE.Vector2(0, 0) : new THREE.Vector2(((input.pointerX - rr.left) / rr.width) * 2 - 1, -((input.pointerY - rr.top) / rr.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const hits = ray.intersectObjects([...roots], true);
        for (const h of hits) { if (h.distance > 16) break; const sp2 = spotOf(h.object); if (sp2) { best = sp2; break; } }
        if (!best) {
          camera.getWorldDirection(fwd); let bd = 4.4;
          for (const p of SPOTS) {
            if (p.kind === 'relic') continue;
            const dx = p.x - player.x, dz = p.z - player.z, d = Math.hypot(dx, dz);
            if (d < bd && (dx * fwd.x + dz * fwd.z) / (d || 1) > 0.55) { bd = d; best = { kind: p.kind, id: p.id }; }
          }
        }
      }
      s.setFocus(best as never);
    }
  });
  return null;
}
export function SceneReady({ onReady }: { onReady: () => void }) {
  useEffect(() => { const id = requestAnimationFrame(() => requestAnimationFrame(onReady)); return () => cancelAnimationFrame(id); }, [onReady]);
  return null;
}
