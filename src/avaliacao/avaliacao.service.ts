import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}
  
  async create(createAvaliacaoDto: CreateAvaliacaoDto) {
    const aval = await this.prisma.avaliacao.create({
      data: {
        professor: createAvaliacaoDto.professor,
        disciplina: createAvaliacaoDto.disciplina,
        conteudo: createAvaliacaoDto.conteudo,
        usuarioID: createAvaliacaoDto.usuarioID,
      },
    });
    return aval;
  }

  async findAll() {
    return await this.prisma.avaliacao.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.avaliacao.findUnique({
      where: { 
        id : id, 
      },
    });
  }

  async update(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return await this.prisma.avaliacao.update({
      where: { 
        id : id, 
      },
      data: {
        professor: updateAvaliacaoDto.professor,
        disciplina: updateAvaliacaoDto.disciplina,
        conteudo: updateAvaliacaoDto.conteudo,
        usuarioID: updateAvaliacaoDto.usuarioID,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.avaliacao.delete({
      where: { 
        id : id, 
      },
    });
  }
}
