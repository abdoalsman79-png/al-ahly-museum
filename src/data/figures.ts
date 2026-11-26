import { Figure } from './types';

export const FIGURES: Figure[] = [
  {
    id: 'omar-lotfy', look: 'tarboosh', tone: 'bronze',
    name: { en: 'Omar Lotfy', ar: 'عمر لطفي' },
    role: { en: 'Originator of the idea of Al Ahly', ar: 'صاحب فكرة إنشاء النادي الأهلي' },
    lifespan: { en: '1867 – 14 November 1911', ar: '١٨٦٧ – ١٤ نوفمبر ١٩١١' },
    epithet: { en: 'Father of the cooperative movement in Egypt', ar: 'أبو التعاون في مصر' },
    philosophy: {
      en: 'A lawyer and reformer who believed that a nation is built through institutions its own people run. He saw young graduates of the higher schools scatter back to their villages and wanted a place where they could stay together, play sport and remain ready for the national cause.',
      ar: 'محامٍ ومصلح آمن بأن الأمم تُبنى بمؤسسات يديرها أبناؤها. رأى خريجي المدارس العليا يتفرقون عائدين إلى قراهم، فأراد مكاناً يجمعهم ويمارسون فيه الرياضة ويبقون مستعدين لخدمة قضية الوطن.'
    },
    impact: {
      en: 'Elected president of the Higher Schools Students\' Club on 8 December 1905, he raised the idea of a sports club for its graduates and discussed it with friends. That idea became Al Ahly on 24 April 1907. He is also remembered for an 1897 treatise on women\'s rights and for founding the first labour union in Egypt.',
      ar: 'انتُخب رئيساً لنادي المدارس العليا في ٨ ديسمبر ١٩٠٥، وطرح فكرة نادٍ رياضي لخريجيه وناقشها مع أصدقائه. صارت الفكرة هي الأهلي في ٢٤ أبريل ١٩٠٧. ويُذكر أيضاً برسالته عن حقوق المرأة عام ١٨٩٧ وبتأسيسه أول نقابة عمالية في مصر.'
    },
    milestones: [
      { year: '1886', text: { en: 'Graduates from the School of Law.', ar: 'يتخرج في مدرسة الحقوق.' } },
      { year: '1897', text: { en: 'Publishes a treatise on women\'s rights in Cairo.', ar: 'تُطبع رسالته عن حقوق المرأة في القاهرة.' } },
      { year: '1905', text: { en: 'Elected president of the Higher Schools Students\' Club.', ar: 'ينتخب رئيساً لنادي المدارس العليا.' } },
      { year: '1907', text: { en: 'The idea becomes Al Ahly Sporting Club.', ar: 'تتحول الفكرة إلى النادي الأهلي.' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Omar_Lotfy', 'https://en.wikipedia.org/wiki/Al_Ahly_SC']
  },
  {
    id: 'amin-sami', look: 'tarboosh', tone: 'marble',
    name: { en: 'Amin Sami', ar: 'أمين سامي' },
    role: { en: 'Founding board member who named the club', ar: 'عضو مجلس الإدارة المؤسس صاحب اسم "الأهلي"' },
    lifespan: { en: 'Founding generation', ar: 'جيل المؤسسين' },
    epithet: { en: 'The man behind the name', ar: 'صاحب الاسم' },
    philosophy: {
      en: 'He understood that the name of a club is its first promise. He suggested "Al Ahly", close to the Egyptian Arabic word for "national", so that the club announced from day one who it belonged to.',
      ar: 'أدرك أن اسم النادي هو أول وعوده. اقترح اسم "الأهلي"، القريب من الكلمة المصرية "أهلي" أي وطني، ليعلن النادي منذ يومه الأول لمن ينتمي.'
    },
    impact: {
      en: 'He sat at the first board meeting on 24 April 1907 at the house of Mitchell-Innes in Giza, alongside Idris Ragheb, Ismael Seri, Omar Lotfy and the secretary Mohamed Sherif.',
      ar: 'كان حاضراً في أول اجتماع لمجلس الإدارة يوم ٢٤ أبريل ١٩٠٧ في بيت ميتشل إينس بالجيزة، إلى جانب إدريس راغب وإسماعيل سري وعمر لطفي والسكرتير محمد شريف.'
    },
    milestones: [
      { year: '1907', text: { en: 'Takes part in the first official board meeting.', ar: 'يشارك في أول اجتماع رسمي لمجلس الإدارة.' } },
      { year: '1907', text: { en: 'Suggests the name "Al Ahly".', ar: 'يقترح اسم "الأهلي".' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Al_Ahly_SC', 'https://sis.gov.eg/Story/1752/Al-Ahly-Sporting-Club?lang=en-us']
  },
  {
    id: 'mitchell-innes', look: 'hat', tone: 'bronze',
    name: { en: 'Alfred Mitchell-Innes', ar: 'ألفريد ميتشل إينس' },
    role: { en: 'First president of the club', ar: 'أول رئيس للنادي' },
    lifespan: { en: 'President 1907 – 2 April 1908', ar: 'رئيساً من ١٩٠٧ حتى ٢ أبريل ١٩٠٨' },
    epithet: { en: 'The British adviser chosen for a national club', ar: 'المستشار البريطاني الذي ترأس نادياً وطنياً' },
    philosophy: {
      en: 'A British adviser to the Ministry of Finance. Journalists and historians explain his choice in practical terms: he controlled the country\'s finances and could provide support for a club created to counter British dominance of sport.',
      ar: 'مستشار بريطاني بوزارة المالية. يفسّر المؤرخون والصحفيون اختياره بعبارات عملية: فقد كان يتحكم في مالية الدولة ويستطيع دعم نادٍ أُسس لمواجهة الهيمنة البريطانية على الرياضة.'
    },
    impact: {
      en: 'He chaired the first official board meeting at his house in Giza at 5:30 pm on 24 April 1907, helped secure financing and reviewed the plans of the first clubhouse designed by Ismail Seri. He stepped down on 2 April 1908 and Aziz Ezzat became the first Egyptian president.',
      ar: 'ترأس أول اجتماع رسمي لمجلس الإدارة في بيته بالجيزة الساعة ٥:٣٠ مساءً يوم ٢٤ أبريل ١٩٠٧، وساعد في تدبير التمويل وراجع تصميم المبنى الأول الذي وضعه المهندس إسماعيل سري. تنحى في ٢ أبريل ١٩٠٨ وأصبح عزيز عزت أول رئيس مصري للنادي.'
    },
    milestones: [
      { year: '1907', text: { en: 'Chairs the founding meeting in Giza.', ar: 'يترأس اجتماع التأسيس في الجيزة.' } },
      { year: '1908', text: { en: 'Steps down; Aziz Ezzat succeeds him.', ar: 'يتنحى ويخلفه عزيز عزت.' } },
      { year: '1909', text: { en: 'The main building opens on 26 February.', ar: 'افتتاح المبنى الرئيسي في ٢٦ فبراير.' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Al_Ahly_SC', 'https://newsimg.bbc.co.uk/sport1/hi/football/africa/6584499.stm']
  },
  {
    id: 'saleh-selim', look: 'bare', tone: 'gold',
    name: { en: 'Saleh Selim', ar: 'صالح سليم' },
    role: { en: 'Midfielder, captain and twice president', ar: 'لاعب وسط وقائد ورئيس للنادي مرتين' },
    lifespan: { en: '11 September 1930 – 6 May 2002', ar: '١١ سبتمبر ١٩٣٠ – ٦ مايو ٢٠٠٢' },
    epithet: { en: 'El Maestro', ar: 'المايسترو' },
    philosophy: {
      en: 'The player who led from midfield and later the executive who ran the club as he had played: with order, discipline and an eye for the big occasion.',
      ar: 'لاعب قاد الفريق من الوسط، ثم إداري أدار النادي كما كان يلعب: بالنظام والانضباط وعين على المناسبات الكبيرة.'
    },
    impact: {
      en: 'A first-team player at 17, he played 354 league games for Al Ahly and won nine consecutive league titles from 1948–49 to 1958–59, an Egyptian record. He spent 1962–63 at Grazer AK in Austria, the first Egyptian footballer there. He later served as the club\'s 13th president (1980–88) and 15th president (1992–2002).',
      ar: 'لاعب في الفريق الأول في السابعة عشرة، لعب ٣٥٤ مباراة في الدوري مع الأهلي وفاز بتسعة ألقاب دوري متتالية من ١٩٤٨–١٩٤٩ حتى ١٩٥٨–١٩٥٩، وهو رقم قياسي مصري. وقضى موسم ١٩٦٢–١٩٦٣ في جراتسر الأسترالي، أول لاعب مصري هناك. وتولى لاحقاً رئاسة النادي الثالثة عشرة (١٩٨٠–١٩٨٨) والخامسة عشرة (١٩٩٢–٢٠٠٢).'
    },
    milestones: [
      { year: '1948', text: { en: 'First official league match for Al Ahly.', ar: 'أول مباراة رسمية له في الدوري مع الأهلي.' } },
      { year: '1959', text: { en: 'Captains Al Ahly in the Egypt Cup final against Zamalek.', ar: 'يقود الأهلي في نهائي كأس مصر أمام الزمالك.' } },
      { year: '1980', text: { en: 'Becomes president for the first time.', ar: 'يصبح رئيساً للنادي للمرة الأولى.' } },
      { year: '2002', text: { en: 'Dies in office on 6 May in London.', ar: 'يتوفى وهو في منصبه يوم ٦ مايو في لندن.' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Saleh_Selim']
  },
  {
    id: 'el-khatib', look: 'bare', tone: 'bronze',
    name: { en: 'Mahmoud El Khatib', ar: 'محمود الخطيب' },
    role: { en: 'Striker and current president', ar: 'مهاجم والرئيس الحالي للنادي' },
    lifespan: { en: 'Born 30 October 1954', ar: 'مواليد ٣٠ أكتوبر ١٩٥٤' },
    epithet: { en: 'Bibo', ar: 'بيبو' },
    philosophy: {
      en: 'A one-club man who played for Al Ahly from 1972 to 1988 and returned to lead it. His story joins the player\'s instinct to the executive\'s patience.',
      ar: 'رجل النادي الواحد، لعب للأهلي من ١٩٧٢ إلى ١٩٨٨ ثم عاد ليقوده. قصته تجمع بين غريزة اللاعب وصبر الإداري.'
    },
    impact: {
      en: 'He scored 109 league goals in 164 league appearances, won ten league titles, five Egypt Cups, two African Cups of Champions Clubs and three African Cup Winners\' Cups, and scored Al Ahly\'s first-ever continental goal in 1976. Three days after the 1987 final he announced his retirement. He was elected president on 1 December 2017 with 20,956 votes.',
      ar: 'سجّل ١٠٩ أهداف في ١٦٤ مباراة بالدوري، وفاز بعشرة ألقاب دوري وخمسة ألقاب كأس مصر ولقبين في كأس الأندية الأفريقية أبطال الدوري وثلاثة ألقاب في كأس الكؤوس، وسجّل أول هدف قاري للأهلي عام ١٩٧٦. وبعد ثلاثة أيام من نهائي ١٩٨٧ أعلن اعتزاله. وانتُخب رئيساً للنادي يوم ١ ديسمبر ٢٠١٧ بـ٢٠٬٩٥٦ صوتاً.'
    },
    milestones: [
      { year: '1976', text: { en: 'Scores the first continental goal in the club\'s history.', ar: 'يسجل أول هدف قاري في تاريخ النادي.' } },
      { year: '1986', text: { en: 'Winner of the Africa Cup of Nations with Egypt.', ar: 'بطل كأس الأمم الأفريقية مع مصر.' } },
      { year: '1987', text: { en: 'Retires days after the Champions Cup final win over Al-Hilal.', ar: 'يعتزل بعد أيام من الفوز على الهلال في نهائي دوري الأبطال.' } },
      { year: '2017', text: { en: 'Elected 18th president of Al Ahly.', ar: 'ينتخب الرئيس الثامن عشر للأهلي.' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Mahmoud_El_Khatib', 'https://en.wikipedia.org/wiki/Al_Ahly_SC']
  },
  {
    id: 'manuel-jose', look: 'coach', tone: 'gold',
    name: { en: 'Manuel José', ar: 'مانويل جوزيه' },
    role: { en: 'Portuguese head coach, 2001 – 2012', ar: 'المدرب البرتغالي، ٢٠٠١ – ٢٠١٢' },
    lifespan: { en: 'Born 9 April 1946', ar: 'مواليد ٩ أبريل ١٩٤٦' },
    epithet: { en: 'The most successful coach in Champions League history, at the time', ar: 'أنجح مدرب في تاريخ دوري الأبطال في وقته' },
    philosophy: {
      en: 'Winning is a habit and it must be built on discipline and belief. He took a group of gifted players and taught them to expect finals.',
      ar: 'الفوز عادة، ويجب أن تُبنى على الانضباط والإيمان. أخذ مجموعة من اللاعبين الموهوبين وعلّمهم أن يتوقعوا النهائيات.'
    },
    impact: {
      en: 'The first Portuguese coach in the club\'s history. In his first match, a friendly in August 2001, Al Ahly beat Real Madrid 1–0 in Cairo, and the team went on to win the 2001 Champions League and a 6–1 league win against Zamalek. He returned in 2003, took the team to four consecutive continental finals (2005 to 2008), won all but the 2007 one, and in 2006 brought the club its first Club World Cup podium. He was sacked in 2002 despite the fans\' protests and returned to a welcome of around 3,000 supporters at Cairo airport in January 2011.',
      ar: 'أول مدرب برتغالي في تاريخ النادي. في أول مباراة له، ودية في أغسطس ٢٠٠١، هزم الأهلي ريال مدريد ١–٠ في القاهرة، ثم فاز الفريق بدوري الأبطال ٢٠٠١ وبالدوري على الزمالك ٦–١. عاد عام ٢٠٠٣ وقاد الفريق إلى أربعة نهائيات قارية متتالية (٢٠٠٥ إلى ٢٠٠٨) وفاز بها جميعاً عدا نهائي ٢٠٠٧، وفي ٢٠٠٦ حقق للنادي أول منصة في كأس العالم للأندية. أقيل في ٢٠٠٢ رغم اعتراض الجماهير، وعاد في يناير ٢٠١١ ليستقبله نحو ٣٠٠٠ مشجع في مطار القاهرة.'
    },
    milestones: [
      { year: '2001', text: { en: 'First Portuguese coach of Al Ahly; wins the African Champions League.', ar: 'أول مدرب برتغالي للأهلي ويفوز بدوري أبطال أفريقيا.' } },
      { year: '2005', text: { en: 'League champion with a 31-point margin and a continental title.', ar: 'بطل الدوري بفارق ٣١ نقطة وبطل أفريقيا.' } },
      { year: '2006', text: { en: 'Domestic and African quadruple and Club World Cup bronze.', ar: 'رباعية محلية وأفريقية وبرونزية كأس العالم للأندية.' } },
      { year: '2008', text: { en: 'Fourth Champions League title as a coach.', ar: 'اللقب الرابع له في دوري الأبطال كمدرب.' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Manuel_Jos%C3%A9', 'https://en.wikipedia.org/wiki/Al_Ahly_SC']
  }
];
