import { User } from '@prisma/client';
import { Request } from 'express';

export enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export interface JwtPayload {
  id: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
