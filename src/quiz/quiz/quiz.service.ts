import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDto } from './quiz.model';
import { QuizLimitRulesService } from '../quiz-limit-rules/quiz-limit-rules.service';
import { User } from '../../user/user.model';
import { baseUrl } from '../../configs/base-url.config';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('quizzes') private readonly quizModel: Model<Quiz>,
    private readonly quizLimitService: QuizLimitRulesService,
  ) {}

  async getActiveQuizzes(user: User): Promise<Quiz[]> {
    let quizzes = await this.quizModel.find<Quiz>({ isActive: true });
    const quizLimit = await this.quizLimitService.getRulesByUserId(user.id);
    if (quizLimit) {
      quizzes = quizzes.filter((q) => quizLimit.quizzesOpen.includes(q.id));
    }
    return quizzes;
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    return this.quizModel.find();
  }

  async createQuiz(quiz: QuizDto) {
    const quizFromBd = await this.quizModel.findOne({ title: quiz.title });
    if (quizFromBd) {
      throw new BadRequestException(
        'Викторина с таким названием уже существует',
      );
    }
    return this.quizModel.create({ ...quiz });
  }

  async removeQuiz(quiz: QuizDto) {
    await this.quizModel.findByIdAndRemove(quiz.id);
    return quiz;
  }

  async updateQuiz(quiz: QuizDto) {
    const quizFromBd = await this.quizModel.findById(quiz.id);
    if (!quizFromBd) {
      throw new BadRequestException('Викторины с указанным id не существует');
    }
    await this.quizModel.findByIdAndUpdate(quiz.id, {
      ...quiz,
      img: quiz.img.replace(baseUrl, ''),
      category: quiz.category.replace(baseUrl, ''),
    });
    return this.quizModel.findById(quiz.id);
  }

  async getImageListCategory(): Promise<string[]> {
    const quizzesFromBd = await this.quizModel.find<Quiz>();
    const imagesList: string[] = [];
    quizzesFromBd.forEach((q) => {
      imagesList.push(q.category.replace('category/', ''));
    });
    return imagesList;
  }
  async getImageListQuizzes(): Promise<string[]> {
    const quizzesFromBd = await this.quizModel.find<Quiz>();
    const imagesList: string[] = [];
    quizzesFromBd.forEach((q) => {
      imagesList.push(q.img.replace('quiz/', ''));
    });
    return imagesList;
  }
}
