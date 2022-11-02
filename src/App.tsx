import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { addUserData } from './store/user/userSlice'
import { changeIsAuth } from './store/isAuth/isAuthSlice'
import { useGetMeQuery } from './api/authApi'
import { useDispatch } from 'react-redux'

import Registration from './components/Registration'
import UserPage from './components/UserPage'

import './App.css'

function App() {
  const { data, isSuccess } = useGetMeQuery()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addUserData({ id: data._id, status: data.status }))
      if (data.status === 'block') {
        dispatch(changeIsAuth({ isAuth: false }))
      }
      dispatch(changeIsAuth({ isAuth: true }))
    }
  }, [isSuccess, data, dispatch])

  return (
    <div className="App">
      <main>
        <Routes>
          <Route element={<Registration />} path={'/'} />
          <Route element={<UserPage />} path={'/userPage'} />
        </Routes>
      </main>
    </div>
  )
}

export default App
