/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import store from 'store/store';
import { loginFailure } from 'store/user';

const axiosInstance = axios.create();

async function postRequest<T>(url: string, data: string): Promise<AxiosResponse<T>> {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const token = tokenFromLocalStorage && (JSON.parse(tokenFromLocalStorage) as string);

  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
      if (config.headers) {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'application/json';
      }

      return config;
    },
    (error: AxiosError) => error,
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        store.dispatch(loginFailure('expire token'));
      }
    },
  );

  const response = await axiosInstance.post<T>(url, data);
  return response;
}

export default postRequest;
