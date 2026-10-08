import { useEffect, useRef } from 'react'
import { Trophy, Award, Star, Heart, Sparkles, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prizes = [
  {
    position: 'FIRST PLACE',
    label: 'SUCCESSFUL MERGE',
    amount: '₹50,000',
    icon: Trophy,
    benefits: ['Cash prize', 'Mentorship program', 'Featured on platform', 'Startup incubation opportunity'],
    featured: true,
  },
  {
    position: 'SECOND PLACE',
    label: 'APPROVED PR',
    amount: '₹30,000',
    icon: Award,
    benefits: ['Cash prize', 'Industry mentorship', 'Platform showcase'],
    featured: false,
  },
  {
    position: 'THIRD PLACE',
    label: 'REVIEWED',
    amount: '₹15,000',
    icon: Star,
    benefits: ['Cash prize', 'Mentorship session', 'Certificate of excellence'],
    featured: false,
  },
]

const specialPrizes = [
  { title: 'BEST AI HACK', amount: '₹10,000', icon: Sparkles, description: 'Most innovative use of artificial intelligence' },
  { title: 'BEST UI/UX', amount: '₹10,000', icon: Heart, description: 'Most polished and user-centric design' },
  { title: 'BEST BEGINNER HACK', amount: '₹5,000', icon: Star, description: 'Outstanding project by first-time hackers' },
  { title: "PEOPLE'S CHOICE", amount: '₹5,000', icon: Users, description: 'Voted best by fellow participants' },
]

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null)
  const amountRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.prizes-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      )

      // Count up animation for prize amounts
      amountRefs.current.forEach((el, index) => {
        if (!el) return
        const num = parseInt(prizes[index].amount.replace(/[^0-9]/g, ''))
        if (isNaN(num)) return

        const obj = { val: 0 }
        gsap.to(obj, {
          val: num,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = `₹${Math.round(obj.val).toLocaleString('en-IN')}`
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="prizes"
      className="relative py-[var(--section-padding)]"
    >
      <div className="container-main relative z-10">
        <div className="prizes-reveal section-label">05 / REWARDS</div>
        <h2 className="prizes-reveal section-title mb-6">
          Your code,<br />
          <span className="text-[var(--color-accent)]">rewarded.</span>
        </h2>
        <p className="prizes-reveal section-description mb-16">
          Over ₹1,25,000 in prizes. Because building something great
          deserves more than just a certificate.
        </p>

        {/* Main Prizes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--color-border)] mb-24">
          {prizes.map((prize, i) => {
            const Icon = prize.icon
            return (
              <div
                key={prize.position}
                className={`prizes-reveal bg-[var(--color-bg-primary)] p-8 md:p-10 group hover:bg-[var(--color-bg-secondary)] transition-all duration-300 ${
                  prize.featured ? 'relative' : ''
                }`}
              >
                {prize.featured && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-accent)]" />
                )}

                <div className="mb-6 flex items-center justify-between">
                  <Icon
                    size={24}
                    className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                  />
                  <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-text-tertiary)]">
                    0{i + 1}
                  </span>
                </div>

                <div
                  ref={el => { amountRefs.current[i] = el }}
                  className="font-display text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-3"
                >
                  {prize.amount}
                </div>

                <h3 className="font-display text-sm font-bold text-[var(--color-text-primary)] mb-1">
                  {prize.position}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-text-tertiary)] mb-6">
                  {prize.label}
                </p>

                <ul className="space-y-2">
                  {prize.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="font-sans text-xs text-[var(--color-text-secondary)] flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 mt-1 bg-[var(--color-accent)] rounded-full flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Special Prizes */}
        <div className="prizes-reveal">
          <h3 className="font-mono text-xs tracking-[0.15em] text-[var(--color-text-tertiary)] mb-6">
            SPECIAL CATEGORIES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
            {specialPrizes.map((prize) => {
              const Icon = prize.icon
              return (
                <div
                  key={prize.title}
                  className="bg-[var(--color-bg-primary)] p-6 group hover:bg-[var(--color-bg-secondary)] transition-all duration-300"
                >
                  <Icon
                    size={18}
                    className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mb-4"
                  />
                  <h4 className="font-display text-sm font-bold text-[var(--color-text-primary)] mb-1">
                    {prize.title}
                  </h4>
                  <div className="font-display text-xl font-bold text-[var(--color-accent)] mb-2">
                    {prize.amount}
                  </div>
                  <p className="font-sans text-xs text-[var(--color-text-secondary)]">
                    {prize.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
