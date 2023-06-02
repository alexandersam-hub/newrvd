import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionDto } from "./question.model";

@Controller("question")
export class QuestionController {
  constructor(private readonly questionsService: QuestionsService) {}
  @Post("get_questions_for_quiz")
  async getQuestionByQuizId(@Body() { quiz }) {
    if (quiz) return this.questionsService.getQuestionByQuizId(quiz);
    throw new BadRequestException("Неверный запрос");
  }

  @Post("create")
  async createQuestion(@Body() question: QuestionDto) {
    if (question) return this.questionsService.createQuestion(question);
    throw new BadRequestException("Неверный запрос");
  }
  @Post("update")
  async updateQuestion(@Body() question: QuestionDto) {
    if (question) return this.questionsService.updateQuestion(question);
    throw new BadRequestException("Неверный запрос");
  }
  @Post("remove")
  async removeQuestion(@Body() question: QuestionDto) {
    if (question) return this.questionsService.removeQuestion(question);
    throw new BadRequestException("Неверный запрос");
  }
}
