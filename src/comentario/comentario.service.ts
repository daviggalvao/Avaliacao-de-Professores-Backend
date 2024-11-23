import { Injectable } from '@nestjs/common';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComentarioService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createComentarioDto: CreateComentarioDto) {
    return await 'This action adds a new comentario';
  }

  async findAll() {
    return await `This action returns all comentario`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} comentario`;
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto) {
    return await `This action updates a #${id} comentario`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} comentario`;
  }
}
