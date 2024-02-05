import { Test, TestingModule } from '@nestjs/testing';
import { PrescrController } from './prescr.controller';

describe('PrescrController', () => {
  let controller: PrescrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescrController],
    }).compile();

    controller = module.get<PrescrController>(PrescrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
