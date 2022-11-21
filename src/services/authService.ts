/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { AxiosResponse } from 'axios';
import { User } from 'types/dataTypes';
import { InitialRegistrationFormValues } from 'types/FormTypes';
import getRequest from 'utils/getRequest';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_LOGIN}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ email, password }),
    });

    if (response.statusText.toLocaleLowerCase() !== 'created') {
      throw new Error(response.statusText);
    }

    localStorage.setItem('isAuth', JSON.stringify(true));

    return response;
  }

  static async profile(): Promise<AxiosResponse<User>> {
    const response = getRequest<User>(`${process.env.REACT_APP_API_PROFILE}`);
    return response;
  }

  static async invite(emails: string[]) {
    const token = JSON.parse(localStorage.getItem('token') || '') as string;

    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_INVITATION}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(emails),
    });

    return response;
  }

  static async registration(values: InitialRegistrationFormValues) {
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_REGISTRATION}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(values),
    });

    return response;
  }

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    window.location.reload();
  }
}
