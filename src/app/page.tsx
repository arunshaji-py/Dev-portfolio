import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { StackMarquee } from '@/components/StackMarquee';
import { projects, siteConfig, showComingSoon } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import styles from './page.module.css';

export default function Home() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.gridBg} />
        <div className={`${styles.orb} ${styles.orbOne}`} />
        <div className={`${styles.orb} ${styles.orbTwo}`} />

        <div className={styles.heroLabel}>
          <span className="status-dot" /> Available for opportunities
        </div>

        <h1 className={styles.heroTitle}>
          {siteConfig.tagline.split('web')[0]}
          <em>web</em>
        </h1>

        <p className={styles.heroDesc}>{siteConfig.description}</p>

        <div className={styles.heroCta}>
          <a href="#projects" className="btn-primary">View Projects ↓</a>
          <Link href="/blog" className="btn-ghost">Read Blog</Link>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section id="projects" className={styles.section}>
        <div className="section-header">
          <span className="section-number">01</span>
          <h2 className="section-title">Selected Work</h2>
          <div className="section-line" />
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 100}>
              <a
                href={project.url || project.github || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectCard}
              >
                <div className={styles.projectMeta}>
                  <span className={styles.projectYear}>{project.year}</span>
                  <span className={styles.projectTag}>{project.tag}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectStack}>
                  {project.stack.map((s) => (
                    <span key={s} className={styles.stackChip}>{s}</span>
                  ))}
                </div>
                <div className={styles.projectArrow}>↗</div>
              </a>
            </Reveal>
          ))}

          {showComingSoon && (
            <Reveal delay={projects.length * 100}>
              <div className={styles.comingSoonCard}>
                <div className={styles.comingSoonIcon}>⌘</div>
                <h3 className={styles.comingSoonTitle}>More coming soon</h3>
                <p className={styles.comingSoonDesc}>
                  Currently building new projects. Watch this space — or check out my{' '}
                  <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>{' '}
                  for work in progress.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ─── Stack ─── */}
      <section className={styles.stackSection}>
        <div className="section-header">
          <span className="section-number">02</span>
          <h2 className="section-title">Stack</h2>
          <div className="section-line" />
        </div>
        <StackMarquee />
      </section>

      {/* ─── Blog ─── */}
      <section id="blog-preview" className={styles.section}>
        <div className="section-header">
          <span className="section-number">03</span>
          <h2 className="section-title">Writing</h2>
          <div className="section-line" />
        </div>

        <div className={styles.blogGrid}>
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link href={`/blog/${post.slug}`} className={styles.blogCard}>
                <span className={styles.blogDate}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  }).toUpperCase()}
                </span>
                <span
                  className={styles.blogCategory}
                  data-category={post.category.toLowerCase()}
                >
                  {post.category}
                </span>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <span className={styles.blogReadMore}>
                  {post.readTime} · Read article →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {posts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/blog" className="btn-ghost">View all posts →</Link>
          </div>
        )}
      </section>

      {/* ─── About ─── */}
      <section id="about" className={styles.section}>
        <div className="section-header">
          <span className="section-number">04</span>
          <h2 className="section-title">About</h2>
          <div className="section-line" />
        </div>

        <div className={styles.aboutLayout}>
          <Reveal>
            <div className={styles.aboutText}>
              {siteConfig.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className={styles.aboutStats}>
              {Object.entries(siteConfig.stats).map(([key, val]) => (
                <div key={key} className={styles.statCard}>
                  <div className={styles.statNumber}>{val}</div>
                  <div className={styles.statLabel}>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className={styles.contactSection}>
        <Reveal>
          <h2 className={styles.contactHeading}>
            Let&apos;s build<br />something <em>great</em>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.contactSub}>
            Always open to interesting projects, collaborations, or just a good tech conversation.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className={styles.contactLinks}>
            <a href={`mailto:${siteConfig.email}`} className={styles.contactPill}>✉ Email</a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={styles.contactPill}>⊞ GitHub</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={styles.contactPill}>▨ LinkedIn</a>
            <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className={styles.contactPill}>✦ Twitter / X</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
