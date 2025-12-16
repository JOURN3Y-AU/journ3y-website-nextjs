'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const useScrollToTop = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Check if there's a hash in the URL (e.g., #section)
    // If there's no hash, scroll to top
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [pathname])
}

export default useScrollToTop
