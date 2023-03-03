declare module 'MyModels' {
  export type UserCredentials = {
    username: string;
    password: string;
  };

  export type User = {
    firstName: string;
    lastName: string;
    initials: string;
  };
}
