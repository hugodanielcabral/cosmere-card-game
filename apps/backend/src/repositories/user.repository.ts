import sql from '../db';
import type { IUser } from '../types/Users';

export default class UseRepository {
  static async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await sql<IUser[]>`SELECT * FROM users WHERE email = ${email}`;

    return user[0];
  }
  static async create(userData: IUser): Promise<IUser | undefined> {
    const { username, email, password } = userData;
    const newUser = await sql<
      IUser[]
    >`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;

    return newUser[0];
  }
}
