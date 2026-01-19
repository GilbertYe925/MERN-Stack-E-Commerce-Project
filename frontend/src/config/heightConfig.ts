/**
 * Height configuration for scalable page layouts
 * All heights are in pixels and represent the base design dimensions (1920px width)
 */

export const HEIGHT_CONFIG = {
  // Base section height (1080px)
  section: {
    base: 1080,
    // Reduced height sections (70% of base)
    reduced: 1080 * 0.7, // 756px
    // Extended height for double-row sections (1.5 * 0.75 = 1.125x base)
    extended: 1080 * 1.5 * 0.75, // 1215px
  },
  // Footer height (70% of base section)
  footer: 1080 * 0.7, // 756px
}

/**
 * Section type identifiers for height management
 */
export type SectionHeightType = 'base' | 'reduced' | 'extended'

/**
 * Section configuration mapping
 * Maps section identifiers to their height types
 */
export const SECTION_HEIGHT_MAP: Record<string, SectionHeightType> = {
  'hero': 'base',
  'category': 'reduced',
  'collection': 'base',
  'featured': 'reduced',
  'new-arrival': 'base', // Will be extended if double-row
  'footer': 'reduced',
} as const

/**
 * Scaling breakpoints configuration
 */
export const SCALE_CONFIG = {
  baseWidth: 1920,
  minWidth: 1280,
  minScale: 1280 / 1920, // ~0.667
} as const
