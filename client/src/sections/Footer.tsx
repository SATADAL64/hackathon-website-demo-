import { ArrowUpRight, Code, Globe, Users } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Challenges', href: '#challenges' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Register', href: '#register' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: Code },
  { label: 'Instagram', href: 'https://instagram.com', icon: Globe },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Users },
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-[var(--color-border)]">
      <div className="container-main py-16 md:py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              THE LAST<br />
              <span className="text-[var(--color-accent)]">COMMIT</span>
            </h2>
            <p className="font-sans text-sm text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
              Build something worth remembering. A 48-hour hackathon where
              your code becomes your legacy.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-4">
              NAVIGATION
            </h3>
            <nav className="space-y-2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                  className="block font-sans text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-4">
              CONNECT
            </h3>
            <div className="space-y-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-200 group"
                >
                  <Icon size={14} />
                  {label}
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-4">
              STATUS
            </h3>
            <div className="space-y-3">
              <StatusItem label="STATUS" value="ACCEPTING COMMITS" active />
              <StatusItem label="VERSION" value="1.0.0" />
              <StatusItem label="STACK" value="REACT / NODE / PG" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--color-border)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-text-tertiary)]">
            © 2026 THE LAST COMMIT. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-text-tertiary)]">
            BUILT WITH <span className="text-[var(--color-accent)]">♥</span> AND TOO MUCH CAFFEINE
          </p>
        </div>
      </div>
    </footer>
  )
}

function StatusItem({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[9px] tracking-[0.15em] text-[var(--color-text-muted)]">{label}</div>
      <div className={`font-mono text-[11px] tracking-wider ${active ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'}`}>
        {active && <span className="inline-block w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full mr-1.5 animate-pulse" />}
        {value}
      </div>
    </div>
  )
}
