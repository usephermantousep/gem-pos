import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
@Schema({ timestamps: true })
export class CategoryProduct {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Company' })
    company_id: string;
}
export const CategoryProductSchema = SchemaFactory.createForClass(CategoryProduct);
CategoryProductSchema.index({ name: 1, company_id: 1 }, { unique: true });