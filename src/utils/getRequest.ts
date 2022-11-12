/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create();

async function getRequest<T>(url: string): Promise<AxiosResponse<T>> {
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

  const response = await axiosInstance.get<T>(url);
  return response;
}

export default getRequest;
