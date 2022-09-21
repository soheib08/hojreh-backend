import { Types } from 'mongoose';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import { Admin } from './schemas/admins.schema';
import Serialize from '@decorators/serialization.decorator';
import Auth from '@decorators/auth.decorator';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import AdminService from './admins.service';
import AdminsResponseDto, { AdminResponseDto } from './dto/admin-response.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@ApiExtraModels(Admin)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class AdminsController {
  constructor(private readonly adminService: AdminService) { }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(Admin),
        },
      },
    },
    description: '200. Success. Returns a admin',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. Admin was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @Serialize(AdminResponseDto)
  @Auth()
  async getById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<Admin> {
    const foundAdmin = await this.adminService.getUnverifiedAdminById(id);

    if (!foundAdmin) {
      throw new NotFoundException('The admin does not exist');
    }

    return foundAdmin;
  }

  @ApiOkResponse({
    description: '200. Success. Returns all admins',
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(Admin),
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @Serialize(AdminsResponseDto)
  @Auth()
  async getAllVerifiedAdmins() {
    const foundAdmins = await this.adminService.getVerifiedAdmins();

    return foundAdmins;
  }
}
