import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import {hashSync as bcryptHashSync} from 'bcrypt';

@Injectable()
export class UsersService {

    private users = [] = [
        { id: '1', username: 'john_doe', password: bcryptHashSync('password123', 10) },
        { id: '2', username: 'jane_smith', password: bcryptHashSync('securepass', 10) },
    ];
    
    createUser(user: UserDto): UserDto {
        user.id = uuid();
        user.password = bcryptHashSync(user.password, 10);
        this.users.push(user);
        return user;
    }

    findAll(): UserDto[] {
        return this.users;
    }

    findById(id: string): UserDto | undefined {
        return this.users.find(user => user.id === id);
    }

    updateUser(id: string, updatedUser: UserDto): UserDto | undefined {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
            return this.users[userIndex];
        }
        return undefined;
    }

    deleteUser(id: string): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
            return true;
        }
        return false;
    }

    findByUsername(username: string): UserDto | undefined {
        return this.users.find(user => user.username === username);
    }
}
