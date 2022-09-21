import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { RolesEnum } from '@decorators/roles.decorator';

import SignUpDto from 'src/modules/user/auth/dto/sign-up.dto';

import { Admin } from './schemas/admins.schema';
import UpdateAdminDto from './dto/update-admin.dto';

@Injectable()
export default class AdminsRepository {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) { }

  public async create(admin: SignUpDto): Promise<Admin> {
    const newUser = await this.adminModel.create({
      ...admin,
      verified: false,
    });

    return newUser.toJSON();
  }

  public async getUnverifiedAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({
      email,
      verified: false,
    }).exec();
  }

  public async getVerifiedUserByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({
      email,
      verified: true,
    }).exec();
  }

  public async getById(id: Types.ObjectId): Promise<Admin | null> {
    return this.adminModel.findOne({
      _id: id,
    }, { password: 0 }).exec();
  }

  public async getVerifiedAdminById(id: Types.ObjectId): Promise<Admin | null> {
    return this.adminModel.findOne({
      _id: id,
      verified: true,
    }, { password: 0 }).exec();
  }

  public async getUnverifiedAdminById(id: Types.ObjectId): Promise<Admin | null> {
    return this.adminModel.findOne({
      _id: id,
      verified: false,
    }, { password: 0 }).exec();
  }

  public async updateById(id: Types.ObjectId, data: UpdateAdminDto): Promise<Admin | null> {
    return this.adminModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
    ).exec();
  }

  public getAll() {
    return this.adminModel.find().exec();
  }

  public getVerifiedAdmins() {
    return this.adminModel.find({ verified: true }).exec();
  }

  public async getVerifiedAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({
      email,
      roles: { $in: RolesEnum.ADMIN },
      verified: true,
    }).exec();
  }
}
