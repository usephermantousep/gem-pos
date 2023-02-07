import { Document } from 'mongoose';

export interface IUser extends Document {
   readonly name: string;
   readonly username: string;
   readonly company_id: string;
   readonly role_id: string[];
}