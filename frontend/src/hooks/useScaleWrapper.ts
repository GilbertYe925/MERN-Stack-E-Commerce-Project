import { useEffect, useRef, useCallback, useMemo } from 'react'
import { HEIGHT_CONFIG, SCALE_CONFIG, SectionHeightType } from '../config/heightConfig'

export interface SectionConfig {
  identifier: string
  heightType: SectionHeightType
  isDoubleRow?: boolean
}

export interface UseScaleWrapperOptions {
  baseWidth?: number
  minWidth?: number
  sections?: SectionConfig[]
  manageHeights?: boolean
  watchChanges?: boolean
  recalculateTrigger?: unknown
}

export const useScaleWrapper = (options: UseScaleWrapperOptions = {}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const {
    baseWidth = SCALE_CONFIG.baseWidth,
    minWidth = SCALE_CONFIG.minWidth,
    sections,
    manageHeights = true,
    watchChanges = true,
    recalculateTrigger,
  } = options

  const calculateScaleFactor = useCallback(() => {
    const viewportWidth = window.innerWidth
    if (viewportWidth >= baseWidth) return 1
    if (viewportWidth >= minWidth) return viewportWidth / baseWidth
    return minWidth / baseWidth
  }, [baseWidth, minWidth])

  const sectionConfigMap = useMemo(() => {
    if (!sections) return null
    return new Map(sections.map(s => [s.identifier, s]))
  }, [sections])

  const applyScale = useCallback(() => {
    if (!wrapperRef.current) return
    const scaleFactor = calculateScaleFactor()
    wrapperRef.current.style.transform = `scale(${scaleFactor})`
    wrapperRef.current.style.transformOrigin = 'top left'
    return scaleFactor
  }, [calculateScaleFactor])

  const getSectionHeight = useCallback((
    dataHeightType: SectionHeightType | null,
    dataIdentifier: string | null,
    hasDoubleRow: boolean
  ): number => {
    if (sectionConfigMap && dataIdentifier) {
      const sectionConfig = sectionConfigMap.get(dataIdentifier)
      if (sectionConfig) {
        if (sectionConfig.isDoubleRow && sectionConfig.heightType === 'base') {
          return HEIGHT_CONFIG.section.extended
        }
        return HEIGHT_CONFIG.section[sectionConfig.heightType]
      }
    }
    
    if (dataHeightType) {
      if (dataHeightType === 'extended' || (dataHeightType === 'base' && hasDoubleRow)) {
        return HEIGHT_CONFIG.section.extended
      }
      return HEIGHT_CONFIG.section[dataHeightType]
    }
    
    return HEIGHT_CONFIG.section.base
  }, [sectionConfigMap])

  const updateSections = useCallback(() => {
    if (!wrapperRef.current) return

    const sectionElements = wrapperRef.current.querySelectorAll<HTMLElement>('section[data-section-id]')

    sectionElements.forEach((sectionElement) => {
      const dataHeightType = sectionElement.getAttribute('data-height-type') as SectionHeightType | null
      const dataIdentifier = sectionElement.getAttribute('data-section-id')
      const hasDoubleRow = sectionElement.classList.contains('double-row-section')
      
      const sectionHeightValue = getSectionHeight(dataHeightType, dataIdentifier, hasDoubleRow)
      
      sectionElement.style.setProperty('--section-height', `${sectionHeightValue}px`)
      sectionElement.style.height = `var(--section-height, ${sectionHeightValue}px)`
      sectionElement.style.minHeight = `var(--section-height, ${sectionHeightValue}px)`
      sectionElement.style.maxHeight = `var(--section-height, ${sectionHeightValue}px)`
    })
  }, [getSectionHeight])

  const updateFooter = useCallback(() => {
    if (!wrapperRef.current) return
      
    const footer = wrapperRef.current.querySelector<HTMLElement>('footer')
    if (footer) {
      const footerHeight = HEIGHT_CONFIG.footer
      footer.style.setProperty('--footer-height', `${footerHeight}px`)
      footer.style.height = `var(--footer-height, ${footerHeight}px)`
      footer.style.minHeight = `var(--footer-height, ${footerHeight}px)`
      footer.style.maxHeight = `var(--footer-height, ${footerHeight}px)`
    }
  }, [])

  const updateHeights = useCallback(() => {
    if (manageHeights) {
      updateSections()
    }
    updateFooter()

    requestAnimationFrame(() => {
      if (!wrapperRef.current) return

      const scaleFactor = calculateScaleFactor()
      const wrapperHeight = wrapperRef.current.offsetHeight || wrapperRef.current.scrollHeight || 0
      const scaledHeight = wrapperHeight * scaleFactor

      const parentContainer = wrapperRef.current.parentElement
      if (parentContainer && scaledHeight > 0) {
        parentContainer.style.height = `${scaledHeight}px`
        parentContainer.style.overflow = 'hidden'
        
        let current: HTMLElement | null = parentContainer.parentElement
        while (current && current !== document.body) {
          current.style.overflowY = 'hidden'
          current = current.parentElement
        }
      }
    })
  }, [manageHeights, updateSections, updateFooter, calculateScaleFactor])

  const updateScale = useCallback(() => {
    applyScale()
    updateHeights()
  }, [applyScale, updateHeights])

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const debouncedUpdateHeights = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(updateHeights, 50)
  }, [updateHeights])

  const handleResize = useCallback(() => {
    applyScale()
    debouncedUpdateHeights()
  }, [applyScale, debouncedUpdateHeights])

  useEffect(() => {
    if (!wrapperRef.current) return

    applyScale()
    requestAnimationFrame(updateHeights)

    window.addEventListener('resize', handleResize)

    let observer: MutationObserver | null = null
    if (watchChanges) {
      observer = new MutationObserver(() => {
        debouncedUpdateHeights()
      })

      observer.observe(wrapperRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
      })
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      observer?.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [applyScale, updateHeights, handleResize, watchChanges, recalculateTrigger])

  return wrapperRef
}
