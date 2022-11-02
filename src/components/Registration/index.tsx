import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { changeIsAuth } from '../../store/isAuth/isAuthSlice'
import { getIsAuthInfo } from '../../store/isAuth/isAuthSelectors'
import { IRegistrationInputs } from './types'
import { getUserInfo } from '../../store/user/userSelectors'
import { useLogin } from './../../hooks/useLogin'
import { useRegistration } from '../../hooks/useRegistration'

import styles from './styles.module.scss'

function Registration(): JSX.Element {
  const [isRegistered, setIsRegistered] = useState(true)
  const [showPassword, setShowPassword] = useState(true)

  const dispatch = useDispatch()

  const userData = useSelector(getUserInfo)
  const {isAuth} = useSelector(getIsAuthInfo)

  const {
    isSuccessRegistration,
    registration,
    isLoadingRegistration,
    registrationError,
  } = useRegistration()

  const { isSuccessLogin, login, isLoadingLogin, loginError } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationInputs>()

  useEffect(() => {
    if (isSuccessRegistration || isSuccessLogin) {
      dispatch(changeIsAuth({ isAuth: true }))
    }
  }, [isSuccessRegistration, isSuccessLogin, dispatch])

  const mouseDownPasswordHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault()
  }

  if (loginError) {
    toast(loginError.data.message)
  }

  if (registrationError) {
    toast(registrationError.data.message)
  }

  const onSubmitHandler = async ({
    name,
    email,
    password,
  }: IRegistrationInputs): Promise<void> => {
    if (!isRegistered) {
      await registration({ name, email, password })
    } else {
      await login({ email, password })
    }
  }

  useEffect(()=>{
    if (userData.status === 'block') {
      dispatch(changeIsAuth({ isAuth: false }))
    }
  }, [dispatch, userData.status])

  if (isAuth) {
    return <Navigate to={'/userPage'} />
  }

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      maxWidth="sm"
    >
      <Box
        component="form"
        sx={{
          width: '300px',
          hight: '600px',
          gap: '40px',
          margin: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'spaceAround',
          flexDirection: 'column',
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {!isRegistered && (
          <TextField
            label="Name"
            variant="outlined"
            {...register('name', {
              required: true,
              minLength: {
                value: 3,
                message: 'Name too short',
              },
            })}
          />
        )}
        {errors.name != null && !isRegistered && (
          <span className={styles.errorMessage}>
            {errors.name.message?.length !== 0
              ? errors.name.message
              : 'This field is required'}
          </span>
        )}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          placeholder="Password"
          {...register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email != null && (
          <span className={styles.errorMessage}>
            {errors.email.message?.length !== 0
              ? errors.email.message
              : 'This field is required'}
          </span>
        )}
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            label="Password"
            {...register('password', { required: true })}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={mouseDownPasswordHandler}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password != null && (
            <span className={styles.errorMessage}>This field is required</span>
          )}
        </FormControl>
        <div className={styles.buttonContainer}>
          {isLoadingLogin || isLoadingRegistration ? (
            <CircularProgress />
          ) : (
            <Button variant="contained" type="submit" size="large">
              Send
            </Button>
          )}
        </div>
        <Box>
          <Button variant="text" onClick={() => setIsRegistered(!isRegistered)}>
            {isRegistered ? 'Sign up' : 'Sign in'}
          </Button>
          {isRegistered
            ? ', if you don`t have account'
            : ', if you have account'}
        </Box>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Box>
    </Container>
  )
}

export default Registration
