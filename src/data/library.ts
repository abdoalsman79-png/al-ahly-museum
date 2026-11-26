import { L } from './types';

export interface Chronicle { id: string; title: L; date: L; body: L }
export const CHRONICLES: Chronicle[] = [
  {
    id: 'c1', date: { en: 'October 1905', ar: 'أكتوبر ١٩٠٥' },
    title: { en: 'The Higher Schools Students\' Club', ar: 'نادي المدارس العليا' },
    body: {
      en: 'The story begins before the football. In October 1905 Mustafa Kamil Pasha and friends from the national movement discussed a club for the students of the higher schools. Omar Lotfy was elected its president at a general assembly in a hall of the School of Medicine on 8 December 1905. The club became a meeting place for young nationalists. Out of it came the idea of a sports club for the same young men after graduation.',
      ar: 'تبدأ القصة قبل كرة القدم. في أكتوبر ١٩٠٥ ناقش مصطفى كامل باشا وأصدقاء من الحركة الوطنية إنشاء نادٍ لطلبة المدارس العليا. وانتُخب عمر لطفي رئيساً له في جمعية عمومية بإحدى قاعات مدرسة الطب يوم ٨ ديسمبر ١٩٠٥. وصار النادي ملتقى للشباب الوطني. ومن رحمه خرجت فكرة نادٍ رياضي للشباب أنفسهم بعد التخرج.'
    }
  },
  {
    id: 'c2', date: { en: '24 April 1907', ar: '٢٤ أبريل ١٩٠٧' },
    title: { en: 'The First Board Meeting', ar: 'أول اجتماع لمجلس الإدارة' },
    body: {
      en: 'The committee met at 5:30 pm in the house of Alfred Mitchell-Innes in Giza, under his chairmanship. Members: Idris Ragheb, Ismael Seri, Amin Sami, Omar Lotfy, with Mohamed Sherif as secretary. Saad Zaghloul, the Minister of Education, became the first honorary president.',
      ar: 'اجتمعت اللجنة في الخامسة والنصف مساءً في بيت ألفريد ميتشل إينس بالجيزة برئاسته. وضمّت: إدريس راغب وإسماعيل سري وأمين سامي وعمر لطفي، وسكرتيرها محمد شريف. وكان سعد زغلول، وزير المعارف، أول رئيس شرف للنادي.'
    }
  },
  {
    id: 'c3', date: { en: '1907', ar: '١٩٠٧' },
    title: { en: 'The Name and the Shares', ar: 'الاسم والأسهم' },
    body: {
      en: 'The name "Al Ahly" was suggested by Amin Sami, because it sounds like the Egyptian Arabic word for "national". The main building was designed by the architect Ismail Seri and reviewed by Mitchell-Innes. A civil company was formed on behalf of the club with shares of five Egyptian pounds each, with a target of raising five thousand pounds.',
      ar: 'اقترح أمين سامي اسم "الأهلي" لأنه يشبه الكلمة المصرية "أهلي" أي وطني. وصمّم المهندس إسماعيل سري المبنى الرئيسي وراجعه ميتشل إينس. وأُنشئت شركة مدنية باسم النادي بأسهم قيمة السهم منها خمسة جنيهات مصرية، وكان الهدف جمع خمسة آلاف جنيه.'
    }
  },
  {
    id: 'c4', date: { en: '2 April 1908 – 26 February 1909', ar: '٢ أبريل ١٩٠٨ – ٢٦ فبراير ١٩٠٩' },
    title: { en: 'The First Egyptian President, and the Opening', ar: 'أول رئيس مصري والافتتاح' },
    body: {
      en: 'Mitchell-Innes stepped down on 2 April 1908. Aziz Ezzat was appointed in his place and became the first Egyptian president of Al Ahly. The main building was officially opened on 26 February 1909. Football was not among the founders\' aims, but the graduates who joined developed a passion for it, and the first ground, Al-Hawsh, was built in 1909.',
      ar: 'تنحى ميتشل إينس يوم ٢ أبريل ١٩٠٨. وعُيّن عزيز عزت مكانه وصار أول رئيس مصري للأهلي. وافتُتح المبنى الرئيسي رسمياً يوم ٢٦ فبراير ١٩٠٩. لم تكن كرة القدم من أهداف المؤسسين، لكن الخريجين الذين انضموا أحبوها، وبُني أول ملعب، الحوش، عام ١٩٠٩.'
    }
  },
  {
    id: 'c5', date: { en: '1917 – 1918', ar: '١٩١٧ – ١٩١٨' },
    title: { en: 'Refusal, then Resistance on the Pitch', ar: 'رفض ثم مقاومة داخل الملعب' },
    body: {
      en: 'Al Ahly refused to take part in the first Sultan Hussein Cup in 1917, which was a competition of British clubs. In 1918 the club\'s management decided to participate as a sign of resistance and to show an Egyptian presence in sport. The first win came in 1923.',
      ar: 'رفض الأهلي المشاركة في أول كأس للسلطان حسين عام ١٩١٧، وكانت بطولة للأندية البريطانية. وفي ١٩١٨ قررت إدارة النادي المشاركة كإشارة مقاومة وإظهار للحضور المصري في الرياضة. وجاء أول فوز عام ١٩٢٣.'
    }
  }
];

