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
            state.error=null;
        },
        signinFail:(state, action)=>{
            console.log("Payload from reducer when fail", action.payload)
            state.loading=false;
            state.error=action.payload;
            
        },
        signinSuccess:(state, action)=>{
            console.log("Payload from reducer", action);
            state.currentUser=action.payload;
            state.error=null;
            state.loading=false;
        },
        fieldChange:(state)=>{
            state.error=null;
        }
    }
})


export const {
    signinFail, 
    signinStart, 
    signinSuccess,
    fieldChange
}=userSlice.actions;

export default userSlice.reducer;