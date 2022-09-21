import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import AdminsController from './admins.controller';
import AdminsRepository from './admins.repository';
import AdminsService from './admins.service';
import { Admin, AdminSchema } from './schemas/admins.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Admin.name,
      schema: AdminSchema,
    }]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AdminsRepository],
  exports: [AdminsService, AdminsRepository],
})
export default class AdminsModule { }
