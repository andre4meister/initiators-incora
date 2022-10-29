import axios, { AxiosResponse } from 'axios';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse> {
    const response = await axios({
      method: 'POST',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url: `https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_API_LOGIN}`,
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

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
  }
}
