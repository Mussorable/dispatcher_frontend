import {JwtPayload} from "jwt-decode";

export interface AuthServerResponse {
  message: string;
  status: string;
}

export interface SuccessAuthResponse extends AuthServerResponse {
  token: string;
}

export type ErrorAuthResponse = AuthServerResponse;

export interface UserAuth {
  username: string;
  password: string;
}

export interface UserRegister extends UserAuth {
  repeatPassword: string;
  email: string;
}

export interface UserTokenInformation extends JwtPayload {
  username: string;
  email: string;
}