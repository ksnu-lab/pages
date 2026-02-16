import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NewsPost, LocalizedString } from "@/types";

const newsDirectory = path.join(process.cwd(), "src/content/news");
const faqDirectory = path.join(process.cwd(), "src/content/faq");

// Decap CMS writes flat fields (title_ko, title_en)
// Manual MDX uses nested fields (title: { ko, en })
// This normalizes both formats
function normalizeLocalizedField(
  data: Record<string, unknown>,
  field: string
): LocalizedString | undefined {
  const value = data[field];
  if (value && typeof value === "object" && "ko" in (value as object)) {
    return value as LocalizedString;
  }
  const ko = data[`${field}_ko`] as string | undefined;
  const en = data[`${field}_en`] as string | undefined;
  if (ko) {
    return { ko, en: en || ko };
  }
  if (typeof value === "string") {
    return { ko: value, en: value };
  }
  return undefined;
}

export function getNewsSlugs(): string[] {
  if (!fs.existsSync(newsDirectory)) return [];
  return fs
    .readdirSync(newsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getNewsPostBySlug(slug: string): {
  meta: NewsPost;
  content: string;
} {
  const filePath = path.join(newsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const title = normalizeLocalizedField(data, "title") || { ko: slug, en: slug };
  const summary = normalizeLocalizedField(data, "summary");

  return {
    meta: {
      slug,
      title,
      date: typeof data.date === "string" ? data.date : new Date(data.date).toISOString().split("T")[0],
      category: data.category || "general",
      summary,
      thumbnail: data.thumbnail,
      pinned: data.pinned === true,
    },
    content,
  };
}

export function getAllNewsPosts(): NewsPost[] {
  const slugs = getNewsSlugs();
  const posts = slugs
    .map((slug) => getNewsPostBySlug(slug).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
  order: number;
}

export function getAllFaqItems(): FaqItem[] {
  if (!fs.existsSync(faqDirectory)) return [];
  const files = fs
    .readdirSync(faqDirectory)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map((file) => {
      const filePath = path.join(faqDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      const question = normalizeLocalizedField(data, "question") || { ko: "", en: "" };
      const answer = normalizeLocalizedField(data, "answer") || { ko: "", en: "" };

      return {
        question,
        answer,
        order: typeof data.order === "number" ? data.order : 99,
      };
    })
    .sort((a, b) => a.order - b.order);
}
