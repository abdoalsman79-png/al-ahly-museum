import { L } from './types';

export type Target =
  | { kind: 'trophy' | 'statue' | 'frame'; id: string }
  | { picker: { kind: 'trophy' | 'statue' | 'frame'; ids: string[]; title: L } }
  | { door: string }
  | { library: true }
  | { relic: number };

export interface Hotspot { x: number; y: number; label?: L; target: Target }
export interface Room { id: string; src: string; title: L; text: L; hotspots: Hotspot[] }

const CL = ['cl-1982', 'cl-2005-06', 'cl-2012'];
// Room scenes are photoreal images. Hotspot coordinates are percent of the image.
// New rooms are added by appending an entry here and dropping the image in /public/rooms.
export const ROOMS: Room[] = [
  { id: 'busts', src: '/rooms/busts.jpg', title: { en: 'Hall of Presidents and Builders', ar: 'قاعة الرؤساء والبنّائين' },
    text: { en: 'Bronze busts before red velvet, with the portrait wall of the men who led the club.', ar: 'تماثيل نصفية برونزية أمام المخمل الأحمر، وبجوارها جدار صور من قادوا النادي.' },
    hotspots: [
      { x: 52, y: 45, label: { en: 'Saleh Selim', ar: 'صالح سليم' }, target: { kind: 'statue', id: 'saleh-selim' } },
      { x: 68, y: 50, label: { en: 'Mahmoud El Khatib', ar: 'محمود الخطيب' }, target: { kind: 'statue', id: 'el-khatib' } },
      { x: 20, y: 62, label: { en: 'Presidents and builders', ar: 'الرؤساء والبنّاؤون' }, target: { picker: { kind: 'statue', ids: ['omar-lotfy', 'amin-sami', 'mitchell-innes', 'saleh-selim', 'el-khatib', 'manuel-jose'], title: { en: 'The men behind the club', ar: 'الرجال خلف النادي' } } } },
      { x: 96, y: 52, label: { en: 'Hall of Statues', ar: 'قاعة التماثيل' }, target: { door: 'statues' } },
      { x: 4, y: 52, label: { en: 'Trophy Cabinet', ar: 'دولاب البطولات' }, target: { door: 'cabinet' } },
      { x: 30, y: 90, target: { relic: 0 } }, { x: 60, y: 93, target: { relic: 1 } }, { x: 88, y: 80, target: { relic: 2 } }] },
  { id: 'statues', src: '/rooms/statues.jpg', title: { en: 'The Statues Hall', ar: 'قاعة التماثيل' },
    text: { en: 'Bronze figures of club legends under spotlights, facing the "Generation of Titles" photo wall.', ar: 'تماثيل برونزية لأساطير النادي تحت الأضواء، قبالة جدار صور «جيل البطولات».' },
    hotspots: [
      { x: 53, y: 35, label: { en: 'Saleh Selim', ar: 'صالح سليم' }, target: { kind: 'statue', id: 'saleh-selim' } },
      { x: 68, y: 42, label: { en: 'Mahmoud El Khatib', ar: 'محمود الخطيب' }, target: { kind: 'statue', id: 'el-khatib' } },
      { x: 20, y: 40, label: { en: 'Generation of Titles', ar: 'جيل البطولات' }, target: { picker: { kind: 'statue', ids: ['omar-lotfy', 'amin-sami', 'mitchell-innes', 'saleh-selim', 'el-khatib', 'manuel-jose'], title: { en: 'Legends of the club', ar: 'أساطير النادي' } } } },
      { x: 96, y: 55, label: { en: 'Great Moments', ar: 'اللحظات الكبرى' }, target: { door: 'moments' } },
      { x: 4, y: 55, label: { en: 'Presidents Hall', ar: 'قاعة الرؤساء' }, target: { door: 'busts' } },
      { x: 12, y: 85, target: { relic: 3 } }, { x: 45, y: 92, target: { relic: 4 } }, { x: 84, y: 88, target: { relic: 5 } }] },
  { id: 'moments', src: '/rooms/moments.jpg', title: { en: 'Glass Cases of Great Moments', ar: 'فاترينات اللحظات الكبرى' },
    text: { en: 'Diorama cases: Japan 2006, the 2020 derby final, the Aboutrika era and the 1980s generation.', ar: 'فاترينات تجسّد اليابان ٢٠٠٦ ونهائي القمة ٢٠٢٠ وزمن أبوتريكة وجيل الثمانينيات.' },
    hotspots: [
      { x: 15, y: 40, label: { en: 'Aboutrika in Yokohama', ar: 'أبوتريكة في يوكوهاما' }, target: { kind: 'frame', id: 'l-aboutrika' } },
      { x: 36, y: 50, label: { en: 'The Derby Final 2020', ar: 'نهائي القمة ٢٠٢٠' }, target: { kind: 'frame', id: 'm-2020' } },
      { x: 66, y: 48, label: { en: 'The 2006 era', ar: 'زمن ٢٠٠٦' }, target: { picker: { kind: 'frame', ids: ['l-aboutrika', 'm-2005', 'm-2002'], title: { en: 'The 2006 era', ar: 'زمن ٢٠٠٦' } } } },
      { x: 90, y: 45, label: { en: 'The 1980s generation', ar: 'جيل الثمانينيات' }, target: { picker: { kind: 'frame', ids: ['m-1982', 'm-1984', 'm-1987', 'm-1977'], title: { en: 'Seventies and eighties', ar: 'السبعينيات والثمانينيات' } } } },
      { x: 96, y: 90, label: { en: 'Trophy Cabinet', ar: 'دولاب البطولات' }, target: { door: 'cabinet' } },
      { x: 4, y: 90, label: { en: 'Statues Hall', ar: 'قاعة التماثيل' }, target: { door: 'statues' } },
      { x: 8, y: 80, target: { relic: 6 } }, { x: 50, y: 92, target: { relic: 7 } }, { x: 78, y: 90, target: { relic: 8 } }] },
  { id: 'cabinet', src: '/rooms/cabinet.jpg', title: { en: 'The Great Trophy Cabinet', ar: 'دولاب البطولات الكبير' },
    text: { en: 'Three shelves of continental and world trophies, lit from above, beside the club history photo wall.', ar: 'ثلاثة رفوف من كؤوس البطولات القارية والعالمية تحت الإضاءة العلوية، بجانب جدار صور تاريخ النادي.' },
    hotspots: [
      { x: 30, y: 30, label: { en: 'Champions League cups', ar: 'كؤوس دوري الأبطال' }, target: { picker: { kind: 'trophy', ids: ['__cl'], title: { en: 'African Champions League', ar: 'دوري أبطال أفريقيا' } } } },
      { x: 54, y: 50, label: { en: 'Shields and Super Cups', ar: 'الدروع والسوبر' }, target: { picker: { kind: 'trophy', ids: ['__other'], title: { en: 'Shields, Super Cups and more', ar: 'الدروع والسوبر وأكثر' } } } },
      { x: 12, y: 45, label: { en: 'Club photo wall', ar: 'جدار الصور' }, target: { picker: { kind: 'frame', ids: ['m-1907', 'l-hegazi', 'm-1923', 'l-tetsh', 'm-1948'], title: { en: 'The early years', ar: 'السنوات الأولى' } } } },
      { x: 88, y: 40, label: { en: 'Heritage Library', ar: 'مكتبة التراث' }, target: { library: true } },
      { x: 4, y: 90, label: { en: 'Great Moments', ar: 'اللحظات الكبرى' }, target: { door: 'moments' } },
      { x: 96, y: 90, label: { en: 'Presidents Hall', ar: 'قاعة الرؤساء' }, target: { door: 'busts' } },
      { x: 25, y: 85, target: { relic: 9 } }, { x: 62, y: 90, target: { relic: 10 } }, { x: 78, y: 78, target: { relic: 11 } }, { x: 40, y: 70, target: { relic: 12 } }] }
];
void CL;
