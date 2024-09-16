import axiosInstance from './axiosConfig';
import { useMutation } from '@tanstack/react-query';
import useUserStore, { User } from '../store/userStore'

type SignUpUserQueryParams = {
    password: string;
    email: string;
}

const QUERY_KEY = ['SignUp'];

const signUpUser = async (params: SignUpUserQueryParams) => {
  console.log('AXIOS_INSTANCE', axiosInstance);
  console.log('PARAMS', params);
  const { data } = await axiosInstance.post(`/auth/sign-up-with-email-and-password`, params);
  return data.response;
};

export const useSignUpUser = () => {
  const {setUser} = useUserStore();
  return useMutation({
    mutationFn: signUpUser, 
    onSuccess: (response) => {
        console.log('SIGN_UP_RESPONSE', response);
        const user = {
          userName: response.username,
          userId: response.id,
          userTokenId: response._tokenResponse.idToken,
          userEmail: response.email
        };
        if (user) {
          setUser(user as User);
        }
        console.log('USER', user);
      // invalidate the query cache for 'books'
    //   queryClient.invalidateQueries(BOOK_LIST_QUERY_KEY);
    },
    onError: (error) => {
        console.log('SIGN_IN_ERROR', error);
        // TODO add some UI element that informs users about errors
    },
  });
};