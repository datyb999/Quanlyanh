import { AxiosResponse } from 'axios';
import { httpsNoToken } from '../config/https.config';
import { IAuthResponse } from '../typeDef/auth.type';
class AuthService {
  authenticated(body: { username: string; password: string }): Promise<AxiosResponse<IAuthResponse>> {
    return httpsNoToken.post('/login', body)
  }
  forgetPassword(body: {username: string, oldPassword: string, newPassword: string}) {
    return httpsNoToken.put('/forget-password', body)
  }
}

export const authService = new AuthService()
