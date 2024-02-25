
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlices'; // Updated import path


export default configureStore({
  reducer: {
    user: userReducer,
    // Добавьте другие редьюсеры здесь, если они у вас есть
  },
});
