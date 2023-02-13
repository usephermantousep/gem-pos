import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { encryptPassword } from 'src/helpers/bcrypt.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      createUserDto.password = await encryptPassword(createUserDto.password)
      return await this.userModel.create(createUserDto);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) throw new BadRequestException('Username is exist');
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find({}, '-createdAt -updatedAt -__v -password', {
      populate: [{
        path: 'role_id',
        model: 'Role',
        select: 'name'
      }, {
        path: 'company_id',
        model: 'Company',
        select: 'name'
      }]
    });
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id, '-createdAt -updatedAt -__v -password', {
      populate: [{
        path: 'role_id',
        model: 'Role',
        select: 'name'
      }, {
        path: 'company_id',
        model: 'Company',
        select: 'name'
      }]
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOneByUsername(username: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username }, '-createdAt -updatedAt -__v', {
      populate: [{
        path: 'role_id',
        model: 'Role',
        select: 'name'
      }, {
        path: 'company_id',
        model: 'Company',
        select: 'name'
      }]
    });
    if (!user) throw new NotFoundException();
    return user;
  }



  async update(id: string, updateUserDto: UpdateUserDto): Promise<Object> {
    const user = await this.findOne(id);
    await user.updateOne(updateUserDto);
    await user.save();
    return {};
  }

  async remove(id: string): Promise<Object> {
    const user = await this.findOne(id);
    await user.delete();
    return {};
  }
}