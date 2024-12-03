import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginRequestBody } from './dto/loginRequestBody.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserToken } from './types/UserToken';
import { UserPayload } from './types/UserPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(LoginRequestBody: LoginRequestBody): Promise<UserToken> {
    const user = await this.validateUser(
      LoginRequestBody.email,
      LoginRequestBody.senha,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: UserPayload = { email: user.email, sub: user.id };

    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, senha: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }
    return null;
  }
}
