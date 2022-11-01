import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { addUserData } from '../../store/user/userSlice'
import { ILogin } from './types'
import { usePostLoginMutation } from '../../api/authApi'

export const useLogin = (): ILogin => {
  const [login, { data, isSuccess, isLoading, error }] = usePostLoginMutation()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.accessToken)
      dispatch(addUserData({ id: data.user.id, status: data.user.status }))
      navigate('/userPage')
    }
  }, [isSuccess])

  const isLoadingLogin = isLoading
  const loginError = error

  return { login, isLoadingLogin, loginError }
}
