import { Document } from 'mongoose';

export interface IUser extends Document {
   readonly _id: string;
   readonly name: string;
   readonly username: string;
   readonly password: string;
   readonly company_id: string;
   readonly role_id: string[];
}