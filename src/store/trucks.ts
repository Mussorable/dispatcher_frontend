import { Driver } from "./drivers.ts";
import { Trailer } from "./trailers.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServerResponseAPI } from "../app/types.ts";
import { FetchWrapper } from "../utils/FetchWrapper.ts";

const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

export interface Vehicle {
    number: string;
}

export interface Truck extends Vehicle {
    driver?: Driver;
    trailer?: Trailer;
}

export interface TrucksState {
    trucks: Truck[];
    isLoading: boolean;
    highlight: boolean;
}

export const getTrucks = createAsyncThunk(
    'trucks/getTrucks',
    async () => {
        const response = await fetchWrapper.get<ServerResponseAPI<Truck[]>>('/vehicles/get-all/trucks');

        if (response.errors) {
            console.error(response.errors);
        }
        return response.data;
    }
)

export const addTruck = createAsyncThunk(
    'trucks/addTruck',
    async (truck: Truck) => {
        const response = await fetchWrapper.post<ServerResponseAPI<Truck>>('/vehicles/add/truck', {
            number: truck.number
        });

        if (response.errors) {
            console.error(response.errors);
        }
        console.log(response);
        return truck;
    }
);

export const trucksSlice = createSlice({
    name: "trucks",
    initialState: {
        trucks: [],
        isLoading: false,
        highlight: false
    } as TrucksState,
    reducers: {
        setHighlightTrucks: (state, action: PayloadAction<boolean>) => {
            state.highlight = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrucks.pending, state => {
                state.isLoading = true;
            })
            .addCase(getTrucks.fulfilled, (state, action) => {
                if (action.payload) {
                    state.trucks = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(addTruck.pending, state => {
                state.isLoading = true;
            })
            .addCase(addTruck.fulfilled, (state, action) => {
                const {number} = action.payload;

                state.trucks.push({
                    number
                });
                state.isLoading = false;
                state.highlight = true;
            })
    }
});

export default trucksSlice;