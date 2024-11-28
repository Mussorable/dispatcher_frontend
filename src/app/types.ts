import React from "react";

export interface ParentComponent {
  children: React.ReactNode;
}

export interface ServerResponseAPI<T=never> {
  status: number;
  message: string;
  data?: T;
  errors?: string;
}

export interface ServerResponse<T> {
  message: T;
  error: string;
}