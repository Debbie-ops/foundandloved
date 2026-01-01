'use client'

import { useEffect, useRef, useState } from 'react'

export default function useParallax(speed = 0.5) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const elementTop = ref.current.getBoundingClientRect().top
      const elementBottom = ref.current.getBoundingClientRect().bottom
      const windowHeight = window.innerHeight

      // Only apply parallax when element is in view
      if (elementBottom > 0 && elementTop < windowHeight) {
        const scrolled = window.scrollY
        const elementOffset = ref.current.offsetTop
        const distance = scrolled - elementOffset
        setOffset(distance * speed)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [ref, offset]
}
