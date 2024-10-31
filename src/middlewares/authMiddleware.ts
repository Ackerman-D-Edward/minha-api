import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    res.status(401).json({ message: 'Acesso negado, token ausente' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401).json({ message: 'Usuário não encontrado' });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
};
