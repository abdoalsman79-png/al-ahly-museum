// Procedural audio. No audio files are needed; everything is synthesised with WebAudio.
// If WebAudio is unavailable the calls become silent no-ops.
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let ambience: { src: AudioBufferSourceNode; gain: GainNode; filter: BiquadFilterNode } | null = null;
let ok = true;
let mutedFlag = false;
let lastStep = 0;

const noiseBuf = (c: AudioContext, secs = 2) => {
  const b = c.createBuffer(1, c.sampleRate * secs, c.sampleRate);
  const d = b.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
  return b;
};

export function initAudio(): boolean {
  if (ctx) return ok;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = mutedFlag ? 0 : 0.8;
    master.connect(ctx.destination);
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf(ctx, 4); src.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 380;
    const gain = ctx.createGain(); gain.gain.value = 0.06;
    src.connect(filter); filter.connect(gain); gain.connect(master); src.start();
    ambience = { src, gain, filter };
    ok = true;
  } catch { ok = false; }
  return ok;
}

export function resumeAudio() { try { ctx?.resume(); } catch { /* ignore */ } }
export function setMuted(m: boolean) {
  mutedFlag = m;
  if (master && ctx) master.gain.setTargetAtTime(m ? 0 : 0.8, ctx.currentTime, 0.05);
}
export function setAmbience(mood: 'heritage' | 'night' | 'sepia') {
  if (!ambience || !ctx) return;
  const f = mood === 'night' ? 900 : mood === 'sepia' ? 260 : 380;
  const g = mood === 'night' ? 0.11 : mood === 'sepia' ? 0.045 : 0.06;
  ambience.filter.frequency.setTargetAtTime(f, ctx.currentTime, 0.5);
  ambience.gain.gain.setTargetAtTime(g, ctx.currentTime, 0.5);
}
export function chime(base = 880) {
  if (!ctx || !master || !ok) return;
  const t = ctx.currentTime;
  [1, 1.5, 2, 3.01].forEach((m, i) => {
    const o = ctx!.createOscillator(); const g = ctx!.createGain();
    o.type = 'sine'; o.frequency.value = base * m;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18 / (i + 1), t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6 + i * 0.2);
    o.connect(g); g.connect(master!); o.start(t); o.stop(t + 2.2);
  });
}
export function click() {
  if (!ctx || !master || !ok) return;
  const t = ctx.currentTime; const o = ctx.createOscillator(); const g = ctx.createGain();
  o.type = 'triangle'; o.frequency.setValueAtTime(520, t); o.frequency.exponentialRampToValueAtTime(260, t + 0.08);
  g.gain.setValueAtTime(0.1, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.12);
}
export function footstep() {
  if (!ctx || !master || !ok) return;
  const now = performance.now(); if (now - lastStep < 150) return; lastStep = now;
  const src = ctx.createBufferSource(); src.buffer = noiseBuf(ctx, 0.2);
  const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700 + Math.random() * 300; f.Q.value = 1.2;
  const g = ctx.createGain(); const t = ctx.currentTime;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.22, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
  src.connect(f); f.connect(g); g.connect(master); src.start(t); src.stop(t + 0.2);
}
export const audioOk = () => ok;

export function speak(text: string, lang: 'en' | 'ar', onEnd?: () => void): boolean {
  try {
    const ss = window.speechSynthesis; if (!ss) return false;
    ss.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'ar' ? 'ar-EG' : 'en-GB'; u.rate = 0.95;
    u.onend = () => onEnd?.(); u.onerror = () => onEnd?.();
    ss.speak(u); return true;
  } catch { return false; }
}
export const stopSpeak = () => { try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } };
