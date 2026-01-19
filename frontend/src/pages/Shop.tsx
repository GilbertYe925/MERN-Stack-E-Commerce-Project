import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useGetFilteredProductsQuery} from '../redux/api/productApiSlice'
import {RootState} from '../redux/store'
import {useFetchCategoriesQuery} from '../redux/api/categoryApiSlice'

import {setCategories, setProducts, setChecked, resetFilters} from '../redux/features/shop/shopSlice'

import Loader from '../components/common/Loader'
import ProductCard from '../components/products/ProductCard'
import { getUniqueBrands, filterProductsByBrand, filterProductsByPrice } from '../utils/productFilters'

const Shop = () => {
    const dispatch = useDispatch()
    const {categories, products, checked, radio} = useSelector((state: RootState) => state.shop)
    const categoriesQuery = useFetchCategoriesQuery(undefined)

    const [priceFilter, setPriceFilter] = useState('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const filteredProductsQuery = useGetFilteredProductsQuery({
        checked,
        radio,
      });

    useEffect(() => {
        if (!categoriesQuery.isLoading && categoriesQuery.data) {
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [dispatch, categoriesQuery.data])

    useEffect(() => {
        if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
            let filteredProducts = filteredProductsQuery.data
            
            // Apply brand filter if a brand is selected
            if (selectedBrand) {
                filteredProducts = filterProductsByBrand(filteredProducts, selectedBrand)
            }
            
            // Apply price filter
            filteredProducts = filterProductsByPrice(filteredProducts, priceFilter)
            
            dispatch(setProducts(filteredProducts))
        }
    }, [dispatch, filteredProductsQuery.data, filteredProductsQuery.isLoading, checked, radio, priceFilter, selectedBrand])


    const handleBrandClick = (brand: string) => {
        setSelectedBrand(brand)
        // The useEffect will handle updating products when selectedBrand changes
    }

    const handleCheck = (value: boolean, id: string) => {
        const updatedChecked = value ? [...checked, id]: checked.filter((c: string) => c !== id)
        dispatch(setChecked(updatedChecked))
    }

    const uniqueBrands = getUniqueBrands(filteredProductsQuery.data)

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceFilter(e.target.value)
    }

    const handleReset = () => {
        dispatch(resetFilters())
        setPriceFilter('')
        setSelectedBrand('')
    }

    
  return (
    <>
        <div className="container mx-auto">
        <div className="flex md:flex-row">
            <div className="bg-[#151515] p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
                Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
                {categories?.map((c: any) => (
                <div key={c._id} className="mb-2">
                    <div className="flex ietms-center mr-4">
                    <input
                        type="checkbox"
                        id="red-checkbox"
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                        htmlFor="pink-checkbox"
                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                        {c.name}
                    </label>
                    </div>
                </div>
                ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
                Filter by Brands
            </h2>

            <div className="p-5">
                {uniqueBrands?.map((brand: any) => (
                <div key={brand} className="flex items-enter mr-4 mb-5">
                    <input
                        type="radio"
                        id={brand}
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => handleBrandClick(brand)}
                        className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                        htmlFor={brand}
                        className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                        {brand}
                    </label>
                </div>
                ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
                Filter by Price
            </h2>

            <div className="p-5 w-[15rem]">
                <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring focus:border-pink-300"
                />
            </div>

            <div className="p-5 pt-0">
                <button
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg my-4 transition-colors duration-200"
                onClick={handleReset}
                >
                Reset
                </button>
            </div>
            </div>

            <div className="p-3">
            <h2 className="h4 text-center mb-2">{products?.length} Products</h2>
            <div className="flex flex-wrap">
                {products.length === 0 ? (
                <Loader />
                ) : (
              products?.map((p: any) => (
                <div className="p-3" key={p._id}>
                    <ProductCard product={p} />
                    </div>
                ))
                )}
            </div>
            </div>
        </div>
        </div>
    </>
    );
};
export default Shop