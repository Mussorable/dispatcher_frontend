import type {Vehicle} from "./trucks.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {FetchWrapper} from "../utils/FetchWrapper.ts";
import {ServerResponse, ServerResponseTrailers} from "../app/types.ts";

const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

export interface Trailer extends Vehicle {
    truckNumber?: string;
}

interface TrailersState {
    trailers: Trailer[];
    isLoading: boolean;
}

export const getTrailers = createAsyncThunk(
    'trailers/getTrailers',
    async () => {
        const response = await fetchWrapper.get<ServerResponseTrailers>('/vehicles/get-all/trailers');

        if (response.error) {
            console.error(response.error);
        }
        return response.trailers;
    }
)

export const addTrailer = createAsyncThunk(
    'trailers/addTrailer',
    async (trailer: Trailer) => {
        const response = await fetchWrapper.post<ServerResponse<string>>('/vehicles/add/trailer', {
            number: trailer.number
        });

        if (response.error) {
            console.log(response.error);
        }

        return trailer;
    }
);

export const trailersSlice = createSlice({
    name: "trailers",
    initialState: {
        trailers: [],
        isLoading: false,
    } as TrailersState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTrailers.pending, state => {
                state.isLoading = true;
            })
            .addCase(getTrailers.fulfilled, (state, action) => {
                state.trailers = action.payload;
                state.isLoading = false;
            })
            .addCase(addTrailer.pending, state => {
                state.isLoading = true;
            })
            .addCase(addTrailer.fulfilled, (state, action) => {
                const {number} = action.payload;

                state.trailers.push({
                    number
                });
                state.isLoading = false;
            })
    }
});

export default trailersSlice;