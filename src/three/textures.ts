import * as THREE from 'three';
import { Lang, Moment, Trophy, Figure, ERAS } from '../data/types';

export function canvasTex(w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, repeat?: [number, number]): THREE.CanvasTexture {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const c = cv.getContext('2d')!; draw(c, w, h);
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
  return t;
}

export function wrap(c: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(/\s+/); const lines: string[] = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (c.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  if (cur) lines.push(cur); return lines;
}

const FONT = (w: number, px: number, serif = false) => `${w} ${px}px ${serif ? '"Playfair Display", Cairo' : 'Cairo'}, sans-serif`;

export const floorTexture = () => canvasTex(1024, 1024, (c, w, h) => {
  const n = 4; const s = w / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const base = 205 + Math.random() * 18;
    c.fillStyle = `rgb(${base},${base - 16},${base - 48})`; c.fillRect(i * s, j * s, s, s);
    for (let k = 0; k < 26; k++) {
      c.strokeStyle = `rgba(${150 + Math.random() * 40},${120 + Math.random() * 30},${80 + Math.random() * 20},${0.05 + Math.random() * 0.1})`;
      c.lineWidth = 0.6 + Math.random() * 2.4; c.beginPath();
      let x = i * s + Math.random() * s, y = j * s + Math.random() * s; c.moveTo(x, y);
      for (let q = 0; q < 4; q++) { x += (Math.random() - 0.3) * 70; y += (Math.random() - 0.5) * 40; c.lineTo(x, y); }
      c.stroke();
    }
    c.strokeStyle = 'rgba(80,58,36,.55)'; c.lineWidth = 3; c.strokeRect(i * s + 1, j * s + 1, s - 2, s - 2);
  }
}, [8, 16]);

export const wallTexture = () => canvasTex(512, 512, (c, w, h) => {
  c.fillStyle = '#e4d3b2'; c.fillRect(0, 0, w, h);
  for (let i = 0; i < 4000; i++) { c.fillStyle = `rgba(${120 + Math.random() * 80},${100 + Math.random() * 60},70,${Math.random() * 0.06})`; c.fillRect(Math.random() * w, Math.random() * h, 2 + Math.random() * 6, 2 + Math.random() * 6); }
}, [8, 2]);

export const carpetTexture = () => canvasTex(256, 1024, (c, w, h) => {
  c.fillStyle = '#7a0a1c'; c.fillRect(0, 0, w, h);
  c.strokeStyle = '#d4a94f'; c.lineWidth = 8; c.strokeRect(10, 0, w - 20, h);
  c.lineWidth = 2; c.strokeRect(26, -2, w - 52, h + 4);
  c.fillStyle = 'rgba(212,169,79,.55)';
  for (let y = 40; y < h; y += 96) { c.save(); c.translate(w / 2, y); c.rotate(Math.PI / 4); c.fillRect(-14, -14, 28, 28); c.restore(); }
}, [1, 1]);

export const crestTexture = (lang: Lang) => canvasTex(1024, 1024, (c, w, h) => {
  const cx = w / 2, cy = h / 2;
  const g = c.createRadialGradient(cx, cy, 20, cx, cy, 500); g.addColorStop(0, '#d4231f'); g.addColorStop(1, '#6b0a18');
  c.fillStyle = g; c.beginPath(); c.arc(cx, cy, 500, 0, 7); c.fill();
  c.strokeStyle = '#d4a94f'; c.lineWidth = 16; c.beginPath(); c.arc(cx, cy, 480, 0, 7); c.stroke();
  c.lineWidth = 4; c.beginPath(); c.arc(cx, cy, 420, 0, 7); c.stroke();
  c.fillStyle = '#d4a94f';
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; c.save(); c.translate(cx + Math.cos(a) * 450, cy + Math.sin(a) * 450); c.rotate(a); c.fillRect(-10, -10, 20, 20); c.restore(); }
  // star
  c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 90 : 210; const a = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r - 40); } c.closePath(); c.fill();
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#f3e9d2';
  c.direction = lang === 'ar' ? 'rtl' : 'ltr';
  c.font = FONT(700, 110, lang === 'en'); c.fillText(lang === 'ar' ? 'الأهلي' : 'AL AHLY', cx, cy + 200);
  c.font = FONT(600, 70, lang === 'en'); c.fillText(lang === 'ar' ? '١٩٠٧' : '1907', cx, cy + 290);
});

export const relicTexture = (year: string, found: boolean, memorial: boolean) => canvasTex(256, 256, (c, w, h) => {
  const cx = w / 2;
  c.fillStyle = found ? (memorial ? '#2a2a2e' : '#8a5a18') : '#6d4a22'; c.beginPath(); c.arc(cx, cx, 124, 0, 7); c.fill();
  c.strokeStyle = found ? '#f6d98a' : '#b89455'; c.lineWidth = 6; c.beginPath(); c.arc(cx, cx, 114, 0, 7); c.stroke();
  c.lineWidth = 2; c.beginPath(); c.arc(cx, cx, 96, 0, 7); c.stroke();
  c.fillStyle = found ? '#f6d98a' : '#c9a86a'; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = FONT(700, 54, true); c.fillText(year, cx, cx + 4);
  if (!memorial) { c.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 9 : 20; const a = -Math.PI / 2 + i * Math.PI / 5; c.lineTo(cx + Math.cos(a) * r, 64 + Math.sin(a) * r); } c.closePath(); c.fill(); }
});

