import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader.tsx'
import {Link} from 'react-router-dom'
import { setCredentials } from '../../redux/features/auth/authSlice.ts'
import { useProfileMutation } from '../../redux/api/usersApiSlice.ts'

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [updateProfile, { isLoading: loadingUpdateProfile}] = useProfileMutation()
    const { userInfo } = useSelector((state: RootState) => state.auth)
    
    
    useEffect(() => {
        setUsername(userInfo?.username || '')
        setEmail(userInfo?.email || '')
    }, [userInfo.email, userInfo.username])

    const dispatch = useDispatch()

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        } else{
            try {
                const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Profile updated successfully')
            } catch (err: any) {
                toast.error(err.data.message || err.error)
            }
        }

    }


  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
        <div className='flex justify-center align-center md:flex md:space-x-4'>
            <div className='md:w-1/3'>
                <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>
                <form onSubmit={submitHandler}>
                    <div className='mb-4'>
                        <label className='block text-black mb-2'>Name</label>
                        <input 
                        type='text' 
                        placeholder = 'Enter Name'
                        className='form-input p-4 rounded-sm w-full' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-black mb-2'>Email</label>
                        <input 
                        type='text' 
                        placeholder = 'Enter Email'
                        className='form-input p-4 rounded-sm w-full' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-black mb-2'>Password</label>
                        <input 
                        type='password' 
                        placeholder = 'Enter Password'
                        className='form-input p-4 rounded-sm w-full' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-black mb-2'>Confirm Password</label>
                        <input 
                        type='password' 
                        placeholder = 'Confirm Password'
                        className='form-input p-4 rounded-sm w-full' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>

                    <div className="flex justify-between">
                        <button type='submit' className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600'>
                            Update
                        </button>
                        <Link to='/user-orders' className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600'>
                            Orders
                        </Link>
                    </div>
                </form>
            </div>
            
        </div>
    {loadingUpdateProfile && <Loader />}
    </div>
  );
};

export default Profile;