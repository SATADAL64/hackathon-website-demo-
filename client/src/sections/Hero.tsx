import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, Circle } from 'lucide-react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.8 })

      // Title reveal
      tl.fromTo('.hero-line',
        { y: 120, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.12, ease: 'expo.out' }
      )
      // Subtitle
      .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'expo.out' },
        '-=0.5'
      )
      // Meta cards
      .fromTo('.hero-meta-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out' },
        '-=0.4'
      )
      // CTA buttons
      .fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
      // Scroll indicator
      .fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        })
      }
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Subtle parallax on grid
  useEffect(() => {
    if (gridRef.current) {
      gsap.to(gridRef.current, {
        x: mousePos.x * 15,
        y: mousePos.y * 15,
        duration: 1,
        ease: 'power2.out',
      })
    }
  }, [mousePos])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* Background Grid */}
      <div
        ref={gridRef}
        className="absolute inset-[-20px] bg-grid opacity-60"
        style={{ willChange: 'transform' }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Top metadata line */}
        <div className="hero-meta-card font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-tertiary)] mb-12 flex items-center gap-4">
          <span>HACKATHON 2026</span>
          <span className="w-8 h-px bg-[var(--color-border)]" />
          <span>48HR BUILD</span>
        </div>

        {/* Main Title */}
        <div ref={titleRef} className="mb-8">
          <div className="overflow-hidden">
            <h1
              className="hero-line font-display font-bold tracking-[-0.04em] leading-[0.9] text-[var(--color-text-primary)]"
              style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
            >
              THE
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-line font-display font-bold tracking-[-0.04em] leading-[0.9] text-[var(--color-text-primary)]"
              style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
            >
              LAST
            </h1>
          </div>
          <div className="overflow-hidden relative">
            <h1
              className="hero-line font-display font-bold tracking-[-0.04em] leading-[0.9] text-[var(--color-accent)]"
              style={{ fontSize: 'clamp(4rem, 12vw, 11rem)' }}
            >
              COMMIT
            </h1>
            {/* Glitch layers */}
            <h1
              className="hero-line font-display font-bold tracking-[-0.04em] leading-[0.9] text-[var(--color-cyan)] absolute top-0 left-0 pointer-events-none opacity-0"
              style={{
                fontSize: 'clamp(4rem, 12vw, 11rem)',
                animation: 'glitch-1 4s infinite linear',
                opacity: 0.6,
              }}
              aria-hidden="true"
            >
              COMMIT
            </h1>
            <h1
              className="hero-line font-display font-bold tracking-[-0.04em] leading-[0.9] text-[var(--color-error)] absolute top-0 left-0 pointer-events-none"
              style={{
                fontSize: 'clamp(4rem, 12vw, 11rem)',
                animation: 'glitch-2 4s infinite linear',
                opacity: 0.4,
              }}
              aria-hidden="true"
            >
              COMMIT
            </h1>
          </div>
        </div>

        {/* Subtitle Lines */}
        <div className="mb-14 flex flex-col gap-1">
          <p className="hero-subtitle font-sans text-lg md:text-xl text-[var(--color-text-secondary)] tracking-wide">
            Your last commit. Your biggest idea.
          </p>
          <p className="hero-subtitle font-mono text-sm text-[var(--color-text-tertiary)]">
            Build it. Break it. Ship it.
          </p>
        </div>

        {/* Meta Cards */}
        <div ref={metaRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-14">
          <MetaCard label="DURATION" value="48" unit="HOURS" />
          <MetaCard label="FINAL BUILD" value="01" />
          <MetaCard label="POSSIBILITIES" value="∞" />
          <MetaCard
            label="STATUS"
            value={
              <span className="flex items-center gap-2">
                <Circle size={6} fill="#00ff41" className="text-[var(--color-accent)]" />
                OPEN
              </span>
            }
          />
          <MetaCard label="DATE" value="JAN 2026" />
          <MetaCard label="FORMAT" value="HYBRID" />
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-20">
          <a href="#register" className="hero-cta btn-primary">
            REGISTER NOW <ArrowRight size={14} className="arrow" />
          </a>
          <a href="#about" className="hero-cta btn-outline">
            EXPLORE EVENT <ArrowDown size={14} />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--color-text-tertiary)]">
            SCROLL
          </span>
          <motion.div
            className="w-px h-8 bg-[var(--color-accent)]"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  )
}

function MetaCard({ label, value, unit }: { label: string; value: React.ReactNode; unit?: string }) {
  return (
    <div className="hero-meta-card border border-[var(--color-border)] p-4 group hover:border-[var(--color-border-accent)] transition-colors duration-300">
      <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-2">
        {label}
      </div>
      <div className="font-display text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
        {value}
      </div>
      {unit && (
        <div className="font-mono text-[9px] tracking-[0.15em] text-[var(--color-text-tertiary)] mt-1">
          {unit}
        </div>
      )}
    </div>
  )
}


