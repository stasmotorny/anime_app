import axiosInstance from './axiosConfig';
import {useMutation} from '@tanstack/react-query';
import useUserStore, {User} from '../store/userStore';

type SignInUserQueryParams = {
  password: string;
  email: string;
};

const signInUser = async (params: SignInUserQueryParams) => {
  // console.log('AXIOS_INSTANCE', axiosInstance);
  // console.log('PARAMS', params);
  const {data} = await axiosInstance.post(
    '/auth/sign-in-with-email-and-password',
    params,
  );
  return data.response;
};

export const useSignInUser = () => {
  const {setUser} = useUserStore();
  return useMutation({
    mutationFn: signInUser,
    onSuccess: response => {
      const user = {
        userName: response.username,
        userId: response.id,
        userTokenId: response._tokenResponse.idToken,
        userEmail: response.email,
      };
      if (user) {
        setUser(user as User);
      }
    },
    onError: error => {
      console.log('SIGN_IN_ERROR', error);
      // TODO add some UI element that informs users about errors
    },
  });
};
