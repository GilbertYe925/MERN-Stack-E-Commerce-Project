import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'

const FavoritesCount = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  const favoriteCount = favorites.length
  return (
    <>
      {favoriteCount > 0 && (
        <span className='absolute -top-2 -right-2 text-xs text-black bg-white border border-black rounded-full px-1.5 py-0.5 min-w-[20px] text-center'>
          {favoriteCount}
        </span>
      )}
    </>
  )
}

export default FavoritesCount
