import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  async create(createAvaliacaoDto: CreateAvaliacaoDto) {
    return await 'This action adds a new avaliacao';
  }

  async findAll() {
    return await `This action returns all avaliacao`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} avaliacao`;
  }

  async update(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return await `This action updates a #${id} avaliacao`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} avaliacao`;
  }
}
