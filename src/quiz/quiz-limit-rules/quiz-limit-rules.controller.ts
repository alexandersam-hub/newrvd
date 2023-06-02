import { Body, Controller, Post } from '@nestjs/common';
import { QuizLimitRulesService } from './quiz-limit-rules.service';
import { QuizLimitRules } from './quiz-limit-rules.model';

@Controller('quiz_limit_rules')
export class QuizLimitRulesController {
  constructor(private readonly quizLimitService: QuizLimitRulesService) {}

  @Post('get_all')
  getQuizLimit() {
    return this.quizLimitService.getRules();
  }

  @Post('create')
  createQuizLimit(@Body() quizLimit: QuizLimitRules) {
    return this.quizLimitService.create(quizLimit);
  }

  @Post('update')
  updateQuizLimit(@Body() quizLimit: QuizLimitRules) {
    return this.quizLimitService.update(quizLimit);
  }

  @Post('remove')
  removeQuizLimit(@Body() quizLimit: QuizLimitRules) {
    return this.quizLimitService.remove(quizLimit);
  }
}
