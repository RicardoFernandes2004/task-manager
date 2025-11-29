import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTimeInSeconds = this.configService.get<number>('JWT_EXPIRATION_TIME') || 3600;
    }

    signIn(username: string, password: string): AuthResponseDto {
        const foundUser = this.userService.findByUsername(username);
        if (!foundUser || !bcryptCompareSync(password, foundUser.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: foundUser.username, sub: foundUser.id };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            expiresIn: this.jwtExpirationTimeInSeconds,
        };
    }
}
