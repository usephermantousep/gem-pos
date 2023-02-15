import { Document } from 'mongoose';
import { ICategoryProduct } from 'src/category-product/interface/category.interface';
import { ICompany } from 'src/company/interface/company.interface';

export interface IProduct extends Document {
    readonly name: string;
    readonly description?: string;
    readonly categoryproduct_id: ICategoryProduct;
    readonly company_id: ICompany;
    readonly price?: number;
    readonly stock?: number;
    readonly image?: string;
}