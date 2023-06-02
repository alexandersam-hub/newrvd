import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getConnectString } from './configs/mogoose.config';
import { QuizModule } from './quiz/quiz.module';
import { ImageRoutingModule } from './image-routing/image-routing.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(getConnectString()),
    UserModule,
    QuizModule,
    ImageRoutingModule,
    SupportModule,
  ],
  exports: [MongooseModule, ConfigModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
