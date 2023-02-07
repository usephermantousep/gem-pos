import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from './entities/company.entity';
import { Model } from 'mongoose';
import { ICompany } from './interface/company.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private companyModel: Model<Company>
  ) { }
  async create(createCompanyDto: CreateCompanyDto): Promise<ICompany> {
    return await this.companyModel.create(createCompanyDto);
  }

  async findAll(): Promise<ICompany[]> {
    return await this.companyModel.find();
  }

  async findOne(id: string): Promise<ICompany> {
    const company: ICompany = await this.companyModel.findById(id);
    if (!company) throw new NotFoundException(`Company not found`);
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Object> {
    const company: ICompany = await this.findOne(id);
    await company.updateOne(updateCompanyDto);
    await company.save();
    return {};
  }

  async remove(id: string): Promise<Object> {
    const company: ICompany = await this.findOne(id);
    await company.delete();
    return {};
  }
}
