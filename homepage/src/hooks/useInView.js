import { useEffect, useRef, useState } from 'react'

const DEFAULT_ROOT_MARGIN = '0px 0px -18% 0px'
const DEFAULT_THRESHOLD = 0.18

export default function useInView({
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = DEFAULT_THRESHOLD,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const target = ref.current

    if (!target) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        rootMargin,
        threshold,
      },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, isVisible]
}
