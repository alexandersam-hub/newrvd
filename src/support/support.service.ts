import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  Support,
  SupportAnswer,
  SupportEnterDto,
  SupportExitDto,
} from "./support.model";
import { Model } from "mongoose";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class SupportService {
  constructor(
    @InjectModel("supports") private readonly supportModel: Model<Support>,
    private readonly httpService: HttpService,
  ) {}

  public async getSupports(): Promise<SupportExitDto[]> {
    return this.supportModel.find({});
  }

  public async removeSupport(support: SupportExitDto): Promise<SupportExitDto> {
    return this.supportModel.findByIdAndRemove(support.id);
  }

  public async updateSupport(
    support: SupportExitDto,
  ): Promise<SupportExitDto[]> {
    return this.supportModel.findByIdAndUpdate(support.id, support);
  }

  public async createSupport(support: SupportEnterDto): Promise<SupportAnswer> {
    this.httpService
      .post("http://quizserver.vityazgroup.ru:8005/api/message/send", {
        data: `От РВД: ${support.username} ${support.mail} ${support.phone} ${support.text}`,
      })
      .subscribe({
        next: (data: any) => console.log(data),
        error: (err) => console.log(err),
      });
    try {
      await this.supportModel.create({
        ...support,
        dateSupport: Date.now(),
        isFinished: false,
        isSend: false,
      });
      return new SupportAnswer("Ваша заявка принята");
    } catch (e) {
      return new SupportAnswer("Ошибка при создании заявки");
    }
  }
}
