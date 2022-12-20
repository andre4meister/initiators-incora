import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

async function deleteRequest<T>(url: string): Promise<AxiosResponse<T>> {
  const response = await axiosInstance.delete<T>(url);
  return response;
}

export default deleteRequest;
