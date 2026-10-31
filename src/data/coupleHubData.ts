import type { DailyChallengeItem, GalleryPhotoItem, SharedGoalItem } from '../utils/trackerLogic';

export const COUPLE_HUB_CONFIG = {
  brand: 'Couple Hub',
  tagline: 'महिलाओं को संतुष्ट करने\u00A0\nके 356\u00A0सेक्स पोजीशन\u00A0🥵',
  heroDescription:
    'इस गाइड में शामिल हैं 365 रोमांटिक पोज़िशन, जिन्हें सरल भाषा और स्पष्ट चित्रों के साथ समझाया गया है। यह गाइड कपल्स को अपने रिश्ते में नई ऊर्जा, गहराई और कनेक्शन जोड़ने में मदद करती है — One new idea every day.',
  priceInr: 149,
  originalPriceInr: 1599,
  discountPercent: 91,
  checkoutUrl: 'https://superprofile.bio/vp/qYj4Bprs',
  supportEmail: 'learnhub400@gmail.com',
  socialProof: {
    happyReaders: 10000,
    rating: 4.9,
    satisfied: 98,
    purchasedToday: 327,
  },
};

export const ANNOUNCEMENT_ITEMS = [
  '❤️ Today Only ₹149',
  '🔒 100% Private Purchase',
  '📚 10,000+ Happy Couples',
  '⚡ Instant PDF Delivery',
  '💎 Limited Time Offer',
  '📱 Mobile Friendly',
  '💳 Secure Checkout',
  '📖 Hindi + Hinglish Edition',
  'Lifetime Access',
];

export const HERO_CHECKLIST = [
  'Secure Checkout',
  'Instant PDF Delivery',
  'Lifetime Access',
  'Read on Mobile, Tablet & Laptop',
];

export const CTA_BADGES = [
  'Secure Checkout',
  'Instant Delivery',
  'Lifetime Access',
];

export const EBOOK_PREVIEW_CARDS = [
  {
    id: 'preview-1',
    src: '/assets/preview-1.png',
    label: 'Chapter Preview',
    chapterTitle: 'Chapter 1: Romantic Foundations & Intimate Comfort',
    hindiDesc: 'शुरुआती कपल्स के लिए सबसे आरामदायक और गहरा भावनात्मक जुड़ाव बनाने वाले स्टेप्स।',
    pages: 'Pages 12–48 · Illustrated Step-by-Step',
  },
  {
    id: 'preview-2',
    src: '/assets/preview-2.png',
    label: 'Chapter Preview',
    chapterTitle: 'Chapter 2: Deep Connection & Eye-Contact Positions',
    hindiDesc: 'एक-दूसरे के करीब आने और विश्वास बढ़ाने के लिए खास रोमांटिक पोज़िशन।',
    pages: 'Pages 49–104 · Hindi + Hinglish Guide',
  },
  {
    id: 'preview-3',
    src: '/assets/preview-3.jpg',
    label: 'Chapter Preview',
    chapterTitle: 'Chapter 3: Last Longer & Complete Satisfaction',
    hindiDesc: 'परफॉरमेंस और स्टैमिना बढ़ाने वाली प्रैक्टिकल पोज़िशन और टिप्स।',
    pages: 'Pages 105–176 · Performance & Pacing',
  },
  {
    id: 'preview-4',
    src: '/assets/preview-4.jpg',
    label: 'Chapter Preview',
    chapterTitle: 'Chapter 4: Breaking the Routine — Fresh Nightly Ideas',
    hindiDesc: 'रोज़ की बोरियत खत्म करने और रिश्ते में शुरुआती दिनों जैसा स्पार्क लाने के तरीके।',
    pages: 'Pages 177–250 · Daily Variety',
  },
  {
    id: 'preview-5',
    src: '/assets/preview-1.png',
    label: 'Chapter Preview',
    chapterTitle: 'Chapter 5: The 23 Wild Bucket List Positions',
    hindiDesc: 'एडवेंचरस कपल्स के लिए 23 बिल्कुल नए और रोमांचक अनुभव।',
    pages: 'Pages 251–312 · Wild Bucket List',
  },
  {
    id: 'preview-6',
    src: '/assets/preview-2.png',
    label: 'Chapter Preview',
    chapterTitle: 'Chapter 6: Communication, Foreplay & Aftercare',
    hindiDesc: 'बिना झिझक अपनी बात कहने और पार्टनर को पूरी तरह संतुष्ट करने की कला।',
    pages: 'Pages 313–365 · Complete Mastery',
  },
];

