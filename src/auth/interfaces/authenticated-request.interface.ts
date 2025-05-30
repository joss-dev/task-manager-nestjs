import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
