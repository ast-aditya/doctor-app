import { Test, TestingModule } from '@nestjs/testing';
import { PrescrService } from './prescr.service';

describe('PrescrService', () => {
  let service: PrescrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescrService],
    }).compile();

    service = module.get<PrescrService>(PrescrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
