import { createSlice } from '@reduxjs/toolkit';


const initialState={
    currentUser:null,
    loading:false ,
    error:null,


}


const userSlice=createSlice({
    name:'user', 
    initialState, 
    reducers:{
        signinStart:(state)=>{
            state.loading=true;
        },
        signinFail:(state, action)=>{
            console.log("Payload from reducer when fail", action)
            state.loading=false;
            state.error=action.payload;
            
        },
        signinSuccess:(state, action)=>{
            console.log("Payload from reducer", action)
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;
        }
    }
})


export const {
    signinFail, 
    signinStart, 
    signinSuccess
}=userSlice.actions;

export default userSlice.reducer;