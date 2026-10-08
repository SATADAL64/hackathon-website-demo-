import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: '+', label: 'PARTICIPANTS' },
  { value: 120, suffix: '+', label: 'TEAMS' },
  { value: 48, suffix: '', label: 'HOURS' },
  { value: 6, suffix: '', label: 'TRACKS' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.fromTo('.about-reveal',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )

      // Counter animation
      counterRefs.current.forEach((el, i) => {
        if (!el) return
        const target = stats[i].value
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-[var(--section-padding)] bg-noise"
    >
      <div className="container-main relative z-10">
        {/* Section Label */}
        <div className="about-reveal section-label">01 / THE REPOSITORY</div>

        {/* Main headline */}
        <h2 className="about-reveal section-title mb-8">
          Every great product<br />
          starts as an unfinished<br />
          <span className="text-[var(--color-accent)]">idea.</span>
        </h2>

        {/* Description grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="about-reveal">
            <p className="section-description mb-6">
              The Last Commit is a 48-hour hackathon where developers, designers,
              and builders come together to solve real problems with technology.
              No fluff. No slide decks. Just code, collaboration, and creation.
            </p>
            <p className="section-description">
              Open to students, professionals, and anyone with the drive to build
              something extraordinary. Solo or in teams of up to four — your codebase,
              your rules.
            </p>
          </div>

          <div className="about-reveal space-y-6">
            <InfoBlock
              title="WHAT YOU BUILD"
              text="Working prototypes that tackle challenges across AI, fintech, healthtech, and more. No mockups — real, functional projects."
            />
            <InfoBlock
              title="HOW IT'S JUDGED"
              text="Code quality, innovation, impact, and presentation. Think of it as a thorough code review, not a beauty pageant."
            />
            <InfoBlock
              title="WHY IT MATTERS"
              text="Build your portfolio, meet like-minded people, push your technical limits, and compete for meaningful recognition."
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-border)]">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="about-reveal bg-[var(--color-bg-primary)] p-8 md:p-10 text-center group hover:bg-[var(--color-bg-secondary)] transition-colors duration-300"
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-2">
                <span ref={el => { counterRefs.current[i] = el }}>0</span>
                <span className="text-[var(--color-accent)]">{stat.suffix}</span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-l border-[var(--color-border)] pl-6 hover:border-[var(--color-accent)] transition-colors duration-300">
      <h3 className="font-mono text-xs tracking-[0.15em] text-[var(--color-accent)] mb-2">{title}</h3>
      <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">{text}</p>
    </div>
  )
}
