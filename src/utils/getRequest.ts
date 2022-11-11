/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';

const loginisation = {
  email: 'rostykwave@gmail.com',
  password: 'cggiel9qg1',
};
interface TokenType {
  token: string;
}

async function getRequest<T>(url: string): Promise<AxiosResponse<T>> {
  if (!localStorage.getItem('access_token')) {
    const loginResponse = await axios.post<TokenType>(
      'https://initiators-ua.herokuapp.com/auth/login',
      loginisation,
      {},
    );
    if (loginResponse.status < 400) {
      localStorage.setItem('access_token', loginResponse.data.token);
    }
  }
  const response = await axios.get<T>(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return response;
}

export default getRequest;
