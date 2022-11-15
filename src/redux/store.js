import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";

const rootReducer = {
    auth: authSlice
};

export default configureStore ({
    reducer: rootReducer,
});