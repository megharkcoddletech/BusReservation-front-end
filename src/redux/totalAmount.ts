import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const totalAmountSlice = createSlice({
  name: 'totalAmount',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      return state + action.payload;
    },

    decrement: (state, action: PayloadAction<number>) => {
      return state - action.payload;
    }

  },
});
export const { increment, decrement } = totalAmountSlice.actions;

export default totalAmountSlice.reducer