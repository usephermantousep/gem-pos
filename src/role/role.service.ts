import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from './interface/role.interface';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role') private roleModel: Model<IRole>
  ) { }
  async create(createRoleDto: CreateRoleDto): Promise<IRole> {
    return await this.roleModel.create(createRoleDto);
  }

  async findAll(): Promise<IRole[]> {
    return await this.roleModel.find();
  }

  async findOne(id: string): Promise<IRole> {
    const role: IRole = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException(`Role not found`);
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Object> {
    const role: IRole = await this.findOne(id);
    await role.update(updateRoleDto);
    await role.save();
    return {};
  }

  async remove(id: string): Promise<Object> {
    const role: IRole = await this.findOne(id);
    await role.delete();
    return {};
  }

  async seed() : Promise<void> {
    const roles = [
      { name: 'admin', description: 'Administrator role' },
      { name: 'owner', description: 'Owner role' },
      { name: 'staff', description: 'Staff role' },
      { name: 'cashier', description: 'Cashier role' },
    ];

    const promises = roles.map((role) => {
      const { name, description } = role;
      return this.roleModel.findOne({ name }).then((existingRole: IRole): Promise<IRole | void> => {
        if (!existingRole) {
          return new this.roleModel({ name, description }).save();
        }
        return Promise.resolve();
      });
    });

    await Promise.all(promises);
  }
}
