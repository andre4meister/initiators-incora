import { User } from 'types/dataTypes';
import axios, { AxiosResponse } from 'axios';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<User>> {
    // try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ email, password }),
    });

    if (response.statusText !== 'OK') {
      throw new Error(response.statusText);
    }

    localStorage.setItem('isAuth', JSON.stringify(true));
    localStorage.setItem('userData', JSON.stringify(response.data));

    return response;
    // } catch (err) {
    //   if (axios.isAxiosError(err)) {
    //     throw new Error('Axios error', err);
    //   } else {
    //     throw new Error('Unexpected error', err as Error);
    //   }
    // }
  }

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
    localStorage.setItem('userData', JSON.stringify({}));
  }
}
