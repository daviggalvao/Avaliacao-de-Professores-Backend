import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: createUserDto.senha,
        curso: createUserDto.curso,
        departamento: createUserDto.departamento,
        foto_perfil: createUserDto.foto_perfil,
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { 
        id : id, 
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
