import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return await 'This action adds a new user';
  }

  async findAll() {
    return await `This action returns all user`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await`This action removes a #${id} user`;
  }
}
