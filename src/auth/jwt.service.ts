import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jwt } from './entities/jwt.entities';
import { IJwt } from './interface/jwt.interface';

@Injectable()
export class JwtServiceExtend {
  constructor(@InjectModel(Jwt.name) private jwtModel: Model<Jwt>) { }

  async create(token: string, user_id: string): Promise<void> {
    const isExistToken = await this.findByUserId(user_id);
    if (isExistToken) return;
    const jwt = await this.jwtModel.create({ token, user_id });
    await jwt.save();
  }

  async findByUserId(user_id: string): Promise<IJwt> {
    return await this.jwtModel.findOne({ user_id });
  }

  async delete(token: string): Promise<Object> {
    return await this.jwtModel.deleteOne({ token });
  }
}