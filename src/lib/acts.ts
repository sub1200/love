
export type ActCategory = "vaginal" | "anal" | "tasting" | "position";

export interface Act {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: ActCategory;
  timer?: number; // in seconds
  image?: string;
}

export const initialActs: Act[] = [
  {
    id: "pos-001",
    titleAr: "وضع الهمس",
    titleEn: "Whisper Position",
    descriptionAr: "أحد الشريكين يهمس في أذن الآخر بأكثر الأفكار إثارة التي تخطر بباله بينما يكونان في وضع حميمي قريب.",
    descriptionEn: "One partner whispers their most exciting thoughts into the other's ear while in a close, intimate position.",
    category: "position",
    timer: 300,
    image: "https://picsum.photos/seed/pos-001/600/400"
  },
  {
    id: "vag-001",
    titleAr: "الإيقاع المتغير",
    titleEn: "Variable Rhythm",
    descriptionAr: "خلال الإيلاج، يتم تغيير الإيقاع بشكل مستمر من بطيء وعميق إلى سريع وسطحي.",
    descriptionEn: "During penetration, constantly change the rhythm from slow and deep to fast and shallow.",
    category: "vaginal",
    timer: 600,
  },
  {
    id: "tas-001",
    titleAr: "قبلة بنكهة",
    titleEn: "Flavored Kiss",
    descriptionAr: "يأكل كل شريك قطعة من فاكهة مختلفة، ثم يتبادلان قبلة طويلة وعاطفية لمزج النكهات.",
    descriptionEn: "Each partner eats a different piece of fruit, then they exchange a long, passionate kiss to mix the flavors.",
    category: "tasting",
    timer: 180,
  },
  {
    id: "pos-002",
    titleAr: "نظرة العيون",
    titleEn: "Eye Contact",
    descriptionAr: "حافظا على تواصل بصري عميق لمدة دقيقتين كاملتين دون انقطاع.",
    descriptionEn: "Maintain deep eye contact for two full minutes without interruption.",
    category: "position",
    timer: 120,
    image: "https://picsum.photos/seed/pos-002/600/400"
  },
  {
    id: "anal-001",
    titleAr: "الاستكشاف اللطيف",
    titleEn: "Gentle Exploration",
    descriptionAr: "باستخدام الكثير من المزلقات، يقوم الرجل باستكشاف شريكته بلطف، مع التركيز على التواصل والراحة.",
    descriptionEn: "Using plenty of lubricant, the partner gently explores, focusing on communication and comfort.",
    category: "anal",
    timer: 480,
  }
];
