import { IIsAuth } from './../../types/common';
import { RootState } from '../store'

export const getIsAuthInfo = (state: RootState): IIsAuth =>
  state.isAuth