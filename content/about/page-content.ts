export type AboutContactLink = {
  label: string;
  href: string;
};

export type AboutMessenger = {
  type: "telegram" | "max" | "threads";
  links: AboutContactLink[];
};

export type AboutFocusItem = {
  title: string;
  text: string;
};

export type AboutSpecialist = {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoAlt?: string;
  intro?: string;
  highlights: string[];
  focusTitle: string;
  focusItems: AboutFocusItem[];
  messengers: AboutMessenger[];
  sameAs?: string[];
  knowsAbout?: string[];
};

export const aboutPageContent = {
  metaTitle: "О команде — SEO и GEO от Art-Web",
  metaDescription:
    "Команда GEO+SEO от Art-Web: Леонид К., Андрей Ильницкий, Андрей Григорьев — SEO, GEO и AI-автоматизация для бизнеса.",
  eyebrow: "О команде",
  pageHeading: "Команда экспертов",
  pageIntro:
    "Мы помогаем бизнесу получать клиентов из Google, Яндекса и ответов нейросетей — ChatGPT, Алисы, Perplexity и других AI-систем.",
  specialists: [
    {
      id: "leonid",
      name: "Леонид К.",
      role: "SEO и GEO-специалист",
      photo: "/img/leonid.webp",
      highlights: [
        "В SEO с 2011 года",
        "Более 100 проектов за всё время работы",
      ],
      messengers: [
        {
          type: "telegram",
          links: [{ label: "Написать в телеграм", href: "https://t.me/GEO_art_web" }],
        },
        {
          type: "max",
          links: [
            {
              label: "Написать в Max",
              href: "https://max.ru/u/f9LHodD0cOIIvzH5O_n1A0ccVW19jlUh1cNUDqYSw1U0ooskLxi-RIuFqp8",
            },
          ],
        },
        {
          type: "threads",
          links: [{ label: "Написать в @threads", href: "https://www.threads.com/@fazer_lv" }],
        },
      ],
      focusTitle: "Чем занимаюсь",
      focusItems: [
        {
          title: "SEO",
          text: "Техническая оптимизация, структура сайта, контент под спрос, рост органического трафика и заявок.",
        },
        {
          title: "GEO",
          text: "Продвижение в нейросетях: понятное описание бизнеса, экспертные материалы, schema-разметка, цитируемость в AI-ответах.",
        },
      ],
      knowsAbout: ["SEO", "GEO", "Generative Engine Optimization", "техническая оптимизация", "schema-разметка"],
    },
    {
      id: "andrey-ilnitsky",
      name: "Андрей Ильницкий",
      role: "AI Automation Engineer & System Architect",
      photo: "/img/andrey_i.webp",
      photoAlt: "Андрей Ильницкий — AI Automation Engineer и системный архитектор",
      intro:
        "Привет, я Андрей Ильницкий — AI Automation Engineer и системный архитектор. До того как начать внедрять нейросети, я 16 лет строил собственный бизнес: от ритейла и ресторанов до логистики и B2B-дистрибуции. Поэтому к ИИ я отношусь не как к «магии» или хайпу, а как к жесткому производственному инструменту. Моя сильная сторона — умение переводить абстрактные запросы на язык окупаемости, сокращения издержек и измеримых бизнес-результатов, опираясь на 20-летний опыт управления реальными операциями.\n\nЗа последние годы я спроектировал и запустил в стабильный продакшен более 30 коммерческих AI-систем, а также занимаю позицию Tech Lead в AI-платформе Gora AI. Я горжусь проектами, где ИИ закрывает настоящую бизнес-рутину: например, для федерального холдинга мы за две недели внедрили систему анализа звонков, которая теперь автоматически проверяет 100% диалогов отдела продаж (вместо ручной выборки в 5%) и сократила время оценки одного звонка с 20 минут до одной.\n\nНа этом сайте, вместе со своими коллегами я поделюсь тем, как бесшовно подружить нейросети с классическим бизнесом: CRM, телефонией и внутренними базами знаний. Мое кредо простое: я не делаю «красивые демо», которые ломаются на сотом запросе. Я рассказываю, как создавать надежные AI-архитектуры со страховками от галлюцинаций, обязательным участием человека там, где цена ошибки высока, и понятной стоимостью владения. Если вам нужно понять, как превратить ИИ из дорогой игрушки в системного сотрудника — вам сюда.",
      highlights: [
        "16 лет собственного бизнеса и 20 лет управления операциями",
        "Более 30 коммерческих AI-систем в продакшене",
        "Tech Lead в AI-платформе Gora AI",
      ],
      messengers: [],
      focusTitle: "Чем занимаюсь",
      focusItems: [
        {
          title: "AI-автоматизация",
          text: "Проектирование и запуск AI-систем, которые закрывают реальную бизнес-рутину: анализ звонков, обработка документов, поддержка продаж.",
        },
        {
          title: "Системная архитектура",
          text: "Надёжные AI-архитектуры со страховками от галлюцинаций, human-in-the-loop там, где цена ошибки высока, и понятной стоимостью владения.",
        },
        {
          title: "Интеграция с бизнесом",
          text: "Бесшовное подключение нейросетей к CRM, телефонии и внутренним базам знаний — без «красивых демо», которые ломаются на сотом запросе.",
        },
      ],
      knowsAbout: [
        "AI automation",
        "системная архитектура",
        "Generative Engine Optimization",
        "CRM",
        "базы знаний",
      ],
    },
    {
      id: "andrey",
      name: "Андрей Григорьев",
      role: "SEO и GEO-специалист, основатель Art-Web",
      photo: "/img/andrey.webp",
      intro:
        "Работаю на стыке классического SEO и GEO: техническая база, контент, структура и сигналы доверия.",
      highlights: [
        "Более 10 лет в SEO и веб-разработке",
        "Основатель Art-Web.ru и проекта GEO+SEO",
        "Кейсы: рост трафика, заявок и AI-видимости брендов",
        "Понятные отчёты и фокус на заявки, а не на «красивые цифры»",
      ],
      messengers: [
        {
          type: "telegram",
          links: [{ label: "@ismeyker", href: "https://t.me/ismeyker" }],
        },
        {
          type: "max",
          links: [
            {
              label: "Руководитель",
              href: "https://max.ru/u/f9LHodD0cOLvORswG4x_k-QSk-LWPrvOyc9yPgi7Ik_P-2QqQfYfa_LdFAU",
            },
            {
              label: "Офис",
              href: "https://max.ru/u/f9LHodD0cOIHv--WeGHQkpbEzQFI8A4pnpvHkEEOekND-8ju-74P7Q4HLCU",
            },
          ],
        },
      ],
      focusTitle: "Чем занимаюсь",
      focusItems: [
        {
          title: "Стратегия",
          text: "Объединяю поиск и AI-каналы в одну систему роста — от аудита до регулярных улучшений.",
        },
      ],
      sameAs: ["https://art-web.ru/"],
      knowsAbout: ["SEO", "GEO", "Generative Engine Optimization", "стратегия продвижения"],
    },
  ] satisfies AboutSpecialist[],
  legalNote:
    "Юридическое лицо: ИП Григорьев Андрей Александрович, Симферополь, Республика Крым.",
  ctaLabel: "Оставить заявку",
  ctaHref: "/#contact",
  blogLabel: "Читать блог",
};
