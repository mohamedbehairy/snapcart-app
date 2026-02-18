export interface EditResponse {
  message: string;
  statusMsg?: string;
  user?: User;
  errors?: Errors;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface Errors {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface AddressesResponse {
  status: string;
  message: string;
  data: Address[];
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
