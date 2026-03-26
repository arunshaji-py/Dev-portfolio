import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlogContent } from './BlogContent';
import styles from './slug.module.css';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} — Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className={styles.main}>
      <Link href="/blog" className={styles.backLink}>← Back to blog</Link>

      <header className={styles.header}>
        <div className={styles.meta}>
          <time className={styles.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span className={styles.dot}>·</span>
          <span className={styles.readTime}>{post.readTime}</span>
          <span className={styles.dot}>·</span>
          <span
            className={styles.category}
            data-category={post.category.toLowerCase()}
          >
            {post.category}
          </span>
        </div>
        <h1 className={styles.title}>{post.title}</h1>
        {post.excerpt && (
          <p className={styles.excerpt}>{post.excerpt}</p>
        )}
      </header>

      <hr className={styles.divider} />

      <article className="prose">
        <BlogContent content={post.content} />
      </article>

      <hr className={styles.divider} />

      <div className={styles.footer}>
        <Link href="/blog" className="btn-ghost">← All posts</Link>
      </div>
    </main>
  );
}
