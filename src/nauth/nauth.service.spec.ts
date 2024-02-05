import { Test, TestingModule } from '@nestjs/testing';
import { NauthService } from './nauth.service';

describe('NauthService', () => {
  let service: NauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NauthService],
    }).compile();

    service = module.get<NauthService>(NauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
