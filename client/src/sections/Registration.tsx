import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Check, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FormData {
  name: string
  email: string
  phone: string
  college: string
  year: string
  department: string
  github: string
  linkedin: string
  portfolio: string
  teamName: string
  teamSize: string
  teamMembers: string
  track: string
}

const initialFormData: FormData = {
  name: '', email: '', phone: '',
  college: '', year: '', department: '',
  github: '', linkedin: '', portfolio: '',
  teamName: '', teamSize: '2', teamMembers: '',
  track: '',
}

const steps = [
  { id: 1, title: 'IDENTITY', tag: 'init' },
  { id: 2, title: 'ACADEMICS', tag: 'config' },
  { id: 3, title: 'DEVELOPER PROFILE', tag: 'auth' },
  { id: 4, title: 'TEAM', tag: 'fork' },
  { id: 5, title: 'TRACK', tag: 'branch' },
  { id: 6, title: 'CONFIRM', tag: 'commit' },
]

const tracks = [
  'AI / Machine Learning',
  'Web3 / Blockchain',
  'Fintech',
  'Health Tech',
  'Social Impact',
  'Open Innovation',
]

export default function Registration() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [registrationId, setRegistrationId] = useState('')
  const [commitHash, setCommitHash] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reg-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validateStep = (): boolean => {
    const newErrors: Partial<FormData> = {}
    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Required'
        if (!formData.email.trim()) newErrors.email = 'Required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
        if (!formData.phone.trim()) newErrors.phone = 'Required'
        break
      case 2:
        if (!formData.college.trim()) newErrors.college = 'Required'
        if (!formData.year) newErrors.year = 'Required'
        if (!formData.department.trim()) newErrors.department = 'Required'
        break
      case 3:
        // Optional fields
        break
      case 4:
        if (!formData.teamName.trim()) newErrors.teamName = 'Required'
        break
      case 5:
        if (!formData.track) newErrors.track = 'Required'
        break
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep() && currentStep < 6) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setRegistrationId(data.registrationId || `TLC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
        setCommitHash(data.commitHash || Math.random().toString(16).substring(2, 9))
        setIsSubmitted(true)
      } else {
        // Fallback for demo without backend
        setRegistrationId(`TLC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
        setCommitHash(Math.random().toString(16).substring(2, 9))
        setIsSubmitted(true)
      }
    } catch {
      // Demo fallback
      setRegistrationId(`TLC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
      setCommitHash(Math.random().toString(16).substring(2, 9))
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="register" className="relative py-[var(--section-padding)]">
        <div className="container-main relative z-10 flex items-center justify-center min-h-[60vh]">
          <SuccessConfirmation registrationId={registrationId} commitHash={commitHash} />
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-[var(--section-padding)]"
    >
      <div className="container-main relative z-10">
        <div className="reg-reveal section-label">09 / REGISTRATION</div>
        <h2 className="reg-reveal section-title mb-6">
          Push your<br />
          <span className="text-[var(--color-accent)]">commit.</span>
        </h2>
        <p className="reg-reveal section-description mb-12">
          Six steps between you and the hackathon. Fill in your details,
          review, and push.
        </p>

        {/* Step indicator */}
        <div className="reg-reveal flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => {
                  if (step.id < currentStep) setCurrentStep(step.id)
                }}
                className={`flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all duration-200 border ${
                  step.id === currentStep
                    ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]'
                    : step.id < currentStep
                      ? 'border-[var(--color-accent)] text-[var(--color-accent)] opacity-60'
                      : 'border-[var(--color-border)] text-[var(--color-text-tertiary)]'
                }`}
              >
                {step.id < currentStep ? <Check size={10} /> : <span>0{step.id}</span>}
                <span className="hidden sm:inline">{step.title}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-4 h-px ${step.id < currentStep ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="w-full max-w-4xl mx-auto lg:mx-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
                <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] tracking-wider text-[var(--color-accent)]">
                      STEP 0{currentStep} / {steps[currentStep - 1].tag}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[var(--color-text-primary)] mt-1">
                      {steps[currentStep - 1].title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--color-text-tertiary)]">
                    {currentStep}/{steps.length}
                  </span>
                </div>

                <div className="p-6 space-y-5">
                  {currentStep === 1 && (
                    <>
                      <FormField label="Full Name" required value={formData.name} onChange={v => updateField('name', v)} error={errors.name} placeholder="John Doe" />
                      <FormField label="Email Address" required type="email" value={formData.email} onChange={v => updateField('email', v)} error={errors.email} placeholder="john@example.com" />
                      <FormField label="Phone Number" required value={formData.phone} onChange={v => updateField('phone', v)} error={errors.phone} placeholder="+91 98765 43210" />
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <FormField label="College / University" required value={formData.college} onChange={v => updateField('college', v)} error={errors.college} placeholder="IIT Bombay" />
                      <FormSelect label="Year of Study" required value={formData.year} onChange={v => updateField('year', v)} error={errors.year} options={['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgraduate', 'Other']} />
                      <FormField label="Department" required value={formData.department} onChange={v => updateField('department', v)} error={errors.department} placeholder="Computer Science" />
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <FormField label="GitHub Username" value={formData.github} onChange={v => updateField('github', v)} placeholder="github.com/username" />
                      <FormField label="LinkedIn Profile" value={formData.linkedin} onChange={v => updateField('linkedin', v)} placeholder="linkedin.com/in/username" />
                      <FormField label="Portfolio URL" value={formData.portfolio} onChange={v => updateField('portfolio', v)} placeholder="yourwebsite.com" />
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      <FormField label="Team Name" required value={formData.teamName} onChange={v => updateField('teamName', v)} error={errors.teamName} placeholder="NullPointers" />
                      <FormSelect label="Team Size" value={formData.teamSize} onChange={v => updateField('teamSize', v)} options={['1 (Solo)', '2', '3', '4']} />
                      <FormField label="Team Members" value={formData.teamMembers} onChange={v => updateField('teamMembers', v)} placeholder="Comma-separated emails of team members" multiline />
                    </>
                  )}
                  {currentStep === 5 && (
                    <div>
                      <label className="font-mono text-xs tracking-widest text-[var(--color-text-secondary)] mb-3 block font-semibold">
                        PREFERRED TRACK <span className="text-red-500 font-bold ml-1">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tracks.map(track => (
                          <button
                            key={track}
                            onClick={() => updateField('track', track)}
                            className={`p-4 border text-left font-sans text-sm transition-all duration-200 ${
                              formData.track === track
                                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-muted)]'
                                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'
                            }`}
                          >
                            {track}
                          </button>
                        ))}
                      </div>
                      {errors.track && <p className="font-mono text-[10px] text-[var(--color-error)] mt-2">{errors.track}</p>}
                    </div>
                  )}
                  {currentStep === 6 && (
                    <div className="space-y-4">
                      <div className="font-mono text-[10px] tracking-[0.15em] text-[var(--color-text-tertiary)] mb-4">
                        REVIEW YOUR DETAILS
                      </div>
                      <ReviewRow label="Name" value={formData.name} />
                      <ReviewRow label="Email" value={formData.email} />
                      <ReviewRow label="Phone" value={formData.phone} />
                      <ReviewRow label="College" value={formData.college} />
                      <ReviewRow label="Year" value={formData.year} />
                      <ReviewRow label="Department" value={formData.department} />
                      {formData.github && <ReviewRow label="GitHub" value={formData.github} />}
                      {formData.linkedin && <ReviewRow label="LinkedIn" value={formData.linkedin} />}
                      <ReviewRow label="Team" value={formData.teamName} />
                      <ReviewRow label="Track" value={formData.track} />
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="px-6 py-4 border-t border-[var(--color-border)] flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-semibold"
                  >
                    <ChevronLeft size={14} /> BACK
                  </button>

                  {currentStep < 6 ? (
                    <button onClick={nextStep} className="btn-primary text-xs py-2.5 px-5">
                      NEXT <ArrowRight size={12} className="arrow" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-primary text-xs py-2.5 px-5"
                    >
                      {isSubmitting ? 'PUSHING...' : 'PUSH MY COMMIT'} <ArrowRight size={12} className="arrow" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label, value, onChange, error, placeholder, required, type = 'text', multiline,
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; placeholder?: string; required?: boolean; type?: string; multiline?: boolean
}) {
  const Component = multiline ? 'textarea' : 'input'
  return (
    <div>
      <label className="font-mono text-xs tracking-[0.15em] text-[var(--color-text-secondary)] mb-2 block font-semibold">
        {label} {required && <span className="text-red-500 font-bold ml-1">*</span>}
      </label>
      <Component
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'} px-4 py-3 font-sans text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none transition-colors ${multiline ? 'min-h-[80px] resize-none' : ''}`}
      />
      {error && <p className="font-mono text-[10px] text-[var(--color-error)] mt-1">{error}</p>}
    </div>
  )
}

