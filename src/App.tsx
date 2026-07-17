import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BadgeCheck,
  Banknote,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock3,
  ExternalLink,
  Eye,
  FileCheck2,
  Menu,
  MessageCircleQuestion,
  MousePointer2,
  Quote,
  SearchCheck,
  ShieldAlert,
  Sparkles,
  Target,
  UserRoundSearch,
  WalletCards,
  X,
  Zap,
} from 'lucide-react'
import { InkReveal } from './components/InkReveal'
import { SplineScene } from './components/SplineScene'
import {
  OFFICIAL_EGYPT_URL,
  REFERRAL_URL,
  faqItems,
  fitQuestions,
  peel,
  redLines,
  journeyStages,
  signalLabels,
  sources,
  tasks,
  type GuideSource,
  type SignalKind,
} from './content'

const SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

function Signal({ kind }: { kind: SignalKind }) {
  return <span className={`signal signal--${kind}`}>{signalLabels[kind]}</span>
}

function SourceLink({ source }: { source: GuideSource }) {
  return (
    <a className="source-link" href={source.url} target="_blank" rel="noopener noreferrer">
      {source.label}
      <ExternalLink size={12} aria-hidden="true" />
    </a>
  )
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="reading-progress" aria-hidden="true">
      <span style={{ width: `${progress}%` }} />
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [
    ['الشغل', '#work'],
    ['التسجيل', '#register'],
    ['الجودة', '#quality'],
    ['الدفع', '#payment'],
    ['الأسئلة', '#faq'],
  ]

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="OUTLIER — العودة إلى بداية الدليل">
          <span className="brand-mark">O</span>
          <span className="brand-copy">
            <strong dir="ltr">OUTLIER</strong>
            <small>دليل مصر</small>
          </span>
        </a>

        <nav className={`nav-links ${open ? 'nav-links--open' : ''}`} aria-label="أقسام الدليل">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="button button--small button--light" href={REFERRAL_URL} target="_blank" rel="sponsored noopener noreferrer">
            سجّل الآن
            <ArrowUpLeft size={16} aria-hidden="true" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}

