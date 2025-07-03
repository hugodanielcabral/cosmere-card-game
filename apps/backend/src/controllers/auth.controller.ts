import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

export const signup = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.signup(req.body);

    res.status(201).json({
      message: 'User created successfully.',
      user
    });
  } catch(error) {
    next(error);
  }
};

export const signin = async(req: Request, res:Response, next:NextFunction) => {
  try {
    const user = await AuthService.signin(req.body);

    res.cookie('token', user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json(user);
  } catch(error) {
    next(error);
  }
};

export const signout = async(_: Request, res:Response, next:NextFunction) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      sameSite: 'strict'
    });

    res.status(200).json({
      message: 'Signout successful'
    });
  } catch(error) {
    next(error);
  }
};