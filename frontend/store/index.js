import {createSlice,configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice(
    {
        name:"auth",
        initialState:{user:"",isLogin:false},
        reducers:{
            login(state){
                state.isLogin=true;
            },
            logOut(state){
                state.isLogin=false;
            }
        },
    }
)

export const auth = authSlice.actions;

export const store = configureStore({
    reducer:authSlice.reducer,
})