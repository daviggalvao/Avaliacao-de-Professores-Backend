import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '@nestjs/common';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}   

    @Post()
    async create(@Body(ValidationPipe) userData: CreateUserDto) {
        return userData;
    }
}
