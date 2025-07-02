export interface IUser {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  last_login: Date;
  rank_points: number;
}
