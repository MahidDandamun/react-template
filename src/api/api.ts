import axios from "axios";
import { environment } from "../utils/environment";
import { logout } from "../utils/logoutUtils";

const api = axios.create({
    baseURL: environment.API.uri,
    headers: {
      'Content-Type': 'application/json'
    },
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Custom ${token}`
        }
        return config
    },
    error => Promise.reject(error)
);

api.interceptors.response.use(
  response => {
    if (response.status !== 200 && response.status !== 202) {
      logout();
  }
    return response
  },
  error => {
    // if(error && error.response){
    //     const {status} = error.response;
    //     if (status !== 404) {
    //       logout();
    //     }
    // }
    return Promise.reject(error);
 }
);

export default api;

export const apiNoInterceptor = axios.create({
  baseURL: environment.API.uri,
  headers: {
    'Content-Type': 'application/json'
  },
});