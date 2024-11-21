import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ServerResponseAPI } from "../app/types.ts";
import { FetchWrapper } from "../utils/FetchWrapper.ts";

const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

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
        console.log(response);
        return response.message == 'User is authenticated';
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: true,
    } as UserState,
    reducers: {
        setInformation: (state, action) => {
            state.user = {
                name: action.payload.name,
                email: action.payload.email
            }
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