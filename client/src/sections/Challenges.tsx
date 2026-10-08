import { useEffect, useRef, useState } from 'react'
import { Tag, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const challenges = [
  {
    id: '001',
    title: 'How might we make urban mobility smarter?',
    status: 'OPEN',
    track: 'AI / SMART CITY',
    difficulty: 'HARD',
    description: 'Cities are growing faster than their infrastructure. Design an intelligent system that optimizes transportation, reduces congestion, or improves accessibility for urban commuters.',
    constraints: ['Must use real-time data', 'Consider accessibility', 'Scalable architecture'],
    technologies: ['Machine Learning', 'IoT', 'Maps API', 'Real-time Processing'],
  },
  {
    id: '002',
    title: 'How can financial services become more accessible?',
    status: 'OPEN',
    track: 'FINTECH',
    difficulty: 'MEDIUM',
    description: 'Millions remain unbanked or underbanked. Create a solution that democratizes access to financial tools, credit, or investment opportunities for underserved populations.',
    constraints: ['Focus on security', 'Simple UX', 'Regulatory awareness'],
    technologies: ['Payment APIs', 'Blockchain', 'KYC Solutions', 'Mobile-first'],
  },
  {
    id: '003',
    title: 'Can we predict mental health crises before they happen?',
    status: 'OPEN',
    track: 'HEALTH TECH',
    difficulty: 'HARD',
    description: 'Mental health affects one in four people globally. Build a system that identifies early warning signs, provides timely interventions, or connects people with appropriate resources.',
    constraints: ['Privacy-first design', 'Ethical AI', 'Clinical validation path'],
    technologies: ['NLP', 'Wearable Data', 'Sentiment Analysis', 'FHIR'],
  },
  {
    id: '004',
    title: 'How do we make education truly personalized?',
    status: 'OPEN',
    track: 'SOCIAL IMPACT',
    difficulty: 'MEDIUM',
    description: 'One-size-fits-all education fails most students. Design an adaptive learning system that understands individual learning patterns and adjusts content, pace, and methodology accordingly.',
    constraints: ['Works offline', 'Multi-language support', 'Measurable outcomes'],
    technologies: ['Adaptive Learning', 'AI/ML', 'Content Delivery', 'Analytics'],
  },
  {
    id: '005',
    title: 'Build the developer tool you wish existed.',
    status: 'OPEN',
    track: 'OPEN INNOVATION',
    difficulty: 'VARIES',
    description: 'The best developer tools are built by developers who feel the pain. Identify a friction point in your workflow and build the tool that eliminates it.',
    constraints: ['Must be usable in demo', 'Clear value proposition', 'Developer-first UX'],
    technologies: ['CLI', 'VS Code Extensions', 'APIs', 'Open Source'],
  },
]

export default function Challenges() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.challenges-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.06,
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
      id="challenges"
      className="relative py-[var(--section-padding)] bg-noise"
    >
      <div className="container-main relative z-10">
        <div className="challenges-reveal section-label">04 / OPEN ISSUES</div>
        <h2 className="challenges-reveal section-title mb-6">
          Problems worth<br />
          <span className="text-[var(--color-accent)]">solving.</span>
        </h2>
        <p className="challenges-reveal section-description mb-16">
          Each challenge is an open issue waiting for your pull request.
          Pick one that sparks your curiosity.
        </p>

        {/* Issues list */}
        <div className="max-w-4xl space-y-px">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isExpanded={expandedId === challenge.id}
              onToggle={() => setExpandedId(expandedId === challenge.id ? null : challenge.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ChallengeCard({
  challenge,
  isExpanded,
  onToggle,
}: {
  challenge: typeof challenges[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="challenges-reveal border border-[var(--color-border)] bg-[var(--color-bg-primary)] hover:border-[var(--color-border-hover)] transition-colors duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-start md:items-center justify-between gap-4 text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="font-mono text-[10px] tracking-widest text-[var(--color-text-tertiary)]">
              ISSUE #{challenge.id}
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 bg-[var(--color-accent-muted)] text-[var(--color-accent)] tracking-wider border border-[var(--color-border-accent)]">
              {challenge.status}
            </span>
            <span className="flex items-center gap-1 font-mono text-[9px] text-[var(--color-text-tertiary)] tracking-wider">
              <Tag size={10} /> {challenge.track}
            </span>
          </div>
          <h3 className="font-display text-base md:text-lg font-semibold text-[var(--color-text-primary)]">
            {challenge.title}
          </h3>
        </div>
        <div className="text-[var(--color-text-tertiary)] flex-shrink-0">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[var(--color-border)] pt-4">
              <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
                {challenge.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent)] mb-2">CONSTRAINTS</h4>
                  <ul className="space-y-1">
                    {challenge.constraints.map((c) => (
                      <li key={c} className="font-sans text-xs text-[var(--color-text-secondary)] flex items-start gap-2">
                        <span className="text-[var(--color-accent)] mt-0.5">—</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent)] mb-2">TECHNOLOGIES</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {challenge.technologies.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-text-tertiary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-accent)] mb-2">DIFFICULTY</h4>
                  <span className="font-mono text-sm text-[var(--color-text-primary)]">{challenge.difficulty}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
