import React from 'react';
import './App.css';
import { Login } from './features/auth/login';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import { Counter } from './features/counter/Counter';
import { Register } from './features/auth/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Counter />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
