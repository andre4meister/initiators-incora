import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';

async function putRequest<T>(
  url: string,
  data: string,
): Promise<AxiosResponse<T>> {
  const response = await axiosInstance.put<T>(url, data);
  return response;
}

export default putRequest;
