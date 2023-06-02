import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { UserQuizService } from "./user-quiz.service";
import { UserQuizDto } from "./user-quiz.model";
import { AuthGuard } from "../../guards/auth.guard";

@Controller("user_quiz")
export class UserQuizController {
  constructor(private readonly userQuizService: UserQuizService) {}
  @UseGuards(AuthGuard)
  @Post("get")
  getUsersQuiz(@Request() req) {
    return this.userQuizService.getByUserId(req.user.id);
  }
  @UseGuards(AuthGuard)
  @Post("create")
  createUserQuiz(@Body() userQuiz: UserQuizDto, @Request() req) {
    return this.userQuizService.create({ ...userQuiz, user: req.user.id });
  }

  @Post("update")
  updateUserQuiz(@Body() userQuiz: UserQuizDto) {
    return this.userQuizService.update(userQuiz);
  }

  @Post("remove")
  removeUserQuiz(@Body() userQuiz: UserQuizDto) {
    return this.userQuizService.remove(userQuiz);
  }
}
