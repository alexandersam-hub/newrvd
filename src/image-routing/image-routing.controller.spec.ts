import { Test, TestingModule } from '@nestjs/testing';
import { ImageRoutingController } from './image-routing.controller';

describe('ImageRoutingController', () => {
  let controller: ImageRoutingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageRoutingController],
    }).compile();

    controller = module.get<ImageRoutingController>(ImageRoutingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
