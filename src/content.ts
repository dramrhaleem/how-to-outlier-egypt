import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  Binary,
  BookOpenCheck,
  CircleDollarSign,
  Code2,
  FileSearch,
  Languages,
  MessageSquareText,
  PenTool,
  Scale,
  ShieldCheck,
  UserSearch,
} from 'lucide-react'

export type SignalKind = 'official' | 'egypt' | 'varies' | 'mindset'

export interface GuideSource {
  label: string
  url: string
}

export interface TaskCard {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export interface JourneyStage {
  number: string
  phase: string
  title: string
  summary: string
  signal: SignalKind
  expected: string[]
  actions: string[]
  trouble: {
    title: string
    steps: string[]
  }
  sources: GuideSource[]
}

export interface RedLine {
  title: string
  description: string
  icon: LucideIcon
}

export interface FaqItem {
  question: string
  answer: string
  signal?: SignalKind
}

export const REFERRAL_URL =
  'https://app.outlier.ai/expert/referrals/link/3vZJHhByWtDrBMGAOQKdXnY96qU'

export const OFFICIAL_EGYPT_URL = 'https://outlier.ai/languages/ar-eg'

export const sources: Record<string, GuideSource> = {
  faq: { label: 'الأسئلة الرسمية', url: 'https://outlier.ai/faq' },
  egypt: { label: 'فرصة مصر الرسمية', url: OFFICIAL_EGYPT_URL },
  countries: {
    label: 'الدول المتاحة',
    url: 'https://outlier.ai/legal/flexible-working-guidelines',
  },
  identity: {
    label: 'التحقق من الهوية',
    url: 'https://tryoutlier.zendesk.com/hc/en-us/articles/34192026384283-Identity-verification-FAQ',
  },
  identityHelp: {
    label: 'حل مشاكل التحقق',
    url: 'https://tryoutlier.zendesk.com/hc/en-us/articles/34192932212763-Identity-verification-troubleshooting',
  },
  onboarding: {
    label: 'مراحل الانضمام الرسمية',
    url: 'https://outlier.ai/blog/your-first-steps-on-outlier-what-to-expect-from-onboarding',
  },
  emailHelp: {
    label: 'حل مشكلة رسائل البريد',
    url: 'https://tryoutlier.zendesk.com/hc/en-us/articles/47703983383323-Not-receiving-Outlier-Emails-Troubleshooting',
  },
  marketplace: {
    label: 'دليل Marketplace',
    url: 'https://outlier.ai/blog/your-expertise-your-choice-centering-the-contributor-experience-through-the-outlier-marketplace',
  },
  reviews: {
    label: 'كيف تتم المراجعة',
    url: 'https://outlier.ai/blog/what-it-takes-to-give-a-good-review',
  },
  audits: {
    label: 'فهم مراجعات الحساب',
    url: 'https://tryoutlier.zendesk.com/hc/en-us/articles/36709969357083-Understanding-audits',
  },
  support: {
    label: 'فتح طلب دعم',
    url: 'https://tryoutlier.zendesk.com/hc/en-us/requests/new',
  },
  guidelines: {
    label: 'قواعد المجتمع',
    url: 'https://outlier.ai/legal/community-guidelines',
  },
  terms: { label: 'شروط الاستخدام', url: 'https://outlier.ai/legal/terms-of-use' },
  playground: {
    label: 'دليل Playground',
    url: 'https://outlier.ai/blog/introducing-playground',
  },
  availability: {
    label: 'توفر المشاريع',
    url: 'https://outlier.ai/blog/is-outlier-ai-legit',
  },
  community: {
    label: 'دعم الخبراء',
    url: 'https://outlier.ai/blog/so-what-do-outlier-experts-actually-do',
  },
  airtm: {
    label: 'طرق السحب في Airtm',
    url: 'https://help.airtm.com/en/support/solutions/articles/47001185126-how-to-add-payment-methods-to-add-and-withdraw-funds',
  },
}

export const tasks: TaskCard[] = [
  {
    number: '01',
    title: 'قيّم ورتّب الإجابات',
    description: 'تقارن بين ردود النماذج وتحدد الأدق والأوضح والأكثر التزامًا بالمطلوب.',
    icon: Scale,
  },
  {
    number: '02',
    title: 'اكتب Prompts قوية',
    description: 'تصمم أسئلة تختبر التفكير، لا أسئلة محفوظة يستطيع أي نموذج تجاوزها بسهولة.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'تحقق من الحقائق',
    description: 'تبحث وتفصل بين معلومة تبدو مقنعة ومعلومة صحيحة فعلًا.',
    icon: FileSearch,
  },
  {
    number: '04',
    title: 'راجع الكود',
    description: 'للمبرمجين: تختبر الحل وتكتشف الأخطاء وتشرح لماذا الحل يعمل أو يفشل.',
    icon: Code2,
  },
  {
    number: '05',
    title: 'حسّن اللغة والأسلوب',
    description: 'تراجع العربية أو الإنجليزية من حيث الطبيعية والدقة والسياق الثقافي.',
    icon: Languages,
  },
  {
    number: '06',
    title: 'ابنِ Rubrics',
    description: 'تحول المطلوب إلى معايير واضحة يمكن استخدامها للحكم على جودة الإجابة.',
    icon: BookOpenCheck,
  },
]

export const journeyStages: JourneyStage[] = [
  {
    number: '01',
    phase: 'رابط الإحالة',
    title: 'اقبل الدعوة الصحيحة',
    summary: 'الرابط الحالي صالح عند آخر فحص، ويفتح دعوة إلى مشروع محدد قبل أن ينقلك إلى إنشاء الحساب.',
    signal: 'official',
    expected: [
      'رسالة “You’re invited to join a project on Outlier!” واسم صاحب الإحالة.',
      'شرح مختصر: التسجيل، اجتياز Skill Screenings، ثم العمل على المشروع.',
      'الشرط الظاهر حاليًا: إكمال 3 tasks خلال 30 days، ثم زر Accept Invitation.',
    ],
    actions: [
      'تأكد أن العنوان يبدأ بـ app.outlier.ai قبل الضغط.',
      'اقرأ شرط الإحالة، ثم اضغط Accept Invitation مرة واحدة.',
      'لو عندك حساب قديم، سجّل دخوله؛ لا تنشئ حسابًا ثانيًا.',
    ],
    trouble: {
      title: 'ظهرت “invalid or expired” أو دار الرابط في حلقة؟',
      steps: [
        'جرّبه في نافذة عادية بمتصفح محدث، من غير VPN أو Private Relay.',
        'لو استمر الخطأ، استخدم فرصة مصر الرسمية أو اطلب رابط إحالة جديدًا.',
        'لا تحاول حل المشكلة بإنشاء حساب آخر؛ الحساب المكرر أخطر من ضياع الإحالة.',
      ],
    },
    sources: [{ label: 'رابط الإحالة المفحوص', url: REFERRAL_URL }, sources.guidelines],
  },
  {
    number: '02',
    phase: 'إنشاء الحساب',
    title: 'ثبّت هويتك الرقمية من أول مرة',
    summary: 'قد يختلف شكل التسجيل قليلًا، لكن المطلوب واحد: حساب واحد ببياناتك القانونية وبلد إقامتك الحقيقي.',
    signal: 'official',
    expected: [
      'صفحة Sign up أو Log in بعد قبول الدعوة.',
      'حقول البريد والهاتف والاسم وبلد الإقامة، وقد يصلك رمز أو رابط تأكيد.',
      'أسئلة أساسية عن الخبرة والتعليم قبل استكمال الملف.',
    ],
    actions: [
      'اكتب الاسم وتاريخ الميلاد والبلد كما هي في الهوية حرفيًا.',
      'استخدم بريدًا ورقم هاتف تملكه وتستطيع الرجوع إليهما.',
      'أوقف VPN، ولا تستخدم Incognito، واحفظ بيانات الدخول في مدير كلمات مرور.',
    ],
    trouble: {
      title: 'رسالة التأكيد لم تصل؟',
      steps: [
        'راجع Spam وPromotions وSocial وUpdates، وتأكد أن صندوق البريد غير ممتلئ.',
        'ابحث عن no-reply@outlier.ai وmango-users@outlier.ai وأضفهما للمرسلين الموثوقين.',
        'لو ما زالت غائبة، افتح طلب دعم واذكر البريد ووقت المحاولة من غير كلمة السر.',
      ],
    },
    sources: [sources.faq, sources.emailHelp],
  },
  {
    number: '03',
    phase: 'الملف والخبرة',
    title: 'ارفع CV يفتح لك المسار الصحيح',
    summary: 'Outlier تستخدم السيرة وLinkedIn والمهارات لفهم أين يمكن أن تناسبك، لا لمجرد ملء صفحة Profile.',
    signal: 'official',
    expected: [
      'رفع Resume وإضافة LinkedIn والتعليم والخبرة والتخصصات.',
      'اقتراح مهارات مستخرجة من سيرتك، وربما وسائل تحقق إضافية للتخصصات التقنية أو الأكاديمية.',
      'المرحلة تستغرق تقريبًا 10–15 دقيقة إذا كانت أوراقك جاهزة.',
    ],
    actions: [
      'ارفع CV حديثًا وواضحًا، وخلّي التواريخ والمسميات متسقة مع LinkedIn.',
      'اختر أقوى 5–10 مهارات لديك، ولا تتجاوز 10 لمجرد زيادة الاحتمالات.',
      'قدّم تخصصك الحقيقي: Arabic، Coding، STEM أو غيره؛ لأن الاختبار سيقيسه.',
    ],
    trouble: {
      title: 'السيرة لم تُقرأ جيدًا أو ظهرت مهارات خاطئة؟',
      steps: [
        'استخدم PDF نصيًا بسيطًا بلا أعمدة معقدة أو صور للنص.',
        'راجع الحقول المستخرجة وعدّل المتاح منها قبل الاستمرار.',
        'لو الشاشة معلقة، جرّب Chrome أو Firefox محدثًا بعد مسح Cache، ثم ارفع الملف مجددًا مرة واحدة.',
      ],
    },
    sources: [sources.onboarding, sources.faq],
  },
  {
    number: '04',
    phase: 'فحص المهارة',
    title: 'اثبت المهارة التي كتبتها',
    summary: 'قد ترى Skill Selection ثم Screening قصيرًا، وأحيانًا إجابات مكتوبة أو تسجيل Video Assessment حسب التخصص.',
    signal: 'varies',
    expected: [
      'أسئلة أو مواقف تقيس التخصص واللغة وطريقة التفكير.',
      'في بعض المسارات يظهر تقييم فيديو قصير؛ وفي مسارات أخرى لا يظهر بالشكل نفسه.',
      'التقدير الرسمي لهذه المرحلة نحو 15–30 دقيقة، لكنه ليس وعدًا لكل مسار.',
    ],
    actions: [
      'اقرأ تعليمات التسجيل والوقت والمحاولات قبل Start.',
      'اختبر بهدوء ومن مكان ثابت وإنترنت جيد، وأجب بنفسك فقط.',
      'لا تستخدم ChatGPT أو إضافة كتابة أو شخصًا آخر إلا لو التعليمات تسمح صراحةً.',
    ],
    trouble: {
      title: 'التقييم تجمّد أو أغلق قبل الإرسال؟',
      steps: [
        'لا تبدأ محاولات متزامنة في أكثر من Tab، ولا تنشئ حسابًا جديدًا.',
        'سجّل اسم الشاشة والوقت ونص الخطأ والمتصفح؛ لا تنسخ الأسئلة أو الإجابات خارج المنصة.',
        'افتح طلب دعم إذا لم يظهر زر Resume أو محاولة نظامية داخل الحساب.',
      ],
    },
    sources: [sources.onboarding, sources.guidelines],
  },
  {
    number: '05',
    phase: 'الهوية',
    title: 'أكمل Persona بالهاتف',
    summary: 'التحقق ليس رفع صورة محفوظة: ستلتقط الهوية الأصلية مباشرة، ثم تنفذ فحص الوجه وفق التعليمات.',
    signal: 'official',
    expected: [
      'QR code على الكمبيوتر تفتحه بهاتف أو Tablet؛ التحقق لا يكتمل مباشرة من الكمبيوتر.',
      'تصوير حي لهوية حكومية أصلية وسارية صادرة من بلد التسجيل.',
      'Selfie وحركات وجه مطلوبة. المتاح أثناء التسجيل إجمالًا جولتان للتحقق.',
    ],
    actions: [
      'استخدم شبكة منزلية خاصة وهاتفًا بكاميرا نظيفة وإضاءة بلا انعكاس.',
      'أظهر الوثيقة كاملة، وأزل النظارة أو ما يحجب الوجه عند الـ Selfie.',
      'استخدم نافذة عادية في أحدث Chrome أو Firefox واسمح للكاميرا.',
    ],
    trouble: {
      title: 'الـ QR أو الكاميرا أو التحقق فشل؟',
      steps: [
        'تأكد من إذن الكاميرا، وأوقف VPN وPrivate Relay وLockdown Mode على iPhone إن كان مفعّلًا.',
        'امسح Cache وCookies ثم أعد المحاولة الهادئة من هاتف أو Tablet.',
        'لا ترسل الهوية بالبريد؛ استخدم تطبيق التحقق الرسمي أو رابط دعم جديد خلال صلاحيته.',
      ],
    },
    sources: [sources.identity, sources.identityHelp],
  },
  {
    number: '06',
    phase: 'لوحة التحكم',
    title: 'وصلت… لكن المشروع قد لا يصل فورًا',
    summary: 'بعد الإعداد تظهر Dashboard، وقد ترى Marketplace أو Matching تلقائيًا. عدم وجود مشروع الآن ليس رسالة رفض بحد ذاته.',
    signal: 'varies',
    expected: [
      'أقسام للمشاريع أو الفرص، Metrics، Earnings، Profile والدعم؛ الأسماء والترتيب قد تتغير.',
      'Marketplace يعرض فرصًا تناسب مهاراتك الموثقة، لكنه ما زال يصل للحسابات على مراحل.',
      'قد تظهر دعوة المشروع المحال إليه، مشروع آخر مناسب، أو Queue فارغة مؤقتًا.',
    ],
    actions: [
      'أكمل Profile والمهارات وExpert Match إن ظهر، وراجع البريد واللوحة بانتظام معقول.',
      'لو ظهر Marketplace، اقرأ متطلبات المشروع قبل اختياره؛ ولو لم يظهر فلا يوجد زر سري لتفعيله.',
      'عامل Outlier كعمل مرن متغير، لا كراتب ينتظر في موعد ثابت.',
    ],
    trouble: {
      title: 'لا يوجد Marketplace أو المشروع اختفى؟',
      steps: [
        'راجع أن كل متطلبات الملف والتحقق مكتملة ولا توجد Action مطلوبة.',
        'اختفاء الفرصة قد يعني امتلاء السعة أو تغير طلب العميل، وليس بالضرورة مشكلة بالحساب.',
        'إن ظهرت رسالة خطأ أو تقييد صريح، استخدم الدعم؛ أما Queue الفارغة وحدها فانتظر Match مناسبًا.',
      ],
    },
    sources: [sources.marketplace, sources.availability],
  },
  {
    number: '07',
    phase: 'تأهيل المشروع',
    title: 'اعرف المشروع قبل أن تدخله',
    summary: 'كل مشروع له Onboarding مستقل: هدف، نوع مهام، Guidelines، سعر، وقد يطلب Course أو Quiz قبل التأهيل.',
    signal: 'varies',
    expected: [
      'بطاقة أو صفحة مشروع فيها وصف ومتطلبات، ثم Intro Course أو تعليمات وأمثلة.',
      'السعر أو Tasking rate يظهر قبل بدء العمل؛ وقد يختلف سعر التقييم أو التدريب حسب المشروع.',
      'قناة Community أو Office Hours أو QM قد تظهر كقناة دعم للمشروع.',
    ],
    actions: [
      'اقرأ السعر، طريقة الحساب، الوقت، لغة التبرير، والأدوات المسموحة قبل Start.',
      'احفظ ملاحظاتك عن الـ Guidelines داخل الحدود المسموحة، وراجع تاريخ النسخة عند كل تحديث.',
      'لا تفترض أن Course مدفوع أو مجاني؛ المكتوب في صفحة المشروع هو الحكم.',
    ],
    trouble: {
      title: 'المشروع اختفى أثناء الـ Onboarding أو تغيّر السعر؟',
      steps: [
        'ارجع إلى صفحة المشروع والـ Announcements؛ السعة والتعليمات قد تتغير بسرعة.',
        'لا تكمل عملًا لا يظهر له Rate أو Start رسمي واضح.',
        'اسأل في القناة المعتمدة للمشروع أو الدعم باسم المشروع واسم المرحلة، من غير نشر محتواه خارجيًا.',
      ],
    },
    sources: [sources.faq, sources.community],
  },
  {
    number: '08',
    phase: 'Qualification',
    title: 'الـ Assessment بوابة المشروع',
    summary: 'بعد قراءة التعليمات قد تنفذ Assessment Tasks أو Quiz. النجاح يؤهلك للمشروع، لكنه لا يضمن مخزون مهام دائمًا.',
    signal: 'varies',
    expected: [
      'أسئلة فهم للـ Guidelines أو مهام تجريبية تشبه العمل الحقيقي.',
      'قد تظهر نتيجة فورية، مراجعة لاحقة، أو انتقال مباشر إلى Tasking حسب المشروع.',
      'الفشل في مشروع لا يعني تلقائيًا إغلاق حساب Outlier كله، لكنه قد يغلق هذا المسار.',
    ],
    actions: [
      'افصل بين القاعدة العامة وتعليمات المشروع؛ الـ Guidelines الحالية تتقدم على أي نصيحة في هذا الدليل.',
      'قبل كل إجابة: حدّد المطلوب، طبّق الـ Rubric، ثم راجع اللغة والتبرير والإرسال.',
      'اعتبر أن 75% من نجاحك يبدأ من اتباع التعليمات؛ تقدير عملي لا إحصائية رسمية.',
    ],
    trouble: {
      title: 'ظهرت نتيجة غير مفهومة أو لم تتحدث الحالة؟',
      steps: [
        'انتظر حالة النظام المعلنة ولا تعِد الاختبار من مسار غير رسمي.',
        'لو المشكلة تقنية، أرسل اسم Course أو Assessment والوقت ونص الخطأ للدعم، لا أسئلته وإجاباتك.',
        'لو لم تتأهل، راجع Dashboard لمشروعات أخرى تناسب مهاراتك بدل إنشاء حساب بديل.',
      ],
    },
    sources: [sources.faq, sources.guidelines],
  },
  {
    number: '09',
    phase: 'أول Task',
    title: 'ابدأ ببطء… وسلّم مرة واحدة صح',
    summary: 'عند بدء Tasking ستتعامل مع واجهة المهمة نفسها، وقد يكون العمل داخل Outlier أو على منصة خارجية مرتبطة بالمشروع.',
    signal: 'varies',
    expected: [
      'تعليمات المهمة وحقول الإجابة أو التقييم والتبرير، وقد يظهر Timer أو وقت متوقع.',
      'زر Submit أو إنهاء جلسة؛ في بعض المشاريع الخارجية يوجد Start Session ثم Stop and Submit Hours.',
      'بعد الإرسال قد تظهر المهمة التالية، انتظار، أو انتهاء مؤقت للمخزون.',
    ],
    actions: [
      'قبل الكتابة راجع: المطلوب، الـ Rubric، لغة التبرير، الوقت، وسياسة الأدوات.',
      'لا تفتح Tabs أو إضافات تنقل محتوى المهمة، ولا تمد الوقت أو تسجله بصورة غير حقيقية.',
      'راجع إجابتك ضد كل معيار، ثم أرسل مرة واحدة وتأكد من ظهور تأكيد الإرسال.',
    ],
    trouble: {
      title: 'المهمة علّقت أو الـ Timer استمر؟',
      steps: [
        'اتبع تعليمات Timer الخاصة بمشروعك؛ لا تفترض أن غلق Tab يوقفه.',
        'سجّل Task ID إن كان مسموحًا، والوقت ونص الخطأ، وأوقف العمل إذا لم يعد التسجيل واضحًا.',
        'استخدم War Room أو قناة المشروع أو الدعم فورًا، ولا تنشر Screenshot للمهمة خارج القنوات المعتمدة.',
      ],
    },
    sources: [sources.guidelines, sources.support],
  },
  {
    number: '10',
    phase: 'QA وما بعده',
    title: 'اقرأ المراجعة كخريطة للمهمة التالية',
    summary: 'قد يراجع عملك Reviewer أو نظام جودة أو فريق المشروع، وتظهر Feedback أو Metrics بدرجات وتوقيتات تختلف بين المشاريع.',
    signal: 'varies',
    expected: [
      'Feedback مرتبطة بمعيار أو Rubric، وقد تظهر Quality Metrics في Dashboard.',
      'ليست كل نتيجة فورية، ولا يوجد رقم طرد عام موثوق يصلح لكل المشاريع.',
      'مراجعة الحساب Trust & Safety شيء مختلف عن QA المهمة، وقد تكون دورية أو عشوائية.',
    ],
    actions: [
      'اربط كل ملاحظة ببند محدد في الـ Guidelines، واكتب لنفسك خطأ واحدًا لن تكرره.',
      'في المهمة التالية طبّق التصحيح، ولا تكرر نفس النمط وأنت تنتظر أن يتغير التقييم.',
      'إذا كان الـ Feedback يخالف نصًا واضحًا، استخدم مسار الاعتراض أو قناة المشروع بأدلة هادئة.',
    ],
    trouble: {
      title: 'درجة ضعيفة، Feedback متعارضة، أو ظهر Account Audit؟',
      steps: [
        'في خلاف الجودة: اذكر Task ID وبند الـ Guideline وسبب التعارض، من غير هجوم على المراجع.',
        'في Audit: لا تغيّر بياناتك ولا تنشئ حسابًا جديدًا؛ استجب فقط لأي طلب رسمي وانتظر النتيجة.',
        'معظم عمليات التدقيق تنتهي بلا إجراء، لكن تفاصيلها الداخلية لا تكون متاحة للمستخدم.',
      ],
    },
    sources: [sources.reviews, sources.audits],
  },
]

export const redLines: RedLine[] = [
  {
    title: 'حساب واحد، هوية واحدة',
    description: 'لا تنشئ حسابًا بديلًا ولا تشارك بيانات الدخول مع أي شخص مهما كان السبب.',
    icon: BadgeCheck,
  },
  {
    title: 'لا تُخفِ موقعك',
    description: 'استخدام VPN لتغيير الدولة أو التحايل على التوفر قد يوقف الحساب.',
    icon: ShieldCheck,
  },
  {
    title: 'الأداة ليست بريئة دائمًا',
    description: 'لا تستخدم ChatGPT أو إضافة كتابة أو أتمتة إلا لو المشروع سمح بها صراحةً.',
    icon: Binary,
  },
  {
    title: 'المهمة تظل داخل المنصة',
    description: 'لا ترسل Screenshots أو تعليمات أو بيانات مشروع إلى مجموعات أو أدوات خارجية.',
    icon: FileSearch,
  },
  {
    title: 'الوقت مقابل عمل حقيقي',
    description: 'شغّل المؤقت عندما تعمل فعلًا، واتبع طريقة التتبع الخاصة بمشروعك.',
    icon: CircleDollarSign,
  },
  {
    title: 'لا تدّعي مهارة',
    description: 'اختيار تخصص لا تتقنه يضعك أمام اختبار لن يخدم ملفك ولا سمعتك.',
    icon: UserSearch,
  },
]

export const faqItems: FaqItem[] = [
  {
    question: 'هل التسجيل من مصر متاح فعلًا؟',
    answer: 'نعم. مصر موجودة حاليًا ضمن الدول المتاحة، وهناك فرصة رسمية للعربية المصرية. رابط الإحالة الموصى به ليس الطريق الوحيد، لكنه المسار الذي يقدمه هذا الدليل.',
    signal: 'official',
  },
  {
    question: 'كم يمكن أن أكسب في الساعة؟',
    answer: 'الفرص التي يراها الجمهور العام واللغوي والبرمجي تتحرك غالبًا داخل نطاق 7.5–50+ دولارًا، لكن السعر يتغير حسب التخصص والبلد والمشروع والمهمة. السعر الظاهر أمامك قبل العمل هو السعر الحقيقي الذي تعتمد عليه.',
    signal: 'varies',
  },
  {
    question: 'انتهيت من التسجيل ولوحة التحكم فارغة. هل رُفضت؟',
    answer: 'ليس بالضرورة. المشاريع مرتبطة باحتياج العملاء وقد تمر فترة بلا مهام مناسبة لملفك. راقب البريد والحساب، لكن لا تعتبر الانتظار وعدًا بأن مشروعًا سيظهر في موعد محدد.',
    signal: 'official',
  },
  {
    question: 'هل Justification لازم يكون بالإنجليزية؟',
    answer: 'في أغلب المشاريع التي يقابلها المستخدم تكون الإنجليزية هي المطلوبة، لكن Guidelines المشروع هي الحكم. قبل أول كلمة راجع اللغة والطول والصندوق المطلوب الكتابة فيه.',
    signal: 'varies',
  },
  {
    question: 'هل ينفع أستخدم ChatGPT أو Grammarly؟',
    answer: 'لا تستخدم أي أداة أو إضافة أو أتمتة داخل المهمة إلا إذا سمحت تعليمات المشروع صراحةً. حتى المساعدة الخارجية التي تبدو بسيطة قد تخالف السرية أو قواعد إنجاز المهمة بنفسك.',
    signal: 'official',
  },
  {
    question: 'هل شخصان في البيت نفسه يستطيعان التسجيل؟',
    answer: 'كل شخص حقيقي له حساب واحد وبياناته وهويته. احتياطًا لا يُفضّل إنشاء أو توثيق حسابين في الوقت نفسه من الجهاز أو الشبكة نفسها، لكن هذا لا يعني أن كل أسرة تستخدم شبكة واحدة ستُحظر تلقائيًا.',
    signal: 'egypt',
  },
  {
    question: 'متى تصل الدفعة في مصر؟',
    answer: 'المعالجة الرسمية يوم الثلاثاء، ومن واقع التجربة تصل عبر Airtm غالبًا صباح الأربعاء. قد يتغير الموعد بسبب العطلات أو المراجعة أو وسيلة الدفع، لذلك راقب حالة الدفعة داخل الحساب.',
    signal: 'egypt',
  },
  {
    question: 'هل الأرباح مضمونة إذا توقف الحساب؟',
    answer: 'قد تدخل المهام المكتملة والمقبولة في دفعة نهائية، لكن الشروط تسمح بتعليق أو رفض مبالغ أثناء التحقيق في مخالفة. الأفضل ألا تبني قرارك على ضمان غير موجود.',
    signal: 'official',
  },
]

export const signalLabels: Record<SignalKind, string> = {
  official: 'رسمي',
  egypt: 'من واقع التجربة في مصر',
  varies: 'يختلف حسب المشروع',
  mindset: 'قاعدة ذهنية',
}

export const peel = [
  { letter: 'P', term: 'Point', label: 'الحكم', text: 'ابدأ بالنتيجة مباشرة: أي رد أفضل أو أين الخطأ؟' },
  { letter: 'E', term: 'Evidence', label: 'الدليل', text: 'اذكر جزءًا محددًا من الرد أو الموجّه يثبت حكمك.' },
  { letter: 'E', term: 'Explanation', label: 'التفسير', text: 'اشرح لماذا يؤثر هذا الدليل في معيار التقييم.' },
  { letter: 'L', term: 'Link', label: 'الربط', text: 'اربط التحليل بالحكم النهائي ومتطلبات الـ Guidelines.' },
]

export const fitQuestions = [
  { icon: MessageSquareText, text: 'تقدر تشرح ليه إجابة أفضل من إجابة؟' },
  { icon: FileSearch, text: 'عندك صبر تدقق في معلومة تبدو صحيحة؟' },
  { icon: BookOpenCheck, text: 'تقدر تتبع تعليمات دقيقة حتى لو كانت طويلة؟' },
  { icon: Languages, text: 'كتابتك واضحة بالعربية أو الإنجليزية؟' },
]
