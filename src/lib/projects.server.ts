import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Locale } from "@/i18n";

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  category?: string;
  role?: string;
  stack?: string[];
  links?: { live?: string; repo?: string };
  featured?: boolean;
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
  readingMinutes: number;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(locale: Locale = "en"): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  
  // First, collect unique base slugs and determine which file to use for each
  const baseSlugMap = new Map<string, string>(); // baseSlug -> filename to use
  
  for (const file of files) {
    // Extract base slug by removing .mdx and any locale suffix
    const baseSlug = file.replace(/\.mdx$/, "").replace(/\.(en|pt-BR|es)$/, "");
    const localeFile = `${baseSlug}.${locale}.mdx`;
    const defaultFile = `${baseSlug}.en.mdx`;
    const baseFile = `${baseSlug}.mdx`;
    
    // Determine which file to use for this base slug
    if (!baseSlugMap.has(baseSlug)) {
      // First time seeing this base slug - choose the best file
      if (file === localeFile) {
        // Perfect match for requested locale
        baseSlugMap.set(baseSlug, file);
      } else if (file === defaultFile) {
        // English fallback
        baseSlugMap.set(baseSlug, file);
      } else if (file === baseFile) {
        // Base file (no locale) - only use if no locale-specific versions exist
        const localePath = path.join(PROJECTS_DIR, localeFile);
        const defaultPath = path.join(PROJECTS_DIR, defaultFile);
        if (!fs.existsSync(localePath) && !fs.existsSync(defaultPath)) {
          baseSlugMap.set(baseSlug, file);
        }
      }
      // Otherwise, ignore this file (it's a locale-specific file we don't want)
    } else {
      // We already have a file for this base slug - upgrade if this is a better match
      if (file === localeFile) {
        // This is the exact locale we want, so use it
        baseSlugMap.set(baseSlug, file);
      }
      // Otherwise, keep the current file
    }
  }

  // Now process only the files we've selected
  return Array.from(baseSlugMap.entries())
    .map(([baseSlug, file]) => {
      const fullPath = path.join(PROJECTS_DIR, file);
      
      // Verify file exists before reading
      if (!fs.existsSync(fullPath)) {
        console.warn(`[getAllProjects] File not found: ${fullPath}`);
        return null;
      }
      
      try {
        const raw = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(raw);
        const rt = readingTime(content);

        return {
          slug: baseSlug,
          frontmatter: data as ProjectFrontmatter,
          content,
          readingMinutes: Math.max(1, Math.round(rt.minutes)),
        };
      } catch (error) {
        console.error(`[getAllProjects] Error reading file ${fullPath}:`, error);
        return null;
      }
    })
    .filter((project): project is Project => project !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getProjectBySlug(slug: string, locale: Locale = "en"): Project | null {
  // Try locale-specific file first
  const localeFile = path.join(PROJECTS_DIR, `${slug}.${locale}.mdx`);
  const defaultFile = path.join(PROJECTS_DIR, `${slug}.en.mdx`);
  const fallbackFile = path.join(PROJECTS_DIR, `${slug}.mdx`);
  
  let fullPath: string | null = null;
  if (fs.existsSync(localeFile)) {
    fullPath = localeFile;
  } else if (fs.existsSync(defaultFile)) {
    fullPath = defaultFile;
  } else if (fs.existsSync(fallbackFile)) {
    fullPath = fallbackFile;
  }
  
  if (!fullPath) return null;

  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const rt = readingTime(content);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
      readingMinutes: Math.max(1, Math.round(rt.minutes)),
    };
  } catch (error) {
    console.error(`[getProjectBySlug] Error reading file ${fullPath}:`, error);
    return null;
  }
}
