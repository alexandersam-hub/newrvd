import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizLimitRules } from './quiz-limit-rules.model';

@Injectable()
export class QuizLimitRulesService {
  constructor(
    @InjectModel('quizlimits')
    private readonly quizLimitModel: Model<QuizLimitRules>,
  ) {}

  async getRules(): Promise<QuizLimitRules[]> {
    return this.quizLimitModel.find();
  }

  async getRulesByUserId(userId: string): Promise<QuizLimitRules> {
    return this.quizLimitModel.findOne<QuizLimitRules>({ user: userId });
  }

  async create(quizLimit: QuizLimitRules): Promise<QuizLimitRules> {
    const quizLimitBd = await this.quizLimitModel.findOne({
      user: quizLimit.user,
    });
    if (quizLimitBd)
      throw new BadRequestException(
        'Правило для данного пользователя уже установлено',
      );
    return this.quizLimitModel.create({ ...quizLimit });
  }

  async remove(quizLimit: QuizLimitRules): Promise<QuizLimitRules> {
    await this.quizLimitModel.findByIdAndRemove(quizLimit.id);
    return quizLimit;
  }

  async removeByUserId(userId: string): Promise<boolean> {
    try {
      await this.quizLimitModel.findOneAndRemove({ user: userId });
      return true;
    } catch (e) {
      return false;
    }
  }

  async update(quizLimit: QuizLimitRules): Promise<QuizLimitRules> {
    const quizLimitBd = await this.quizLimitModel.findById(quizLimit.id);

    if (!quizLimitBd)
      throw new BadRequestException('Нет правила с указанным id');

    await this.quizLimitModel.findByIdAndUpdate(quizLimit.id, { ...quizLimit });
    return this.quizLimitModel.findById(quizLimit.id);
  }
}
