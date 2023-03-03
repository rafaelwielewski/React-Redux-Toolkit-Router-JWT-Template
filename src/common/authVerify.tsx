import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import tokenService from '../services/token.service';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props: any) => {
  const location = useLocation();

  useEffect(() => {
    const user = tokenService.getUser();
    console.log('inicio');
    console.log(user);
    if (user.accessToken) {
      console.log('kljkl');
      const decodedJwt = parseJwt(user.accessToken);
      console.log(decodedJwt.exp * 1000 - 800000);
      console.log(Date.now());
      if (decodedJwt.exp * 1000 - 800000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return <div></div>;
};

export default AuthVerify;
