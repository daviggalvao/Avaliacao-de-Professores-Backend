import {
  Controller,
  HttpStatus,
  Post,
  Get,
  Body,
  HttpCode,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginRequestBody: LoginRequestBody) {
    return this.authService.login(loginRequestBody);
  }

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
