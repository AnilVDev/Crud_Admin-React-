import { configureStore } from '@reduxjs/toolkit';
import userlistSliceReducer from '../features/userlistSlice';
import userEditReducer from '../features/userEditSlice';
import addUserSliceReducer from '../features/addUserSlice';
import userloginSliceReducer from '../features/userLoginSlice';


export const store = configureStore({
  reducer: {
    userlist : userlistSliceReducer,
    userEdit : userEditReducer,
    addUser : addUserSliceReducer,
    userlogin : userloginSliceReducer,
  },
});