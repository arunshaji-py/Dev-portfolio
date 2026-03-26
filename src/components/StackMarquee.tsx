'use client';

import { techStack } from '@/lib/data';
import styles from './StackMarquee.module.css';

export function StackMarquee() {
  const items = [...techStack, ...techStack]; // duplicate for seamless loop

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {items.map((tech, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.dot} style={{ background: tech.color }} />
            {tech.name}
          </div>
        ))}
      </div>
    </div>
  );
}
