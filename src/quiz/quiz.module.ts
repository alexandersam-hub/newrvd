import { Module } from "@nestjs/common";
import { QuizService } from "./quiz/quiz.service";
import { QuizController } from "./quiz/quiz.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { QuizSchema } from "./quiz/quiz.model";
import { ConfigModule } from "@nestjs/config";
import { QuestionSchema } from "./questions/question.model";
import { QuestionsService } from "./questions/questions.service";
import { QuestionController } from "./questions/question.controller";
import { QuizLimitRulesController } from "./quiz-limit-rules/quiz-limit-rules.controller";
import { QuizLimitRulesService } from "./quiz-limit-rules/quiz-limit-rules.service";
import { QuizLimitRulesSchema } from "./quiz-limit-rules/quiz-limit-rules.model";
import { UserQuizService } from "./user-quiz/user-quiz.service";
import { UserQuizController } from "./user-quiz/user-quiz.controller";
import { UserQuizSchema } from "./user-quiz/user-quiz.model";
import { ProgressController } from "./progress/progress.controller";
import { ProgressService } from "./progress/progress.service";
import { ProgressSchema } from "./progress/progress.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "quizzes", schema: QuizSchema },
      { name: "questions", schema: QuestionSchema },
      { name: "quizlimits", schema: QuizLimitRulesSchema },
      { name: "userquizzes", schema: UserQuizSchema },
      { name: "progresses", schema: ProgressSchema },
    ]),
    ConfigModule,
  ],
  exports: [QuizLimitRulesService, QuizService, QuestionsService],
  providers: [
    QuizService,
    QuestionsService,
    QuizLimitRulesService,
    UserQuizService,
    ProgressService,
  ],
  controllers: [
    QuizController,
    QuestionController,
    QuizLimitRulesController,
    UserQuizController,
    ProgressController,
  ],
})
export class QuizModule {}
