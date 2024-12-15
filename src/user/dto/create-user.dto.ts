import { IsString, IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
  
  @IsString()
  departamento: string;

  @IsString()
  curso: string;

  foto_perfil?: Buffer;
}
