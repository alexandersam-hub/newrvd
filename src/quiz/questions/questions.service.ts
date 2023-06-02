import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Schema } from "mongoose";
import { Question, QuestionDto } from "./question.model";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Quiz } from "../quiz/quiz.model";
import { baseUrl } from "../../configs/base-url.config";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel("questions") private readonly questionModel: Model<Question>,
  ) {}

  getQuestionByQuizId(quizId: string): Promise<Question[]> {
    try {
      const questions = this.questionModel
        .find({
          quiz: new mongoose.Types.ObjectId(quizId),
        })
        .sort("price");
      return questions;
    } catch (e) {
      throw new BadRequestException("Ошибка при получении викторины");
    }
  }

  createQuestion(question: QuestionDto): Promise<Question> {
    return this.questionModel.create({
      ...question,
      quiz: new mongoose.Types.ObjectId(question.quiz),
    });
  }

  async removeQuestion(question: QuestionDto) {
    await this.questionModel.findByIdAndRemove(question.id);
    return question;
  }

  async updateQuestion(question: QuestionDto) {
    const quizFromBd = await this.questionModel.findById(question.id);
    if (!quizFromBd) {
      throw new BadRequestException("Вопроса с указанным id не существует");
    }

    await this.questionModel.findByIdAndUpdate(question.id, {
      ...question,
      img: question.img.replace(baseUrl, ""),
      quiz: new mongoose.Types.ObjectId(question.quiz),
    });
    return this.questionModel.findById(question.id);
  }
  async getImageListQuestions(quizId: string): Promise<string[]> {
    const questionsFromBd = await this.questionModel.find<Question>({
      quiz: new mongoose.Types.ObjectId(quizId),
    });
    const imagesList: string[] = [];
    questionsFromBd.forEach((q) => {
      imagesList.push(q.img.replace("questions/", ""));
    });
    return imagesList;
  }
}
