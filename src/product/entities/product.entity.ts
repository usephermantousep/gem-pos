import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'CategoryProduct' })
    categoryproduct_id: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Company' })
    company_id: string;

    @Prop({ default: 0, min: 0 })
    price: number;

    @Prop({ default: 0, min: 0 })
    stock: number;

    @Prop()
    image?: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ name: 1, categoryproduct_id: 1, company_id: 1 }, { unique: true });