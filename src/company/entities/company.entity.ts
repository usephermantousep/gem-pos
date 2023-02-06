import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({ timestamps: true })
export class Company {
    @Prop({ required: true })
    name: string;

    @Prop()
    address?: string;

    @Prop()
    contact?: string;

    @Prop({default : Date.parse('2030-01-01')})
    expiredAt: Date;
}
export const CompanySchema = SchemaFactory.createForClass(Company);