export interface Almanac { id: string; title: L; note?: L; cols: L[]; rows: string[][] }
export const ALMANACS: Almanac[] = [
  {
    id: 'a-finals',
    title: { en: 'Champions League Finals', ar: 'نهائيات دوري أبطال أفريقيا' },
    note: { en: 'Results as recorded by RSSSF and Wikipedia. "W" means Al Ahly won the title; "L" means the final was lost.', ar: 'النتائج كما سجلتها RSSSF وويكيبيديا. "W" فوز بالنهائي و"L" خسارة.' },
    cols: [{ en: 'Year', ar: 'السنة' }, { en: 'Opponent', ar: 'الخصم' }, { en: 'Legs', ar: 'المباراتان' }, { en: '', ar: '' }],
    rows: [
      ['1982', 'Asante Kotoko', '3–0, 1–1', 'W'],
      ['1983', 'Asante Kotoko', '0–0, 0–1', 'L'],
      ['1987', 'Al-Hilal', '0–0, 2–0', 'W'],
      ['2001', 'Mamelodi Sundowns', '1–1, 3–0', 'W'],
      ['2005', 'Étoile du Sahel', '0–0, 3–0', 'W'],
      ['2006', 'CS Sfaxien', '1–1, 1–0', 'W'],
      ['2007', 'Étoile du Sahel', '0–0, 1–3', 'L'],
      ['2008', 'Cotonsport Garoua', '2–0, 2–2', 'W'],
      ['2012', 'Espérance de Tunis', '1–1, 2–1', 'W'],
      ['2013', 'Orlando Pirates', '1–1, 2–0', 'W'],
      ['2017', 'Wydad AC', '1–1, 0–1', 'L'],
      ['2020', 'Zamalek', '2–1 (single match)', 'W'],
      ['2021', 'Kaizer Chiefs', '3–0 (single match)', 'W'],
      ['2022', 'Wydad AC', '—', 'L'],
      ['2023', 'Wydad AC', '2–1, 1–1', 'W'],
      ['2024', 'Espérance de Tunis', '0–0, 1–0', 'W']
    ]
  },
  {
    id: 'a-cwc',
    title: { en: 'Club World Cup Podiums', ar: 'منصات كأس العالم للأندية' },
    cols: [{ en: 'Edition', ar: 'النسخة' }, { en: 'Third-place match', ar: 'مباراة المركز الثالث' }, { en: 'Score', ar: 'النتيجة' }, { en: 'Place', ar: 'المركز' }],
    rows: [
      ['2006 (Japan)', 'Club América', '2–1', '3rd'],
      ['2020 (Qatar, Feb 2021)', 'Palmeiras', '0–0, 3–2 pens', '3rd'],
      ['2021 (UAE, Feb 2022)', '—', '—', '3rd'],
      ['2023 (Saudi Arabia)', 'Urawa Red Diamonds', '4–2', '3rd']
    ]
  },
  {
    id: 'a-honours',
    title: { en: 'Honours Ledger (late 2026 record)', ar: 'سجل الألقاب (حتى أواخر ٢٠٢٦)' },
    note: { en: 'Counts as stated by the English Wikipedia entry on Al Ahly SC, November 2026. Totals change each season.', ar: 'الأرقام كما وردت في مقالة ويكيبيديا الإنجليزية عن النادي الأهلي، نوفمبر ٢٠٢٦. تتغير الأرقام كل موسم.' },
    cols: [{ en: 'Competition', ar: 'البطولة' }, { en: 'Titles', ar: 'الألقاب' }, { en: '', ar: '' }, { en: '', ar: '' }],
    rows: [
      ['CAF Champions League', '12', '', ''],
      ['CAF Super Cup', '8', '', ''],
      ['African Cup Winners\' Cup', '4', '', ''],
      ['CAF Confederation Cup', '1', '', ''],
      ['Egyptian Premier League', '45', '', ''],
      ['Egypt Cup', '39', '', ''],
      ['Egyptian Super Cup', '16', '', ''],
      ['FIFA Club World Cup', 'Bronze x4', '', '']
    ]
  },
  {
    id: 'a-derby',
    title: { en: 'Derby and Giants: Notable Results', ar: 'القمة والعمالقة: نتائج بارزة' },
    cols: [{ en: 'Year', ar: 'السنة' }, { en: 'Match', ar: 'المباراة' }, { en: 'Score', ar: 'النتيجة' }, { en: 'Context', ar: 'السياق' }],
    rows: [
      ['1923', 'Al Ahly v Zamalek', 'W', 'Sultan Hussein Cup'],
      ['1963', 'Benfica v Al Ahly', '2–3', 'vs European champion'],
      ['1977', 'Bayern v Al Ahly', '1–2', 'vs European champion'],
      ['1986', 'Steaua v Al Ahly', '0–3', 'vs European champion'],
      ['2001', 'Al Ahly v Real Madrid', '1–0', 'Friendly, August'],
      ['2001–02', 'Al Ahly v Zamalek', '6–1', 'League'],
      ['2007', 'Al Ahly v Zamalek', '3–0', 'Egypt Cup final'],
      ['2020', 'Al Ahly v Zamalek', '2–1', 'Champions League final']
    ]
  }
];

