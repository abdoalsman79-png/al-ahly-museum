import { TROPHIES } from '../data/trophies';
import { FIGURES } from '../data/figures';
import { MOMENTS } from '../data/moments';
import { RELICS } from '../data/relics';

export const HALL = { w: 34, l: 64, wallH: 9.5, rise: 7.5 };
export const BOUNDS = { minX: -16.2, maxX: 16.2, minZ: -30.8, maxZ: 30.0 };
export const EYE = 1.7;

export interface Circle { x: number; z: number; r: number }
export type Kind = 'trophy' | 'statue' | 'frame' | 'relic' | 'shelf';
export interface Spot { kind: Kind; id: string; x: number; y: number; z: number }

export const COLUMNS: Circle[] = [];
for (const sx of [-9, 9]) for (const z of [-24, -16, -8, 0, 8, 16, 24]) COLUMNS.push({ x: sx, z, r: 0.6 });

export const TROPHY_SLOTS = TROPHIES.map((t, i) => {
  const row = i < 7 ? 0 : 1;
  const col = i % 7;
  return { id: t.id, x: -7.8 + col * 2.6, z: row === 0 ? -20.5 : -27, row };
});
export const STATUE_SLOTS = FIGURES.map((f, i) => ({ id: f.id, x: 14, z: -15 + i * 6 }));

const sorted = [...MOMENTS].sort((a, b) => a.year - b.year);
export const FRAME_ORDER = sorted;
export const FRAME_SLOTS = sorted.map((m, i) => {
  const col = Math.floor(i / 2);
  const row = i % 2;
  return { id: m.id, x: -16.85, z: 15 - col * 2.73, y: row === 0 ? 2.3 : 4.75 };
});

export const SHELVES = [
  { id: 'chronicles', x: -10, z: 31.2, label: 'chronShelf' as const },
  { id: 'almanacs', x: 0, z: 31.2, label: 'almShelf' as const },
  { id: 'press', x: 10, z: 31.2, label: 'pressShelf' as const },
  { id: 'timeline', x: 0, z: 25.5, label: 'timeShelf' as const }
];

export const COLLIDERS: Circle[] = [
  ...COLUMNS,
  ...TROPHY_SLOTS.map((t) => ({ x: t.x, z: t.z, r: 0.95 })),
  ...STATUE_SLOTS.map((s) => ({ x: s.x, z: s.z, r: 1.0 })),
  { x: 0, z: 25.5, r: 1.7 },
  { x: -5, z: 18, r: 0.5 },
  { x: 5, z: 18, r: 0.5 }
];

export const SPOTS: Spot[] = [
  ...TROPHY_SLOTS.map((t) => ({ kind: 'trophy' as Kind, id: t.id, x: t.x, y: 1.6, z: t.z })),
  ...STATUE_SLOTS.map((s) => ({ kind: 'statue' as Kind, id: s.id, x: s.x, y: 1.9, z: s.z })),
  ...FRAME_SLOTS.map((f) => ({ kind: 'frame' as Kind, id: f.id, x: f.x, y: f.y, z: f.z })),
  ...SHELVES.map((s) => ({ kind: 'shelf' as Kind, id: s.id, x: s.x, y: 2.4, z: s.z })),
  ...RELICS.map((r) => ({ kind: 'relic' as Kind, id: r.id, x: r.x, y: 0.05, z: r.z }))
];

export type ZoneId = 'nave' | 'vault' | 'statues' | 'gallery' | 'library' | 'relics';
export const zoneAt = (x: number, z: number): ZoneId => {
  if (z < -17) return 'vault';
  if (z > 17) return 'library';
  if (x > 11.5) return 'statues';
  if (x < -11.5) return 'gallery';
  return 'nave';
};

export interface Waypoint { id: ZoneId; pos: [number, number]; look: [number, number, number] }
export const WAYPOINTS: Waypoint[] = [
  { id: 'vault', pos: [0, -13], look: [0, 1.4, -26] },
  { id: 'statues', pos: [7, 0], look: [14, 1.9, 0] },
  { id: 'gallery', pos: [-9.5, 0], look: [-17, 3, 0] },
  { id: 'relics', pos: [0, 7], look: [0, 0, -3] },
  { id: 'library', pos: [0, 19], look: [0, 2.4, 31] }
];
export const START = { x: 0, z: 10, yaw: 0, pitch: -0.02 };
