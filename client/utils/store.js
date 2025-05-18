import {configureStore} from '@reduxjs/toolkit';
import  userDataReducer from './userSlice';
import roomReducer from './roomSlice';
const appStore = configureStore({
    reducer:{
       user:userDataReducer,
       room:roomReducer,

    }
})
export default appStore;