import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

async function postRequest<T>(url: string, data: string): Promise<AxiosResponse<T>> {
  const response = await axiosInstance.post<T>(url, data);
  return response;
}

export default postRequest;
