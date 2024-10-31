import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthRequest } from '../middlewares/authMiddleware';
import { ALL } from 'dns';

// Função de registro de usuário
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    // Verifica se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Usuário já existe' });
      return;
    }

    // Cria um novo usuário e salva no banco de dados
    const user = new User({ name, email, password });
    await user.save();

    // Gera um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Retorna o token
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Função de login de usuário
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Usuário não encontrado' });
      return;
    }

    // Compara a senha informada com a senha armazenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Credenciais inválidas' });
      return;
    }

    // Gera um token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    // Retorna o token
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

export const listar = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a lista de Usuários' });
  }
};
