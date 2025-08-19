export type ActCategory = "vaginal" | "anal" | "tasting" | "position";

export interface Act {
  id: string;
  title: string;
  description: string;
  category: ActCategory;
  timer?: number; // in seconds
}

export const initialActs: Act[] = [
  {
    id: "pos-001",
    title: "وضع الهمس",
    description: "أحد الشريكين يهمس في أذن الآخر بأكثر الأفكار إثارة التي تخطر بباله بينما يكونان في وضع حميمي قريب. الهدف هو زيادة الإثارة من خلال الكلمات.",
    category: "position",
    timer: 300,
  },
  {
    id: "vag-001",
    title: "الإيقاع المتغير",
    description: "خلال الإيلاج المهبلي، يتم تغيير الإيقاع بشكل مستمر من بطيء وعميق إلى سريع وسطحي، مع التركيز على استكشاف ما يفضله الشريكان.",
    category: "vaginal",
    timer: 600,
  },
  {
    id: "tas-001",
    title: "قبلة بنكهة",
    description: "يأكل كل شريك قطعة من فاكهة مختلفة (مثل الفراولة أو الشوكولاتة)، ثم يتبادلان قبلة طويلة وعاطفية لمزج النكهات.",
    category: "tasting",
    timer: 180,
  },
  {
    id: "pos-002",
    title: "نظرة العيون",
    description: "في أي وضع، حافظا على تواصل بصري عميق لمدة دقيقتين كاملتين دون انقطاع. حاولوا التعبير عن مشاعركم من خلال أعينكم فقط.",
    category: "position",
    timer: 120,
  },
  {
    id: "vag-002",
    title: "التدليك الحسي",
    description: "قبل الإيلاج، يقوم أحد الشريكين بتدليك المنطقة الحساسة للشريك الآخر بزيت عطري لمدة 5 دقائق لزيادة الاسترخاء والإثارة.",
    category: "vaginal",
    timer: 300,
  },
  {
    id: "anal-001",
    title: "الاستكشاف اللطيف",
    description: "باستخدام الكثير من المزلقات، يقوم الشريك المستكشف باستخدام أصابعه بلطف لتدليك وتهيئة الشريك الآخر، مع التركيز على التواصل والراحة.",
    category: "anal",
    timer: 480,
  },
  {
    id: "tas-002",
    title: "تذوق الجسد",
    description: "باستخدام العسل أو الكريمة المخفوقة، يتم وضع نقاط صغيرة على أماكن مختلفة من جسد الشريك، ويقوم الشريك الآخر بتذوقها ببطء.",
    category: "tasting",
    timer: 600,
  },
  {
    id: "pos-003",
    title: "وضع الملعقة المتشابكة",
    description: "في وضع الملعقة، تشابكا بأيديكم وأرجلكم بأقصى قدر ممكن، مع التركيز على الشعور بالدفء والاتصال الجسدي الكامل.",
    category: "position",
    timer: 900,
  },
  { id: 'vag-003', title: 'مداعبة البظر بالفم', description: 'يقوم أحد الشريكين بمداعبة بظر الآخر بفمه لمدة 5 دقائق متواصلة.', category: 'vaginal', timer: 300 },
  { id: 'vag-004', title: 'استخدام الهزاز', description: 'استخدام الهزاز لتحفيز منطقة جي سبوت أثناء الإيلاج.', category: 'vaginal', timer: 600 },
  { id: 'vag-005', title: 'تحدي القذف السريع', description: 'محاولة الوصول إلى النشوة والقذف في أقل من 3 دقائق.', category: 'vaginal', timer: 180 },
  { id: 'vag-006', title: 'تأخير القذف', description: 'محاولة تأخير القذف لأطول فترة ممكنة، مع أخذ استراحات قصيرة.', category: 'vaginal', timer: 900 },
  { id: 'vag-007', title: 'القذف على الجسم', description: 'القذف على جزء من جسم الشريك (مثل الصدر أو البطن) ثم تدليكه.', category: 'vaginal' },
  { id: 'vag-008', title: 'القذف في الفم', description: 'القذف في فم الشريك مع التقبيل بعد ذلك.', category: 'vaginal' },
  { id: 'vag-009', title: 'وضعية 69', description: 'ممارسة الجنس الفموي المتبادل في وضعية 69.', category: 'vaginal', timer: 600 },
  { id: 'vag-010', title: 'القبلة الفرنسية العميقة', description: 'تبادل قبلة فرنسية عميقة وعاطفية لمدة دقيقتين كاملتين.', category: 'vaginal', timer: 120 },
  { id: 'vag-011', title: 'الهمس المثير', description: 'الهمس في أذن الشريك بكلمات وعبارات مثيرة أثناء المداعبة.', category: 'vaginal', timer: 300 },
  { id: 'vag-012', title: 'لعبة الأدوار', description: 'تمثيل سيناريو مثير (مثل الطبيب والمريض) لمدة 15 دقيقة.', category: 'vaginal', timer: 900 },
  { id: 'anal-002', title: 'التدليك الشرجي', description: 'تدليك المنطقة المحيطة بالشرج بزيت دافئ لمدة 5 دقائق.', category: 'anal', timer: 300 },
  { id: 'anal-003', title: 'استخدام الإصبع', description: 'إدخال إصبع واحد ببطء في فتحة الشرج مع الكثير من المزلقات.', category: 'anal', timer: 300 },
  { id: 'anal-004', title: 'استخدام إصبعين', description: 'بعد التعود، محاولة إدخال إصبعين بلطف.', category: 'anal', timer: 300 },
  { id: 'anal-005', title: 'تحفيز البروستاتا', description: 'للذكور، يقوم الشريك بتحفيز البروستاتا بلطف باستخدام الإصبع.', category: 'anal', timer: 480 },
  { id: 'anal-006', title: 'الإيلاج الشرجي البطيء', description: 'إيلاج القضيب ببطء شديد في فتحة الشرج مع التركيز على التواصل.', category: 'anal', timer: 600 },
  { id: 'anal-007', title: 'تغيير العمق', description: 'أثناء الإيلاج الشرجي، تغيير عمق الإيلاج من سطحي إلى عميق.', category: 'anal', timer: 600 },
  { id: 'anal-008', title: 'وضعية الملعقة للشرجي', description: 'تجربة الجنس الشرجي في وضعية الملعقة لراحة أكبر.', category: 'anal', timer: 900 },
  { id: 'anal-009', title: 'الجنس الفموي الشرجي (Anilingus)', description: 'يقوم أحد الشريكين بلعق فتحة شرج الآخر (مع مراعاة النظافة القصوى).', category: 'anal', timer: 300 },
  { id: 'anal-010', title: 'استخدام سدادة شرجية', description: 'ارتداء سدادة شرجية صغيرة أثناء ممارسة الجنس المهبلي لزيادة الإحساس.', category: 'anal' },
  { id: 'anal-011', title: 'القذف داخل الشرج', description: 'القذف داخل فتحة الشرج.', category: 'anal' },
  { id: 'tas-003', title: 'تذوق الإفرازات الأنثوية', description: 'تذوق الإفرازات المهبلية مباشرة من المصدر.', category: 'tasting', timer: 300 },
  { id: 'tas-004', title: 'تذوق السائل المنوي', description: 'تذوق السائل المنوي مباشرة بعد القذف.', category: 'tasting' },
  { id: 'tas-005', title: 'مزج النكهات', description: 'يقوم الشريكان بتذوق إفرازات بعضهما البعض في نفس الوقت.', category: 'tasting' },
  { id: 'tas-006', title: 'قبلة التذوق', description: 'بعد أن يتذوق أحد الشريكين، يقوم بنقل الطعم للآخر عبر قبلة عميقة.', category: 'tasting' },
  { id: 'tas-007', title: 'تذوق العرق', description: 'لعق وتذوق عرق الشريك من على رقبته أو صدره بعد مجهود.', category: 'tasting' },
  { id: 'tas-008', title: 'تذوق الطعام من على الجسد', description: 'وضع قطع صغيرة من الفاكهة أو الشوكولاتة على جسد الشريك وتناولها بفمك.', category: 'tasting', timer: 600 },
  { id: 'tas-009', title: 'التذوق معصوب العينين', description: 'يقوم أحد الشريكين بتذوق الآخر وهو معصوب العينين، ويحاول تخمين أي جزء من الجسد يتذوقه.', category: 'tasting', timer: 480 },
  { id: 'tas-010', title: 'كوكتيل الحب', description: 'مزج السائل المنوي مع قليل من العصير أو مشروب آخر (للمغامرين فقط).', category: 'tasting' },
  { id: 'tas-011', title: 'القذف على الطعام', description: 'القذف على قطعة حلوى أو فاكهة ثم تناولها معًا.', category: 'tasting' },
  { id: 'tas-012', title: 'تحدي البلع', description: 'تحدي بلع كمية القذف كاملة.', category: 'tasting' },
  { id: 'pos-004', title: 'وضعية الكرسي السحري', description: 'تجلس المرأة على حافة السرير أو الكرسي، ويقوم الرجل بالإيلاج من وضعية الوقوف أو الركوع.', category: 'position', timer: 600 },
  { id: 'pos-005', title: 'وضعية الفراشة', description: 'تستلقي المرأة على ظهرها مع رفع ساقيها على كتفي الرجل، مما يسمح بإيلاج عميق.', category: 'position', timer: 600 },
  { id: 'pos-006', title: 'وضعية عربة اليد', description: 'تمسك المرأة بساقي الرجل بينما هو في وضعية الدفع، وتقوم هي بالتحكم في الحركة.', category: 'position', timer: 480 },
  { id: 'pos-007', title: 'الوقوف', description: 'تجربة أوضاع جماع مختلفة أثناء الوقوف، مثل الاستناد إلى الحائط.', category: 'position', timer: 480 },
  { id: 'pos-008', title: 'وضعية اللوتس', description: 'يجلس الرجل متربعًا وتجلس المرأة في حضنه متجهة إليه، مع تشابك الأرجل.', category: 'position', timer: 900 },
  { id: 'pos-009', title: 'الاتحاد المقلوب', description: 'يستلقي الرجل على ظهره وتجلس المرأة فوقه ولكن بظهرها إليه.', category: 'position', timer: 600 },
  { id: 'pos-010', title: 'تغيير الأوضاع', description: 'تحدي تغيير وضعية الجماع كل دقيقتين.', category: 'position', timer: 600 },
  { id: 'pos-011', title: 'الجماع الصامت', description: 'محاولة ممارسة الجنس لدقائق دون إصدار أي صوت، والتركيز على لغة الجسد.', category: 'position', timer: 300 },
  { id: 'pos-012', title: 'السيطرة الكاملة', description: 'يأخذ أحد الشريكين السيطرة الكاملة على الحركة والسرعة لمدة 10 دقائق.', category: 'position', timer: 600 },
  { id: 'pos-013', title: 'الجماع البطيء جدًا', description: 'الحركة ببطء شديد والتركيز على كل إحساس لمدة 10 دقائق.', category: 'position', timer: 600 },
  {
    id: 'anal-012',
    title: 'مداعبة شرجية بالريشة',
    description: 'استخدام ريشة لدغدغة ومداعبة المنطقة حول الشرج لزيادة الحساسية.',
    category: 'anal',
    timer: 240
  },
  {
    id: 'anal-013',
    title: 'اللعب بالخرز الشرجي',
    description: 'إدخال خرز شرجي ببطء ثم سحبه ببطء عند الاقتراب من النشوة.',
    category: 'anal',
    timer: 600
  },
  {
    id: 'anal-014',
    title: 'تحدي درجة الحرارة',
    description: 'استخدام مزلق دافئ ثم بارد بالتبادل أثناء المداعبة الشرجية.',
    category: 'anal',
    timer: 300
  },
  {
    id: 'anal-015',
    title: 'إيلاج مزدوج (إذا أمكن)',
    description: 'إيلاج شرجي ومهبلي في نفس الوقت باستخدام الأصابع أو الألعاب.',
    category: 'anal',
    timer: 600
  },
  {
    id: 'anal-016',
    title: 'وضعية الكلب مع رفع الحوض',
    description: 'وضعية الكلب التقليدية مع وضع وسادة تحت حوض المتلقي لتسهيل الإيلاج الشرجي.',
    category: 'anal',
    timer: 600
  },
  {
    id: 'anal-017',
    title: 'الهمس الشرجي',
    description: 'أثناء الإيلاج الشرجي، يهمس الشريك الفاعل بكلمات مثيرة في أذن الشريك المتلقي.',
    category: 'anal',
    timer: 480
  },
  {
    id: 'anal-018',
    title: 'مساج البروستاتا بالهزاز',
    description: 'استخدام هزاز مخصص للبروستاتا أثناء المداعبة أو الجنس الفموي.',
    category: 'anal',
    timer: 480
  },
  {
    id: 'anal-019',
    title: 'التناوب بين الشرج والفم',
    description: 'يقوم الشريك بالتبديل بين لعق الشرج وممارسة الجنس الفموي على شريكه.',
    category: 'anal',
    timer: 600
  },
  {
    id: 'anal-020',
    title: 'القذف على الأرداف',
    description: 'بعد جلسة جنس شرجي، يتم القذف على أرداف الشريك وتدليكها.',
    category: 'anal'
  },
  {
    id: 'anal-021',
    title: 'العد التنازلي للإصبع',
    description: 'البدء بثلاثة أصابع (إذا كان مريحًا) ثم سحبها واحدًا تلو الآخر ببطء.',
    category: 'anal',
    timer: 300
  },
  {
    id: 'tasting-013',
    title: 'القذف في ملعقة',
    description: 'القذف في ملعقة وتقديمها للشريك ليتذوقها كأنها دواء.',
    category: 'tasting'
  },
  {
    id: 'tasting-014',
    title: 'القذف على الآيس كريم',
    description: 'إضافة السائل المنوي إلى كرة من الآيس كريم وتناولها معًا.',
    category: 'tasting'
  },
  {
    id: 'tasting-015',
    title: 'القذف مع عض الأذن',
    description: 'أثناء القذف في الفم، يقوم الشريك المتلقي بعض شحمة أذن الآخر بلطف.',
    category: 'tasting'
  },
  {
    id: 'tasting-016',
    title: 'تذوق الإفرازات من الأصابع',
    description: 'بعد مداعبة الشريكة، يقوم الشريك بلعق أصابعه وتذوق إفرازاتها.',
    category: 'tasting'
  },
  {
    id: 'tasting-017',
    title: 'حفظ السائل في الفم',
    description: 'الاحتفاظ بالسائل المنوي في الفم لأطول فترة ممكنة قبل بلعه أو بصقه.',
    category: 'tasting'
  },
  {
    id: 'tasting-018',
    title: 'تحدي عدم البلع',
    description: 'محاولة تذوق السائل المنوي دون بلعه لمدة 30 ثانية.',
    category: 'tasting'
  },
  {
    id: 'tasting-019',
    title: 'التذوق من على الشفاه',
    description: 'القذف على شفاه الشريك وتركه يلعقها ببطء.',
    category: 'tasting'
  },
  {
    id: 'tasting-020',
    title: 'التذوق بعد الرياضة',
    description: 'تجربة تذوق العرق أو الإفرازات بعد ممارسة الرياضة لملاحظة اختلاف الطعم.',
    category: 'tasting'
  },
  {
    id: 'tasting-021',
    title: 'وصف الطعم',
    description: 'بعد التذوق، يجب على الشريك وصف الطعم والملمس بالتفصيل.',
    category: 'tasting'
  },
  {
    id: 'tasting-022',
    title: 'القذف على المرآة',
    description: 'القذف على مرآة ثم يقوم الشريكان بلعقها معًا.',
    category: 'tasting'
  }
];
