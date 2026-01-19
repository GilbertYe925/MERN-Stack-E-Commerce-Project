/**
 * Category configuration for the home page category section
 * These are static categories with associated images
 */
import cat1 from '../public/cat1.png'
import cat2 from '../public/Cat2.png'
import cat3 from '../public/cat3.png'
import cat4 from '../public/cat4.png'

export interface CategoryItem {
  name: string
  image: string
}

export const HOME_CATEGORIES: CategoryItem[] = [
  { name: 'Fate', image: cat1 },
  { name: 'Sign', image: cat2 },
  { name: 'Omen', image: cat3 },
  { name: 'Destiny', image: cat4 },
]
