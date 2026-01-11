import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    useCreateProductMutation,
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice'
import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'


const ProductList = () => {
    const [image, setImage] = useState<File | null>(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const {data: categories} = useFetchCategoriesQuery({})


    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        const formData = new FormData()
        formData.append('image', file)
        try{
            const res = await uploadProductImage(formData).unwrap()
            setImage(res.image)
            setImageUrl(res.image)
            toast.success('Image uploaded successfully')
        }catch(error: any){
            toast.error(error?.data?.message || error?.error)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!image) {
            toast.error('Please select an image')
            return
        }
        try{
            const productData = new FormData()
            productData.append('image', image)
            productData.append('name', name)
            productData.append('price', price)
            productData.append('quantity', quantity.toString())
            productData.append('brand', brand)
            productData.append('countInStock', stock.toString())
            productData.append('category', category)
            productData.append('description', description)
            const data = await createProduct(productData).unwrap()
            console.log(data)
            
            toast.success('Product created successfully')
            navigate('/')
        }catch(error: any){
            toast.error(error?.data?.message || error?.error)
        }
    }


    
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
            <AdminMenu />
            <div className="md:w-3/4 p-3">
                <div className="h-12">
                    Create Product
                </div>
                {imageUrl && (
                    <div className="text-center">
                        <img src={imageUrl} alt="Product" className="block mx-auto max-h-[200px]" />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="image" className="border text-black px-4 block w-full text-center
                     rounded-lg cursor-pointer font-bold py-11">
                        {image ? image.name : 'Upload Image'}
                        <input 
                        type="file" 
                        id="image" 
                        accept="image/*" 
                        onChange={uploadFileHandler}
                        className="hidden"/>
                    </label>
                </div>
                <form onSubmit={handleSubmit} className="p-3"> 
                    <div className="flex flex-wrap">
                        <div className="one">
                            <label htmlFor="name">
                                Name
                            </label> <br/>
                            <input 
                            type="text" 
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="two ml-5">
                            <label htmlFor="name block">
                                Price
                            </label> <br/>
                            <input 
                            type="number" 
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="one">
                            <label htmlFor="name block">
                                Quantity
                            </label> <br/>
                            <input 
                            type="number" 
                            id="name" 
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="two ml-5">
                            <label htmlFor="name block">
                                Brand
                            </label> <br/>
                            <input 
                            type="text" 
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)} />
                        </div>
                    </div>
                    <label className = "my-5" htmlFor="">
                        Description
                    </label>
                    <textarea 
                    className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}>
                    </textarea>
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="name block">
                                Count In Stock
                            </label><br/>
                            <input 
                            type="text" 
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                            value={stock} 
                            onChange={(e) => setStock(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="">
                                Category
                            </label><br/>
                            <select 
                            className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories?.map((c:any) =>(
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600">
                            Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProductList