import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportSchema } from './support.model';

@Module({
  controllers: [SupportController],
  imports: [
    MongooseModule.forFeature([{ name: 'supports', schema: SupportSchema }]),
  ],
  providers: [SupportService],
})
export class SupportModule {}
