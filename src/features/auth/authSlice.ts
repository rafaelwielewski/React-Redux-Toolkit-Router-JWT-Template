import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';
import axios, { AxiosError } from 'axios';
import { AuthState, User, UserCredentials, UserRegister } from 'MyModels';

const user: User = tokenService.getUser();
const initialState: AuthState = user.accessToken
  ? {
      isLoggedIn: true,
      user: user,
      error: ''
    }
  : {
      isLoggedIn: false,
      user: { accessToken: '', refreshToken: '' },
      error: ''
    };

export const registerAsync = createAsyncThunk<AuthState, UserRegister>(
  'auth/register',
  async (userRegister: UserRegister, thunkApi) => {
    if (userRegister.password !== userRegister.passwordConf) {
      thunkApi.dispatch(setError(`Your password doesn't match`));
      return thunkApi.rejectWithValue(`Your password doesn't match`);
    }
    try {
      const response = await authService.register(
        userRegister.username,
        userRegister.email,
        userRegister.password
      );
      console.log(response);
      if (response.status === 200) {
        return response;
      }
    } catch (_error) {
      const error = _error as Error | AxiosError;
      console.log(error);
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(setError(error.response?.data.message));
        return thunkApi.rejectWithValue(error.response?.data.message);
      }
      thunkApi.dispatch(setError(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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
      const error = _error as Error | AxiosError;
      console.log(error);
      if (axios.isAxiosError(error)) {
        thunkApi.dispatch(setError(error.response?.data.message));
        return thunkApi.rejectWithValue(error.response?.data.message);
      }
      thunkApi.dispatch(setError(error.message));
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
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
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
        state.error = '';
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.error = '';
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = { accessToken: '', refreshToken: '' };
        state.error = '';
      });
  }
});

export const { setError, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
