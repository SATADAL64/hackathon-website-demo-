import { useEffect, useRef, useCallback } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  const updateCursor = useCallback(() => {
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
    }
    if (ringRef.current) {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) scale(${isHovering.current ? 1.8 : 1})`
    }
    requestAnimationFrame(updateCursor)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const handleEnter = () => { isHovering.current = true }
    const handleLeave = () => { isHovering.current = false }

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .cursor-hover').forEach(el => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    }

    document.addEventListener('mousemove', handleMove)
    addHoverListeners()

    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    const animId = requestAnimationFrame(updateCursor)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      observer.disconnect()
      cancelAnimationFrame(animId)
    }
  }, [updateCursor])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#00ff41',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -18,
          left: -18,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(0,255,65,0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 0.15s ease-out',
        }}
      />
      <style>{`* { cursor: none !important; } @media (hover: none) { * { cursor: auto !important; } }`}</style>
    </>
  )
}
