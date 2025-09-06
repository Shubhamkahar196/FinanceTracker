

import jwt, { type JwtPayload } from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  const token = authHeader.substring(7); 
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET environment variable is not defined.');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Authorization denied. Token expired.' });
      }
      return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
    }

    if (typeof decoded === 'string' || !decoded || typeof decoded !== 'object') {
      return res.status(401).json({ message: 'Authorization denied. Invalid token payload.' });
    }

    const payload = decoded as JwtPayload & { userId: string };
    if (!payload.userId) {
      return res.status(401).json({ message: 'Authorization denied. Invalid token payload.' });
    }

    req.userId = payload.userId;
    next();
  });
}
