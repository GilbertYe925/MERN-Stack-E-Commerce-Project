import {useEffect, useState} from 'react'
import {FaTrash, FaEdit, FaCheck, FaTimes} from 'react-icons/fa'
import Loader from '../../components/Loader.tsx'
import {toast} from 'react-toastify'
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../redux/api/usersApiSlice.ts'
import Message from '../../components/Message.tsx'

const UserList = () => {
    const {data:users, refetch, isLoading, error} = useGetUsersQuery(undefined)
    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation()
    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation()
    const [editableUserId, setEditableUserId] = useState<string | null>(null)
    const [editableUsername, setEditableUsername] = useState('')
    const [editableUseEmail,  setEditableUserEmail] = useState('')


    useEffect(() => {
        refetch()
    }, [refetch])

    const deleteHandler = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id).unwrap()
                toast.success('User deleted successfully')
            } catch (error: any) {
                toast.error(error.data.message || error.error)
            }
        }
    }

    const updateHandler = async (id: string) => {
        try {
            await updateUser({userId: id, username: editableUsername, email: editableUseEmail}).unwrap()
            setEditableUserId(null)
            refetch()
        }catch (error: any) {
            toast.error(error.data.message || error.error)
        }
    }   

    const toggleEdit = (id: string, username: string, email: string) => {
        setEditableUserId(id)
        setEditableUsername(username)
        setEditableUserEmail(email)
    }

  return (
    <div className='p-4'>
        <h1 className='text-2xl font-semibold mb-4'>User List</h1>
        {isLoading ? (
            <Loader /> 
        ) : error ? (
            <Message variant='danger'>
                {('data' in error && (error.data as any)?.message) || 'An error occurred'}
            </Message>
        ) : (
            <div className='flex flex-col md:flex-row'>
                {/*Admin Menu*/}
                <table className='w-full md:w-4/5 mx-auto'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>NAME</th>
                            <th className='px-4 py-2 text-left'>EMAIL</th>
                            <th className='px-4 py-2 text-left'>ADMIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id}>
                                <td className='px-4 py-2'>{user._id}</td>
                                <td className='px-4 py-2'>
                                    {editableUserId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="text" value={editableUsername} 
                                            onChange={(e) => setEditableUsername(e.target.value)} 
                                            className='w-full rounded-lg p-2' />
                                            <button 
                                            className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg' 
                                            onClick={() => updateHandler(user._id)}
                                            >
                                                <FaCheck />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='flex items-center'> 
                                            {user.username} {" "}
                                            <button 
                                            className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg' 
                                            onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className='ml-[1rem]' />
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className='px-4 py-2'>{editableUserId === user._id ?(
                                    <div className="flex items-center">
                                        <input 
                                        type="text" 
                                        value={editableUseEmail} 
                                        onChange={(e) => setEditableUserEmail(e.target.value)} 
                                        className='w-full rounded-lg p-2' 
                                        />
                                        <button 
                                        className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg' 
                                        onClick={() => updateHandler(user._id)}
                                        >
                                            <FaCheck />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <p>{user.email}</p>
                                        <button 
                                        className='ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg' 
                                        onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                            <FaEdit className='ml-[1rem]' />
                                        </button>
                                    </div>
                                )}
                                </td>
                                <td 
                                className='px-4 py-2'>
                                    {user.isAdmin ? (
                                        <FaCheck className='text-green-500' />
                                    ) : (
                                        <FaTimes className='text-red-500' />
                                    )}
                                </td>
                                <td className='px-4 py-2'>
                                    {!user.isAdmin && (
                                        <div className="flex">
                                            <button 
                                            className='bg-red-500 text-white px-4 py-2 font-bold rounded hover:bg-red-600' 
                                            onClick={() => deleteHandler(user._id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  )
}

export default UserList