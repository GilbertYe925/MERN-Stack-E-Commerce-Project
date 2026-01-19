import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Hook that scrolls to top when pathname changes
 * Useful for page transitions in React Router
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

/**
 * Utility function to scroll to top immediately
 * Useful for manual scroll-to-top actions
 */
export const scrollToTop = () => {
  window.scrollTo(0, 0)
}
