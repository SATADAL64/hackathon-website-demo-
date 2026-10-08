import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stages = [
  { id: 'idea', title: 'INITIALIZATION', description: 'Form your vision. Identify the problem worth solving.', tag: 'init' },
  { id: 'team', title: 'FORK & CLONE', description: 'Assemble your team. Divide responsibilities. Set up your workspace.', tag: 'team' },
  { id: 'build', title: 'FIRST COMMIT', description: 'Start building. Write the first lines. Lay the foundation.', tag: 'build' },
  { id: 'break', title: 'DEBUG', description: 'Break things. Find edge cases. Stress test your assumptions.', tag: 'debug' },
  { id: 'iterate', title: 'REFACTOR', description: 'Iterate on feedback. Optimize. Polish the rough edges.', tag: 'refactor' },
  { id: 'push', title: 'FINAL PUSH', description: 'Last sprint. Ship the features that matter. Cut what doesn\'t.', tag: 'push' },
  { id: 'demo', title: 'PULL REQUEST', description: 'Present your work. Demonstrate impact. Tell the story.', tag: 'demo' },
  { id: 'merge', title: 'MERGE', description: 'The judges review. Results announced. Your code becomes legacy.', tag: 'merge' },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header reveal
      gsap.fromTo('.timeline-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      )

      // Animate the progress line
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 40%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        )
      }

      // Animate each node
      nodesRef.current.forEach((node, i) => {
        if (!node) return
        gsap.fromTo(node,
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 80%',
              once: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative py-[var(--section-padding)] overflow-hidden"
    >
      <div className="container-main relative z-10">
        {/* Header */}
        <div className="timeline-reveal section-label">02 / COMMIT HISTORY</div>
        <h2 className="timeline-reveal section-title mb-6">
          The journey from<br />
          <span className="text-[var(--color-accent)]">init</span> to{' '}
          <span className="text-[var(--color-accent)]">merge</span>.
        </h2>
        <p className="timeline-reveal section-description mb-20">
          Every hackathon is a compressed development cycle. Here's
          your 48-hour commit history.
        </p>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]">
            <div
              ref={lineRef}
              className="w-full h-full bg-[var(--color-accent)] origin-top"
              style={{ transformOrigin: 'top center' }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {stages.map((stage, i) => (
              <div
                key={stage.id}
                ref={el => { nodesRef.current[i] = el }}
                className="relative flex flex-col md:block items-start"
              >
                {/* Node dot */}
                <div
                  className="absolute left-4 md:left-1/2 top-6 md:top-8 -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="w-4 h-4 border-2 border-[var(--color-accent)] bg-[var(--color-bg-primary)] rounded-full" />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}>
                  <div className="border border-[var(--color-border)] p-6 hover:border-[var(--color-border-accent)] transition-all duration-300 group bg-[var(--color-bg-primary)] relative">
                    <div className="flex items-center gap-3 mb-3" style={{
                      justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                      ...(typeof window !== 'undefined' && window.innerWidth < 768 ? { justifyContent: 'flex-start' } : {})
                    }}>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)]">
                        0{i + 1}
                      </span>
                      <span className="font-mono text-[9px] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-accent)] tracking-wider">
                        {stage.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-2">
                      {stage.title}
                    </h3>

                    <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
