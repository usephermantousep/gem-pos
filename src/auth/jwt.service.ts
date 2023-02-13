import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jwt } from './entities/jwt.entities';
import { IJwt } from './interface/jwt.interface';

@Injectable()
export class JwtServiceExtend {
  constructor(@InjectModel(Jwt.name) private jwtModel: Model<Jwt>) { }

  async create(token: string): Promise<void> {
    const isExistToken = await this.findByToken(token);
    if (isExistToken) return;
    const jwt = await this.jwtModel.create({ token });
    await jwt.save();
  }

  async findByToken(token: string): Promise<IJwt> {
    return await this.jwtModel.findOne({ token });
  }

  async delete(token: string): Promise<Object> {
    return await this.jwtModel.deleteOne({ token });
  }
}