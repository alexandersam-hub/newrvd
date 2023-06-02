import { Body, Controller, Post } from '@nestjs/common';
import { SupportEnterDto, SupportExitDto } from './support.model';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('create')
  createSupport(@Body() support: SupportEnterDto) {
    return this.supportService.createSupport(support);
  }
  @Post('update')
  updateSupport(@Body() support: SupportExitDto) {
    return this.supportService.updateSupport(support);
  }
  @Post('get')
  getSupports() {
    return this.supportService.getSupports();
  }
  @Post('remove')
  removeSupport(@Body() support: SupportExitDto) {
    return this.supportService.removeSupport(support);
  }
}
