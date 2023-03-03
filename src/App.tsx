import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Command } from './features/command/command';
import { History } from './features/history/history';
import { Login } from './features/auth/login';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { logoutAsync, selectAuth } from './features/auth/authSlice';
import { Route, Routes } from 'react-router-dom';
import AuthVerify from './common/authVerify';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Command />
            </PrivateRoute>
          }
        />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
