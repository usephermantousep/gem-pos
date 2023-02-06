import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import { CompanyModule } from './company/company.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: env.MONGODB_URI,
        dbName: env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    AuthModule,
    UserModule,
    RoleModule,
    CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
