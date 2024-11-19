import React from "react";
import {Driver} from "../store/drivers.ts";
import {Trailer} from "../store/trailers.ts";
import {Truck} from "../store/trucks.ts";

export interface ParentComponent {
  children: React.ReactNode;
}

export interface ServerResponse<T> {
  message: T;
  error: string;
}

export interface ServerResponseDriver extends ServerResponse<string> {
  drivers: Driver[];
}

export interface ServerResponseTrailers extends ServerResponse<string> {
  trailers: Trailer[];
}

export interface ServerResponseTrucks extends ServerResponse<string> {
  trucks: Truck[];
}