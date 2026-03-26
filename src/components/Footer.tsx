import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} — Designed &amp; built from scratch</span>
      <div className={styles.status}>
        <span className="status-dot" />
        <span>All systems nominal</span>
      </div>
    </footer>
  );
}
