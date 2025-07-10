import express from 'express';
import {
  signin,
  signout,
  signup,
  profile
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/signout', signout);

router.get('/profile', verifyToken, profile);

export default router;
