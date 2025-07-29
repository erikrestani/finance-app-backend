import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({
          message: 'Email, password and name are required'
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          message: 'Invalid email format'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          message: 'Password must be at least 6 characters long'
        });
        return;
      }

      const result = await authService.register(email, password, name);

      res.status(201).json(result);
    } catch (error: any) {
      if (error.message === 'User already exists') {
        res.status(409).json({
          message: 'User already exists'
        });
        return;
      }

      console.error('Registration error:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          message: 'Email and password are required'
        });
        return;
      }

      const result = await authService.login(email, password);

      res.json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({
          message: 'Invalid credentials'
        });
        return;
      }

      console.error('Login error:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          message: 'User not authenticated'
        });
        return;
      }

      const user = await authService.getCurrentUser(userId);

      if (!user) {
        res.status(404).json({
          message: 'User not found'
        });
        return;
      }

      res.json({ user });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
} 