import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { UserDto } from "./user.model";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly UserService: UserService) {
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post("registration")
  async create(@Body() user: UserDto) {
    const res = await this.UserService.create(user);
    return res;
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post("login")
  async login(@Body() { username, password }: UserDto) {
    return await this.UserService.login(username, password);
  }

  @Post("validation")
  async loadUser(@Body() validation: { token: string }) {
    try {
      return await this.UserService.validationToke(validation.token);
    } catch (e) {
      throw new BadRequestException("Токен неисправвен");
    }
  }

  @Post("qr_login")
  async loginQr(@Body() userData: { token: string }) {
    try {
      return await this.UserService.loginByQr(userData.token);
    } catch (e) {
      throw new BadRequestException("Токен неисправвен");
    }
  }

  @Post("get_users")
  async getUserList() {
    const res = await this.UserService.getUserList();
    return res;
  }

  @Post("remove")
  async removeUser(@Body() user: UserDto) {
    return await this.UserService.removeUser(user);
  }

  @Post("set_password")
  async setPassword(@Body() { id, password }) {
    return await this.UserService.setPassword(id, password);
  }

  @Post("update")
  async updateUser(@Body() user: UserDto) {
    return await this.UserService.updateUser(user);
  }

  @Post("put_description")
  async putUserDescription(@Body() user: UserDto) {
    return await this.UserService.updateUser(user);
  }
}
