import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
// import { Schema as SchemaMongoose } from 'mongoose';

export enum RoleUser {
  'admin' = 'admin',
  'user' = 'user',
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
export class User {
  // @Prop({name:'_id'})
  id: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String })
  role: RoleUser;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserDto {
  readonly id: string;

  @IsString({ message: 'Не заполнено поле имя пользователя' })
  @IsNotEmpty({ message: 'Имя пользователя не может быть пустым' })
  readonly username: string;

  @IsString({ message: 'Поле пароль не заполнено' })
  @IsNotEmpty({ message: 'Поле пароль не может быть пустым' })
  readonly password: string;
  role: RoleUser;
  description: string;

  isActive: boolean;
}
