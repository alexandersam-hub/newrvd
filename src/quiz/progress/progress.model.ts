import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export interface IScoreComplete {
  team: string;
  score: number;
}
export class ScoreComplete {
  @Prop()
  team: string;
  @Prop()
  score: number;
}
export interface IComplete {
  quiz: string;
  date: number;
  score: ScoreComplete;
}

export class Complete {
  @Prop()
  quiz: string;
  @Prop()
  date: number;
  @Prop()
  score: ScoreComplete;
}

export interface IProgress {
  id: string;
  user: string;
  completes: IComplete[];
}
@Schema({
  toJSON: {
    transform(doc, ret) {
      (ret.id = ret._id), delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  },
})
export class Progress implements IProgress {
  id: string;
  @Prop({ unique: true, required: true })
  user: string;
  @Prop()
  completes: Complete[];
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);

export class ProgressDto implements IProgress {
  id: string;
  completes: IComplete[];
  user: string;
}

export class ProgressUserReportDto {
  quiz: string;
  score: ScoreComplete;
}
