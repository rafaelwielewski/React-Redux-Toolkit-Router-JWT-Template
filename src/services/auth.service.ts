import http from './http';
import TokenService from './token.service';
///////////////// ajeitar /////////
class AuthService {
  async login(username: string, password: string) {
    return http
      .post('/auth/signin', {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  async register(username: string, email: string, password: string) {
    return http
      .post('/auth/signup', {
        username,
        email,
        password
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthService();
