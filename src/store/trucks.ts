import {Driver} from "./drivers.ts";
import {Trailer} from "./trailers.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ServerResponse, ServerResponseTrucks} from "../app/types.ts";
import {FetchWrapper} from "../utils/FetchWrapper.ts";

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
}

export const getTrucks = createAsyncThunk(
    'trucks/getTrucks',
    async () => {
        const response = await fetchWrapper.get<ServerResponseTrucks>('/vehicles/get-all/trailers');

        if (response.error) {
            console.error(response.error);
        }
        return response.trucks;
    }
)

export const addTruck = createAsyncThunk(
    'trucks/addTruck',
    async (truck: Truck) => {
        const response = await fetchWrapper.post<ServerResponse<string>>('/vehicles/add/truck', {
            number: truck.number
        });

        if (response.error) {
            console.error(response.error);
        }

        return truck;
    }
);

export const trucksSlice = createSlice({
    name: "trucks",
    initialState: {
        trucks: [],
        isLoading: false
    } as TrucksState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTrucks.pending, state => {
                state.isLoading = true;
            })
            .addCase(getTrucks.fulfilled, (state, action) => {
                state.trucks = action.payload;
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
            })
    }
});

export default trucksSlice;