import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {FetchWrapper} from "../utils/FetchWrapper.ts";
import {ServerResponse, ServerResponseAPI} from "../app/types.ts";

const fetchWrapper = new FetchWrapper(import.meta.env.VITE_TEST_URL);

export interface Driver {
    number: string;
    fullName: string;
    driverLicense: string;
}

interface DriversState {
    drivers: Driver[];
    isLoading: boolean;
    highlight: boolean;
}

export const getDrivers = createAsyncThunk(
    'drivers/getDrivers',
    async () => {
        const response = await fetchWrapper.get<ServerResponseAPI<Driver[]>>('/drivers/get-all');

        if (response.errors) {
            console.error(response.errors);
            return;
        }
        return response.data;
    }
);

export const addDriver = createAsyncThunk(
    'drivers/addDriver',
    async (newDriver: Driver) => {
        const response = await fetchWrapper.post<ServerResponse<string>, Driver>('/drivers/add', {
            number: newDriver.number,
            fullName: newDriver.fullName,
            driverLicense: newDriver.driverLicense
        });

        if (response.error) {
            console.log(response.error);
        }
        return newDriver;
    }
);

const driversSlice = createSlice({
    name: "drivers",
    initialState: {
        drivers: [],
        isLoading: false,
        highlight: false
    } as DriversState,
    reducers: {
        setHighlightDrivers: (state, action: PayloadAction<boolean>) => {
            state.highlight = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDriver.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addDriver.fulfilled, (state, action) => {
                const {number, fullName, driverLicense} = action.payload;

                state.drivers.push({
                    number,
                    fullName,
                    driverLicense
                });
                state.isLoading = false;
                state.highlight = true;
            })
            .addCase(getDrivers.pending, state => {
                state.isLoading = true;
            })
            .addCase(getDrivers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.drivers = action.payload;
                }
                state.isLoading = false;
            })
    }
});

export default driversSlice;