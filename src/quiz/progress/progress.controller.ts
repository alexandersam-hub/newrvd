import { Body, Controller, Request, Post, UseGuards } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { ProgressUserReportDto } from "./progress.model";
import { AuthGuard } from "../../guards/auth.guard";

@Controller("progress")
export class ProgressController {
  constructor(private progressService: ProgressService) {}
  @Post("get")
  getProgresses() {
    return this.progressService.getProgresses();
  }

  @UseGuards(AuthGuard)
  @Post("create")
  putProgress(@Body() userProgress: ProgressUserReportDto, @Request() req) {
    return this.progressService.createProgress(userProgress, req.user);
  }
}
