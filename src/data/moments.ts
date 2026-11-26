import { Moment } from './types';

const W = 'https://en.wikipedia.org/wiki/Al_Ahly_SC';

export const MOMENTS: Moment[] = [
  {
    id: 'm-1907', kind: 'moment', year: 1907, era: 'e1',
    title: { en: 'The Founding Meeting', ar: 'اجتماع التأسيس' },
    tag: { en: 'Origins', ar: 'البدايات' },
    story: {
      en: 'At 5:30 pm on 24 April 1907, at Alfred Mitchell-Innes\'s house in Giza, the first official board met: Idris Ragheb, Ismael Seri, Amin Sami, Omar Lotfy and the secretary Mohamed Sherif. Saad Zaghloul, then Minister of Education, became the first honorary president. The club opened its main building on 26 February 1909 and built its first football ground that year, nicknamed Al-Hawsh, "the courtyard".',
      ar: 'في الخامسة والنصف مساءً يوم ٢٤ أبريل ١٩٠٧، في بيت ألفريد ميتشل إينس بالجيزة، اجتمع أول مجلس إدارة رسمي: إدريس راغب وإسماعيل سري وأمين سامي وعمر لطفي والسكرتير محمد شريف. وأصبح سعد زغلول، وزير المعارف آنذاك، أول رئيس شرف. وافتتح النادي مبناه الرئيسي في ٢٦ فبراير ١٩٠٩ وأنشأ ملعبه الأول لكرة القدم في العام نفسه، وسماه الناس "الحوش".'
    },
    stats: [
      { label: { en: 'Date', ar: 'التاريخ' }, value: { en: '24 April 1907', ar: '٢٤ أبريل ١٩٠٧' } },
      { label: { en: 'Venue', ar: 'المكان' }, value: { en: 'Giza, home of Mitchell-Innes', ar: 'الجيزة، منزل ميتشل إينس' } },
      { label: { en: 'Clubhouse opened', ar: 'افتتاح المبنى' }, value: { en: '26 February 1909', ar: '٢٦ فبراير ١٩٠٩' } }
    ],
    sources: [W]
  },
  {
    id: 'l-hegazi', kind: 'legend', year: 1915, era: 'e1',
    title: { en: 'Hussein Hegazi and the 1915 Tour', ar: 'حسين حجازي وجولة ١٩١٥' },
    tag: { en: 'Legend', ar: 'أسطورة' },
    story: {
      en: 'In 1915 Al Ahly toured Alexandria, Port Said, Assiut and Ismailia to spread the game. Led by Hussein Hegazi, the team played several teams, including British army sides, and the matches increased the popularity of both the club and football.',
      ar: 'في ١٩١٥ جاب الأهلي الإسكندرية وبورسعيد وأسيوط والإسماعيلية لنشر اللعبة. قاد الفريق حسين حجازي ولعب أمام فرق عدة، منها فرق تابعة للجيش البريطاني، وزادت المباريات من شعبية النادي واللعبة معاً.'
    },
    stats: [
      { label: { en: 'Role', ar: 'الدور' }, value: { en: 'Team leader on tour', ar: 'قائد الفريق في الجولة' } },
      { label: { en: 'Cities', ar: 'المدن' }, value: { en: 'Alexandria, Port Said, Assiut, Ismailia', ar: 'الإسكندرية وبورسعيد وأسيوط والإسماعيلية' } }
    ],
    sources: [W]
  },
  {
    id: 'm-1923', kind: 'moment', year: 1923, era: 'e1',
    title: { en: 'The First Cup: Beating the Champion', ar: 'الكأس الأولى: الفوز على البطل' },
    tag: { en: 'First Trophy', ar: 'أول بطولة' },
    story: {
      en: 'Al Ahly had refused to play in the first Sultan Hussein Cup in 1917 because the field was British clubs. In 1918 it joined as a form of resistance. In 1923 it beat the defending champion Zamalek and lifted the cup. In 1924 the King Farouk Cup followed: 4–1 against El Sekka El Hadid, with two goals from Mokhtar El-Tetsh.',
      ar: 'رفض الأهلي المشاركة في أول نسخة من كأس السلطان حسين عام ١٩١٧ لأن المنافسة كانت بين أندية بريطانية. وفي ١٩١٨ شارك كنوع من المقاومة. وفي ١٩٢٣ هزم الزمالك حامل اللقب ورفع الكأس. وفي ١٩٢٤ تبعها كأس الملك فاروق: ٤–١ على السكة الحديد بهدفين لمختار التتش.'
    },
    stats: [
      { label: { en: 'Final victim', ar: 'الخصم' }, value: { en: 'Zamalek (1923)', ar: 'الزمالك (١٩٢٣)' } },
      { label: { en: '1924 final', ar: 'نهائي ١٩٢٤' }, value: { en: '4–1 vs El Sekka El Hadid', ar: '٤–١ على السكة الحديد' } },
      { label: { en: 'Sultan Hussein Cups', ar: 'ألقاب كأس السلطان حسين' }, value: { en: '7 by 1938', ar: '٧ حتى ١٩٣٨' } }
    ],
    sources: [W]
  },
  {
    id: 'l-tetsh', kind: 'legend', year: 1924, era: 'e1',
    title: { en: 'Mokhtar El-Tetsh', ar: 'مختار التتش' },
    tag: { en: 'Legend', ar: 'أسطورة' },
    story: {
      en: 'Man of the match in the 1924 King Farouk Cup final with two goals, and one of the club\'s early legends. Al Ahly\'s old stadium and the club\'s current training ground carry his name: Mokhtar El-Tetsh Stadium.',
      ar: 'أفضل لاعب في نهائي كأس الملك فاروق ١٩٢٤ بعد أن سجّل هدفين، وأحد أساطير النادي الأوائل. يحمل اسمه استاد النادي القديم وملعب التدريب الحالي: استاد مختار التتش.'
    },
    stats: [
      { label: { en: '1924 final', ar: 'نهائي ١٩٢٤' }, value: { en: '2 goals in a 4–1 win', ar: 'هدفان في فوز ٤–١' } },
      { label: { en: 'Namesake of', ar: 'يحمل اسمه' }, value: { en: 'Mokhtar El-Tetsh Stadium', ar: 'استاد مختار التتش' } }
    ],
    sources: [W]
  },
  {
    id: 'm-1948', kind: 'moment', year: 1948, era: 'e2',
    title: { en: 'The League Begins: 5–0', ar: 'بداية الدوري: ٥–٠' },
    tag: { en: 'League', ar: 'الدوري' },
    story: {
      en: 'In the first Egyptian Premier League season, Al Ahly won its first match 5–0 against Greek Alexandria. Ahmed Makkawi scored the club\'s first league goal on 11 minutes. In the following decade the team won nine league titles in a row, with Saleh Selim at its heart.',
      ar: 'في أول موسم للدوري المصري الممتاز فاز الأهلي في مباراته الأولى ٥–٠ على الجريكي السكندري. وسجّل أحمد مكاوي أول أهداف النادي في الدوري في الدقيقة ١١. وفي العقد التالي فاز الفريق بتسعة ألقاب دوري متتالية، وكان صالح سليم في قلبه.'
    },
    stats: [
      { label: { en: 'Score', ar: 'النتيجة' }, value: { en: '5–0', ar: '٥–٠' } },
      { label: { en: 'First goal', ar: 'أول هدف' }, value: { en: 'Ahmed Makkawi, 11\'', ar: 'أحمد مكاوي، د١١' } },
      { label: { en: 'Straight titles', ar: 'ألقاب متتالية' }, value: { en: '9 (1948–49 to 1958–59)', ar: '٩ (١٩٤٨–١٩٤٩ إلى ١٩٥٨–١٩٥٩)' } }
    ],
    sources: [W, 'https://en.wikipedia.org/wiki/Saleh_Selim']
  },
  {
    id: 'l-hidegkuti', kind: 'legend', year: 1973, era: 'e2',
    title: { en: 'Hidegkuti and "El Talamza"', ar: 'هيديكوتي و"التلامذة"' },
    tag: { en: 'Coach', ar: 'مدرب' },
    story: {
      en: 'After years of decline, the club signed the Hungarian coach Nándor Hidegkuti in September 1973 on a salary of less than 600 dollars. He built a new generation called El Talamza, "the students". The league returned in 1974–75, with 70 goals in 34 games, and again in 1975–76 and 1976–77.',
      ar: 'بعد سنوات من التراجع تعاقد النادي في سبتمبر ١٩٧٣ مع المدرب المجري ناندور هيديكوتي براتب أقل من ٦٠٠ دولار. بنى جيلاً جديداً عُرف باسم "التلامذة". وعاد الدوري في ١٩٧٤–١٩٧٥ بـ٧٠ هدفاً في ٣٤ مباراة، ثم في ١٩٧٥–١٩٧٦ و١٩٧٦–١٩٧٧.'
    },
    stats: [
      { label: { en: 'Signed', ar: 'التعاقد' }, value: { en: 'September 1973', ar: 'سبتمبر ١٩٧٣' } },
      { label: { en: '1974–75', ar: '١٩٧٤–١٩٧٥' }, value: { en: '70 goals in 34 league games', ar: '٧٠ هدفاً في ٣٤ مباراة' } }
    ],
    sources: [W]
  },
  {
    id: 'm-1977', kind: 'moment', year: 1977, era: 'e2',
    title: { en: 'Felling the European Champions', ar: 'إسقاط أبطال أوروبا' },
    tag: { en: 'Giants', ar: 'عمالقة' },
    story: {
      en: 'Four times Al Ahly has defeated a European champion: Benfica 3–2 in 1963, Bayern Munich 2–1 in 1977, Steaua București 3–0 in 1986 and Real Madrid 1–0 in a friendly in August 2001. The last one came in the first match of Manuel José.',
      ar: 'أربع مرات هزم الأهلي بطلاً لأوروبا: بنفيكا ٣–٢ عام ١٩٦٣، وبايرن ميونخ ٢–١ عام ١٩٧٧، وستيوا بوخارست ٣–٠ عام ١٩٨٦، وريال مدريد ١–٠ في مباراة ودية في أغسطس ٢٠٠١. وكانت الأخيرة في أول مباراة لمانويل جوزيه.'
    },
    stats: [
      { label: { en: '1963', ar: '١٩٦٣' }, value: { en: 'Benfica 2–3 Al Ahly', ar: 'بنفيكا ٢–٣ الأهلي' } },
      { label: { en: '1977', ar: '١٩٧٧' }, value: { en: 'Bayern 1–2 Al Ahly', ar: 'بايرن ١–٢ الأهلي' } },
      { label: { en: '1986', ar: '١٩٨٦' }, value: { en: 'Steaua 0–3 Al Ahly', ar: 'ستيوا ٠–٣ الأهلي' } },
      { label: { en: '2001', ar: '٢٠٠١' }, value: { en: 'Real Madrid 0–1 Al Ahly (friendly)', ar: 'ريال مدريد ٠–١ الأهلي (ودية)' } }
    ],
    sources: [W]
  },
  {
    id: 'l-khatib', kind: 'legend', year: 1976, era: 'e2',
    title: { en: 'Bibo: the First Continental Goal', ar: 'بيبو: أول هدف قاري' },
    tag: { en: 'Legend', ar: 'أسطورة' },
    story: {
      en: 'In 1976, in the club\'s first African Champions Cup campaign, Mahmoud El Khatib scored the first continental goal in Al Ahly\'s history. The team lost to MC Alger in the first round. Six years later it was champion of Africa.',
      ar: 'في ١٩٧٦، في أول مشاركة للأهلي في بطولة أفريقيا للأندية أبطال الدوري، سجّل محمود الخطيب أول هدف قاري في تاريخ النادي. خسر الفريق أمام مولودية الجزائر في الدور الأول. وبعد ست سنوات كان بطل أفريقيا.'
    },
    stats: [
      { label: { en: 'League goals', ar: 'أهداف الدوري' }, value: { en: '109 in 164 games', ar: '١٠٩ في ١٦٤ مباراة' } },
      { label: { en: 'Years at Al Ahly', ar: 'سنوات في الأهلي' }, value: { en: '1972 – 1988', ar: '١٩٧٢ – ١٩٨٨' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/Mahmoud_El_Khatib', W]
  },
  {
    id: 'm-1982', kind: 'moment', year: 1982, era: 'e3',
    title: { en: 'The First Star of Africa', ar: 'نجمة أفريقيا الأولى' },
    tag: { en: 'Continental', ar: 'قاري' },
    story: {
      en: 'The first African Champions Cup: 3–0 in Cairo against Asante Kotoko in front of 60,000, then a 1–1 in Kumasi with more than 70,000 in the stadium. Al Ahly lost the 1983 final to the same opponent.',
      ar: 'أول بطولة أفريقية للأهلي: ٣–٠ في القاهرة على أشانتي كوتوكو أمام ٦٠ ألف متفرج، ثم ١–١ في كوماسي بحضور أكثر من ٧٠ ألفاً. وخسر الأهلي نهائي ١٩٨٣ أمام الخصم نفسه.'
    },
    stats: [
      { label: { en: 'Aggregate', ar: 'المجموع' }, value: { en: '4–1', ar: '٤–١' } },
      { label: { en: 'Goals in the tournament', ar: 'أهداف البطولة' }, value: { en: '16 scored, 5 conceded', ar: '١٦ هدفاً، ٥ مستقبلة' } }
    ],
    sources: [W]
  },
  {
    id: 'm-1984', kind: 'moment', year: 1985, era: 'e3',
    title: { en: 'The Cup Winners\' Cup Hat-Trick', ar: 'ثلاثية كأس الكؤوس' },
    tag: { en: 'Continental', ar: 'قاري' },
    story: {
      en: 'Three African Cup Winners\' Cups in a row: 1984 (Canon Yaoundé, penalties after two 1–1 draws), 1985 (Leventis United, 2–1 on aggregate) and 1986 (AS Sogara, 3–2). In 1984–85 the club also won the league and the Egypt Cup.',
      ar: 'ثلاث كؤوس أفريقية متتالية في كأس الكؤوس: ١٩٨٤ (كانون ياوندي بركلات الترجيح بعد تعادلين ١–١)، و١٩٨٥ (ليفنتيس يونايتد ٢–١ مجموع المباراتين)، و١٩٨٦ (ساجارا ٣–٢). وفي ١٩٨٤–١٩٨٥ فاز النادي كذلك بالدوري وكأس مصر.'
    },
    stats: [
      { label: { en: 'Titles', ar: 'الألقاب' }, value: { en: '1984, 1985, 1986', ar: '١٩٨٤، ١٩٨٥، ١٩٨٦' } }
    ],
    sources: [W]
  },
  {
    id: 'm-1987', kind: 'moment', year: 1987, era: 'e3',
    title: { en: 'The Night Before a Farewell', ar: 'ليلة قبل الوداع' },
    tag: { en: 'Continental', ar: 'قاري' },
    story: {
      en: 'The 1987 Champions Cup final against Al-Hilal of Sudan: 0–0 in Khartoum in front of 50,000 Sudanese and 500 Egyptians, then 2–0 in Cairo in front of 80,000. Three days after the match, Mahmoud El Khatib announced his retirement after 17 years at the club.',
      ar: 'نهائي ١٩٨٧ أمام الهلال السوداني: ٠–٠ في الخرطوم بحضور ٥٠ ألف سوداني و٥٠٠ مصري، ثم ٢–٠ في القاهرة أمام ٨٠ ألف متفرج. وبعد ثلاثة أيام من المباراة أعلن محمود الخطيب اعتزاله بعد ١٧ عاماً في النادي.'
    },
    stats: [
      { label: { en: 'Aggregate', ar: 'المجموع' }, value: { en: '2–0', ar: '٢–٠' } },
      { label: { en: 'Cairo crowd', ar: 'جمهور القاهرة' }, value: { en: '80,000', ar: '٨٠ ألفاً' } }
    ],
    sources: [W]
  },
  {
    id: 'm-2001', kind: 'moment', year: 2001, era: 'e4',
    title: { en: 'Manuel José Arrives', ar: 'وصول مانويل جوزيه' },
    tag: { en: 'Continental', ar: 'قاري' },
    story: {
      en: 'In August 2001 Al Ahly beat Real Madrid 1–0 in a Cairo friendly in the first match of the Portuguese coach. That December the team won the African Champions League: 1–1 against Mamelodi Sundowns in Pretoria on 8 December, then 3–0 in Cairo on 21 December in front of 75,000.',
      ar: 'في أغسطس ٢٠٠١ هزم الأهلي ريال مدريد ١–٠ في مباراة ودية بالقاهرة في أول مباراة للمدرب البرتغالي. وفي ديسمبر من العام نفسه فاز الفريق بدوري أبطال أفريقيا: ١–١ أمام ماميلودي صنداونز في بريتوريا يوم ٨ ديسمبر ثم ٣–٠ في القاهرة يوم ٢١ ديسمبر أمام ٧٥ ألف متفرج.'
    },
    stats: [
      { label: { en: 'Final aggregate', ar: 'مجموع النهائي' }, value: { en: '4–1 vs Mamelodi Sundowns', ar: '٤–١ على ماميلودي صنداونز' } }
    ],
    sources: [W]
  },
  {
    id: 'm-2002', kind: 'moment', year: 2002, era: 'e4',
    title: { en: 'The Goalkeeper Who Scored, and 6–1', ar: 'الحارس الذي سجّل، و٦–١' },
    tag: { en: 'Derby and Super Cup', ar: 'القمة والسوبر' },
    story: {
      en: 'In the 2002 CAF Super Cup Al Ahly beat Kaizer Chiefs 4–1 in Cairo, and goalkeeper Essam El Hadary scored a goal that is still talked about. In the same season Manuel José\'s team beat the defending champion Zamalek 6–1 in the league, the biggest derby win recorded in the sources, yet he was sacked at the end of the year without a league title.',
      ar: 'في السوبر الأفريقي ٢٠٠٢ هزم الأهلي كايزر تشيفز ٤–١ في القاهرة وسجّل حارس المرمى عصام الحضري هدفاً لا يزال يُروى. وفي الموسم نفسه هزم فريق مانويل جوزيه الزمالك حامل اللقب ٦–١ في الدوري، ومع ذلك أُقيل المدرب في نهاية الموسم دون لقب الدوري.'
    },
    stats: [
      { label: { en: 'Super Cup', ar: 'السوبر' }, value: { en: '4–1 vs Kaizer Chiefs', ar: '٤–١ على كايزر تشيفز' } },
      { label: { en: 'League derby', ar: 'قمة الدوري' }, value: { en: '6–1 vs Zamalek', ar: '٦–١ على الزمالك' } }
    ],
    sources: [W, 'https://en.wikipedia.org/wiki/Manuel_Jos%C3%A9']
  },
  {
    id: 'm-2005', kind: 'moment', year: 2006, era: 'e4',
    title: { en: 'The Unbeaten Quadruple', ar: 'الرباعية دون هزيمة' },
    tag: { en: 'Generational Squad', ar: 'جيل ذهبي' },
    story: {
      en: 'In 2004–05 Al Ahly won its first 14 league games and finished 31 points ahead of Enppi. In 2005–06 the team won the league, the cup, the Egyptian Super Cup and the Champions League, and extended a record run without defeat. The sources cite 52 or 55 matches.',
      ar: 'في ٢٠٠٤–٢٠٠٥ فاز الأهلي في أول ١٤ مباراة بالدوري وأنهى الموسم متقدماً بـ٣١ نقطة على إنبي. وفي ٢٠٠٥–٢٠٠٦ جمع الفريق الدوري والكأس والسوبر المصري ودوري الأبطال، ومدّد رقماً قياسياً من المباريات دون هزيمة. وتذكر المصادر ٥٢ أو ٥٥ مباراة.'
    },
    stats: [
      { label: { en: 'Margin 2004–05', ar: 'فارق ٢٠٠٤–٢٠٠٥' }, value: { en: '31 points', ar: '٣١ نقطة' } },
      { label: { en: 'Unbeaten run', ar: 'سلسلة بلا هزيمة' }, value: { en: '52 to 55 matches (sources differ)', ar: '٥٢ إلى ٥٥ مباراة (تختلف المصادر)' } }
    ],
    sources: [W, 'https://en.wikipedia.org/wiki/Manuel_Jos%C3%A9']
  },
  {
    id: 'l-aboutrika', kind: 'legend', year: 2006, era: 'e4',
    title: { en: 'Aboutrika in Yokohama', ar: 'أبوتريكة في يوكوهاما' },
    tag: { en: 'Legend', ar: 'أسطورة' },
    story: {
      en: 'Mohamed Aboutrika was the top scorer of the 2006 Champions League with 8 goals, and on 17 December 2006 he was the star as Al Ahly beat Club América 2–1 in Yokohama to take third place at the Club World Cup.',
      ar: 'كان محمد أبوتريكة هداف دوري أبطال أفريقيا ٢٠٠٦ بثمانية أهداف، وفي ١٧ ديسمبر ٢٠٠٦ كان نجم المباراة حين فاز الأهلي على كلوب أمريكا ٢–١ في يوكوهاما ليحتل المركز الثالث في كأس العالم للأندية.'
    },
    stats: [
      { label: { en: 'Champions League 2006', ar: 'دوري الأبطال ٢٠٠٦' }, value: { en: 'Top scorer, 8 goals', ar: 'هداف البطولة، ٨ أهداف' } },
      { label: { en: 'Club World Cup 2006', ar: 'كأس العالم ٢٠٠٦' }, value: { en: '2–1 vs Club América', ar: '٢–١ على كلوب أمريكا' } }
    ],
    sources: ['https://web.archive.org/web/20141230042839/http:/www.fifa.com/tournaments/archive/clubworldcup/japan2006/news/newsid=108707/index.html', 'https://en.wikipedia.org/wiki/2006_CAF_Champions_League']
  },
  {
    id: 'm-2012', kind: 'moment', year: 2012, era: 'e4',
    title: { en: 'Port Said and the Seventh Star', ar: 'بورسعيد والنجمة السابعة' },
    tag: { en: 'Remembrance', ar: 'ذكرى' },
    story: {
      en: 'On 1 February 2012, 74 people died at the Port Said Stadium riot, including 72 Al Ahly fans. Football stopped. When it returned, Al Ahly won the Super Cup 2–1 in an empty stadium and later beat Espérance 3–2 on aggregate to be champion of Africa for the seventh time.',
      ar: 'في ١ فبراير ٢٠١٢ توفي ٧٤ شخصاً في أحداث استاد بورسعيد، بينهم ٧٢ من جماهير الأهلي. توقفت الكرة. وعندما عادت فاز الأهلي بالسوبر ٢–١ في ملعب خالٍ، ثم هزم الترجي ٣–٢ في المجموع ليصبح بطل أفريقيا للمرة السابعة.'
    },
    stats: [
      { label: { en: 'Fans lost', ar: 'الضحايا من الجماهير' }, value: { en: '72', ar: '٧٢' } },
      { label: { en: 'Final aggregate', ar: 'مجموع النهائي' }, value: { en: '3–2 vs Espérance', ar: '٣–٢ على الترجي' } }
    ],
    sources: [W]
  },
  {
    id: 'm-2013', kind: 'moment', year: 2013, era: 'e4',
    title: { en: 'Revenge on Orlando Pirates', ar: 'رد الاعتبار أمام أورلاندو بايرتس' },
    tag: { en: 'Continental', ar: 'قاري' },
    story: {
      en: 'Orlando Pirates had won 3–0 in Egypt in the group stage. In the final the teams drew 1–1 in Johannesburg on 2 November and Al Ahly won 2–0 in Cairo on 10 November for the eighth title.',
      ar: 'كان أورلاندو بايرتس قد فاز ٣–٠ في مصر في دور المجموعات. وفي النهائي تعادل الفريقان ١–١ في جوهانسبرج يوم ٢ نوفمبر وفاز الأهلي ٢–٠ في القاهرة يوم ١٠ نوفمبر ليحقق اللقب الثامن.'
    },
    stats: [{ label: { en: 'Aggregate', ar: 'المجموع' }, value: { en: '3–1', ar: '٣–١' } }],
    sources: ['https://en.wikipedia.org/wiki/2013_CAF_Champions_League_final']
  },
  {
    id: 'm-2020', kind: 'moment', year: 2020, era: 'e5',
    title: { en: 'The Derby Final in an Empty Stadium', ar: 'نهائي القمة في ملعب خالٍ' },
    tag: { en: 'Derby', ar: 'القمة' },
    story: {
      en: 'On 27 November 2020 Al Ahly beat Zamalek 2–1 at Cairo International Stadium with no fans, in the first Champions League final between two clubs from the same city. El Solia opened the scoring (5\'), Shikabala equalised (31\') and Mohamed Magdy "Afsha" scored the winner on 86 minutes.',
      ar: 'في ٢٧ نوفمبر ٢٠٢٠ هزم الأهلي الزمالك ٢–١ في استاد القاهرة الدولي بلا جمهور، في أول نهائي لدوري الأبطال بين ناديين من المدينة نفسها. افتتح السولية التسجيل (د٥) وعادل شيكابالا (د٣١) وسجّل محمد مجدي "أفشة" هدف الفوز في الدقيقة ٨٦.'
    },
    stats: [
      { label: { en: 'Attendance', ar: 'الحضور' }, value: { en: '0 (COVID-19)', ar: '٠ (كوفيد-١٩)' } },
      { label: { en: 'Man of the match', ar: 'أفضل لاعب' }, value: { en: 'Mohamed Magdy "Afsha"', ar: 'محمد مجدي "أفشة"' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/2020_CAF_Champions_League_final']
  },
  {
    id: 'l-shenawy', kind: 'legend', year: 2021, era: 'e5',
    title: { en: 'El Shenawy Saves Felipe Melo', ar: 'الشناوي يتصدى لفيليبي ميلو' },
    tag: { en: 'Legend', ar: 'أسطورة' },
    story: {
      en: 'On 11 February 2021 in Doha, captain and goalkeeper Mohamed El Shenawy saved Felipe Melo\'s penalty as Al Ahly beat Palmeiras 3–2 on penalties after a 0–0 draw to win a second Club World Cup bronze medal.',
      ar: 'في ١١ فبراير ٢٠٢١ في الدوحة تصدى قائد الفريق وحارس مرماه محمد الشناوي لركلة فيليبي ميلو، وفاز الأهلي على بالميراس ٣–٢ بالترجيح بعد التعادل ٠–٠ ليحصل على الميدالية البرونزية الثانية في كأس العالم للأندية.'
    },
    stats: [
      { label: { en: 'Venue', ar: 'الملعب' }, value: { en: 'Education City Stadium, Doha', ar: 'استاد المدينة التعليمية، الدوحة' } },
      { label: { en: 'Result', ar: 'النتيجة' }, value: { en: '0–0, 3–2 on penalties', ar: '٠–٠، ٣–٢ بالترجيح' } }
    ],
    sources: ['https://www.bbc.com/sport/africa/56033530', 'https://www.alahlyegypt.com/en/news/article/al-ahly-become-first-arab-and-african-club-to-reach-the-club-world-cup-podium-on-two-occasions']
  },
  {
    id: 'm-2021', kind: 'moment', year: 2021, era: 'e5',
    title: { en: 'Casablanca: 3–0 vs Kaizer Chiefs', ar: 'الدار البيضاء: ٣–٠ على كايزر تشيفز' },
    tag: { en: 'Continental', ar: 'قاري' },
    story: {
      en: 'On 17 July 2021 in Morocco, Al Ahly beat Kaizer Chiefs 3–0 to win the tenth Champions League title and its 23rd continental trophy.',
      ar: 'في ١٧ يوليو ٢٠٢١ في المغرب هزم الأهلي كايزر تشيفز ٣–٠ ليحقق لقب دوري الأبطال العاشر وكأسه القارية الثالثة والعشرين.'
    },
    stats: [{ label: { en: 'Score', ar: 'النتيجة' }, value: { en: '3–0', ar: '٣–٠' } }, { label: { en: 'Continental titles', ar: 'الألقاب القارية' }, value: { en: '23rd', ar: 'الثالث والعشرون' } }],
    sources: [W]
  },
  {
    id: 'm-2023', kind: 'moment', year: 2023, era: 'e5',
    title: { en: 'Wydad Again, and Jeddah', ar: 'الوداد مرة أخرى، وجدة' },
    tag: { en: 'Continental and World', ar: 'قاري وعالمي' },
    story: {
      en: 'After losing the 2022 final to Wydad, Al Ahly met them again in 2023: 2–1 in Cairo on 4 June and 1–1 in Casablanca for the eleventh title. In December, in Jeddah, Yasser Ibrahim (19\') and Percy Tau (25\') put Al Ahly 2–0 up against Urawa, who came back to 2–2 before Al Ahly won 4–2 for the fourth bronze medal.',
      ar: 'بعد خسارة نهائي ٢٠٢٢ أمام الوداد، التقى الفريقان مجدداً في ٢٠٢٣: ٢–١ في القاهرة يوم ٤ يونيو و١–١ في الدار البيضاء ليحقق اللقب الحادي عشر. وفي ديسمبر في جدة تقدم الأهلي ٢–٠ على أوراوا بهدفي ياسر إبراهيم (د١٩) وبيرسي تاو (د٢٥)، ثم عادل أوراوا ليصبح ٢–٢ قبل أن يفوز الأهلي ٤–٢ ويحصد البرونزية الرابعة.'
    },
    stats: [
      { label: { en: 'Final 2023', ar: 'نهائي ٢٠٢٣' }, value: { en: '3–2 on aggregate', ar: '٣–٢ إجمالي' } },
      { label: { en: 'Jeddah, 22 Dec', ar: 'جدة، ٢٢ ديسمبر' }, value: { en: '4–2 vs Urawa', ar: '٤–٢ على أوراوا' } }
    ],
    sources: ['https://en.wikipedia.org/wiki/2023_CAF_Champions_League_final', 'https://www.reuters.com/sports/soccer/al-ahly-beat-urawa-red-diamonds-4-2-finish-third-club-world-cup-2023-12-22/']
  },
  {
    id: 'm-2024', kind: 'moment', year: 2024, era: 'e5',
    title: { en: 'The Twelfth', ar: 'اللقب الثاني عشر' },
    tag: { en: 'Record', ar: 'رقم قياسي' },
    story: {
      en: 'On 25 May 2024 Al Ahly beat Espérance 1–0 in Cairo after a 0–0 draw in Tunis on 18 May, to win a record twelfth Champions League title. CAF described it as the fourth time the club lifted the trophy in succession.',
      ar: 'في ٢٥ مايو ٢٠٢٤ هزم الأهلي الترجي ١–٠ في القاهرة بعد تعادل ٠–٠ في تونس يوم ١٨ مايو ليحقق لقبه الثاني عشر في دوري الأبطال، وهو رقم قياسي. ووصف الاتحاد الأفريقي ذلك بأنه رابع مرة يرفع فيها النادي الكأس تباعاً.'
    },
    stats: [{ label: { en: 'Aggregate', ar: 'المجموع' }, value: { en: '1–0', ar: '١–٠' } }, { label: { en: 'Titles', ar: 'الألقاب' }, value: { en: '12', ar: '١٢' } }],
    sources: ['https://www.cafonline.com/en/caf-champions-league/news/ahly-crowned-champions-of-africa-for-record-extending-12th-title/', 'https://www.guinnessworldrecords.com/world-records/89635-most-wins-of-the-caf-champions-league']
  }
];
