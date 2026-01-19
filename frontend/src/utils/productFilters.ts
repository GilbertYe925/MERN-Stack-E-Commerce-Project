/**
 * Utility functions for product filtering and manipulation
 */

export interface Product {
  _id: string
  brand?: string
  price: number
  [key: string]: any
}

/**
 * Extracts unique brands from an array of products
 */
export const getUniqueBrands = (products: Product[] | undefined): string[] => {
  if (!products) return []
  
  return Array.from(
    new Set(
      products
        .map((p) => p.brand)
        .filter((brand): brand is string => brand !== undefined)
    )
  )
}

/**
 * Filters products by brand
 */
export const filterProductsByBrand = (
  products: Product[] | undefined,
  brand: string
): Product[] => {
  if (!products) return []
  return products.filter((p) => p.brand === brand)
}

/**
 * Filters products by price (checks if price string is included in price number)
 */
export const filterProductsByPrice = (
  products: Product[] | undefined,
  priceFilter: string
): Product[] => {
  if (!products || !priceFilter) return products || []
  
  return products.filter((product) => 
    product.price.toString().includes(priceFilter) || 
    product.price === parseInt(priceFilter, 10)
  )
}
