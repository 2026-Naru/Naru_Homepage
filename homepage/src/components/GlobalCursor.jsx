import { useEffect, useState } from 'react'
import './GlobalCursor.css'

export default function GlobalCursor() {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const root = document.documentElement

    const handlePointerMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5

      root.style.setProperty('--pointer-x', `${event.clientX}px`)
      root.style.setProperty('--pointer-y', `${event.clientY}px`)
      root.style.setProperty('--bg-shift-x', `${(-x * 18).toFixed(2)}px`)
      root.style.setProperty('--bg-shift-y', `${(-y * 12).toFixed(2)}px`)
      root.style.setProperty('--mockup-shift-x', `${(x * 18).toFixed(2)}px`)
      root.style.setProperty('--mockup-shift-y', `${(y * 12).toFixed(2)}px`)
      root.style.setProperty('--mockup-shift-x-mobile', `${(x * 10).toFixed(2)}px`)
      root.style.setProperty('--mockup-shift-y-mobile', `${(y * 8).toFixed(2)}px`)
      root.style.setProperty('--mockup-tilt-x', `${(-y * 5).toFixed(2)}deg`)
      root.style.setProperty('--mockup-tilt-y', `${(x * 8).toFixed(2)}deg`)
      setIsActive(true)
    }

    const handlePointerLeave = () => {
      root.style.setProperty('--bg-shift-x', '0px')
      root.style.setProperty('--bg-shift-y', '0px')
      root.style.setProperty('--mockup-shift-x', '0px')
      root.style.setProperty('--mockup-shift-y', '0px')
      root.style.setProperty('--mockup-shift-x-mobile', '0px')
      root.style.setProperty('--mockup-shift-y-mobile', '0px')
      root.style.setProperty('--mockup-tilt-x', '0deg')
      root.style.setProperty('--mockup-tilt-y', '0deg')
      setIsActive(false)
    }

    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div
      className={`global-cursor${isActive ? ' global-cursor--active' : ''}`}
      aria-hidden="true"
    />
  )
}
