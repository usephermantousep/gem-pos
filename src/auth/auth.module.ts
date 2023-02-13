import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtServiceExtend } from './jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Jwt, JwtSchema } from './entities/jwt.entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: Jwt.name, schema: JwtSchema }]), JwtModule.register({
    secret: 'secret',
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtServiceExtend,JwtStrategy]
})
export class AuthModule {
}