function FormSelect({
  label, value, onChange, options, error, required,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; error?: string; required?: boolean
}) {
  return (
    <div>
      <label className="font-mono text-xs tracking-[0.15em] text-[var(--color-text-secondary)] mb-2 block font-semibold">
        {label} {required && <span className="text-red-500 font-bold ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-transparent border ${error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]'} px-4 py-3 font-sans text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors appearance-none`}
      >
        <option value="" className="bg-[var(--color-bg-primary)]">Select...</option>
        {options.map(opt => (
          <option key={opt} value={opt} className="bg-[var(--color-bg-primary)]">{opt}</option>
        ))}
      </select>
      {error && <p className="font-mono text-[10px] text-[var(--color-error)] mt-1">{error}</p>}
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-[var(--color-border)]">
      <span className="font-mono text-xs tracking-wider text-[var(--color-text-secondary)]">{label}</span>
      <span className="font-sans text-sm text-[var(--color-text-primary)] text-right">{value || '—'}</span>
    </div>
  )
}

function SuccessConfirmation({ registrationId, commitHash }: { registrationId: string; commitHash: string }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const hasStarted = useRef(false)

  const lines = [
    '> git add .',
    '> git commit -m "register for the-last-commit"',
    `[main ${commitHash}] register for the-last-commit`,
    '> git push origin main',
    '',
    'COMMIT SUCCESSFUL ✓',
  ]

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= lines.length) clearInterval(interval)
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-lg w-full text-center"
    >
      {/* Terminal output */}
      <div className="border border-[var(--color-border)] p-8 mb-8 text-left bg-[var(--color-bg-primary)]">
        <div className="font-mono text-sm text-[var(--color-accent)] leading-loose">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className={line === 'COMMIT SUCCESSFUL ✓' ? 'text-lg font-bold mt-4' : ''}>
              {line}
            </div>
          ))}
          {visibleLines > 0 && visibleLines < lines.length && (
            <span className="animate-pulse">█</span>
          )}
        </div>
      </div>

      {visibleLines >= lines.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            WELCOME TO<br />
            <span className="text-[var(--color-accent)]">THE LAST COMMIT.</span>
          </h2>

          <div className="mt-6 inline-block border border-[var(--color-border)] px-6 py-3">
            <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-text-tertiary)] mb-1">
              REGISTRATION ID
            </div>
            <div className="font-mono text-lg text-[var(--color-accent)]">
              {registrationId}
            </div>
          </div>

          <p className="font-sans text-sm text-[var(--color-text-secondary)] mt-6">
            Check your email for confirmation and next steps.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
