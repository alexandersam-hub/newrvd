import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserQuiz, UserQuizDto } from "./user-quiz.model";

@Injectable()
export class UserQuizService {
  constructor(
    @InjectModel("userquizzes") private readonly userQuizModel: Model<UserQuiz>,
  ) {}

  async create(userQuiz: UserQuizDto) {
    return this.userQuizModel.create(userQuiz);
  }

  async remove(userQuiz: UserQuizDto): Promise<UserQuizDto> {
    await this.userQuizModel.findByIdAndRemove(userQuiz.id);
    return userQuiz;
  }

  async update(userQuiz: UserQuizDto) {
    if (!(await this.userQuizModel.findById(userQuiz.id)))
      throw new BadRequestException(
        "Нет пользовательской викторины с указанным id",
      );
    await this.userQuizModel.findByIdAndUpdate(userQuiz.id, userQuiz);
    return userQuiz;
  }
  getByUserId(userId: string) {
    return this.userQuizModel.find<UserQuizDto>({ user: userId });
  }
}
