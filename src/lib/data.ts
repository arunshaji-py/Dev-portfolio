export interface Project {
  title: string;
  description: string;
  year: string;
  tag: string;
  stack: string[];
  url?: string;
  github?: string;
}

// ─────────────────────────────────────────────
// EDIT YOUR PROJECTS HERE
// ─────────────────────────────────────────────
export const projects: Project[] = [
  {
    title: 'Staff Rostering System',
    description:
      'AI-powered healthcare staff rostering platform with constraint-based automated scheduling using Google OR-Tools. Features role-based dashboards, real-time shift coverage analytics, availability calendars, and conflict-aware manual assignment — all behind JWT auth.',
    year: '2026',
    tag: 'Full-Stack',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'OR-Tools'],
    github: 'https://github.com/arunshaji-py/staff-rostering-system',
  },
];

// Set to true to show a "More coming soon" placeholder card
export const showComingSoon = true;

// ─────────────────────────────────────────────
// EDIT YOUR TECH STACK HERE
// ─────────────────────────────────────────────
export const techStack = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Python', color: '#306998' },
  { name: 'React', color: '#61dafb' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Node.js', color: '#3c873a' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'SQLAlchemy', color: '#d01f00' },
  { name: 'Vite', color: '#646cff' },
  { name: 'Bootstrap', color: '#7952b3' },
  { name: 'Google OR-Tools', color: '#4285f4' },
  { name: 'REST APIs', color: '#61dafb' },
  { name: 'Git', color: '#f05032' },
  { name: 'CSS', color: '#264de4' },
  { name: 'HTML', color: '#e34c26' },
];

// ─────────────────────────────────────────────
// EDIT YOUR PERSONAL INFO HERE
// ─────────────────────────────────────────────
export const siteConfig = {
  name: 'Arun Shaji',
  role: 'Software Developer',
  tagline: 'I build things for the web',
  description:
    'Software developer crafting full-stack applications with Python and React. I write about the tech that shapes how we build.',
  email: 'hello@yourname.dev',           // ← UPDATE with your email
  github: 'https://github.com/arunshaji-py',
  linkedin: 'https://linkedin.com/in/',  // ← UPDATE with your LinkedIn
  twitter: 'https://twitter.com/',        // ← UPDATE with your Twitter/X
  stats: {
    years: '1+',            // ← UPDATE as you grow
    projects: '1',           // ← UPDATE as you ship more
    techUsed: '10+',
    articles: '6',           // ← matches sample blog posts
  },
  about: [
    'I\'m a software developer who loves building full-stack applications that solve real problems. My first major project — an AI-powered staff rostering system — taught me everything from constraint-based optimisation to building clean, role-based dashboards.',
    'I believe great software is equal parts engineering rigour and creative empathy. The best codebases read like well-edited prose — clear, intentional, and easy to change. That philosophy carries into everything I ship.',
    'When I\'m not coding you\'ll find me writing technical deep-dives, exploring new frameworks, or diving into the latest in AI and optimisation. Always happy to chat about full-stack development, Python, or interesting engineering challenges.',
  ],
};
