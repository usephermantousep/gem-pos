import { Request } from '@nestjs/common';

declare module '@nestjs/common' {
    export interface Request {
      user: any;
      rawHeaders:any;
    }
  }