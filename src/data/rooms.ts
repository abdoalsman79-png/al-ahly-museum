import { L } from './types';

export type Target = { kind: 'trophy' | 'statue' | 'frame'; id: string } | { goto: number };
export interface Hotspot { x: number; y: number; label: L; target: Target }
export interface Room {
  id: string; src: string; title: L; text: L;
  // Ken Burns: start and end view, as scale and transform origin in percent
  from: { z: number; x: number; y: number }; to: { z: number; x: number; y: number };
  hotspots: Hotspot[];
}

// goto indexes refer to WAYPOINTS: 0 vault, 1 statues, 2 gallery, 3 relics, 4 library
export const ROOMS: Room[] = [
  { id: 'busts', src: '/rooms/busts.jpg', title: { en: 'Hall of Presidents and Builders', ar: 'قاعة الرؤساء والبنّائين' },
    text: { en: 'Bronze busts on carved plinths before red velvet, with the portrait wall of the men who led the club.', ar: 'تماثيل نصفية برونزية على قواعد خشبية منحوتة أمام المخمل الأحمر، وبجوارها جدار صور من قادوا النادي.' },
    from: { z: 1, x: 50, y: 50 }, to: { z: 1.15, x: 60, y: 55 },
    hotspots: [
      { x: 52, y: 48, label: { en: 'Saleh Selim', ar: 'صالح سليم' }, target: { kind: 'statue', id: 'saleh-selim' } },
      { x: 68, y: 52, label: { en: 'Mahmoud El Khatib', ar: 'محمود الخطيب' }, target: { kind: 'statue', id: 'el-khatib' } },
      { x: 80, y: 88, label: { en: 'Walk to the Hall of Statues', ar: 'امشِ إلى قاعة التماثيل' }, target: { goto: 1 } }] },
  { id: 'busts-close', src: '/rooms/busts.jpg', title: { en: 'Close-up: the Busts', ar: 'لقطة قريبة: التماثيل النصفية' },
    text: { en: 'Each plinth carries a brass plaque with the name and years of service.', ar: 'كل قاعدة تحمل لوحة نحاسية بالاسم وسنوات الخدمة.' },
    from: { z: 1.9, x: 78, y: 60 }, to: { z: 2.3, x: 70, y: 55 }, hotspots: [] },
  { id: 'cabinet', src: '/rooms/cabinet.jpg', title: { en: 'The Great Trophy Cabinet', ar: 'دولاب البطولات الكبير' },
    text: { en: 'Three shelves of continental and world trophies lit from above, with the club history photo wall beside it.', ar: 'ثلاثة رفوف من كؤوس البطولات القارية والعالمية تحت الإضاءة العلوية، وبجانبها جدار صور تاريخ النادي.' },
    from: { z: 1, x: 50, y: 50 }, to: { z: 1.2, x: 50, y: 45 },
    hotspots: [{ x: 55, y: 50, label: { en: 'Walk to the 3D Trophy Vault', ar: 'امشِ إلى دولاب البطولات (ثلاثي الأبعاد)' }, target: { goto: 0 } }] },
  { id: 'cabinet-close', src: '/rooms/cabinet.jpg', title: { en: 'Close-up: Shields and Cups', ar: 'لقطة قريبة: الدروع والكؤوس' },
    text: { en: 'Engraved shields sit between the tall continental cups.', ar: 'دروع منقوشة بين الكؤوس القارية الطويلة.' },
    from: { z: 2.2, x: 58, y: 52 }, to: { z: 2.6, x: 45, y: 40 }, hotspots: [] },
  { id: 'statues', src: '/rooms/statues.jpg', title: { en: 'The Statues Hall', ar: 'قاعة التماثيل' },
    text: { en: 'Life-size bronze figures of club legends under spotlights, facing the "Generation of Titles" photo wall.', ar: 'تماثيل برونزية بالحجم الطبيعي لأساطير النادي تحت الأضواء، قبالة جدار صور «جيل البطولات».' },
    from: { z: 1, x: 50, y: 50 }, to: { z: 1.15, x: 65, y: 50 },
    hotspots: [
      { x: 53, y: 35, label: { en: 'Saleh Selim', ar: 'صالح سليم' }, target: { kind: 'statue', id: 'saleh-selim' } },
      { x: 68, y: 42, label: { en: 'Mahmoud El Khatib', ar: 'محمود الخطيب' }, target: { kind: 'statue', id: 'el-khatib' } },
      { x: 80, y: 88, label: { en: 'Walk to the 3D Statues', ar: 'امشِ إلى التماثيل (ثلاثي الأبعاد)' }, target: { goto: 1 } }] },
  { id: 'statues-wall', src: '/rooms/statues.jpg', title: { en: 'Close-up: Generation of Titles', ar: 'لقطة قريبة: جيل البطولات' },
    text: { en: 'Black and white team photographs from the club\'s golden eras.', ar: 'صور فرق بالأبيض والأسود من العصور الذهبية للنادي.' },
    from: { z: 2.3, x: 20, y: 38 }, to: { z: 2.6, x: 28, y: 45 }, hotspots: [] },
  { id: 'moments', src: '/rooms/moments.jpg', title: { en: 'Glass Cases of Great Moments', ar: 'فاترينات اللحظات الكبرى' },
    text: { en: 'Diorama cases: Japan 2006, the 2020 derby final and the Aboutrika era, with the 1980s generation on the right.', ar: 'فاترينات تجسّد اليابان ٢٠٠٦ ونهائي القمة ٢٠٢٠ وزمن أبوتريكة، وعلى اليمين جيل الثمانينيات.' },
    from: { z: 1, x: 50, y: 50 }, to: { z: 1.15, x: 40, y: 50 },
    hotspots: [
      { x: 15, y: 40, label: { en: 'Aboutrika in Yokohama', ar: 'أبوتريكة في يوكوهاما' }, target: { kind: 'frame', id: 'l-aboutrika' } },
      { x: 36, y: 50, label: { en: 'The Derby Final in an Empty Stadium', ar: 'نهائي القمة في ملعب خالٍ' }, target: { kind: 'frame', id: 'm-2020' } },
      { x: 80, y: 88, label: { en: 'Walk to the Moments Gallery', ar: 'امشِ إلى معرض اللحظات' }, target: { goto: 2 } }] },
  { id: 'moments-close', src: '/rooms/moments.jpg', title: { en: 'Close-up: Japan 2006 Case', ar: 'لقطة قريبة: فاترينة اليابان ٢٠٠٦' },
    text: { en: 'The Club World Cup podium scene in miniature.', ar: 'مشهد منصة كأس العالم للأندية بحجم مصغّر.' },
    from: { z: 2.5, x: 14, y: 50 }, to: { z: 2.9, x: 14, y: 42 }, hotspots: [] }
];
