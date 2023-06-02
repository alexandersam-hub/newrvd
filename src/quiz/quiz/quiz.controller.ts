import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  ValidationPipe,
} from '@nestjs/common';

import { QuizService } from './quiz.service';
import { QuizDto } from './quiz.model';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @UseGuards(AuthGuard)
  @Post('get_quizzes')
  async getQuizzes(@Request() req) {
    if (req.user.role === 'admin') return this.quizService.getAllQuizzes();
    return this.quizService.getActiveQuizzes(req.user);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async createQuiz(@Body() quiz: QuizDto) {
    return this.quizService.createQuiz(quiz);
  }

  @UsePipes(new ValidationPipe())
  @Post('remove')
  async removeQuestion(@Body() quiz: QuizDto) {
    return this.quizService.removeQuiz(quiz);
  }

  @UsePipes(new ValidationPipe())
  @Post('update')
  async updateQuestion(@Body() quiz: QuizDto) {
    return this.quizService.updateQuiz(quiz);
  }
}
