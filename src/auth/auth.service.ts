import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async Login( email: string, pass: string ): Promise<{ access_token: string; user: any }> {
    const user = await this.usersService.findOneEmail(email);
    if (user?.senha !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        departamento: user.departamento,
        curso: user.curso,
        foto_perfil: user.foto_perfil,
      }
    };
  }
}