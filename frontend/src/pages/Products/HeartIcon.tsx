import {useEffect} from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {addToFavorites, removeFromFavorites, setFavorites} from '../../redux/features/favorites/favoriteSlice'
import {addFavoriteToLocalStorage, removeFavoriteFromLocalStorage, getFavoritesFromLocalStorage} from '../../utils/localStorage'


const HeartIcon = ({product}: {product: any}) => {
    const dispatch = useDispatch()
    const favorites = useSelector((state: RootState) => state.favorites.favorites) || []
    const isFavorite = favorites.some((p: any) => p._id === product._id)

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    }, [dispatch])

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product))
            removeFavoriteFromLocalStorage(product)
        } else {
            dispatch(addToFavorites(product))
            addFavoriteToLocalStorage(product)
        }
    }

  return (
    <div className='absolute top-2 right-5 cursor-pointer' onClick={toggleFavorite} >
        {isFavorite ? 
        <FaHeart className='text-pink-500' /> 
        : 
        <FaRegHeart className='text-white' />}
    </div>
  )
}

export default HeartIcon