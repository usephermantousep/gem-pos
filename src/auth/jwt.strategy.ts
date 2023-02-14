import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtServiceExtend } from './jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly jwtServiceExtend: JwtServiceExtend) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

    async validate(payload: string) {
        const jwt = await this.jwtServiceExtend.findByUserId(payload);
        if (!jwt) throw new ForbiddenException();
        return jwt;
    }
}