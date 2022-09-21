import { Test, TestingModule } from '@nestjs/testing';
import AdminsService from './admins.service';

describe('Admins Service', () => {
  let service: AdminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AdminsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AdminsService>(AdminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
