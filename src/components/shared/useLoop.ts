import { type RefObject, useEffect, useRef, useState } from 'react'

/**
 * A muted looping capture that plays while it's on screen, holds still for
 * visitors who asked for less motion, and pauses on a button, since it loops
 * past five seconds. `scripted` turns true once the page runs, so the button
 * shows only where it works.
 */
export function useLoop(): {
  ref: RefObject<HTMLVideoElement | null>
  held: boolean
  toggle: () => void
  scripted: boolean
} {
  const ref = useRef<HTMLVideoElement>(null)
  const [held, setHeld] = useState(false)
  const [seen, setSeen] = useState(false)
  const [scripted, setScripted] = useState(false)

  // React leaves `muted` out of the prerendered HTML, so the browser may refuse to
  // play until the element is muted here. Reduced motion starts it held.
  useEffect(() => {
    const element = ref.current
    if (!element) return
    element.muted = true
    setScripted(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setHeld(true)
    const observer = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (seen && !held) element.play().catch(() => {})
    else element.pause()
  }, [seen, held])

  return { ref, held, toggle: () => setHeld((value) => !value), scripted }
}
