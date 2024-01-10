import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const totalAmountSlice = createSlice({
    name:'totalAmount',
    initialState:0,
    reducers: {
        increment: (state, action :PayloadAction<number>)=>{
           return state + action.payload ;
        },
    },
});
  console.log( 'action',totalAmountSlice.actions.increment);
  export const { increment } = totalAmountSlice.actions;
 
export default totalAmountSlice.reducer