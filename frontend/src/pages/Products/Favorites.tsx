import {useSelector} from 'react-redux'
import {RootState} from '../../redux/store'
import {selectFavoriteProduct} from '../../redux/features/favorites/favoriteSlice'
import Product from './Product'
import EmptyState from '../../components/common/EmptyState'

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct) || []
    if (!favorites || favorites.length === 0) {
        return (
            <EmptyState 
                title="No favorites found" 
                message="Start adding products to your favorites" 
            />
        )
    }

  return (
    <div className="ml-[10rem]">
        <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
            Favorite Products
        </h1>
        <div className="flex flex-wrap">
            {favorites.map((product: any) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default Favorites