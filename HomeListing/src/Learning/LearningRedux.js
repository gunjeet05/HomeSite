/*Redux is a state management tool which can be used for global state management 

*/

/**
 * Things which I learn in redux 
 * 1.I have used redux-toolkit using which we can reduce complexity of state management
 * 2. We have to enclose app with provider which comes from provider 
 * 3.Next thing is we need to setup store.js file 
 * 4.In store.js file we have to provide our object of reducers
 * 5.Here we also have middleware using which we can access the dispatched action before they actully went to reducer
 * 6. Then we have to write a slice methods using createSlice which come from redux-toolkit
 * 7.There we have to provice name, initailState, reducer
 * 
 * 
 */

/**
 * Next thing we want to do is we want to these reducer state to persist
 * For that in store.js we will makes some changes
 * 
 * We will need few things 
 * 1.CombineReducer
 * 2.PersistReducer
 * PersistStore
 * 
 */

