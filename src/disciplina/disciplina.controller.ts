
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { DisciplinaService } from './disciplina.service';
  import { CreateDisciplinaDto } from './dto/create-disciplina.dto';
  import { UpdateDisciplinaDto } from './dto/update-disciplina.dto';
  import { ValidationPipe } from '@nestjs/common';
  
  @Controller('disciplina')
  export class DisciplinaController {
    constructor(private readonly disciplinaService: DisciplinaService) {}
  
    @Post()
    async create(@Body(ValidationPipe) createDisciplinaDto: CreateDisciplinaDto) {
      return await this.disciplinaService.create(createDisciplinaDto);
    }
  
    @Get()
    async findAll() {
      return await this.disciplinaService.findAll();
    }
  
    @Get(':id')
     async findOne(@Param('id', ParseIntPipe) id: number) {
      return await this.disciplinaService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDisciplinaDto: UpdateDisciplinaDto) {
      return this.disciplinaService.update(id, updateDisciplinaDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
      return await this.disciplinaService.remove(id);
    }
  }
  