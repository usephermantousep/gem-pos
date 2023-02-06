import { Document } from 'mongoose';

export interface IRole extends Document {
   readonly name: string,
   readonly description: string,
   readonly createdAt: number;
   readonly updateddAt: number;
}