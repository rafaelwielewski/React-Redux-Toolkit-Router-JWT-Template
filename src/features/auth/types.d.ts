declare module 'MyModels' {
  export interface User {
    accessToken: string;
    refreshToken: string;
  }

  export type AuthState = {
    isLoggedIn: boolean;
    user: User;
    error: string;
  };

  export type UserCredentials = {
    username: string;
    password: string;
  };

  export type UserRegister = {
    username: string;
    email: string;
    password: string;
    passwordConf: string;
  };
}
