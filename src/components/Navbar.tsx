'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logo}>
        ~/dev<span>/portfolio</span>
      </Link>
      <ul className={styles.links}>
        <li><Link href="/#projects">Work</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
