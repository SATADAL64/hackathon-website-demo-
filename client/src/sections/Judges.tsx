import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const judges = [
  {
    name: 'Dr. Ananya Sharma',
    role: 'Chief Technology Officer',
    company: 'NexaTech Solutions',
    expertise: 'AI / Deep Learning',
    initials: 'AS',
  },
  {
    name: 'Vikram Patel',
    role: 'Senior Engineering Manager',
    company: 'ScaleUp Labs',
    expertise: 'System Architecture',
    initials: 'VP',
  },
  {
    name: 'Priya Krishnamurthy',
    role: 'VP of Product',
    company: 'FinEdge Capital',
    expertise: 'Fintech / Product Strategy',
    initials: 'PK',
  },
  {
    name: 'Arjun Mehta',
    role: 'Founding Engineer',
    company: 'CloudNine Studios',
    expertise: 'Full-Stack / DevOps',
    initials: 'AM',
  },
  {
    name: 'Dr. Roshni Iyer',
    role: 'Research Scientist',
    company: 'DeepMind India',
    expertise: 'Machine Learning / NLP',
    initials: 'RI',
  },
  {
    name: 'Karthik Reddy',
    role: 'Design Director',
    company: 'Pixel Dynamics',
    expertise: 'UX Design / Interaction',
    initials: 'KR',
  },
]

export default function Judges() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.judges-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="judges"
      className="relative py-[var(--section-padding)] bg-noise"
    >
      <div className="container-main relative z-10">
        <div className="judges-reveal section-label">06 / CODE REVIEWERS</div>
        <h2 className="judges-reveal section-title mb-6">
          Meet the<br />
          <span className="text-[var(--color-accent)]">reviewers.</span>
        </h2>
        <p className="judges-reveal section-description mb-16">
          Industry leaders who will review your code, challenge your
          assumptions, and pick the projects that deserve to be merged.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {judges.map((judge) => (
            <div
              key={judge.name}
              className="judges-reveal bg-[var(--color-bg-primary)] p-8 group hover:bg-[var(--color-bg-secondary)] transition-all duration-500 cursor-hover relative overflow-hidden"
            >
              {/* Avatar placeholder */}
              <div className="w-16 h-16 border border-[var(--color-border)] flex items-center justify-center mb-6 group-hover:border-[var(--color-accent)] transition-colors duration-300">
                <span className="font-display text-lg font-bold text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  {judge.initials}
                </span>
              </div>

              <h3 className="font-display text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-1">
                {judge.name}
              </h3>
              <p className="font-sans text-sm text-[var(--color-text-secondary)] mb-0.5">
                {judge.role}
              </p>
              <p className="font-sans text-sm text-[var(--color-text-tertiary)] mb-4">
                {judge.company}
              </p>

              <div className="font-mono text-[10px] tracking-wider px-2 py-1 border border-[var(--color-border)] text-[var(--color-text-tertiary)] inline-block group-hover:border-[var(--color-border-accent)] group-hover:text-[var(--color-accent)] transition-all duration-300">
                {judge.expertise}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        <p className="judges-reveal font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mt-8 text-center">
          * JUDGE LINEUP IS SUBJECT TO CHANGE. ADDITIONAL REVIEWERS TO BE ANNOUNCED.
        </p>
      </div>
    </section>
  )
}
