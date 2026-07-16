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

export interface RegistrationStep {
  number: string
  title: string
  eyebrow: string
  description: string
  bullets: string[]
  note?: string
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
  'https://app.outlier.ai/expert/referrals/link/4Ltfmvpmy1PP2LwRBP5o73lju-I'

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

export const registrationSteps: RegistrationStep[] = [
  {
    number: '01',
    eyebrow: 'حساب حقيقي من البداية',
    title: 'أنشئ حسابك',
    description: 'استخدم اسمك القانوني وبلد إقامتك ورقمك الحقيقي. أي اختلاف هنا سيظهر في مرحلة التحقق.',
    bullets: ['بريد لم يُستخدم على المنصة من قبل', 'حساب واحد فقط لكل شخص', 'لا تستخدم VPN أو Private Relay'],
  },
  {
    number: '02',
    eyebrow: 'خلي ملفك يقول أنت مين',
    title: 'ارفع خبرتك بوضوح',
    description: 'حدّث سيرتك وLinkedIn، واكتب تخصصاتك كما هي من غير تضخيم أو حذف خبرة مفيدة.',
    bullets: ['CV حديث ومباشر', 'تخصصات تستطيع إثباتها في اختبار', 'لغة إنجليزية واضحة حتى لو كان المسار عربيًا'],
    note: 'المهارة المكتوبة تفتح احتمالًا، لا تضمن مشروعًا.',
  },
  {
    number: '03',
    eyebrow: 'Persona + هاتفك',
    title: 'تحقق من الهوية',
    description: 'ستلتقط صورة حية لهوية حكومية أصلية وسارية، ثم تنفذ خطوات التحقق بالوجه.',
    bullets: ['استخدم هاتفًا بكاميرا واضحة', 'طابق الاسم وتاريخ الميلاد والبلد', 'إضاءة جيدة وهوية كاملة داخل الإطار'],
  },
  {
    number: '04',
    eyebrow: 'الاختبار مش إجراء شكلي',
    title: 'اقرأ ثم اختبر',
    description: 'التأهيل العام يليه أحيانًا تأهيل خاص بالمشروع. اقرأ الشروط والسعر قبل البدء وخذ الاختبار بتركيز.',
    bullets: ['راجع Guidelines الحالية', 'لا تفترض أن كل تدريب مدفوع أو مجاني', 'لا تغلق الاختبار إلا إذا سمحت التعليمات'],
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

