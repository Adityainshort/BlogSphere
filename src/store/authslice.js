import { createSlice } from "@reduxjs/toolkit";

const InitialState ={
    userData : null,
    status : false
}

const authslice = createSlice({
    name: "auth",
    initialState:InitialState,
    reducers:{
        login :(state,action)=>{
            console.log("action",action.payload);
            
            state.userData = action.payload.userData
            state.status = true
        },
        logout :(state)=>{
            state.userData = null
            state.status = false
        }
    }
})

export default authslice.reducer
export const {login,logout} = authslice.actions