import { IUserRegistrationData } from '../../types/common';
import { RootState } from '../store';

export const getUserInfo = (state: RootState): IUserRegistrationData => state.user;
