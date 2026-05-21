import { useEffect } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const PAGE_SCROLL_DURATION = 760
const PAGE_SCROLL_COOLDOWN = 160
const WHEEL_THRESHOLD = 18

const getWheelDelta = (event) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 22
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight
  }

  return event.deltaY * 1.18
}

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)

const canScrollInside = (target, deltaY) => {
  let element = target instanceof Element ? target : null

  while (element && element !== document.body) {
    const style = window.getComputedStyle(element)
    const canScroll = /(auto|scroll)/.test(style.overflowY)

    if (canScroll && element.scrollHeight > element.clientHeight) {
      const isScrollingDown = deltaY > 0
      const hasDownRoom = element.scrollTop + element.clientHeight < element.scrollHeight
      const hasUpRoom = element.scrollTop > 0

      if ((isScrollingDown && hasDownRoom) || (!isScrollingDown && hasUpRoom)) {
        return true
      }
    }

    element = element.parentElement
  }

  return false
}

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches

    if (prefersReducedMotion || hasCoarsePointer) {
      return undefined
    }

    let currentY = window.scrollY
    let targetY = window.scrollY
    let startY = window.scrollY
    let startTime = 0
    let lastScrollAt = 0
    let frameId = 0
    let isAnimating = false

    const getMaxScroll = () => (
      document.documentElement.scrollHeight - window.innerHeight
    )

    const getPageTarget = (direction) => {
      const pageSize = window.innerHeight
      const currentPage = Math.round(window.scrollY / pageSize)
      const nextPage = currentPage + direction

      return clamp(nextPage * pageSize, 0, getMaxScroll())
    }

    const update = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = clamp((timestamp - startTime) / PAGE_SCROLL_DURATION, 0, 1)
      currentY = startY + (targetY - startY) * easeOutCubic(progress)

      if (progress >= 1) {
        currentY = targetY
        window.scrollTo({ top: currentY, left: 0, behavior: 'instant' })
        isAnimating = false
        startTime = 0
        lastScrollAt = performance.now()
        frameId = 0
        return
      }

      window.scrollTo({ top: currentY, left: 0, behavior: 'instant' })
      frameId = window.requestAnimationFrame(update)
    }

    const start = (nextTargetY) => {
      if (isAnimating) {
        return
      }

      isAnimating = true
      startY = window.scrollY
      targetY = nextTargetY
      currentY = window.scrollY
      frameId = window.requestAnimationFrame(update)
    }

    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey || canScrollInside(event.target, event.deltaY)) {
        return
      }

      event.preventDefault()
      const delta = getWheelDelta(event)

      if (
        isAnimating
        || Math.abs(delta) < WHEEL_THRESHOLD
        || performance.now() - lastScrollAt < PAGE_SCROLL_COOLDOWN
      ) {
        return
      }

      const nextTargetY = getPageTarget(Math.sign(delta))

      if (nextTargetY !== window.scrollY) {
        start(nextTargetY)
      }
    }

    const handleScroll = () => {
      if (!isAnimating) {
        currentY = window.scrollY
        targetY = window.scrollY
      }
    }

    const handleResize = () => {
      targetY = clamp(targetY, 0, getMaxScroll())
      currentY = clamp(currentY, 0, getMaxScroll())
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return null
}
