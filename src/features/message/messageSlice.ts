import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: ''
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: '' };
    }
  }
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
