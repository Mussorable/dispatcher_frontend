import React from "react";
import {Driver} from "../store/drivers.ts";

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