export const PROBLEM_QUESTIONS = [
  'क्या आप रोज़ वही एक जैसे स्टेप्स दोहरा रहे हैं?',
  'क्या शुरुआती दिनों वाली एक्साइटमेंट अब नहीं रही?',
  'क्या आपको कुछ नया ट्राय करने का आइडिया ही नहीं आ रहा?',
  'क्या आप दोनों कुछ नया ट्राय करना चाहते हैं, लेकिन एक-दूसरे से कह नहीं पा रहे?',
];

export const WHATS_INSIDE_ITEMS = [
  '365 S*X positions — romantic & Positions har ek ke saath illustrations aur step-by-step guide',
  'Last longer, satisfy fully — positions jo actually performance improve karti hai',
  '23 new positions — the real wild bucket list',
  'Hindi + English — Fast delivery, lifetime access. Aaj raat se hi shuru karo',
];

export const WHO_SHOULD_READ = [
  {
    emoji: '👩‍❤️‍👨',
    title: 'Couples',
    lines: [
      'उन लोगों के लिए जो अपने रिश्ते को और गहरा बनाना चाहते हैं और अपनी personal life में नया excitement लाना चाहते हैं।',
      'चाहे आप शादीशुदा हों या relationship में — यह गाइड दोनों के लिए उपयोगी है।',
    ],
  },
  {
    emoji: '👩‍❤️‍👨',
    title: 'Long-Term Couples',
    lines: [
      'अगर कई सालों से एक ही routine चल रहा है और आपको लगता है कि spark पहले जैसा नहीं रहा — यह गाइड आपको नई ideas, fresh energy और बेहतर connection बनाने में मदद करेगी।',
    ],
  },
  {
    emoji: '🌱',
    title: 'Individuals',
    lines: [
      'उन लोगों के लिए जो अपने relationship confidence, self-awareness और personal growth पर काम करना चाहते हैं।',
      'यह सिर्फ couples के लिए नहीं, बल्कि खुद को बेहतर समझने के लिए भी है।',
    ],
  },
  {
    emoji: '❤️',
    title: 'Anyone Facing Personal Challenges',
    lines: [
      'अगर आपके रिश्ते में closeness, communication या comfort से जुड़ी कोई challenge है — यह गाइड practical tips और simple suggestions के साथ आपकी मदद करने के लिए बनाई गई है।',
    ],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    emoji: '💳',
    title: 'Payment Karo',
    desc: 'UPI, Paytm, GPay ya Debit/Credit Card se 100% Secure Payment karo.',
  },
  {
    emoji: '📧',
    title: 'Email Check Karo',
    desc: 'Payment successful hote hi download link turant aapki email par aa jayega.',
  },
  {
    emoji: '📖',
    title: 'PDF Download & Read Karo',
    desc: 'Download link open karo aur apni marzi se Hindi ya English mein eBook padhna shuru karo.',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Deepak K.',
    location: 'Pune, Maharashtra',
    date: '',
    initials: 'DK',
    review:
      '365 Positions wali ebook amazing hai! Humne kuch hi try ki aur intimacy ekdum next level ho gayi. Illustrations se samajhna bahut asan tha. 10/10 recommend!',
  },
  {
    name: 'Rahul Mohan',
    location: 'Patna, Bihar',
    date: '',
    initials: 'RM',
    review:
      'pehle leni chahiye thi yeh 365 Positions bhut behtar hai. Kuch positions bilkul naye hain. Yeh ebook Best ones me se h, life set hai!',
  },
  {
    name: 'Seema K.',
    location: 'Indore, MP',
    date: '',
    initials: 'SK',
    review:
      'हमें लग रहा था अब कुछ नया नहीं बचा। फिर यह ebook लिया — सच में 365 Position ebook में से बहुत सारी positions तो हमने कभी सोची भी नहीं थीं। Hindi में होना बहुत plus point है।',
  },
  {
    name: 'Priya Sharma',
    location: 'Lucknow',
    date: '',
    initials: 'PS',
    review:
      'Mere husband pehle sirf 2-3 positions jaante the. Then yeh 365 Positions ebook li — ab seriously shocked hoon ki itna kuch possible hai. Kuch Position toh absolutely mind-blowing hai. Highly recommend!',
  },
  {
    name: 'Vijay & Meena',
    location: 'Nagpur, UP',
    date: '',
    initials: 'VM',
    review:
      'Dono ne saath mein padha — yahi is ebook ki sach m kaam ki hai. 365 positions ne toh mind hi blow kar diya. Delivery bhi super fast thi.',
  },
  {
    name: 'Anand P.',
    location: 'North Delhi',
    date: '',
    initials: 'AP',
    review:
      'Jaldi khatam ho jaana — yeh problem thi mujhe. Is ebook ne actual positions bataye jo is cheez mein help karti hain. Koi false promises nahi — genuinely kaam karta hai. Wife ab zyada satisfied hai.',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Ebook कैसे मिलेगी?',
    a: 'Payment के तुरंत बाद आपको email और WhatsApp पर PDF download link मिल जाएगा।',
  },
  {
    q: 'क्या ये Hindi में है?',
    a: 'हाँ, ये ebook आसान Hindi और English (hinglish) दोनों में लिखी गई है।',
  },
  {
    q: 'क्या ये couples और singles दोनों के लिए है?',
    a: 'बिल्कुल! ये ebook couples, long-term partners और individuals — सबके लिए designed है।',
  },
  {
    q: 'Payment कैसे करें?',
    a: 'CashFree के through UPI, Card, NetBanking — कोई भी method use कर सकते हैं।',
  },
  {
    q: 'Mobile पर पढ़ सकते हैं?',
    a: 'हाँ, PDF किसी भी device — mobile, tablet या laptop — पर पढ़ सकते हैं।',
  },
  {
    q: 'क्या मुझे Lifetime Access मिलेगा?',
    a: 'बिल्कुल! एक बार purchase करने के बाद आपको Lifetime Access मिलेगा।',
  },
];

