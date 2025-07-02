import type { IUser } from '../types/Users';
import { encrypt } from '../utils/bcrypt';
import { AppError } from '../utils/AppError';
import { ValidationError } from '../utils/ValidationError';
import UseRepository from '../repositories/user.repository';

export default class UserService {
  static async createUser(userData: IUser) {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      throw new ValidationError(
        'Invalid input',
        'All fields (username, email, password) are required.'
      );
    }

    const userExists = await UseRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('The provided email is already registered.', 409);
    }

    const hashedPassword = await encrypt(password);
    userData.password = hashedPassword;

    const newUser = await UseRepository.create(userData);
    return newUser;
  }
}
