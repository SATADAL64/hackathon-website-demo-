import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tracks = [
  {
    id: '01',
    title: 'AI / MACHINE LEARNING',
    description: 'Build intelligent systems that learn, predict, and adapt. From NLP to computer vision — push the boundaries of what machines can understand.',
    tags: ['tensorflow', 'pytorch', 'langchain'],
  },
  {
    id: '02',
    title: 'WEB3 / BLOCKCHAIN',
    description: 'Decentralized applications, smart contracts, and trustless systems. Build the infrastructure for a more transparent digital future.',
    tags: ['solidity', 'ethers.js', 'ipfs'],
  },
  {
    id: '03',
    title: 'FINTECH',
    description: 'Reimagine financial services. Payments, lending, insurance, or investment — make money work better for everyone.',
    tags: ['stripe', 'plaid', 'web3'],
  },
  {
    id: '04',
    title: 'HEALTH TECH',
    description: 'Technology that saves lives. Diagnostics, telemedicine, mental health, or fitness — code with purpose.',
    tags: ['fhir', 'tensorflow', 'iot'],
  },
  {
    id: '05',
    title: 'SOCIAL IMPACT',
    description: 'Solutions for education, sustainability, accessibility, and community. Build technology that makes the world more equitable.',
    tags: ['a11y', 'sustainability', 'edtech'],
  },
  {
    id: '06',
    title: 'OPEN INNOVATION',
    description: 'No constraints. Build anything that excites you. The best ideas often come from projects without a predetermined category.',
    tags: ['anything', 'creative', 'experimental'],
  },
]

export default function Tracks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tracks-reveal',
        { y: 50, opacity: 0 },
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
      id="tracks"
      className="relative py-[var(--section-padding)]"
    >
      <div className="container-main relative z-10">
        <div className="tracks-reveal section-label">03 / BRANCHES</div>
        <h2 className="tracks-reveal section-title mb-6">
          Choose your<br />
          <span className="text-[var(--color-accent)]">branch.</span>
        </h2>
        <p className="tracks-reveal section-description mb-16">
          Six tracks. Six problem spaces. Pick the one that resonates with
          your skills and interests — or go rogue with Open Innovation.
        </p>

        {/* Track Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrackCard({ track }: { track: typeof tracks[0] }) {
  return (
    <div className="tracks-reveal group bg-[var(--color-bg-primary)] p-8 relative overflow-hidden cursor-hover transition-all duration-500 hover:bg-[var(--color-bg-secondary)]">
      {/* Track number */}
      <div className="font-display text-6xl font-bold text-[var(--color-bg-elevated)] group-hover:text-[var(--color-accent-muted)] transition-colors duration-500 mb-6 select-none">
        {track.id}
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-3 flex items-center justify-between">
        <span>{track.title}</span>
        <ArrowUpRight
          size={16}
          className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
        />
      </h3>

      {/* Description */}
      <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        {track.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {track.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-wider px-2 py-1 border border-[var(--color-border)] text-[var(--color-text-tertiary)] group-hover:border-[var(--color-border-accent)] group-hover:text-[var(--color-accent)] transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}
