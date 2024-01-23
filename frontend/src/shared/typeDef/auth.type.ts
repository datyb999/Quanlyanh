export interface IAuthResponse {
  message: string;
  account: IAccount;
}

export interface IAccount {
  id: number;
  role: number;
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  gender: number;
  birthday?: any;
  status: number;
  created_at?: any;
  updated_at?: any;
}
export interface IRegister {
  role_id: number;
  username: string;
  password: string;
  name: string;
  address: string;
  gender: number;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}
