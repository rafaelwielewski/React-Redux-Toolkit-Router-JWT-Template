import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface HistoryState {
  value: string[];
}

const initialState: HistoryState = {
  value: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<string>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { addHistory } = historySlice.actions;

export const selectHistory = (state: RootState) => state.history.value;

export default historySlice.reducer;
