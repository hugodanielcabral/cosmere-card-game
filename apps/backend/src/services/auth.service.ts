import type { IUser } from '../types/Users';
import { decrypt, encrypt } from '../utils/bcrypt';
import { AppError } from '../utils/AppError';
import { ValidationError } from '../utils/ValidationError';
import AuthRepository from '../repositories/auth.repository';
import { createAccessToken } from '../utils/jwt';

export default class AuthService {
  static async signup(userData: IUser) {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      throw new ValidationError(
        'Invalid input',
        400,
        'All fields (username, email, password) are required.'
      );
    }

    const userExists = await AuthRepository.findByEmail(email);

    if (userExists) {
      throw new ValidationError(
        'The provided email is already registered.',
        409,
        '',
        'email'
      );
    }

    const hashedPassword = await encrypt(password);
    userData.password = hashedPassword;

    const newUser = await AuthRepository.create(userData);
    return newUser;
  }

  static async signin(userData: IUser) {
    const { email, password } = userData;

    if (!email || !password) {
      throw new ValidationError(
        'Invalid input',
        400,
        'All fields (email, password) are required.'
      );
    }

    const userExists = await AuthRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('Invalid credentials.', 400);
    }

    const isMatch = await decrypt(password, userExists.password);

    if (!isMatch) {
      throw new AppError('Invalid credentials.', 400);
    }

    // update last_login column
    AuthRepository.update(userExists);

    const token = await createAccessToken({ id: userExists.user_id });

    return {
      user_id: userExists.user_id,
      username: userExists.username,
      email: userExists.email,
      token
    };
  }
}
