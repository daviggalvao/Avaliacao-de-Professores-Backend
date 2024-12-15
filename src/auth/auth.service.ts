import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { JwtService } from '@nestjs/jwt';
import { register } from 'module';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async Login( dto: LoginUserDto ): Promise<{ token: string; user: any }> {
    const user = await this.usersService.findOneEmail(dto.email);
    if (user?.senha !== dto.senha) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      token: access_token,
      user: user,
    };
  }

  async Register(dto: CreateUserDto): Promise<{}> {
    const user = await this.usersService.create(dto);
    return user;
  }
}