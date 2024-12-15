import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IsEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('email duplicado');

    const newUser = await this.prisma.user.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: dto.senha,
        curso: dto.curso,
        departamento: dto.departamento,
        foto_perfil: dto.foto_perfil,
      },
    });
    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { 
        id : id, 
      },
      include: {
        Avaliacoes: {
          include: {
            Comentarios: true,
          },
        },
      },
    });
  }

  async findOneEmail(email: string){
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        Avaliacoes: {
          include: {
            Comentarios: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { 
        id : id, 
      },
      data: {
        nome: updateUserDto.nome,
        email: updateUserDto.email,
        senha: updateUserDto.senha,
        curso: updateUserDto.curso,
        departamento: updateUserDto.departamento,
        foto_perfil: updateUserDto.foto_perfil,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { 
        id : id, 
      },
    });
  }
}
