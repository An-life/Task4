import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IIsAuth } from '../../types/common'

const initialState: IIsAuth = {
  isAuth:false
}

const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    changeIsAuth: (state, action: PayloadAction<IIsAuth>) => {
      state.isAuth = action.payload.isAuth
    },
  },
})

export const { changeIsAuth } = isAuthSlice.actions
export const isAuthReducer = isAuthSlice.reducer