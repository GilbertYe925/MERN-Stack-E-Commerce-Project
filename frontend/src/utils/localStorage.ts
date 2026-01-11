export const addFavoriteToLocalStorage = (product: any) => {    
    const favorites = getFavoritesFromLocalStorage()
    if (!favorites.some((p: any) => p._id === product._id)) {
        favorites.push(product)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    
}

export const removeFavoriteFromLocalStorage = (product: any) => {
    const favorites = getFavoritesFromLocalStorage()
    const updateFavorites = favorites.filter((favorite: any) => favorite._id !== product._id)
    localStorage.setItem('favorites', JSON.stringify(updateFavorites))
}


export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem('favorites')
    return favoritesJSON ? JSON.parse(favoritesJSON) : []
}