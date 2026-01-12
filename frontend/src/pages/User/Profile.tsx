import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { toast } from 'react-toastify'
import Loader from '../../components/common/Loader.tsx'
import { setCredentials } from '../../redux/features/auth/authSlice.ts'
import { useProfileMutation } from '../../redux/api/usersApiSlice.ts'
import ProfileNavigation from '../../components/layout/ProfileNavigation.tsx'

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
    <div>
      <ProfileNavigation />
      <div className="flex flex-col mt-10 items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-component rounded-2xl p-12 w-[45rem] h-[44rem] flex flex-col relative">
          <div className="pt-22">
            <h1 className="text-4xl font-bold mb-15 text-center whitespace-nowrap">Update Profile</h1>
            <form onSubmit={submitHandler} className="flex flex-col items-center">
              <div className="w-[28rem]">
                <input
                  type="text"
                  id="username"
                  placeholder="Username*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loadingUpdateProfile}
                />
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loadingUpdateProfile}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loadingUpdateProfile}
                />
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password*"
                  className="p-3 mb-5 border border-gray-300 rounded-2xl w-full bg-white text-text-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loadingUpdateProfile}
                />
                <button
                  type="submit"
                  disabled={loadingUpdateProfile}
                  className="w-full mt-4 bg-black text-white p-3 rounded-2xl border-black border hover:bg-white hover:text-black"
                >
                  {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
              {loadingUpdateProfile && <Loader />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;