import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { addUserData } from '../../store/user/userSlice'
import { ILogin } from './types'
import { usePostLoginMutation } from '../../api/authApi'

export const useLogin = (): ILogin => {
  const [login, { data, isSuccess, isLoading, error }] = usePostLoginMutation()
  const dispatch = useDispatch()
  let isSuccessLogin = isSuccess

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.accessToken)
      dispatch(addUserData({ id: data.user.id, status: data.user.status }))
    }
  }, [data, dispatch, isSuccess])

  const isLoadingLogin = isLoading
  const loginError = error

  return { isSuccessLogin, login, isLoadingLogin, loginError }
}
