import { Test, TestingModule } from '@nestjs/testing';
import { NauthController } from './nauth.controller';

describe('NauthController', () => {
  let controller: NauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NauthController],
    }).compile();

    controller = module.get<NauthController>(NauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
