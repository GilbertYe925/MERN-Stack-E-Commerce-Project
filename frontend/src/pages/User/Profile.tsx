import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { toast } from 'react-toastify'
import Loader from '../../components/common/Loader.tsx'
import { setCredentials } from '../../redux/features/auth/authSlice.ts'
import { useProfileMutation } from '../../redux/api/usersApiSlice.ts'
import ProfileNavigation from '../../components/layout/ProfileNavigation.tsx'
import FormInput from '../../components/common/FormInput'
import FormButton from '../../components/common/FormButton'

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
        <div className="bg-component rounded-3xl p-12 w-[72rem] h-[42.5rem] flex flex-col relative">
          <div className="pt-[1.5rem] flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-[3.5rem] text-center whitespace-nowrap leading-[3.5rem]">Update Profile</h1>
            <form onSubmit={submitHandler} className="flex flex-col items-center w-full">
              <div className="w-[43.5rem] space-y-5">
                <FormInput
                  type="text"
                  id="username"
                  placeholder="Username*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loadingUpdateProfile}
                />
                <FormInput
                  type="email"
                  id="email"
                  placeholder="E-mail*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loadingUpdateProfile}
                />
                <FormInput
                  type="password"
                  id="password"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loadingUpdateProfile}
                />
                <FormInput
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loadingUpdateProfile}
                />
                <FormButton
                  type="submit"
                  disabled={loadingUpdateProfile}
                  className="mt-4"
                >
                  {loadingUpdateProfile ? 'Updating...' : 'Update Profile'}
                </FormButton>
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