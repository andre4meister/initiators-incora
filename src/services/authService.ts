/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AxiosResponse } from 'axios';
import { TokenInterface } from 'store/sagas/userSaga';
import { User } from 'types/dataTypes';
import { InitialRegistrationFormValues } from 'types/FormTypes';
import getRequest from 'utils/getRequest';
import postRequest from 'utils/postRequest';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const response = await postRequest<Pick<TokenInterface, 'token'>>(
      `${process.env.REACT_APP_API_LOGIN}`,
      JSON.stringify({ email, password }),
    );
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
    const response = await postRequest(
      `${process.env.REACT_APP_API_INVITATION}`,
      JSON.stringify(emails),
    );
    return response;
  }

  static async registration(values: InitialRegistrationFormValues) {
    const response = await postRequest<Pick<TokenInterface, 'token'>>(
      `${process.env.REACT_APP_API_REGISTRATION}`,
      JSON.stringify(values),
    );
    return response;
  }

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
  }
}
