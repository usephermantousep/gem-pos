import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Jwt {
    @Prop({ unique: true })
    token: string;

    @Prop({unique : true})
    user_id : string;
}

export const JwtSchema = SchemaFactory.createForClass(Jwt);