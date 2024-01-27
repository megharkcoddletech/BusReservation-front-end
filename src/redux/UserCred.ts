import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
    id: number,
    name: string,
    password: string,
    username: string,
}

interface LoginDetails {
    user: User[],
    token: string,
    isLogin: boolean,
}

const initialState: LoginDetails = {
    user: [],
    token: '',
    isLogin: false
}

const UserCred = createSlice({
    name: 'userCred',
    initialState,
    reducers: {
        userDetails: (state, action: PayloadAction<User[]>) => {
            console.log('st login', state);
            state.user = action.payload
        },

        userToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }, 
        validUser: (state, action: PayloadAction<boolean>) =>{
            state.isLogin = action.payload
        }
    }
    ,
})

export const { userDetails, userToken, validUser } = UserCred.actions;
export default UserCred.reducer


