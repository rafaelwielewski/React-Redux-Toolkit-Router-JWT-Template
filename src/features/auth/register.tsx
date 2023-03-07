import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginAsync, registerAsync, selectAuth } from './authSlice';
import styles from './auth.module.scss';

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error } = useAppSelector(selectAuth);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const passwordConf = event.currentTarget.passwordConf.value;

    setLoading(true);

    dispatch(registerAsync({ username, email, password, passwordConf }))
      .unwrap()
      .then(() => {
        dispatch(loginAsync({ username, password }))
          .unwrap()
          .then(() => {
            setLoading(true);
            navigate('/');
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <main className={styles.body}>
        <div className={styles.loginBox}>
          <div className={styles.title}>Register</div>
          <div className={styles.error}>{error}</div>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.loginInput}
              type="text"
              name="username"
              placeholder="Username"
              required
            ></input>
            <input
              className={styles.loginInput}
              type="email"
              name="email"
              placeholder="Email"
              required
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="password"
              placeholder="Password"
              required
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              name="passwordConf"
              placeholder="Repeat Password"
              required
            ></input>
            <button className={styles.loginButton}>Sign up</button>
            <div className={styles.linkText}>
              Already have an account?{' '}
              <Link className={styles.link} to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
