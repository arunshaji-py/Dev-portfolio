import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Reveal } from '@/components/Reveal';
import styles from './blog.module.css';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Reveal>
          <h1 className={styles.title}>Blog</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.subtitle}>
            Thoughts on software engineering, web development, and the tools we use to build.
          </p>
        </Reveal>
      </div>

      <div className={styles.list}>
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 60}>
            <Link href={`/blog/${post.slug}`} className={styles.postRow}>
              <div className={styles.postLeft}>
                <span className={styles.postDate}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span
                  className={styles.postCategory}
                  data-category={post.category.toLowerCase()}
                >
                  {post.category}
                </span>
              </div>
              <div className={styles.postRight}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
              </div>
              <span className={styles.postReadTime}>{post.readTime}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      {posts.length === 0 && (
        <div className={styles.empty}>
          <p>No posts yet. Add <code>.md</code> files to <code>src/content/blog/</code> to get started.</p>
        </div>
      )}
    </main>
  );
}
