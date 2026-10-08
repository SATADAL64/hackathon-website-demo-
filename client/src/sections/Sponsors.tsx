import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sponsors = [
  { name: 'TechCorp', tier: 'PLATINUM' },
  { name: 'InnovateLabs', tier: 'PLATINUM' },
  { name: 'CloudBase', tier: 'GOLD' },
  { name: 'DevStack', tier: 'GOLD' },
  { name: 'DataFlow', tier: 'GOLD' },
  { name: 'CipherSec', tier: 'SILVER' },
  { name: 'QuantumAI', tier: 'SILVER' },
  { name: 'ByteForge', tier: 'SILVER' },
  { name: 'NeuralNet', tier: 'SILVER' },
  { name: 'CodeCraft', tier: 'SILVER' },
]

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.sponsors-reveal',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const platinumSponsors = sponsors.filter(s => s.tier === 'PLATINUM')
  const goldSponsors = sponsors.filter(s => s.tier === 'GOLD')
  const silverSponsors = sponsors.filter(s => s.tier === 'SILVER')

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative py-[var(--section-padding)]"
    >
      <div className="container-main relative z-10">
        <div className="sponsors-reveal section-label">07 / CONTRIBUTORS</div>
        <h2 className="sponsors-reveal section-title mb-6">
          Backed by<br />
          <span className="text-[var(--color-accent)]">builders.</span>
        </h2>
        <p className="sponsors-reveal section-description mb-16">
          Industry partners who believe in the next generation of
          developers and the ideas they bring to life.
        </p>

        {/* Platinum */}
        <div className="sponsors-reveal mb-12">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-6">PLATINUM</div>
          <div className="grid grid-cols-2 gap-px bg-[var(--color-border)]">
            {platinumSponsors.map((s) => (
              <SponsorCard key={s.name} name={s.name} size="large" />
            ))}
          </div>
        </div>

        {/* Gold */}
        <div className="sponsors-reveal mb-12">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-6">GOLD</div>
          <div className="grid grid-cols-3 gap-px bg-[var(--color-border)]">
            {goldSponsors.map((s) => (
              <SponsorCard key={s.name} name={s.name} size="medium" />
            ))}
          </div>
        </div>

        {/* Silver - marquee */}
        <div className="sponsors-reveal">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-6">SILVER</div>
          <div className="overflow-hidden border-y border-[var(--color-border)] py-6">
            <div className="flex animate-marquee gap-12">
              {[...silverSponsors, ...silverSponsors].map((s, i) => (
                <div
                  key={`${s.name}-${i}`}
                  className="flex-shrink-0 font-display text-xl font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 whitespace-nowrap opacity-75 hover:opacity-100"
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="sponsors-reveal font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mt-8 text-center">
          * PLACEHOLDER SPONSORS. ACTUAL PARTNER LOGOS WILL BE ADDED UPON CONFIRMATION.
        </p>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  )
}

function SponsorCard({ name, size }: { name: string; size: 'large' | 'medium' }) {
  return (
    <div
      className={`bg-[var(--color-bg-primary)] flex items-center justify-center group hover:bg-[var(--color-bg-secondary)] transition-all duration-300 cursor-hover ${
        size === 'large' ? 'p-12 md:p-16' : 'p-8 md:p-12'
      }`}
    >
      <span
        className={`font-display font-bold text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 ${
          size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
        }`}
      >
        {name}
      </span>
    </div>
  )
}
