import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMessage } from '../message/messageSlice';
import { loginAsync, logoutAsync } from './authSlice';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { message } = useAppSelector(selectMessage);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    setLoading(true);

    dispatch(loginAsync({ username, password }))
      .unwrap()
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleLogout = async () => {
    dispatch(logoutAsync());
  };

  return (
    <>
      <main className="">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-4 ">
          <h1 className="text-5xl font-title leading-tight tracking-tight text-darker">
            Sign in to your account
          </h1>
          {message}
          <button onClick={handleLogout}></button>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Username
              </label>
              <input
                type="text"
                name="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 dark:focus:border-orange-400"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 dark:focus:border-orange-400"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-dark rounded focus:ring-0 focus:ring-offset-0 hover:outline-orange-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="text-black">Remember me</label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium hover:underline dark:text-black"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-base text-white bg-darker hover:bg-gray-900 focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-black">
              Don’t have an account yet?{' '}
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
