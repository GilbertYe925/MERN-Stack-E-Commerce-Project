import React from 'react'
import {useState} from 'react'
import { toast } from 'react-toastify'
import {
    useFetchCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation 
} from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/forms/CategoryForm'
import Modal from '../../components/common/Modal'
import AdminMenu from './AdminMenu'

const CategoryList = () => {
    const {data: categories} = useFetchCategoriesQuery(null)
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)


    
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()


    const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!name) {
            toast.error('Category name is required')
            return
        }
        try{
            const result = await createCategory({name}).unwrap()
            if (result.error) {
                toast.error(result.error)
                return
            }else{
                setName('')
                toast.success(`${result.name} is created`)
            }
        } catch (error:any){
            console.log(error)
            toast.error('Something went wrong')
        }
    }


    const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!updatingName) {
            toast.error('Category name is required')
            return
        }
        if (!selectedCategory) {
            toast.error('No category selected')
            return
        }
        try{
            const result = await updateCategory({categoryId: selectedCategory, updatedCategory: {name: updatingName}}).unwrap()
            if (result.error) {
                toast.error(result.error)
                return
            }else{
                setModalVisible(false)
                setSelectedCategory(null)
                setUpdatingName('')
                toast.success(`${result.name} is updated`)
            }
        } catch (error:any){
            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const handleDeleteCategory = async () => {
        if (!selectedCategory) {
            toast.error('No category selected')
            return
        }
        try{
            const result =await deleteCategory(selectedCategory).unwrap()
            if (result.error) {
                toast.error(result.error)
                return
            }else{
                setModalVisible(false)
                setSelectedCategory(null)
                setUpdatingName('')
                toast.success(`${updatingName} is deleted`)
            }
        }
        catch (error:any){
            console.log(error)
            toast.error('Category deleted failed')
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
            <div className="h-12">
                Manage Categories
            </div>
            <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
            button="Create Category"
            />
            <br />
            <hr className="my-3" />
            <div className="flex flex-wrap gap-2">
                {categories?.map((category: any) => (
                    <div key={category._id} className="flex justify-between items-center">
                        <button 
                        className="bg-white border border-pink-500 text-pink-500 
                        px-4 py-2 rounded-lg m-3 hover:bg-pink-500 hover:text-white 
                        ocus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                        onClick={() => {setModalVisible(true); setSelectedCategory(category._id); setUpdatingName(category.name);}}>
                        {category.name}
                    </button>
                    </div>
                ))}
            </div>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} title="Update Category">
                <CategoryForm 
                value={updatingName} 
                setValue={value => setUpdatingName(value)} 
                handleSubmit={handleUpdateCategory} 
                button="Update Category" 
                handleDelete={selectedCategory ? handleDeleteCategory : undefined}/>
            </Modal>
        </div>
    </div>
  );
};

export default CategoryList;