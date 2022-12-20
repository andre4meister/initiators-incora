import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

async function getRequest<T>(url: string): Promise<AxiosResponse<T>> {
  const response = await axiosInstance.get<T>(url);
  return response;
}

export default getRequest;
