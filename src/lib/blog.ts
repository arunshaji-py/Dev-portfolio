import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Estimate read time
    const words = content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(words / 250))} min read`;

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      readTime,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}
