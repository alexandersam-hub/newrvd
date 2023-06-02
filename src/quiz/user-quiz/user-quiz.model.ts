import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from 'class-validator';

export class UserQuestion {
  id: string;
  text: string;
  price: number;
  answer: string;
}

interface IUserQuiz {
  user: string;
  title: string;
  task: UserQuestion[];
}

@Schema({
  toJSON: {
    transform(doc, ret) {
      (ret.id = ret._id), delete ret._id;
      delete ret.__v;
    },
  },
})
export class UserQuiz implements IUserQuiz {
  id: string;
  @Prop()
  task: UserQuestion[];
  @Prop()
  title: string;
  @Prop()
  user: string;
}

export const UserQuizSchema = SchemaFactory.createForClass(UserQuiz);

export class UserQuizDto implements IUserQuiz {
  id: string;

  @IsNotEmpty({ message: 'В викторине нет ни одного вопроса' })
  task: UserQuestion[];

  @IsNotEmpty({ message: 'Название не может быть пустым' })
  title: string;
  user: string;
}
