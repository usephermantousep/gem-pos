import { BadRequestException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

declare module 'express' {
    export interface Request {
      user: any;
    }
  }

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, next: () => void) {
    const token = req.headers.authorization;
    if (!token) {
      return new UnauthorizedException();
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return new BadRequestException();
    }
  }
}