import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  Support,
  SupportAnswer,
  SupportEnterDto,
  SupportExitDto,
} from "./support.model";
import { Model } from "mongoose";

@Injectable()
export class SupportService {
  constructor(
    @InjectModel("supports") private readonly supportModel: Model<Support>,
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
