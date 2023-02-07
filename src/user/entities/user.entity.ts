import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, uppercase: true })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Company' })
    company_id: string;

    @Prop({ required: true, type: [SchemaTypes.ObjectId], ref: 'Role' })
    role_id: string[];
}
export const UserSchema = SchemaFactory.createForClass(User);