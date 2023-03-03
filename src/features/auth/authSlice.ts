import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import authService from '../../services/auth.service';
import { setMessage } from '../message/messageSlice';
import tokenService from '../../services/token.service';

export interface User {
  accessToken: string;
  refreshToken: string;
}

const user: User = tokenService.getUser();
const initialState: AuthState = user.accessToken
  ? {
      isLoggedIn: true,
      user: user
    }
  : {
      isLoggedIn: false,
      user: { accessToken: '', refreshToken: '' }
    };
console.log(initialState);

export interface AuthState {
  isLoggedIn: boolean;
  user: User;
}

export type UserCredentials = {
  username: string;
  password: string;
};

export const loginAsync = createAsyncThunk<AuthState, UserCredentials>(
  'auth/login',
  async (userCredentials: UserCredentials, thunkApi) => {
    console.log(userCredentials);
    try {
      const response = await authService.login(
        userCredentials.username,
        userCredentials.password
      );
      if (response.accessToken) {
        return response;
      }
    } catch (_error) {
      const error = _error as Error;
      console.log(error);
      thunkApi.dispatch(setMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshToken: (state, { payload }) => {
      state.user.accessToken = payload.acessToken;
      state.user.refreshToken = payload.refreshToken;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload.user;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = { accessToken: '', refreshToken: '' };
      });
  }
});

export const { refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
