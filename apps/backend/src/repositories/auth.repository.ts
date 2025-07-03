import sql from '../db';
import type { IUser } from '../types/Users';
import { ValidationError } from '../utils/ValidationError';

export default class AuthRepository {
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

  static async update(userData:IUser):Promise<IUser | undefined> {
    if (!userData.user_id) throw new ValidationError('user_id is required.', 'Missing user_id parameter for update operation.');

    const updatedUser = await sql<IUser[]>`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ${userData?.user_id} RETURNING *`;

    return updatedUser[0];

  }
}
