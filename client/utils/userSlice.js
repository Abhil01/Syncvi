import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'userData',
    initialState:{
        usernameapi:"",
        emailIdapi:"",
        passwordapi:"",
    },
    reducers:{
        addData:(state,action)=>{
            state.usernameapi = action.payload.usernameapi;
            state.emailIdapi = action.payload.emailIdapi;
            state.passwordapi = action.payload.passwordapi;

        },
        removeData:(state,action)=>{
            state.usernameapi ="";
            state.emailIdapi = "";
            state.passwordapi = "";
        }
    }
});

export const {addData,removeData} = userSlice.actions;

export default userSlice.reducer;


