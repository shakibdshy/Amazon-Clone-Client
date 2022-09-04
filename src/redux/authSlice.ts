import authService from '../service/auth.service';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "../type/user";
import { Jwt } from '../type/Jwt';
import { RootState } from './store';

interface AsyncState {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

interface AuthState extends AsyncState {
    user?: DisplayUser | null;
    jwt?: Jwt;
    isAuthenticated?: boolean;
}

const initialState: AuthState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    user: null,
    jwt: null,
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: DisplayUser, thunkAPI) => {
        try {
            return authService.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to register!');
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.user = action.payload;
        });
        builder.addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
        });
    }
})

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
    return state.auth;
}

export default authSlice.reducer;