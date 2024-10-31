import { IUser } from './models/userModel';  // Importe o tipo IUser

declare global {
  namespace Express {
    interface Request {
      user?: IUser;  // Adiciona a propriedade user à interface Request
    }
  }
}
