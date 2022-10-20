import { User } from 'types/dataTypes';

interface FetchResponse<T> extends Response {
  parsedBody?: T
  status: number
}

export default class AuthService {
  static async login(email: string, password: string): Promise<FetchResponse<User>> {
    const respose: FetchResponse<User> = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    try {
      respose.parsedBody = await respose.json() as User;
    } catch (err) {
      console.error(err);
    }

    if (!respose.ok) {
      throw new Error(respose.statusText);
    }

    return respose;
  }

  static logout() {
    localStorage.setItem('isAuth', JSON.stringify(false));
  }
}
