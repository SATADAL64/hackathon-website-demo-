import { useState, useEffect, useRef } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqItems = [
  {
    question: 'Who can participate?',
    answer: 'Anyone with a passion for building — students, professionals, designers, and developers. No experience level requirements. Whether you\'re a first-time hacker or a seasoned developer, you\'re welcome.',
  },
  {
    question: 'Is participation free?',
    answer: 'Yes, The Last Commit is completely free to participate in. We believe great ideas shouldn\'t be gated behind entry fees.',
  },
  {
    question: 'How large can a team be?',
    answer: 'Teams can have 1 to 4 members. Solo participation is allowed, but we recommend teams of 2-4 for the best experience. Don\'t have a team? We\'ll help you find one during team formation.',
  },
  {
    question: 'What technologies can we use?',
    answer: 'Any technology, framework, language, or platform. We don\'t restrict your stack. Use whatever helps you build the best solution. Bonus points for elegant architecture and clean code.',
  },
  {
    question: 'Is the event online or offline?',
    answer: 'The Last Commit is a hybrid event. You can participate from anywhere in the world online, or join us at our physical venue for the full experience. All judging and presentations happen virtually.',
  },
  {
    question: 'How will projects be judged?',
    answer: 'Projects are evaluated on four criteria: Innovation (30%), Technical Implementation (30%), Impact & Feasibility (20%), and Presentation (20%). Think of it as a thorough code review, not a beauty contest.',
  },
  {
    question: 'What should we submit?',
    answer: 'A working prototype with a GitHub repository, a short demo video (max 3 minutes), and a project description. The prototype should be functional — mockups and wireframes alone will not be accepted.',
  },
  {
    question: 'What happens after registration?',
    answer: 'You\'ll receive a confirmation email with your registration ID. A week before the event, you\'ll get access to our Discord server, event schedule, and pre-hackathon resources to help you prepare.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-reveal',
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

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-[var(--section-padding)] bg-noise"
    >
      <div className="container-main relative z-10">
        <div className="faq-reveal section-label">08 / DOCUMENTATION</div>
        <h2 className="faq-reveal section-title mb-6">
          Frequently<br />
          <span className="text-[var(--color-accent)]">asked.</span>
        </h2>
        <p className="faq-reveal section-description mb-16">
          Everything you need to know before pushing your first commit.
        </p>

        <div className="max-w-3xl space-y-px">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="faq-reveal border border-[var(--color-border)] bg-[var(--color-bg-primary)]"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group hover:bg-[var(--color-bg-secondary)] transition-colors duration-200"
                aria-expanded={openIndex === i}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)] tracking-wider flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-sm md:text-base text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200">
                    {item.question}
                  </span>
                </div>
                <div className="text-[var(--color-text-tertiary)] flex-shrink-0">
                  {openIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-[3.25rem]">
                      <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
