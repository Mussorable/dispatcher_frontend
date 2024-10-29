export interface AuthServerResponse {
  message: string;
  status: string;
}

export interface SuccessAuthResponse extends AuthServerResponse {
  access_token: string;
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