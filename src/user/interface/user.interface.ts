import { Document } from 'mongoose';
import { ICompany } from 'src/company/interface/company.interface';
import { IRole } from 'src/role/interface/role.interface';

export interface IUser extends Document {
   readonly _id: string;
   readonly name: string;
   readonly username: string;
   readonly password: string;
   readonly company_id: ICompany;
   readonly role_id: IRole[];
}