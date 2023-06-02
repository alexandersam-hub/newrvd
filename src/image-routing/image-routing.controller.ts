import {
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { ImageRoutingService } from './image-routing.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image_routing')
export class ImageRoutingController {
  constructor(private readonly imageRoutingService: ImageRoutingService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() options: { typeCategory: string },
  ) {
    return this.imageRoutingService.saveFile(file, options.typeCategory);
  }

  @Post('remove_file')
  @HttpCode(200)
  async updateImageList() {
    return this.imageRoutingService.removeFiles();
  }
}
