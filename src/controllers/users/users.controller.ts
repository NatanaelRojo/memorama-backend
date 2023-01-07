import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createUserDto, updateUserDto } from 'src/dtos/user.dto';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.getOne(userId);
    }

    @Post()
    create(@Body() payload: createUserDto) {
        return this.usersService.create(payload)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) userId: number, @Body() payload: updateUserDto) {
        return this.usersService.update(userId, payload);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.delete(userId);
    }
}
