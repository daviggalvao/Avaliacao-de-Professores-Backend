import { Body, Controller, Post } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
    constructor(private readonly avaliacaoSerice: AvaliacaoService) {}
    @Post()
    async create(@Body() avaliacaoData: CreateAvaliacaoDto) {
        return avaliacaoData
    }
}