function SectionHeading({
  kicker,
  title,
  description,
  inverted = false,
}: {
  kicker: string
  title: ReactNode
  description?: string
  inverted?: boolean
}) {
  return (
    <div className={`section-heading ${inverted ? 'section-heading--inverted' : ''}`}>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function FitCheck() {
  const [selected, setSelected] = useState<number[]>([])
  const toggle = (index: number) => {
    setSelected((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))
  }
  const score = selected.length
  const result = score === 0 ? 'اختار الجمل اللي شبهك' : score >= 3 ? 'عندك أساس قوي جدًا للبداية.' : 'ينفع تبدأ، لكن حضّر نفسك للتدريب.'

  return (
    <div className="fit-card">
      <div className="fit-card__intro">
        <Signal kind="mindset" />
        <h3>اختبار في 30 ثانية</h3>
        <p>مش اختبار قبول. بس طريقة صادقة تعرف بيها طبيعة الشغل مناسبة لك ولا محتاجة تجهيز أكتر.</p>
        <div className="fit-result" aria-live="polite">
          <span>{score}/4</span>
          <strong>{result}</strong>
        </div>
      </div>
      <div className="fit-options">
        {fitQuestions.map((question, index) => {
          const Icon = question.icon
          const active = selected.includes(index)
          return (
            <button key={question.text} type="button" className={active ? 'fit-option fit-option--active' : 'fit-option'} onClick={() => toggle(index)} aria-pressed={active}>
              <Icon size={21} aria-hidden="true" />
              <span>{question.text}</span>
              <span className="fit-check">{active && <Check size={15} aria-hidden="true" />}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RegistrationJourney() {
  const [active, setActive] = useState(0)
  const step = journeyStages[active]

  return (
    <div className="journey-card journey-card--detailed">
      <div className="journey-facts">
        <div><span>الرابط الحالي</span><strong><CircleCheck size={17} /> صالح ومربوط بمشروع</strong><small>فُحص 17 يوليو 2026</small></div>
        <div><span>التأهيل العام</span><strong dir="ltr">30–90 min</strong><small>ثم تأهيل منفصل لكل مشروع</small></div>
        <div><span>المسار</span><strong>10 محطات متوقعة</strong><small>الشكل والترتيب قد يختلفان</small></div>
      </div>

      <nav className="flow-stepper" aria-label="مسار التسجيل حتى أول مراجعة جودة">
        {journeyStages.map((item, index) => (
          <button
            key={item.number}
            type="button"
            aria-current={active === index ? 'step' : undefined}
            aria-controls="journey-stage-panel"
            className={active === index ? 'flow-step flow-step--active' : 'flow-step'}
            onClick={() => setActive(index)}
          >
            <span>{item.number}</span><i aria-hidden="true" />
            <small>{item.phase}</small>
          </button>
        ))}
      </nav>

      <div key={step.number} id="journey-stage-panel" className="flow-panel" aria-live="polite">
        <header className="flow-panel__header">
          <div className="flow-panel__number">{step.number}</div>
          <div>
            <div className="flow-panel__meta"><Signal kind={step.signal} /><span>{step.phase}</span></div>
            <h3>{step.title}</h3>
            <p>{step.summary}</p>
          </div>
        </header>

        <div className="flow-panel__grid">
          <section className="flow-column">
            <div className="flow-column__title"><Eye size={19} /><span>ما الذي سيظهر أمامك؟</span></div>
            <ul>{step.expected.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="flow-column flow-column--action">
            <div className="flow-column__title"><CircleCheck size={19} /><span>اعمل كده</span></div>
            <ul>{step.actions.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <aside className="rescue-card">
          <div className="rescue-card__icon"><CircleAlert size={22} /></div>
          <div>
            <span>لو وقفت هنا</span>
            <h4>{step.trouble.title}</h4>
            <ol>{step.trouble.steps.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </aside>

        <footer className="flow-panel__footer">
          <div className="flow-sources">{step.sources.map((source) => <SourceLink key={source.url} source={source} />)}</div>
          <div className="flow-navigation">
            <button type="button" onClick={() => setActive((current) => Math.max(0, current - 1))} disabled={active === 0}><ArrowRight size={16} />السابق</button>
            <span>{active + 1} / {journeyStages.length}</span>
            <button type="button" onClick={() => setActive((current) => Math.min(journeyStages.length - 1, current + 1))} disabled={active === journeyStages.length - 1}>التالي<ArrowLeft size={16} /></button>
          </div>
        </footer>
      </div>

      <aside className="support-blueprint">
        <div className="support-blueprint__intro">
          <MessageCircleQuestion size={25} />
          <div><span>رسالة دعم تُفهم من أول مرة</span><h3>ابعث تفاصيل قابلة للتشخيص، مش «الحساب مش شغال».</h3></div>
        </div>
        <div className="support-blueprint__fields">
          {[
            ['01', 'المرحلة واسم الشاشة'],
            ['02', 'نص الخطأ كما ظهر'],
            ['03', 'التاريخ والوقت بتوقيت القاهرة'],
            ['04', 'الجهاز والمتصفح'],
            ['05', 'Project / Course / Task ID إن وُجد'],
            ['06', 'ما جرّبته بالفعل'],
          ].map(([number, label]) => <span key={number}><b>{number}</b>{label}</span>)}
        </div>
        <p><ShieldAlert size={17} />لا ترسل كلمة السر، ولا صورة الهوية كاملة، ولا إجابات الـ Assessment أو محتوى المهمة. استخدم قناة Outlier المعتمدة فقط.</p>
        <SourceLink source={sources.support} />
      </aside>
    </div>
  )
}

function App() {
  return (
    <>
      <ReadingProgress />
      <Header />

      <main id="top">
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow--one" aria-hidden="true" />
          <div className="hero-glow hero-glow--two" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <div className="hero-badge">
                <span className="status-dot" />
                دليل مستقل للمصريين
                <span className="hero-badge__date">محدّث 17 يوليو 2026</span>
              </div>
              <h1>
                من أول ضغطة
                <br />
                <span>لأول دفعة.</span>
              </h1>
              <p className="hero-lead">
                مش هنبيع لك حلم «فلوس سهلة». هنفهمك الشغل، نجهّز ملفك، ونمشي معاك خطوة بخطوة من التسجيل لحد ما تبقى عارف تعمل إيه — وما تعملش إيه.
              </p>
              <div className="hero-cta">
                <a className="button button--primary" href="#work">
                  افهم الشغل الأول
                  <ArrowLeft size={18} aria-hidden="true" />
                </a>
                <a className="button button--ghost" href={REFERRAL_URL} target="_blank" rel="sponsored noopener noreferrer">
                  ابدأ عبر رابط الإحالة
                  <ArrowUpLeft size={19} aria-hidden="true" />
                </a>
              </div>
              <p className="referral-disclosure">
                <BadgeCheck size={15} aria-hidden="true" />
                ده رابط إحالة وموصى به في الدليل. مصر متاحة أيضًا عبر
                <a href={OFFICIAL_EGYPT_URL} target="_blank" rel="noopener noreferrer"> الفرصة الرسمية.</a>
              </p>
              <div className="hero-mini-stats">
                <div><strong dir="ltr">$7.5–50+</strong><span>نطاق شائع حسب المسار</span></div>
                <div><strong>10 محطات</strong><span>من الرابط لأول QA</span></div>
                <div><strong>أسبوعي</strong><span>المعالجة يوم الثلاثاء</span></div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-label visual-label--top"><Sparkles size={14} />مرشدك في الرحلة</div>
              <SplineScene scene={SCENE_URL} className="spline-host" />
              <div className="visual-label visual-label--bottom" dir="ltr">NEXBOT / 01</div>
            </div>
          </div>
        </section>

        <section className="truth-system" aria-label="طريقة قراءة المعلومات">
          <div className="shell truth-system__inner">
            <p>كل معلومة هنا لها وزنها.</p>
            <div className="signal-list">
              <Signal kind="official" />
              <Signal kind="egypt" />
              <Signal kind="varies" />
              <Signal kind="mindset" />
            </div>
          </div>
        </section>

        <section className="ink-story section-space">
          <Reveal className="shell">
            <div className="ink-frame">
              <div className="ink-content">
                <span className="ink-content__kicker">اكشف الصورة بنفسك</span>
                <h2>الزر يفتح الحساب.<br />فهم الشغل هو اللي يفتح الفرصة.</h2>
                <div className="ink-points">
                  <span><strong>01</strong>اقرأ قبل ما تختبر</span>
                  <span><strong>02</strong>اكتب بدليل، مش بانطباع</span>
                  <span><strong>03</strong>الجودة قبل عدد التاسكات</span>
                </div>
              </div>
              <InkReveal className="ink-canvas" />
              <div className="ink-instruction" aria-hidden="true"><MousePointer2 size={15} />حرّك المؤشر</div>
            </div>
          </Reveal>
        </section>

        <section id="work" className="section-space work-section">
          <div className="shell">
            <Reveal>
              <SectionHeading
                kicker="الشغل الحقيقي"
                title={<>أنت مش بتكلّم AI.<br /><span>أنت بتعلّمه.</span></>}
                description="Outlier تربط خبراء ومساهمين بمشاريع تحسّن نماذج الذكاء الاصطناعي. طبيعة التاسك تتغير، لكن دورك واحد: حكم بشري واضح ومُبرر."
              />
            </Reveal>
            <div className="task-grid">
              {tasks.map((task, index) => {
                const Icon = task.icon
                return (
                  <Reveal key={task.number} className={`task-card-wrap delay-${(index % 3) + 1}`}>
                    <article className="task-card">
                      <div className="task-card__top"><span>{task.number} / TASK</span><Icon size={24} aria-hidden="true" /></div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
            <Reveal><FitCheck /></Reveal>
          </div>
        </section>

        <section className="section-space prep-section">
          <div className="shell prep-grid">
            <Reveal>
              <div>
                <SectionHeading kicker="قبل الرابط" title={<>جهّز الأربع حاجات<br /><span>دول الأول.</span></>} />
                <p className="body-copy">التسجيل نفسه سهل. اللي يفرق هو إن بياناتك تكون متطابقة، وملفك يقول بوضوح أنت شاطر في إيه.</p>
                <SourceLink source={sources.faq} />
              </div>
            </Reveal>
            <div className="prep-list">
              {[
                ['01', 'هوية أصلية وسارية', 'مش Scan ولا صورة محفوظة. Persona تطلب التقاطًا حيًا للهوية.'],
                ['02', 'هاتف ورقم حقيقي', 'هتحتاج الكاميرا والتحقق من رقمك خلال الرحلة.'],
                ['03', 'CV يحكي خبرتك', 'مختصر، حديث، وبه المهارات اللي تقدر تثبتها فعلًا.'],
                ['04', 'LinkedIn متسق', 'التعليم والخبرة والاسم لازم ما يتعارضوش مع باقي بياناتك.'],
              ].map(([number, title, text]) => (
                <Reveal key={number} className="prep-item">
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <FileCheck2 size={22} aria-hidden="true" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className="section-space register-section">
          <div className="shell">
            <Reveal>
              <SectionHeading
                kicker="من الرابط لأول QA"
                title={<>عشر محطات.<br /><span>وفي كل محطة خطة نجدة.</span></>}
                description="هذا هو المسار الأقرب لما ستراه الآن: دعوة الإحالة، الحساب، فحص المهارات والهوية، ثم المشروع والـ Assessment وأول Task والمراجعة. بعض الشاشات تتبدل حسب تخصصك والمشروع، لذلك نوضح الثابت والمتغير بدل ما نوهمك بصورة واحدة."
                inverted
              />
            </Reveal>
            <Reveal><RegistrationJourney /></Reveal>
            <div className="registration-sources">
              <SourceLink source={sources.identity} />
              <SourceLink source={sources.countries} />
            </div>
          </div>
        </section>

        <section className="section-space profile-section">
          <div className="shell profile-grid">
            <Reveal className="profile-visual">
              <div className="profile-window">
                <div className="profile-window__bar"><span /><span /><span /><small dir="ltr">PROFILE / EXPERT MATCH</small></div>
                <div className="profile-person"><div className="avatar">A</div><div><strong>Ahmed M.</strong><span dir="ltr">Arabic · English · Code</span></div><span className="completion">100%</span></div>
                <div className="skill-row"><span>Arabic Writing</span><b>Native</b></div>
                <div className="skill-row"><span>Code Review</span><b>Advanced</b></div>
                <div className="match-toggle"><span><UserRoundSearch size={20} />Expert Match</span><i><b /></i></div>
              </div>
            </Reveal>
            <Reveal>
              <div className="profile-copy">
                <Signal kind="egypt" />
                <h2>خلّي المشروع<br /><span>يعرف يلاقيك.</span></h2>
                <p>فعّل Expert Match، كمّل تخصصاتك، وحدّث خبرتك. الميزة لا تضمن دعوة، لكنها تجعل ملفك قابلًا للاكتشاف بدل ما يفضل ساكت في الخلفية.</p>
                <ul>
                  <li><Check size={17} />اكتب مهارات محددة بدل «أعرف كل حاجة».</li>
                  <li><Check size={17} />اربط كل مهارة بخبرة أو دراسة واضحة.</li>
                  <li><Check size={17} />لا تختار تخصصًا لن تستطيع اجتياز اختباره.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-space empty-section">
          <div className="shell">
            <Reveal>
              <div className="empty-card">
                <div className="empty-card__icon"><SearchCheck size={34} /></div>
                <div className="empty-card__copy">
                  <Signal kind="official" />
                  <h2>الـ Queue فاضية؟<br /><span>ده مش حكم بالرفض.</span></h2>
                  <p>المشاريع تتحرك حسب احتياج العملاء ومهاراتك. ممكن تكمّل التأهيل وما تلاقيش تاسك مناسب فورًا. الانتظار طبيعي؛ الوعد بموعد محدد مش طبيعي.</p>
                  <div className="empty-actions">
                    <span><Check />راجع البريد وSpam</span>
                    <span><Check />حدّث ملفك عند وجود جديد</span>
                    <span><X />ما تفتحش حسابًا ثانيًا</span>
                    <span><X />ما تبعتش عشر تذاكر لنفس المشكلة</span>
                  </div>
                  <SourceLink source={sources.availability} />
                </div>
                <div className="queue-visual" aria-hidden="true"><span>QUEUE</span><strong>0</strong><small>matching tasks</small></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="quality" className="section-space quality-section">
          <div className="shell">
            <Reveal>
              <SectionHeading
                kicker="الجودة"
                title={<>اكتب حكمك.<br /><span>وبعدين اثبته.</span></>}
                description="الـ Justification مش مساحة انطباع شخصي. هو سلسلة منطق قصيرة تجعل المراجع يرى ما رأيته أنت."
              />
            </Reveal>
            <div className="peel-grid">
              {peel.map((item, index) => (
                <Reveal key={`${item.letter}-${item.term}`} className={`peel-card peel-card--${index + 1}`}>
                  <div className="peel-letter">{item.letter}</div>
                  <span dir="ltr">{item.term}</span>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="justification-example">
                <div className="example-label"><Quote size={18} />مثال سريع</div>
                <div className="example-bad">
                  <span>مش كفاية</span>
                  <p>«الرد A أحسن لأنه أوضح ومكتوب بطريقة كويسة.»</p>
                </div>
                <div className="example-good">
                  <span>ده أقوى</span>
                  <p dir="ltr">“Response A follows the prompt’s three-item limit, while Response B adds two unsupported recommendations. This makes A more precise and instruction-compliant.”</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="seventy-rule">
                <div className="seventy-rule__number" dir="ltr">75%</div>
                <div><Signal kind="mindset" /><h3>اعتبر إن 75% من نجاحك يبدأ من اتباع التعليمات.</h3><p>دي قاعدة عملية لتثبيت الفكرة، مش إحصائية منشورة من Outlier. وقبل ما تكتب أول كلمة: راجع لغة التبرير المطلوبة — الإنجليزية هي الأغلب، والـ Guidelines هي الحكم.</p></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-space rules-section">
          <div className="shell">
            <Reveal>
              <SectionHeading kicker="الخطوط الحمراء" title={<>ست حاجات<br /><span>ما ينفعش تستهين بيها.</span></>} description="مش لأن النظام غامض؛ لأن نزاهة المهمة وسرية بياناتها هي أساس الشغل كله." inverted />
            </Reveal>
            <div className="rules-grid">
              {redLines.map((line, index) => {
                const Icon = line.icon
                return (
                  <Reveal key={line.title} className={`rule-card delay-${(index % 3) + 1}`}>
                    <div className="rule-icon"><Icon size={23} /></div>
                    <span>0{index + 1}</span>
                    <h3>{line.title}</h3>
                    <p>{line.description}</p>
                  </Reveal>
                )
              })}
            </div>
            <Reveal>
              <div className="network-note">
                <ShieldAlert size={25} />
                <div><Signal kind="egypt" /><h3>طيب لو في اتنين في البيت؟</h3><p>كل شخص يستخدم هويته وحسابه. احتياطًا لا يُفضّل توثيق حسابين في الوقت نفسه من الجهاز أو الشبكة نفسها، لكن ده مش معناه إن كل شخصين على Wi‑Fi واحد هيتحظروا تلقائيًا.</p></div>
                <SourceLink source={sources.identity} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-space review-section">
          <div className="shell review-grid">
            <Reveal>
              <div className="review-copy">
                <Signal kind="official" />
                <h2>كل تاسك ممكن<br /><span>يتراجع بالتفصيل.</span></h2>
                <p>في مراجعات جودة وتدقيقات دورية وإشارات نظامية، لكن مفيش مصدر عام يشرح رقم EQ سري أو حد طرد ثابت. الأحسن تتعامل مع كل مهمة كأن مراجعًا خبيرًا سيطلب منك دليلًا لكل حكم.</p>
                <div className="review-principles">
                  <span><Eye size={18} />راجع المطلوب قبل التسليم</span>
                  <span><Target size={18} />اربط الحكم بمعيار واضح</span>
                  <span><Clock3 size={18} />استخدم وقتًا يعكس عملًا حقيقيًا</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="review-board">
              <div className="review-board__header"><span>QUALITY REVIEW</span><small>IN PROGRESS</small></div>
              <div className="review-scan"><i /><i /><i /><i /><b /></div>
              <div className="review-board__footer"><span>Clarity</span><span>Accuracy</span><span>Instructions</span></div>
            </Reveal>
          </div>
        </section>

        <section className="section-space tools-section">
          <div className="shell">
            <Reveal>
              <SectionHeading kicker="بعد التأهيل" title={<>أدوات تساعدك.<br /><span>ولا واحدة تضمن مشروعًا.</span></>} />
            </Reveal>
            <div className="tool-grid">
              <Reveal className="tool-card tool-card--purple">
                <div className="tool-card__icon"><Sparkles /></div><Signal kind="official" /><h3 dir="ltr">Playground + Brilliance</h3><p>جرّب نماذج مختلفة وحل تحديات Prompting. Brilliance علامات تقدم وتفاعل، مش فلوس ولا أولوية مضمونة.</p><SourceLink source={sources.playground} />
              </Reveal>
              <Reveal className="tool-card tool-card--orange">
                <div className="tool-card__icon"><Zap /></div><Signal kind="varies" /><h3 dir="ltr">Missions</h3><p>مكافآت بشروط ووقت محدد قد تظهر لبعض المشاريع. اقرأ عدد المهام والساعات والجودة المطلوبة قبل ما تطارد البونص.</p>
              </Reveal>
              <Reveal className="tool-card tool-card--dark">
                <div className="tool-card__icon"><MessageCircleQuestion /></div><Signal kind="official" /><h3>المجتمع والدعم</h3><p>تابع Outlier Community وقناة مشروعك وQM. لمشاكل التسجيل استخدم الدعم الرسمي بدل وصفات البوتات القديمة.</p><SourceLink source={sources.community} />
              </Reveal>
            </div>
          </div>
        </section>

        <section id="payment" className="section-space payment-section">
          <div className="shell">
            <Reveal>
              <SectionHeading kicker="الدفع من مصر" title={<>الثلاثاء معالجة.<br /><span>الأربعاء وصول — غالبًا.</span></>} description="الموعد الرسمي شيء، وتجربة الاستلام المحلية شيء ثاني. خلّي عينك على حالة الدفعة، مش الساعة." />
            </Reveal>
            <div className="payment-grid">
              <Reveal className="payment-timeline">
                <div className="payment-day payment-day--official"><span>الثلاثاء</span><strong>Outlier تعالج الدفعة</strong><small>عن العمل من الثلاثاء السابق للاثنين — UTC</small><Signal kind="official" /></div>
                <div className="payment-line"><i /><ArrowLeft /></div>
                <div className="payment-day payment-day--egypt"><span>الأربعاء صباحًا</span><strong>الوصول المعتاد في مصر</strong><small>خصوصًا عبر Airtm، وقد يتأخر بسبب مراجعة أو عطلة</small><Signal kind="egypt" /></div>
              </Reveal>
              <Reveal className="airtm-card">
                <div className="airtm-card__top"><WalletCards size={30} /><div><small>الخيار الموصى به</small><strong dir="ltr">Airtm</strong></div></div>
                <p>عملي للمصريين، ويمكن أن تظهر داخله طرق سحب محلية ومحافظ إلكترونية مثل Vodafone Cash حسب الحساب والسوق.</p>
                <ul><li><Check />فعّل الحساب قبل أول دفعة</li><li><Check />راجع الرسوم وسعر التحويل قبل التأكيد</li><li><Check />استخدم حسابات دفع باسمك أنت</li></ul>
                <div className="airtm-warning"><CircleAlert size={18} />وسيلة السحب وسعر الصرف مش ضمان ثابت.</div>
                <SourceLink source={sources.airtm} />
              </Reveal>
            </div>
            <Reveal>
              <div className="payment-final-note"><Banknote size={24} /><div><h3>ولو الحساب اتوقف؟</h3><p>المهام المكتملة والمقبولة قد تدخل في دفعة نهائية، لكن الشروط تسمح بتعليق أو رفض مبالغ أثناء التحقيق في مخالفة. ما تعتمدش على وعد مطلق.</p></div><SourceLink source={sources.terms} /></div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="section-space faq-section">
          <div className="shell faq-grid">
            <Reveal>
              <div className="faq-intro"><span className="section-kicker">قبل ما تسأل</span><h2>إجابات<br /><span>من الآخر.</span></h2><p>المعلومة الرسمية عليها علامة. التجربة المصرية عليها علامة. واللي بيتغير هنقول لك إنه بيتغير.</p><SourceLink source={sources.faq} /></div>
            </Reveal>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <Reveal key={item.question}>
                  <details className="faq-item" name="guide-faq">
                    <summary><span className="faq-number">{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong><ChevronDown size={20} aria-hidden="true" /></summary>
                    <div className="faq-answer">{item.signal && <Signal kind={item.signal} />}<p>{item.answer}</p></div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta__grid" aria-hidden="true" />
          <div className="shell final-cta__inner">
            <Reveal>
              <span className="final-cta__kicker">جاهز تبدأ صح؟</span>
              <h2>اقرأ كويس.<br /><span>وبعدين دوس.</span></h2>
              <p>رابط الإحالة هو اختيارنا الموصى به، لكن القرار عندك. التسجيل لا يضمن القبول أو مشروعًا؛ تجهيزك هو الجزء اللي نقدر نساعدك فيه.</p>
              <div className="hero-cta final-buttons"><a className="button button--primary" href={REFERRAL_URL} target="_blank" rel="sponsored noopener noreferrer">التسجيل عبر الإحالة<ArrowUpLeft size={19} /></a><a className="button button--ghost" href={OFFICIAL_EGYPT_URL} target="_blank" rel="noopener noreferrer">فرصة مصر الرسمية<ExternalLink size={17} /></a></div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-top">
          <div className="brand footer-brand"><span className="brand-mark">O</span><span className="brand-copy"><strong dir="ltr">OUTLIER</strong><small>دليل مصر المستقل</small></span></div>
          <p>الدليل مجهود مستقل، وليس موقعًا رسميًا أو بيانًا صادرًا عن Outlier أو Scale AI. الأسعار والمشاريع والسياسات قابلة للتغيير.</p>
          <a href="#top" className="back-top">فوق <ArrowUpLeft size={17} /></a>
        </div>
        <div className="shell footer-bottom"><span>آخر مراجعة للمعلومات: 17 يوليو 2026</span><span dir="ltr">BUILT FOR EGYPTIAN OUTLIERS · 2026</span></div>
      </footer>
    </>
  )
}

export default App
