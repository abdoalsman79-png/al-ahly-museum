export type Lang = 'en' | 'ar';
export type L = { en: string; ar: string };
export type EraId = 'e1' | 'e2' | 'e3' | 'e4' | 'e5';

export interface Era { id: EraId; label: L; from: number; to: number }
export const ERAS: Era[] = [
  { id: 'e1', label: { en: '1907 – 1940s', ar: '١٩٠٧ – الأربعينيات' }, from: 1907, to: 1949 },
  { id: 'e2', label: { en: '1950s – 1970s', ar: 'الخمسينيات – السبعينيات' }, from: 1950, to: 1979 },
  { id: 'e3', label: { en: '1980s – 1990s', ar: 'الثمانينيات – التسعينيات' }, from: 1980, to: 1999 },
  { id: 'e4', label: { en: '2000s – 2010s', ar: 'الألفية – العقد ٢٠١٠' }, from: 2000, to: 2019 },
  { id: 'e5', label: { en: 'Modern Era', ar: 'العصر الحديث' }, from: 2020, to: 2030 }
];
export const eraOfYear = (y: number): EraId => (ERAS.find((e) => y >= e.from && y <= e.to) ?? ERAS[4]).id;

export type TrophyModel = 'cup' | 'bigcup' | 'shield' | 'plate' | 'medal' | 'statuette';

export interface Trophy {
  id: string;
  model: TrophyModel;
  tint: 'gold' | 'silver' | 'bronze' | 'red';
  name: L;
  years: L;
  era: EraId;
  context: L;
  decisive: L;
  won: L;
  sacrifice: L;
  significance: L;
  sources: string[];
}

export interface Figure {
  id: string;
  name: L;
  role: L;
  lifespan: L;
  epithet: L;
  look: 'tarboosh' | 'bare' | 'hat' | 'coach';
  tone: 'bronze' | 'marble' | 'gold';
  philosophy: L;
  impact: L;
  milestones: { year: string; text: L }[];
  sources: string[];
}

export interface Moment {
  id: string;
  kind: 'moment' | 'legend';
  year: number;
  era: EraId;
  title: L;
  tag: L;
  story: L;
  stats: { label: L; value: L }[];
  sources: string[];
}

export interface Relic {
  id: string;
  x: number;
  z: number;
  year: string;
  title: L;
  story: L;
  memorial?: boolean;
  sources: string[];
}
