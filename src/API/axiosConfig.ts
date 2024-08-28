import axios from 'axios';
// import useUserStore from '../reactiveVariablesStore/userStore';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

// const { userTokenId } = useUserStore();

// userTokenId && (axiosInstance.defaults.headers.common['Authorization'] = userTokenId);

export default axiosInstance;