import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authSlice from "./auth";
import tasksSlice from "./tasks";
import explorerSlice from "./explorer";
import userSlice from "./user";
import driversSlice from "./drivers.ts";
import trailersSlice from "./trailers.ts";
import trucksSlice from "./trucks.ts";
import notificationSlice from "./notifications.ts";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    tasks: tasksSlice.reducer,
    explorer: explorerSlice.reducer,
    user: userSlice.reducer,
    drivers: driversSlice.reducer,
    trailers: trailersSlice.reducer,
    trucks: trucksSlice.reducer,
    notification: notificationSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
});

const {setUsername, setPassword, setRepeatPassword, setEmail, setIsAuthenticated} = authSlice.actions;
const {addNewBrick, setData, setIsUnloadingPlace, setBrickPosition, updateBricks, addTask, removeTask, setImportance, setTaskText} = tasksSlice.actions;
const {createFolder, createObject, deleteItem, changeUnwrap} = explorerSlice.actions;
const {setHighlightTrailers} = trailersSlice.actions;
const {setHighlightTrucks} = trucksSlice.actions;
const {setHighlightDrivers} = driversSlice.actions;
const {setInformation, clearInformation} = userSlice.actions;
const {setNotification} = notificationSlice.actions;

import {addDriver, getDrivers} from "./drivers.ts";
import {addTrailer, getTrailers} from "./trailers.ts";
import {addTruck, getTrucks} from "./trucks.ts";
import {getAuth} from "./user";


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
    store,
    setPassword,
    setRepeatPassword,
    setEmail,
    setUsername,
    setIsAuthenticated,
    addNewBrick,
    setData,
    setIsUnloadingPlace,
    setBrickPosition,
    updateBricks,
    addTask,
    removeTask,
    setImportance,
    setTaskText,
    createFolder,
    createObject,
    deleteItem,
    changeUnwrap,
    setInformation,
    clearInformation,
    setHighlightTrailers,
    setHighlightTrucks,
    setHighlightDrivers,
    setNotification,
    addDriver,
    getDrivers,
    addTrailer,
    getTrailers,
    addTruck,
    getTrucks,
    getAuth
};