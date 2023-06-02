import { Test, TestingModule } from '@nestjs/testing';
import { ImageRoutingService } from './image-routing.service';

describe('ImageRoutingService', () => {
  let service: ImageRoutingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageRoutingService],
    }).compile();

    service = module.get<ImageRoutingService>(ImageRoutingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
