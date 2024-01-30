import { configureStore } from "@reduxjs/toolkit";
import totalAmountSlice from './totalAmount'
import UserCred from "./UserCred";
const store = configureStore({
    reducer:{
        totalAmount: totalAmountSlice,
        UserCred: UserCred,
    }
})


export type RootState = ReturnType<typeof store.getState>;

export default store;
export type AppDispatch = typeof store.dispatch;


