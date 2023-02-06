import { Document } from 'mongoose';

export interface IUser extends Document {
   readonly _id: String;
   readonly createdAt : number;
   readonly updateddAt : number;
}