export const plaqueTexture = (line1: string, line2: string, lang: Lang, w = 512, h = 160) => canvasTex(w, h, (c) => {
  const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#cda24a'); g.addColorStop(1, '#8c6a22');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.strokeStyle = '#4b3510'; c.lineWidth = 4; c.strokeRect(6, 6, w - 12, h - 12);
  c.direction = lang === 'ar' ? 'rtl' : 'ltr'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#2a1c06';
  let px = 40; c.font = FONT(700, px, lang === 'en'); let lines = wrap(c, line1, w - 40);
  while (lines.length > 2 && px > 20) { px -= 4; c.font = FONT(700, px, lang === 'en'); lines = wrap(c, line1, w - 40); }
  const total = lines.length * (px + 6) + (line2 ? 30 : 0); let y = h / 2 - total / 2 + px / 2 + 2;
  for (const ln of lines) { c.fillText(ln, w / 2, y); y += px + 6; }
  if (line2) { c.font = FONT(600, 24); c.fillText(line2, w / 2, y + 6); }
});

export const trophyPlaque = (t: Trophy, lang: Lang) => plaqueTexture(shortName(t.name[lang]), t.years[lang], lang);
export const figurePlaque = (f: Figure, lang: Lang) => plaqueTexture(f.name[lang], f.role[lang].split(/,|،/)[0], lang, 512, 190);
function shortName(s: string) { return s.split(':')[0]; }

const ERA_COL: Record<string, string> = { e1: '#8a6d3b', e2: '#b0762c', e3: '#a3302a', e4: '#7a1b4e', e5: '#1f4d7a' };
export const posterTexture = (m: Moment, lang: Lang) => canvasTex(512, 384, (c, w, h) => {
  const g = c.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#2a0a10'); g.addColorStop(1, '#5a0f1f');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  c.fillStyle = 'rgba(212,169,79,.08)'; for (let i = -h; i < w; i += 28) { c.save(); c.translate(i, 0); c.rotate(0.6); c.fillRect(0, -50, 8, h * 2); c.restore(); }
  const era = ERAS.find((e) => e.id === m.era)!;
  c.fillStyle = ERA_COL[m.era]; c.fillRect(0, 0, w, 40);
  c.direction = lang === 'ar' ? 'rtl' : 'ltr'; c.textBaseline = 'middle'; c.textAlign = 'center';
  c.fillStyle = '#f6e7c1'; c.font = FONT(600, 22); c.fillText(era.label[lang] + '  ·  ' + m.tag[lang], w / 2, 21);
  c.fillStyle = '#d4a94f'; c.font = FONT(700, 118, true); c.fillText(String(m.year), w / 2, 130);
  c.fillStyle = '#f3e9d2'; let px = 38; c.font = FONT(700, px, lang === 'en'); let ls = wrap(c, m.title[lang], w - 60);
  while (ls.length > 3 && px > 22) { px -= 3; c.font = FONT(700, px, lang === 'en'); ls = wrap(c, m.title[lang], w - 60); }
  let y = 212; for (const l of ls) { c.fillText(l, w / 2, y); y += px + 8; }
  c.strokeStyle = '#d4a94f'; c.lineWidth = 2; c.beginPath(); c.moveTo(60, h - 40); c.lineTo(w - 60, h - 40); c.stroke();
  c.fillStyle = 'rgba(243,233,210,.7)'; c.font = FONT(600, 20); c.fillText(m.kind === 'legend' ? (lang === 'ar' ? 'أسطورة' : 'LEGEND') : (lang === 'ar' ? 'لحظة خالدة' : 'MOMENT'), w / 2, h - 18);
});

export const signTexture = (text: string, lang: Lang, w = 1024, h = 160) => canvasTex(w, h, (c) => {
  c.fillStyle = '#2a0a10'; c.fillRect(0, 0, w, h); c.strokeStyle = '#d4a94f'; c.lineWidth = 6; c.strokeRect(8, 8, w - 16, h - 16);
  c.direction = lang === 'ar' ? 'rtl' : 'ltr'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#e8c77a'; c.font = FONT(700, 72, lang === 'en'); c.fillText(text, w / 2, h / 2 + 4);
});

export const beamTexture = () => canvasTex(64, 256, (c, w, h) => {
  const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,236,190,0.55)'); g.addColorStop(1, 'rgba(255,236,190,0)');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  const side = c.createLinearGradient(0, 0, w, 0); side.addColorStop(0, 'rgba(0,0,0,1)'); side.addColorStop(0.5, 'rgba(0,0,0,0)'); side.addColorStop(1, 'rgba(0,0,0,1)');
  c.globalCompositeOperation = 'destination-out'; c.fillStyle = side; c.fillRect(0, 0, w, h);
});
