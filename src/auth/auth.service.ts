import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IUser } from 'src/user/interface/user.interface';
import { LoginDto } from './dto/login.dto';
import { JwtServiceExtend } from './jwt.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/helpers/bcrypt.helper';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtServiceExtend: JwtServiceExtend,
        private jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto): Promise<Object> {
        try {
            const user: IUser = await this.userService.findOneByUsername(loginDto.username);
            const isValidPassword = await comparePassword(loginDto.password, user.password);
            if (!isValidPassword) throw new UnauthorizedException();
            const token = this.jwtService.sign(user.id);
            await this.jwtServiceExtend.create(token, user.id);
            return {
                accessToken: token,
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }

    }

    async fetch(id: string) {
        return await this.userService.findOne(id);
    }

    async logout(token: string) {
        return await this.jwtServiceExtend.delete(token);
    }
}
