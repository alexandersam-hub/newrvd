import { Injectable } from "@nestjs/common";
import { Progress, ProgressDto, ProgressUserReportDto } from "./progress.model";
import { InjectModel } from "@nestjs/mongoose";
import { UserDto } from "../../user/user.model";
import { Model } from "mongoose";

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel("progresses") private readonly progressModel: Model<Progress>,
  ) {}
  getProgresses() {
    return this.progressModel.find();
  }

  async createProgress(userProgress: ProgressUserReportDto, user: UserDto) {
    const progressBd = await this.progressModel.findOne<ProgressDto>({
      user: user.id,
    });
    if (progressBd) {
      progressBd.completes.push({
        quiz: userProgress.quiz,
        date: Date.now(),
        score: userProgress.score,
      });
      await this.progressModel.findByIdAndUpdate(progressBd.id, progressBd);
      return progressBd;
    } else {
      const data = {
        user: user.id,
        completes: [
          {
            quiz: userProgress.quiz,
            date: Date.now(),
            score: userProgress.score,
          },
        ],
      };
      const progress = await this.progressModel.create(data);
      return progress;
    }
  }
}
