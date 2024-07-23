import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/user/userSlice.js'

import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'//by default it is local storage we can change it to something else
import { version } from 'mongoose'

// import persistReducer from 'redux-persist/es/persistReducer'
// import persistStore from 'redux-persist/lib/persistStore'
const rootReducer=combineReducers({
  user:userReducer,
})

const persistConfig={
  key:'root',
  storage,
  version:1,

  
}

const persistedReducer=persistReducer(persistConfig,rootReducer);



export const store = configureStore({
  reducer: persistedReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


const persistedStore=persistStore(store);
export default persistedStore;
