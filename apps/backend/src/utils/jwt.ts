import jwt from 'jsonwebtoken';

interface IPayload {
  id: number | undefined;
}

export const createAccessToken = async(payload: IPayload): Promise<string> => {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error('TOKEN_SECRET is not defined');
  }
  return jwt.sign(
    payload,
    secret,
    { expiresIn: '1d' }
  );
};