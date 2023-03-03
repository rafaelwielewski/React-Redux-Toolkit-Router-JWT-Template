import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import commandReducer from '../features/command/commandSlice';
import historyReducer from '../features/history/historySlice';
import authReducer from '../features/auth/authSlice';
import messageReducer from '../features/message/messageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    command: commandReducer,
    history: historyReducer,
    auth: authReducer,
    message: messageReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
