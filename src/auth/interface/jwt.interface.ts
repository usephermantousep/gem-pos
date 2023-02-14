import { Document } from 'mongoose';

export interface IJwt extends Document {
   readonly token: string;
   readonly user_id: string;
}