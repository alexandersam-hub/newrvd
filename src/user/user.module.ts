import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { getJwtSecret } from '../configs/jwt.config';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    ConfigModule,
    QuizModule,
    JwtModule.register({ global: true, secret: getJwtSecret() }),
  ],
  providers: [UserService],
})
export class UserModule {}
