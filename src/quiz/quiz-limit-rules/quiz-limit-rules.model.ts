import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    transform(doc, ret) {
      (ret.id = ret._id), delete ret._id;
      delete ret.__v;
    },
  },
})
export class QuizLimitRules {
  id: string;

  @Prop({ unique: true })
  user: string;

  @Prop()
  quizzesOpen: string[];
}

export const QuizLimitRulesSchema =
  SchemaFactory.createForClass(QuizLimitRules);
