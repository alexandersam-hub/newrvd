import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { baseUrl } from '../../configs/base-url.config';

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      ret.img = baseUrl + ret.img;
      ret.category = baseUrl + ret.category;
      delete ret.__v;
    },
  },
})
export class Quiz {
  id: string;

  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 'Россия' })
  category: string;

  @Prop()
  img: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export class QuizDto {
  readonly id: string;

  @IsString({ message: 'Поле title не заполнено' })
  @IsNotEmpty({ message: 'Title не может быть пустым' })
  readonly title: string;

  @IsString({ message: 'Поле "описание" не заполнено' })
  @IsNotEmpty({ message: 'Поле "описание" не может быть пустым' })
  readonly description: string;

  category?: string;
  readonly img: string;
  readonly isActive?: boolean;
}
