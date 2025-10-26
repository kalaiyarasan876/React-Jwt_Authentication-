import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/auth/profileSlice";
import imageReducer from "./features/auth/image/imageSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        image: imageReducer,
    }
});

export default store;