import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
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

export function getAllProjects(): Project[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(PROJECTS_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      return {
        slug,
        frontmatter: data as ProjectFrontmatter,
        content,
        readingMinutes: Math.max(1, Math.round(rt.minutes)),
      };
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(PROJECTS_DIR, `${slug}.mdx`);

  console.log(
    "[getProjectBySlug]",
    { slug, PROJECTS_DIR, fullPath, exists: fs.existsSync(fullPath) }
  );

  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
  };

}
