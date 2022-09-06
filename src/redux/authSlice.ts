import authService from '../service/auth.service';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser, LoginUser } from "../type/user";
import { Jwt } from '../type/Jwt';
import { RootState } from './store';

const ISSERVER = typeof window !== "undefined";

const storedUser: string = ISSERVER ? localStorage.getItem('user') : null;
const user: DisplayUser = storedUser ? null : JSON.parse(storedUser);

const storedJwt: string | null = ISSERVER ? localStorage.getItem('jwt') : null;
const jwt: Jwt = storedJwt ? JSON.parse(storedJwt) : null;

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
    user: user,
    jwt: jwt,
    isLoading: false,
    isSuccess: false,
    isError: false,
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

export const login = createAsyncThunk(
    'auth/login',
    async (user: LoginUser, thunkAPI) => {
        try {
            return authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to Login!');
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        authService.logout();
    }
)

export const verifyJwt = createAsyncThunk(
    'auth/verify-jwt',
    async (jwt: string, thunkAPI) => {
        try {
            return authService.verifyJwt(jwt);
        } catch (error) {
            return thunkAPI.rejectWithValue('Unable to Verify!');
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
        // Register
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

        // Login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.jwt = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.user = null;
            state.isAuthenticated = false;
        });

        // Logout
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.jwt = null;
            state.isAuthenticated = false;
        });

        // Verify Token
        builder.addCase(verifyJwt.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(verifyJwt.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isAuthenticated = action.payload;
        });
        builder.addCase(verifyJwt.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isAuthenticated = false;
        });
    }
})

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
    return state.auth;
}

export default authSlice.reducer;