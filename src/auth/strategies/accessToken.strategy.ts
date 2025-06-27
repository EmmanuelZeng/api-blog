import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'access-token-jwt') {
  constructor(
    private readonly userRservices: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    } as StrategyOptionsWithRequest); 
  }

  async validate(req: any, payload: any) {
    await this.userRservices.findForValidate(payload);
    return payload;
  }
}