export interface Clipping { id: string; outlet: string; date: L; headline: string; summary: L; tag: 'continental' | 'world' | 'club' | 'heritage'; url: string }
export const CLIPPINGS: Clipping[] = [
  {
    id: 'p1', outlet: 'BBC Sport', date: { en: '2007 (profile)', ar: '٢٠٠٧ (تقرير تعريفي)' }, tag: 'heritage',
    headline: 'Club profile: Al Ahly (BBC Sport Africa)',
    summary: { en: 'The BBC describes the club as founded on 24 April 1907 by Omar Lutfi Bey as a purely national club, with the British official Mitchell Ince as its first chairman.', ar: 'تصف بي بي سي النادي بأنه تأسس في ٢٤ أبريل ١٩٠٧ على يد عمر لطفي بك كنادٍ وطني خالص، وكان المسؤول البريطاني ميتشل إينس أول رئيس له.' },
    url: 'https://newsimg.bbc.co.uk/sport1/hi/football/africa/6584499.stm'
  },
  {
    id: 'p2', outlet: 'FIFA.com', date: { en: '17 December 2006', ar: '١٧ ديسمبر ٢٠٠٦' }, tag: 'world',
    headline: 'Aboutrika the star as Al Ahly grab third',
    summary: { en: 'FIFA\'s report on the 2–1 win over Club América in Yokohama that gave the reigning African champions third place.', ar: 'تقرير الفيفا عن الفوز ٢–١ على كلوب أمريكا في يوكوهاما الذي منح بطل أفريقيا المركز الثالث.' },
    url: 'https://web.archive.org/web/20141230042839/http:/www.fifa.com/tournaments/archive/clubworldcup/japan2006/news/newsid=108707/index.html'
  },
  {
    id: 'p3', outlet: 'BBC Sport', date: { en: '11 February 2021', ar: '١١ فبراير ٢٠٢١' }, tag: 'world',
    headline: 'Al Ahly beat Palmeiras to clinch third place at Club World Cup',
    summary: { en: 'Goalkeeper Mohamed El Shenawy saved Felipe Melo\'s penalty in the shoot-out to give Al Ahly bronze again.', ar: 'تصدى الحارس محمد الشناوي لركلة فيليبي ميلو في ركلات الترجيح ليمنح الأهلي البرونزية مجدداً.' },
    url: 'https://www.bbc.com/sport/africa/56033530'
  },
  {
    id: 'p4', outlet: 'Reuters', date: { en: '22 December 2023', ar: '٢٢ ديسمبر ٢٠٢٣' }, tag: 'world',
    headline: 'Al-Ahly beat Urawa Red Diamonds 4-2 to finish third in Club World Cup',
    summary: { en: 'Al Ahly secured a top three finish for the fourth time in Jeddah despite losing a two-goal lead and missing a penalty.', ar: 'حسم الأهلي المركز الثالث للمرة الرابعة في جدة رغم ضياع تقدمه بهدفين وإهدار ركلة جزاء.' },
    url: 'https://www.reuters.com/sports/soccer/al-ahly-beat-urawa-red-diamonds-4-2-finish-third-club-world-cup-2023-12-22/'
  },
  {
    id: 'p5', outlet: 'alahlyegypt.com', date: { en: '22 December 2023', ar: '٢٢ ديسمبر ٢٠٢٣' }, tag: 'club',
    headline: 'We claim the bronze medal for the fourth time in history',
    summary: { en: 'The club\'s official report on the Urawa match, with goals from Yasser Ibrahim in the 19th minute and Percy Tau.', ar: 'تقرير الموقع الرسمي للنادي عن مباراة أوراوا، بأهداف لياسر إبراهيم في الدقيقة ١٩ وبيرسي تاو.' },
    url: 'https://www.alahlyegypt.com/en/news/article/we-claim-the-bronze-medal-for-the-fourth-time-in-history'
  },
  {
    id: 'p6', outlet: 'CAF Online', date: { en: '25 May 2024', ar: '٢٥ مايو ٢٠٢٤' }, tag: 'continental',
    headline: 'Ahly crowned champions of Africa for record-extending 12th title',
    summary: { en: 'CAF\'s report on the 1–0 win over Espérance at Cairo International Stadium.', ar: 'تقرير الاتحاد الأفريقي عن الفوز ١–٠ على الترجي في استاد القاهرة الدولي.' },
    url: 'https://www.cafonline.com/en/caf-champions-league/news/ahly-crowned-champions-of-africa-for-record-extending-12th-title/'
  },
  {
    id: 'p7', outlet: 'Ahram Online', date: { en: '14 June 2025', ar: '١٤ يونيو ٢٠٢٥' }, tag: 'world',
    headline: 'Ahly\'s Club World Cup journey: Four bronze medals in nine appearances',
    summary: { en: 'A look back at every appearance, from the 2005 debut to the 2023 bronze.', ar: 'نظرة على كل مشاركة من الظهور الأول في ٢٠٠٥ حتى برونزية ٢٠٢٣.' },
    url: 'https://english.ahram.org.eg/News/546642.aspx'
  },
  {
    id: 'p8', outlet: 'Guinness World Records', date: { en: '25 May 2024', ar: '٢٥ مايو ٢٠٢٤' }, tag: 'continental',
    headline: 'Most wins of the CAF Champions League',
    summary: { en: 'The record entry: 12 wins, in 1982, 1987, 2001, 2005, 2006, 2008, 2012, 2013, 2020, 2021, 2023 and 2024.', ar: 'سجل الرقم القياسي: ١٢ لقباً في ١٩٨٢ و١٩٨٧ و٢٠٠١ و٢٠٠٥ و٢٠٠٦ و٢٠٠٨ و٢٠١٢ و٢٠١٣ و٢٠٢٠ و٢٠٢١ و٢٠٢٣ و٢٠٢٤.' },
    url: 'https://www.guinnessworldrecords.com/world-records/89635-most-wins-of-the-caf-champions-league'
  }
];

