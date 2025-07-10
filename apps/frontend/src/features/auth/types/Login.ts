export interface IAuthUser {
  user_id: number;
  username: string;
}

export interface ISignin {
  user_id: number;
  token: string;
  email: string;
  username: string;
}
