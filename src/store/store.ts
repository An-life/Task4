import { configureStore } from '@reduxjs/toolkit'

import { authApi } from '../api/authApi'
import { isAuthReducer } from './isAuth/isAuthSlice';
import { userReducer } from './user/userSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
    isAuth: isAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
