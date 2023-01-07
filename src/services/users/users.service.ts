import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto, updateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { threadId } from 'worker_threads';

const initialData: User[] = [{
    id: 1,
    username: 'user1',
    password: 'password1',
}]

@Injectable()
export class UsersService {
    private data: User[];
    private userCounter = 1;

    constructor () {
        this.data = initialData;
    }

    getAll() {
        return this.data;
    }

    getOne(userId: number) {
        const user = this.data.find(user => user.id === userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    create(userData: createUserDto) {
        const newUser = {
            id: this.userCounter++,
            ...userData,
        }
        this.data.push(newUser);
        return newUser;
    }    

    update(userId: number, payload: updateUserDto) {
        const user = this.getOne(userId);
        if (user) {
            const index = this.data.findIndex(item => item.id === userId);
            this.data[index] = {
                ...user,
                ...payload,
            }
            return this.data[index];
        }
    }

    delete(userId: number) {
        const index = this.data.findIndex(user => user.id === userId);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }
        this.data.splice(index, 1);
        return userId;
    }
}