export const INITIAL_DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: 'pos-1',
    dayNumber: 1,
    title: 'The Lotus Embrace (कमल आलिंगन)',
    hindiSubtitle: 'आँखों में देखकर गहरा भावनात्मक और रोमांटिक कनेक्शन बनाने के लिए',
    category: 'Romantic',
    difficulty: 'Easy',
    tried: true,
    bookmarked: true,
    partnerRating: 5,
    sharedNote: 'Amazing eye contact and slow rhythm — felt super connected!',
    triedDate: '2026-10-20',
  },
  {
    id: 'pos-2',
    dayNumber: 2,
    title: 'Velvet Spoon (मखमली स्पर्श)',
    hindiSubtitle: 'देर रात या सुबह के समय आरामदायक और बिना थकान वाला रोमांटिक पोज़िशन',
    category: 'Romantic',
    difficulty: 'Easy',
    tried: true,
    bookmarked: false,
    partnerRating: 5,
    sharedNote: 'Very comfortable and intimate for Sunday morning.',
    triedDate: '2026-10-22',
  },
  {
    id: 'pos-3',
    dayNumber: 3,
    title: 'Elevated Butterfly (बटरफ्लाई आर्क)',
    hindiSubtitle: 'महिलाओं को पूर्ण संतुष्टि देने और लंबे समय तक टिकने के लिए खास गाइड',
    category: 'Confidence Boost',
    difficulty: 'Moderate',
    tried: true,
    bookmarked: true,
    partnerRating: 5,
    sharedNote: 'Just like the ebook promised — game changer for endurance!',
    triedDate: '2026-10-25',
  },
  {
    id: 'pos-4',
    dayNumber: 4,
    title: 'Soul Gazer (रूहानी नज़दीकियां)',
    hindiSubtitle: 'धीमी गति और गहरी सांसों के साथ रिश्ते में नया विश्वास जगाने के लिए',
    category: 'Deep Connection',
    difficulty: 'Easy',
    tried: false,
    bookmarked: true,
    partnerRating: 0,
    sharedNote: 'Planned for this Friday night.',
  },
  {
    id: 'pos-5',
    dayNumber: 5,
    title: 'Royal Throne (शाही सिंहासन — Bucket List #1)',
    hindiSubtitle: '23 Wild Bucket List में से एक — रोमांच और नई ऊर्जा के लिए',
    category: 'Wild Bucket List',
    difficulty: 'Adventurous',
    tried: false,
    bookmarked: true,
    partnerRating: 0,
    sharedNote: 'On our weekend getaway bucket list!',
  },
  {
    id: 'pos-6',
    dayNumber: 6,
    title: 'Pacing Mastery (स्टैमिना कंट्रोल पोज़िशन)',
    hindiSubtitle: 'जल्दी थकने की समस्या से छुटकारा और पार्टनर को दोगुना आनंद',
    category: 'Confidence Boost',
    difficulty: 'Moderate',
    tried: false,
    bookmarked: false,
    partnerRating: 0,
    sharedNote: '',
  },
  {
    id: 'pos-7',
    dayNumber: 7,
    title: 'Moonlight Tangled Arch (चांदनी आर्क)',
    hindiSubtitle: 'लंबे समय से साथ रह रहे कपल्स के लिए रूटीन तोड़ने वाला नया अनुभव',
    category: 'Deep Connection',
    difficulty: 'Moderate',
    tried: false,
    bookmarked: false,
    partnerRating: 0,
    sharedNote: '',
  },
  {
    id: 'pos-8',
    dayNumber: 8,
    title: 'Wild Cliff Edge (बकेट लिस्ट #2 — रोमांचक मोड़)',
    hindiSubtitle: '23 न्यू पोज़िशन सीरीज़ का सबसे लोकप्रिय और एक्साइटिंग स्टेप',
    category: 'Wild Bucket List',
    difficulty: 'Adventurous',
    tried: false,
    bookmarked: true,
    partnerRating: 0,
    sharedNote: '',
  },
];

