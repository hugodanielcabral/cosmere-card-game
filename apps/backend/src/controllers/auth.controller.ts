import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

export const createUser = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.createUser(req.body);

    res.status(201).json({
      message: 'User created successfully.',
      user
    });
  } catch(error) {
    next(error);
  }
};
