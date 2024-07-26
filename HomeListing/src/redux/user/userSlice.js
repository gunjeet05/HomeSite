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
            state.loading=false;
        },
        updateStart:(state)=>{
            state.loading=true;
            state.error=null;
            

        }, 
        updateError:(state, action)=>{
            state.loading=false;
            state.error=action.payload;

            
        }, 
        updateSuccess:(state, action)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=action.payload;
        }




    }
})


export const {
    signinFail, 
    signinStart, 
    signinSuccess,
    fieldChange,
    updateError, 
    updateStart, 
    updateSuccess,
}=userSlice.actions;

export default userSlice.reducer;