export const INITIAL_SHARED_GOALS: SharedGoalItem[] = [
  {
    id: 'goal-1',
    title: 'Read Ebook Chapter 1 & Bookmark 5 Positions Together',
    category: 'Intimacy',
    assignedTo: 'Both',
    completed: true,
    targetDate: '2026-10-24',
  },
  {
    id: 'goal-2',
    title: 'No-Phone Romantic Candlelight Bedroom Setup',
    category: 'Date Night',
    assignedTo: 'Partner A',
    completed: true,
    targetDate: '2026-10-26',
  },
  {
    id: 'goal-3',
    title: '15-Minute Open Desires & Comfort Conversation',
    category: 'Communication',
    assignedTo: 'Both',
    completed: false,
    targetDate: '2026-11-02',
  },
  {
    id: 'goal-4',
    title: 'Complete First 7-Day "One New Idea Every Day" Streak',
    category: 'Milestone',
    assignedTo: 'Both',
    completed: false,
    targetDate: '2026-11-08',
  },
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'gal-1',
    src: '/assets/preview-1.png',
    title: 'Chapter 1 Preview — Romantic Intimacy',
    subtitle: 'रोमांटिक पोज़िशन और स्टेप-बाय-स्टेप चित्रण (Hindi + Hinglish)',
    category: 'Chapter Previews',
    date: 'Ebook Page 14',
    liked: true,
    isLockedPreview: true,
    chapterInfo: 'Includes full anatomical comfort tips, angle adjustments, and communication cues.',
  },
  {
    id: 'gal-2',
    src: '/assets/preview-2.png',
    title: 'Chapter 2 Preview — Deep Emotional Bond',
    subtitle: 'गहरा जुड़ाव और पार्टनर की संतुष्टि के लिए आसान गाइड',
    category: 'Chapter Previews',
    date: 'Ebook Page 52',
    liked: true,
    isLockedPreview: true,
    chapterInfo: 'Designed specifically for couples wanting to bring back early-relationship spark.',
  },
  {
    id: 'gal-3',
    src: '/assets/preview-3.jpg',
    title: 'Chapter 3 Preview — Stamina & Confidence',
    subtitle: 'Last longer, satisfy fully — परफॉरमेंस सुधारने वाली खास पोज़िशन',
    category: 'Chapter Previews',
    date: 'Ebook Page 118',
    liked: false,
    isLockedPreview: true,
    chapterInfo: 'Practical pacing techniques and low-strain angles that naturally extend intimacy.',
  },
  {
    id: 'gal-4',
    src: '/assets/preview-4.jpg',
    title: 'Chapter 4 Preview — The 23 Wild Bucket List',
    subtitle: '23 नए और रोमांचक अनुभव जो हर कपल को एक बार ज़रूर ट्राय करने चाहिए',
    category: 'Bucket List',
    date: 'Ebook Page 260',
    liked: true,
    isLockedPreview: true,
    chapterInfo: 'Step-by-step illustrated guide to adventurous bedroom and getaway ideas.',
  },
  {
    id: 'gal-5',
    src: '/assets/365.png',
    title: '365 Sex Poses — Complete Guide Cover Edition',
    subtitle: 'Stronger You. Happier Her. Better Together. (Hindi + English)',
    category: 'Romantic Ideas',
    date: '2026 Edition',
    liked: true,
    isLockedPreview: false,
    chapterInfo: 'Complete 365-day relationship & intimacy companion for Indian couples.',
  },
  {
    id: 'gal-6',
    src: '/assets/cta-bg.png',
    title: 'Classic Indian Romantic Art — Timeless Connection',
    subtitle: 'एक किताब, 365 नए अनुभव — हर दिन रिश्ते में नई ऊर्जा',
    category: 'Couple Memories',
    date: 'Featured Art',
    liked: false,
    isLockedPreview: false,
    chapterInfo: 'Inspired by classical Indian relationship artistry and mindful closeness.',
  },
];
