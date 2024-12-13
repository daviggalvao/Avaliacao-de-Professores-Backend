import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async Login( email: string, pass: string ): Promise<{ token: string; user: any }> {
    const user = await this.usersService.findOneEmail(email);
    if (user?.senha !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      token: access_token,
      user: user,
    };
  }
}