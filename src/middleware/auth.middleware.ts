import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Invalid token format. Use Bearer token.' });
      return;
    }

    const token = authHeader.replace('Bearer ', '');

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not configured');
      res.status(500).json({ message: 'Server configuration error.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
      name: string;
    };

    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired.' });
      return;
    }

    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }

    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
}; 