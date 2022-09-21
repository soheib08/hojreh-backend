import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import SignUpDto from 'src/modules/user/auth/dto/sign-up.dto';
import AdminRepository from './admins.repository';
import { Admin } from './schemas/admins.schema';
import UpdateAdminDto from './dto/update-admin.dto';

@Injectable()
export default class AdminsService {
  constructor(private readonly adminsRepository: AdminRepository) { }

  public async create(admin: SignUpDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    return this.adminsRepository.create({
      password: hashedPassword,
      email: admin.email,
    });
  }

  public getUnverifiedAdminByEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.getUnverifiedAdminByEmail(email);
  }

  public getVerifiedUserByEmail(email: string): Promise<Admin | null> {
    return this.adminsRepository.getVerifiedUserByEmail(email);
  }

  public getById(id: Types.ObjectId): Promise<Admin | null> {
    return this.adminsRepository.getById(id);
  }

  public getUnverifiedAdminById(id: Types.ObjectId): Promise<Admin | null> {
    return this.adminsRepository.getUnverifiedAdminById(id);
  }

  public getUnverifiedUserById(id: Types.ObjectId): Promise<Admin | null> {
    return this.adminsRepository.getUnverifiedAdminById(id);
  }

  public update(
    id: Types.ObjectId,
    data: UpdateAdminDto,
  ): Promise<Admin | null> {
    return this.adminsRepository.updateById(id, data);
  }

  public getVerifiedAdmins() {
    return this.adminsRepository.getVerifiedAdmins();
  }
}
