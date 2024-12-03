import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('Usuário já cadastrado com esse email');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.senha, 10);

    const user = await this.prisma.user.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: hashedPassword,
        curso: createUserDto.curso,
        departamento: createUserDto.departamento,
        foto_perfil: createUserDto.foto_perfil
      },
    });
    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true
    },
  });
  }

  async findOne(id: number) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException(`O usuário com o id ${id} não foi encontrado`);	
    }
    return await this.prisma.user.findUnique({
      where: { 
        id : id 
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true
    },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException(`O usuário com o id ${id} não foi encontrado`);
    }

    const hashedPassword = await bcrypt.hash(updateUserDto.senha, 10);

    return await this.prisma.user.update({
      where: { 
        id : id
      },
      data: {
        nome: updateUserDto.nome,
        email: updateUserDto.email,
        senha: hashedPassword,
        curso: updateUserDto.curso,
        departamento: updateUserDto.departamento,
        foto_perfil: updateUserDto.foto_perfil
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true
      },
    });
  }

  async remove(id: number) {

    const isValidId = await this.prisma.user.findUnique({ where: { id } });
    if (!isValidId) {
      throw new NotFoundException(`O usuário com o id ${id} não foi encontrado`);
    }

    return await this.prisma.user.delete({
      where: { 
        id : id
      },
      select: {
        id: true,
        nome: true,
        email: true,
        curso: true,
        departamento: true,
        Avaliacoes: true,
        Comentarios: true,
        createdAt: true,
        updatedAt: true
      },
    });
  }
}
