import { Document } from 'mongoose';
import { ICompany } from 'src/company/interface/company.interface';

export interface ICategoryProduct extends Document {
   readonly name: string,
   readonly company_id: ICompany;
}