import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponseAPI } from "../app/types.ts";
import { FetchWrapper } from "../utils/FetchWrapper.ts";

const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);
const savedUser = JSON.parse(sessionStorage.getItem('user') || 'null');

export interface User {
    name: string;
    email: string;
}

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const getAuth = createAsyncThunk(
    'user/getAuth',
    async () => {
        const response = await fetchWrapper.get<ServerResponseAPI>('/auth/check');
        return response.message == 'User is authenticated';
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: savedUser,
        isAuthenticated: false,
        isLoading: true,
    } as UserState,
    reducers: {
        setInformation: (state, action) => {
            state.user = {
                name: action.payload.name.replace('_', ' '),
                email: action.payload.email
            }
            sessionStorage.setItem('user', JSON.stringify(state.user));
        },
        clearInformation: (state) => {
            state.user = null;
            sessionStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAuth.fulfilled, (state, action) => {
                state.isAuthenticated = action.payload;
                state.isLoading = false;
            })
            .addCase(getAuth.rejected, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
            })
    }
});

export default userSlice;