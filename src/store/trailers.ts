import type { Vehicle } from "./trucks.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchWrapper } from "../utils/FetchWrapper.ts";
import { ServerResponseAPI } from "../app/types.ts";

const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

export interface Trailer extends Vehicle {
    truckNumber?: string;
}

interface TrailersState {
    trailers: Trailer[];
    isLoading: boolean;
    highlight: boolean;
}

export const getTrailers = createAsyncThunk(
    'trailers/getTrailers',
    async () => {
        const response = await fetchWrapper.get<ServerResponseAPI<Trailer[]>>('/vehicles/get-all/trailers');

        if (response.errors) {
            console.error(response.errors);
        }
        return response.data;
    }
);

export const addTrailer = createAsyncThunk(
    'trailers/addTrailer',
    async (trailer: Trailer) => {
        const response = await fetchWrapper.post<ServerResponseAPI<Trailer>>('/vehicles/add/trailer', {
            number: trailer.number
        });

        if (response.errors) {
            console.error(response.errors);
        }
        return trailer;
    }
);

export const trailersSlice = createSlice({
    name: "trailers",
    initialState: {
        trailers: [],
        isLoading: false,
        highlight: false
    } as TrailersState,
    reducers: {
            setHighlightTrailers: (state, action: PayloadAction<boolean>) => {
                state.highlight = action.payload;
            }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrailers.pending, state => {
                state.isLoading = true;
            })
            .addCase(getTrailers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.trailers = action.payload;
                }
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
                state.highlight = true;
            })
    }
});

export default trailersSlice;