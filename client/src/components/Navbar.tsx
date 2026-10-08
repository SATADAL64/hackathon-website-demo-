import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navItems = [
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'tracks', href: '#tracks' },
  { label: 'timeline', href: '#timeline' },
  { label: 'challenges', href: '#challenges' },
  { label: 'prizes', href: '#prizes' },
  { label: 'faq', href: '#faq' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    })

    // Observe all sections
    setTimeout(() => {
      navItems.forEach(({ href }) => {
        const el = document.querySelector(href)
        if (el) observer.observe(el)
      })
    }, 1000)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#050606]/90 backdrop-blur-xl border-b border-[var(--color-border)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="font-mono text-sm tracking-wider text-[var(--color-accent)] hover:opacity-80 transition-opacity"
          >
            ~/the-last-commit
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleNavClick(href)}
                className={`relative px-3 py-2 font-mono text-xs tracking-wider transition-colors duration-200 ${
                  activeSection === label.replace('#', '')
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                <span className="text-[var(--color-text-tertiary)]">$ </span>
                {label}
                {activeSection === label && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-px bg-[var(--color-accent)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Register Button */}
          <a
            href="#register"
            onClick={(e) => { e.preventDefault(); handleNavClick('#register') }}
            className="hidden lg:flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-wider border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg-primary)] transition-all duration-200"
          >
            REGISTER <ArrowRight size={12} className="arrow" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-[var(--color-text-primary)]"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[#050606]/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavClick(href)}
                  className="font-display text-2xl tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <span className="font-mono text-xs text-[var(--color-text-tertiary)] mr-3">
                    0{i + 1}
                  </span>
                  {label}
                </motion.button>
              ))}

              <motion.a
                href="#register"
                onClick={(e) => { e.preventDefault(); handleNavClick('#register') }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.4 }}
                className="mt-6 btn-primary"
              >
                REGISTER <ArrowRight size={14} />
              </motion.a>
            </div>

            {/* Bottom metadata */}
            <div className="absolute bottom-8 font-mono text-[10px] text-[var(--color-text-tertiary)] tracking-widest">
              THE LAST COMMIT © 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