export interface TimelineItem { year: number; text: L }
export const TIMELINE: TimelineItem[] = [
  { year: 1905, text: { en: 'The Higher Schools Students\' Club elects Omar Lotfy as president.', ar: 'نادي المدارس العليا ينتخب عمر لطفي رئيساً.' } },
  { year: 1907, text: { en: 'Al Ahly is founded on 24 April.', ar: 'تأسيس الأهلي في ٢٤ أبريل.' } },
  { year: 1909, text: { en: 'Main building opens; first football ground, Al-Hawsh.', ar: 'افتتاح المبنى الرئيسي وبناء أول ملعب، الحوش.' } },
  { year: 1923, text: { en: 'First Sultan Hussein Cup, beating Zamalek.', ar: 'أول كأس للسلطان حسين بالفوز على الزمالك.' } },
  { year: 1948, text: { en: 'First Egyptian league season; 5–0 on opening day.', ar: 'أول موسم للدوري المصري؛ فوز ٥–٠ في الافتتاح.' } },
  { year: 1959, text: { en: 'Saleh Selim captains the team in the Egypt Cup final.', ar: 'صالح سليم يقود الفريق في نهائي كأس مصر.' } },
  { year: 1973, text: { en: 'Hidegkuti arrives and builds "El Talamza".', ar: 'وصول هيديكوتي وبناء "التلامذة".' } },
  { year: 1976, text: { en: 'First continental campaign; El Khatib scores the first goal.', ar: 'أول مشاركة قارية؛ الخطيب يسجل الهدف الأول.' } },
  { year: 1982, text: { en: 'First African Champions Cup.', ar: 'أول بطولة أفريقية للأندية الأبطال.' } },
  { year: 1984, text: { en: 'First of three straight Cup Winners\' Cups.', ar: 'أول ثلاث كؤوس متتالية في كأس الكؤوس.' } },
  { year: 1987, text: { en: 'Second Champions Cup; El Khatib retires.', ar: 'دوري الأبطال الثاني؛ اعتزال الخطيب.' } },
  { year: 1994, text: { en: 'Boycott of African tournaments; Arab Cup Winners\' Cup won.', ar: 'مقاطعة البطولات الأفريقية؛ الفوز بكأس الكؤوس العربية.' } },
  { year: 2001, text: { en: 'Manuel José arrives; the Champions League returns to Cairo.', ar: 'وصول مانويل جوزيه؛ عودة دوري الأبطال إلى القاهرة.' } },
  { year: 2005, text: { en: 'Champions League and a league title with a 31-point margin.', ar: 'دوري الأبطال والدوري بفارق ٣١ نقطة.' } },
  { year: 2006, text: { en: 'Quadruple; first African podium at the Club World Cup.', ar: 'الرباعية؛ أول منصة أفريقية في كأس العالم للأندية.' } },
  { year: 2012, text: { en: 'Port Said tragedy; seventh African title.', ar: 'مأساة بورسعيد؛ اللقب الأفريقي السابع.' } },
  { year: 2013, text: { en: 'Eighth African title against Orlando Pirates.', ar: 'اللقب الأفريقي الثامن أمام أورلاندو بايرتس.' } },
  { year: 2017, text: { en: 'Mahmoud El Khatib elected president on 1 December.', ar: 'انتخاب محمود الخطيب رئيساً في ١ ديسمبر.' } },
  { year: 2020, text: { en: 'The derby final, 2–1, in an empty stadium.', ar: 'نهائي القمة ٢–١ في ملعب خالٍ.' } },
  { year: 2021, text: { en: 'Tenth Champions League title; Club World Cup bronze.', ar: 'اللقب العاشر في دوري الأبطال؛ برونزية كأس العالم للأندية.' } },
  { year: 2023, text: { en: 'Eleventh title and a fourth bronze in Jeddah.', ar: 'اللقب الحادي عشر وبرونزية رابعة في جدة.' } },
  { year: 2024, text: { en: 'A record twelfth title.', ar: 'اللقب الثاني عشر القياسي.' } }
];
