import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const IDLE_SCROLL_DELAY = 120000
const IDLE_SCROLL_DURATION = 1200
const PAGE_SCROLL_DURATION = 820
const PAGE_SCROLL_COOLDOWN = 80
const WHEEL_THRESHOLD = 4
const SNAP_TOLERANCE = 10
const PAGE_SELECTOR = [
  '.intro',
  '.overview-page',
  '.research',
  '.result',
  '.ui1',
  '.ui2',
  '.ui3',
  '.feedback',
].join(', ')
const USER_ACTIVITY_EVENTS = [
  'click',
  'keydown',
  'mousedown',
  'mousemove',
  'pointerdown',
  'touchstart',
]

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)
const getWheelDelta = (event) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
    return event.deltaY * 22
  }

  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
    return event.deltaY * window.innerHeight
  }

  return event.deltaY
}

const isEditableTarget = (target) => (
  target instanceof Element
  && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
)

export default function SmoothScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches

    let idleTimerId = 0
    let idleFrameId = 0
    let idleStartY = 0
    let idleStartTime = 0
    let isIdleReturning = false
    let pageFrameId = 0
    let pageStartY = 0
    let pageTargetY = 0
    let pageStartTime = 0
    let lastPageScrollAt = 0
    let isPageScrolling = false
    let pageStops = []
    let wheelIntent = 0
    let wheelIntentTimer = 0

    const getMaxScroll = () => Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0,
    )

    const refreshPageStops = () => {
      const maxScroll = getMaxScroll()
      const stops = Array.from(document.querySelectorAll(PAGE_SELECTOR))
        .map((element) => Math.round(element.getBoundingClientRect().top + window.scrollY))
        .filter((top) => top >= 0 && top <= maxScroll)
        .map((top) => Math.min(Math.max(top, 0), maxScroll))

      pageStops = [...new Set([0, ...stops, maxScroll].sort((a, b) => a - b))]
    }

    const getPageTarget = (direction) => {
      const currentY = window.scrollY

      if (direction > 0) {
        return pageStops.find((stop) => stop > currentY + SNAP_TOLERANCE) ?? getMaxScroll()
      }

      return [...pageStops].reverse().find((stop) => stop < currentY - SNAP_TOLERANCE) ?? 0
    }

    const stopIdleReturn = () => {
      if (!isIdleReturning) {
        return
      }

      window.cancelAnimationFrame(idleFrameId)
      idleFrameId = 0
      idleStartTime = 0
      isIdleReturning = false
    }

    const stopPageScroll = () => {
      if (!isPageScrolling) {
        return
      }

      window.cancelAnimationFrame(pageFrameId)
      pageFrameId = 0
      pageStartTime = 0
      isPageScrolling = false
    }

    const updatePageScroll = (timestamp) => {
      if (!pageStartTime) {
        pageStartTime = timestamp
      }

      const progress = Math.min((timestamp - pageStartTime) / PAGE_SCROLL_DURATION, 1)
      const nextY = pageStartY + (pageTargetY - pageStartY) * easeOutCubic(progress)

      window.scrollTo({ top: nextY, left: 0, behavior: 'instant' })

      if (progress >= 1) {
        window.scrollTo({ top: pageTargetY, left: 0, behavior: 'instant' })
        isPageScrolling = false
        pageStartTime = 0
        pageFrameId = 0
        lastPageScrollAt = performance.now()
        return
      }

      pageFrameId = window.requestAnimationFrame(updatePageScroll)
    }

    const startPageScroll = (targetY) => {
      stopIdleReturn()
      stopPageScroll()
      isPageScrolling = true
      pageStartY = window.scrollY
      pageTargetY = targetY
      pageFrameId = window.requestAnimationFrame(updatePageScroll)
    }

    const updateIdleReturn = (timestamp) => {
      if (!idleStartTime) {
        idleStartTime = timestamp
      }

      const progress = Math.min((timestamp - idleStartTime) / IDLE_SCROLL_DURATION, 1)
      const nextY = idleStartY * (1 - easeOutCubic(progress))

      window.scrollTo({ top: nextY, left: 0, behavior: 'instant' })

      if (progress >= 1) {
        isIdleReturning = false
        idleStartTime = 0
        idleFrameId = 0
        return
      }

      idleFrameId = window.requestAnimationFrame(updateIdleReturn)
    }

    const returnToTopAfterIdle = () => {
      if (window.scrollY <= 1) {
        return
      }

      stopPageScroll()

      if (prefersReducedMotion) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        return
      }

      stopIdleReturn()
      idleStartY = window.scrollY
      isIdleReturning = true
      idleFrameId = window.requestAnimationFrame(updateIdleReturn)
    }

    const resetIdleTimer = () => {
      stopIdleReturn()
      window.clearTimeout(idleTimerId)
      idleTimerId = window.setTimeout(returnToTopAfterIdle, IDLE_SCROLL_DELAY)
    }

    const handleWheel = (event) => {
      if (
        prefersReducedMotion
        || hasCoarsePointer
        || event.ctrlKey
        || event.metaKey
        || isEditableTarget(event.target)
      ) {
        return
      }

      const delta = getWheelDelta(event)

      event.preventDefault()
      wheelIntent += delta
      window.clearTimeout(wheelIntentTimer)
      wheelIntentTimer = window.setTimeout(() => {
        wheelIntent = 0
      }, 140)

      if (Math.abs(wheelIntent) < WHEEL_THRESHOLD) {
        return
      }

      if (
        isPageScrolling
        || performance.now() - lastPageScrollAt < PAGE_SCROLL_COOLDOWN
      ) {
        return
      }

      resetIdleTimer()

      if (pageStops.length === 0) {
        refreshPageStops()
      }

      const direction = Math.sign(wheelIntent)
      wheelIntent = 0
      const nextTargetY = getPageTarget(direction)

      if (Math.abs(nextTargetY - window.scrollY) > 1) {
        startPageScroll(nextTargetY)
      }
    }

    const handleKeyDown = (event) => {
      if (
        prefersReducedMotion
        || event.defaultPrevented
        || event.ctrlKey
        || event.metaKey
        || event.altKey
        || event.code !== 'Space'
        || isEditableTarget(event.target)
      ) {
        return
      }

      event.preventDefault()

      if (
        isPageScrolling
        || performance.now() - lastPageScrollAt < PAGE_SCROLL_COOLDOWN
      ) {
        return
      }

      resetIdleTimer()

      if (pageStops.length === 0) {
        refreshPageStops()
      }

      const nextTargetY = getPageTarget(event.shiftKey ? -1 : 1)

      if (Math.abs(nextTargetY - window.scrollY) > 1) {
        startPageScroll(nextTargetY)
      }
    }

    const handleResize = () => {
      refreshPageStops()
    }

    const handleLoad = () => {
      refreshPageStops()
    }

    refreshPageStops()
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('load', handleLoad, { passive: true })
    USER_ACTIVITY_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, resetIdleTimer, { passive: true })
    })
    resetIdleTimer()

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleLoad)
      USER_ACTIVITY_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, resetIdleTimer)
      })
      window.clearTimeout(idleTimerId)
      window.clearTimeout(wheelIntentTimer)
      window.cancelAnimationFrame(idleFrameId)
      window.cancelAnimationFrame(pageFrameId)
    }
  }, [pathname])

  return null
}
