import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addUserData } from '../../store/user/userSlice'
import { IRegistration } from './types'
import { usePostRegistrationMutation } from '../../api/authApi'

export const useRegistration = (): IRegistration => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [
    registration,
    { data, isSuccess, isLoading, error },
  ] = usePostRegistrationMutation()

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.accessToken)
      dispatch(addUserData({ id: data.user.id, status: data.user.status }))
      navigate('/userPage')
    }
  }, [isSuccess])

  const isLoadingRegistration = isLoading
  const registrationError = error

  return {
    registration,
    isLoadingRegistration,
    registrationError,
  }
}
