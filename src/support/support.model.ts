import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

class ISupport {
  id?: string;
  userId: string;
  username: string;
  phone?: string;
  mail: string;
  text: string;
  description?: string;
  isSend?: boolean;
  isFinished?: boolean;
  dateSupport?: Date;
}

@Schema({
  // timestamps: true,
  toJSON: {
    transform(doc, ret) {
      (ret.id = ret._id), delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  },
})
export class Support implements ISupport {
  id: string;
  @Prop()
  description: string;
  @Prop()
  isFinished: boolean;
  @Prop()
  isSend: boolean;
  @Prop()
  mail: string;
  @Prop()
  phone: string;
  @Prop()
  text: string;
  @Prop()
  userId: string;
  @Prop({ required: true })
  username: string;
  @Prop()
  dateSupport: Date;
}

export const SupportSchema = SchemaFactory.createForClass(Support);

export class SupportExitDto implements ISupport {
  id: string;
  userId: string;
  username: string;
  phone?: string;
  mail: string;
  text: string;
  description?: string;
  isSend?: boolean;
  isFinished?: boolean;
  dateSupport?: Date;
}

export class SupportEnterDto implements ISupport {
  mail: string;
  text: string;
  userId: string;
  username: string;
  phone?: string;
}

export class SupportAnswer {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
