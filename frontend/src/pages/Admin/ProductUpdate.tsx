import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation} from '../../redux/api/productApiSlice'
import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'  
import AdminMenu from './AdminMenu'

const ProductUpdate = () => {
    const params = useParams()
    const{data: productData} = useGetProductByIdQuery(params.id)
    const [image, setImage] = useState<string | File | null>(productData?.image || null)
    const [name, setName] = useState(productData?.name || '')
    const [price, setPrice] = useState(productData?.price || '')
    const [quantity, setQuantity] = useState(productData?.quantity || '')
    const [category, setCategory] = useState(productData?.category || '')
    const [brand, setBrand] = useState(productData?.brand || '')
    const [stock, setStock] = useState(productData?.countInStock || '')
    const [description, setDescription] = useState(productData?.description || '')

    const navigate = useNavigate()
    const {data: categories = []} = useFetchCategoriesQuery({})
    const [updateProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if(productData && productData._id){
            setName(productData.name)
            setPrice(productData.price)
            setQuantity(productData.quantity)
            setCategory(productData.category)
            setBrand(productData.brand)
            setStock(productData.countInStock)
            setDescription(productData.description)
            setImage(productData.image)
        }
    }, [productData])

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append("image", file);
        try {
          const res = await updateProductImage(formData).unwrap();
          toast.success("Image uploaded successfully");
          setImage(res.image);
        } catch (err: any) {
          toast.error(err?.data?.message || "Image upload failed");
        }
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          if (typeof image === 'string') {
            formData.append("image", image);
          } else if (image) {
            formData.append("image", image);
          }
          formData.append("name", name);
          formData.append("description", description);
          formData.append("price", price.toString());
          formData.append("category", category);
          formData.append("quantity", quantity.toString());
          formData.append("brand", brand);
          formData.append("countInStock", stock.toString());
    
          // Update product using the RTK Query mutation
          const data = await updateProduct({ productId: params.id!, formData }).unwrap();
          toast.success("Product successfully updated");
          navigate("/admin/allproducts");
        } catch (err: any) {
          toast.error(err?.data?.message || "Product update failed. Try again.");
        }
      };
    
    const handleDelete = async () => {
        try {
          let answer = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (!answer) return;
    
          const data = await deleteProduct({ productId: params.id! }).unwrap();
          toast.success(`Product is deleted`);
          navigate("/admin/allproducts");
        } catch (err: any) {
          toast.error(err?.data?.message || "Delete failed. Try again.");
        }
      };
    
      return (
        <>
          <div className="container  xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
              <AdminMenu />
              <div className="md:w-3/4 p-3">
                <div className="h-12">Update / Delete Product</div>
    
                {image && typeof image === 'string' && (
                  <div className="text-center">
                    <img
                      src={image}
                      alt="product"
                      className="block mx-auto w-full h-[40%]"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="text-black  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                    {typeof image === 'string' ? "Upload image" : image?.name || "Upload image"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={uploadFileHandler}
                      className="hidden"
                    />
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
                    <div className="">
                        <button type="submit" className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6">
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
                        >
                            Delete
                        </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </>
      );
    };

export default ProductUpdate