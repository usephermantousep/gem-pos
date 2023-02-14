import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Company' })
    company_id: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);