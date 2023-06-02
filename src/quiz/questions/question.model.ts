import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { baseUrl } from '../../configs/base-url.config';

@Schema({
  toJSON: {
    transform(doc, ret) {
      (ret.id = ret._id), delete ret._id;
      ret.img = baseUrl + ret.img;
      delete ret.__v;
    },
  },
})
export class Question {
  id: string;
  @Prop()
  title: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'quizzes' })
  quiz: string;
  @Prop()
  type: string;
  @Prop()
  text: string;
  @Prop()
  answer: string;
  @Prop()
  img: string;
  @Prop()
  price: number;
  @Prop({ default: true })
  isActive: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);

export class QuestionDto {
  id: string;
  @IsString({ message: 'Поле "название" не заполнено' })
  @IsNotEmpty({ message: 'Поле "название" не может быть пустым' })
  title: string;
  @IsString({ message: 'Поле "uizId" не заполнено' })
  @IsNotEmpty({ message: 'Поле "uizId" не может быть пустым' })
  quiz: string;
  type: string;
  text: string;
  answer: string;
  img: string;
  price: number;
  isActive: boolean;
}
