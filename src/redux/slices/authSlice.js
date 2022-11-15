import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const loginThunk = createAsyncThunk('auth/login', async (arg, thunkAPI) => {
    const { username, password } = arg;
    const response = await authService.login(username, password);
    if (response.errorCode === 0) {
        thunkAPI.dispatch(loadUserThunk());
    }
    return response;
});

export const loadUserThunk = createAsyncThunk('auth/loaduser', async () => {
    const response = await authService.getCurrentUser();
    return response;
});

export const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadUserThunk.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.data.info;
            })
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;