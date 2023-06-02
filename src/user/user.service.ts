import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ALREADY_REGISTRATION_ERROR,
  NOT_FIND_USER,
  NOT_COMPARE_PASSWORD,
  NOT_FIND_USER_BY_ID,
} from "./user.constans";
import { User, UserDto } from "./user.model";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { QuizLimitRulesService } from "../quiz/quiz-limit-rules/quiz-limit-rules.service";

type LoginUserData = {
  username: string;
  password: string;
};
@Injectable()
export class UserService {
  private readonly SALT: number;
  constructor(
    @InjectModel("users") private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly quizLimitService: QuizLimitRulesService,
    private configService: ConfigService,
  ) {
    this.SALT = parseInt(configService.get<string>("SALT")) || 7;
  }

  public async create(user: UserDto): Promise<UserDto> {
    const oldUser = await this.userModel.findOne({ username: user.username });
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTRATION_ERROR);
    }
    const password = await bcrypt.hash(user.password, this.SALT);
    return await this.userModel.create({ ...user, password });
  }

  public async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne<User>({ username });
    if (!user) {
      throw new BadRequestException(NOT_FIND_USER);
    }
    if (!password || (await bcrypt.compare(password, user.password))) {
      const access_token = await this.jwtService.signAsync(
        JSON.parse(JSON.stringify(user)),
      );
      return { access_token };
    } else {
      throw new BadRequestException(NOT_COMPARE_PASSWORD);
    }
  }

  public async validationToke(token: string): Promise<User> {
    const user = await this.jwtService.verifyAsync<User>(token);
    return this.userModel.findById(user.id);
  }

  public async validateLoginData(token: string): Promise<LoginUserData> {
    const loginData = await this.jwtService.verifyAsync<any>(token);
    return loginData;
  }

  public async getUserList(): Promise<UserDto[]> {
    return this.userModel.find();
  }

  public async removeUser(user: UserDto): Promise<UserDto> {
    try {
      await this.userModel.findByIdAndRemove(user.id);
      await this.quizLimitService.removeByUserId(user.id);
      return user;
    } catch (e) {
      throw new BadRequestException(NOT_FIND_USER_BY_ID);
    }
  }

  public async setPassword(userId: string, password: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    user.password = await bcrypt.hash(password, this.SALT);
    await user.save();
    return user;
  }

  public async updateUser(user: UserDto): Promise<User> {
    const oldUser = await this.userModel.findById(user.id);
    if (!oldUser) throw new BadRequestException("Пользователь не найден");
    await this.userModel.findByIdAndUpdate(user.id, { ...user });
    return this.userModel.findById(user.id);
  }

  async loginByQr(tokenFormUser: string) {
    const loginData = await this.validateLoginData(tokenFormUser);
    return await this.login(loginData.username, loginData.password);
  }
}
