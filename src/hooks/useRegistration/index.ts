import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addUserData } from '../../store/user/userSlice';
import { IRegistration } from './types';
import { usePostRegistrationMutation } from '../../api/authApi';

export const useRegistration = (): IRegistration => {
  const dispatch = useDispatch();

  const [registration, { data, isSuccess, isLoading, error }] =
    usePostRegistrationMutation();

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.accessToken);
      dispatch(
        addUserData({ id: data.user.id, status: data.user.status }),
      );
    }
  }, [isSuccess]);

  const isSuccessRegistration = isSuccess;
  const isLoadingRegistration = isLoading;
  const registrationError = error;

  return {
    registration,
    isSuccessRegistration,
    isLoadingRegistration,
    registrationError,
  };
};
