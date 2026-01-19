/**
 * Utility functions for pagination calculations
 */

/**
 * Calculates paginated items from an array
 * @param items - Array of items to paginate
 * @param currentPage - Current page number (1-indexed)
 * @param itemsPerPage - Number of items per page
 * @returns Object containing paginated items and total pages
 */
export const paginate = <T>(
  items: T[] | undefined,
  currentPage: number,
  itemsPerPage: number
): { paginatedItems: T[]; totalPages: number } => {
  if (!items || items.length === 0) {
    return { paginatedItems: [], totalPages: 0 }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = items.slice(startIndex, endIndex)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  return { paginatedItems, totalPages }
}
