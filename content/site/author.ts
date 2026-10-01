import { SITE_URL } from "@/content/site/organization";

export type BlogAuthorProfile = {
  id: string;
  name: string;
  jobTitle: string;
  url: string;
  bio: string;
  photo: string;
  photoAlt?: string;
};

export const siteFounder = {
  id: "andrey",
  name: "Андрей Григорьев",
  jobTitle: "SEO и GEO-специалист, основатель Art-Web",
  url: `${SITE_URL}/about/#andrey`,
  sameAs: ["https://art-web.ru/"],
  knowsAbout: ["SEO", "GEO", "Generative Engine Optimization", "стратегия продвижения"],
};

export const defaultBlogAuthor: BlogAuthorProfile = {
  id: "leonid",
  name: "Леонид К.",
  jobTitle: "SEO и GEO-специалист",
  url: `${SITE_URL}/about/#leonid`,
  bio: "В SEO с 2011 года. Более 100 проектов за всё время работы. Занимается техническим SEO, контентом и продвижением сайтов в поиске и нейросетях.",
  photo: "/img/leonid.webp",
  photoAlt: "Леонид К. — SEO и GEO-специалист",
};

export const andreyIlnitskyAuthor: BlogAuthorProfile = {
  id: "andrey-ilnitsky",
  name: "Андрей Ильницкий",
  jobTitle: "AI Automation Engineer & System Architect",
  url: `${SITE_URL}/about/#andrey-ilnitsky`,
  bio: "AI Automation Engineer и системный архитектор. 16 лет собственного бизнеса, Tech Lead в AI-платформе Gora AI, более 30 коммерческих AI-систем в продакшене.",
  photo: "/img/andrey_i.webp",
  photoAlt: "Андрей Ильницкий — AI Automation Engineer и системный архитектор",
};

const blogAuthorsByName: Record<string, BlogAuthorProfile> = {
  [defaultBlogAuthor.name]: defaultBlogAuthor,
  [andreyIlnitskyAuthor.name]: andreyIlnitskyAuthor,
  [siteFounder.name]: {
    id: siteFounder.id,
    name: siteFounder.name,
    jobTitle: siteFounder.jobTitle,
    url: siteFounder.url,
    bio: "SEO и GEO-специалист, основатель Art-Web. Стратегия продвижения сайтов в поиске и нейросетях.",
    photo: "/img/andrey.webp",
    photoAlt: "Андрей Григорьев — SEO и GEO-специалист, основатель Art-Web",
  },
};

/** Имена авторов для выбора при создании статьи (npm run new:post). */
export const blogAuthorOptions = [
  defaultBlogAuthor.name,
  andreyIlnitskyAuthor.name,
  siteFounder.name,
];

export function getBlogAuthor(authorName?: string): BlogAuthorProfile {
  if (authorName && blogAuthorsByName[authorName]) {
    return blogAuthorsByName[authorName];
  }

  return defaultBlogAuthor;
}
