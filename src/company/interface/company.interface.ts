import { Document } from 'mongoose';

export interface ICompany extends Document {
   readonly name: string;
   readonly address?: string;
   readonly contact?: string;
   readonly expiredAt: Date;
}