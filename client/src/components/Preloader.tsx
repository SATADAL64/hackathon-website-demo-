import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

const bootLines = [
  '> initializing system...',
  '> loading kernel modules...',
  '> establishing connection...',
  '> authenticating credentials...',
  '> mounting filesystem...',
  '> compiling assets...',
  '> starting dev server...',
  '> THE LAST COMMIT v1.0.0',
  '> ready.',
]

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    let currentLine = 0
    const interval = setInterval(() => {
      currentLine++
      setVisibleLines(currentLine)
      if (currentLine >= bootLines.length) {
        clearInterval(interval)
        setTimeout(() => {
          setShow(false)
          setTimeout(onComplete, 600)
        }, 400)
      }
    }, 120)

    return () => clearInterval(interval)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            backgroundColor: '#050606',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ maxWidth: 540, width: '100%', padding: '0 2rem' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                color: '#00ff41',
                lineHeight: 1.9,
              }}
            >
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  style={{
                    opacity: i === visibleLines - 1 ? 1 : 0.5,
                    transition: 'opacity 0.3s',
                  }}
                >
                  {line}
                  {i === visibleLines - 1 && (
                    <span
                      style={{
                        animation: 'blink 1s step-end infinite',
                        marginLeft: 2,
                      }}
                    >
                      █
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: '2rem',
                height: 2,
                backgroundColor: 'rgba(0,255,65,0.15)',
                position: 'relative',
                borderRadius: 1,
              }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(visibleLines / bootLines.length) * 100}%` }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  backgroundColor: '#00ff41',
                  borderRadius: 1,
                  boxShadow: '0 0 10px rgba(0,255,65,0.5)',
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
