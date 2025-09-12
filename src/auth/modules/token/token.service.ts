import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtTokenType } from 'src/auth/types/auth.types';

@Injectable()
export class TokenService {
  constructor(
    private readonly configServise: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  tokenGenerate(userId: number, tokenType: JwtTokenType): string {
    const accessTokenSecret = this.configServise.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    const accessTokenTime = this.configServise.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TIME',
    );

    const parsedAcessTokenTime = parseInt(accessTokenTime, 10);

    if (!parsedAcessTokenTime) {
      throw new HttpException('JWT_ACCESS_TOKEN_TIME  must be number', 500);
    }

    const payload: JwtPayload = { id: userId };

    if (tokenType === JwtTokenType.ACCESS) {
      return this.jwtService.sign(payload, {
        secret: accessTokenSecret,
        expiresIn: parsedAcessTokenTime,
      });
    }

    throw new HttpException('НЕ допустимий тип токена', 500);
  }
}
