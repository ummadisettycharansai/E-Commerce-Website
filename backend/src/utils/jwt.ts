import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const signToken = (payload: object) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN } as any);

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
};
