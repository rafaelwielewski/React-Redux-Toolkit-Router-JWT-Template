import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export enum CommandStatus {
  Init = 'init',
  Succeeded = 'succeeded',
  Failed = 'failed'
}
export interface CommandState {
  output: JSX.Element | string | null;
  command: string | null | undefined;
  status: 'init' | 'succeeded' | 'failed';
  args?: string[];
}

const initialState: CommandState = {
  output: null,
  command: null,
  status: 'init',
  args: []
};
const commands: CommandState = {
  output: null,
  command: null,
  status: 'init',
  args: []
};

export const commandSlice = createSlice({
  name: 'command',
  initialState,
  reducers: {
    addCommand: (state, action: PayloadAction<string>) => {
      // state.output = [...state.output, action.payload];
    }
  }
});

export const { addCommand } = commandSlice.actions;

export const selectCommand = (state: RootState) => state.command;

export default commandSlice.reducer;
