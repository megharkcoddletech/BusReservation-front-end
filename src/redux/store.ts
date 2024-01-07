import { configureStore } from "@reduxjs/toolkit";
import totalAmountSlice from './totalAmount'
const store = configureStore({
    reducer:{
        totalAmount: totalAmountSlice,
    }
})


export type RootState = ReturnType<typeof store.getState>;

export default store;
export type AppDispatch = typeof store.dispatch;


