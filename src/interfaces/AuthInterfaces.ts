export interface SuccessResponse {
  message: string;
  user: UserInterface;
  token: string;
}
export interface UserInterface {
  name: string;
  email: string;
  role: string;
}
export interface FailedResponse {
  message: string;
  statusMsg?: string;
  errors?: Errors;
}

export interface Errors {
  value: string;
  msg: string;
  param: string;
  location: string;
}
