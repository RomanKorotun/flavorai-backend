import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { JwtTokenType } from 'src/auth/types/auth.types';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setAuthToken(res: Response, token: string, tokenType: JwtTokenType) {
    const isProduction =
      this.configService.getOrThrow<string>('NODE_ENV') === 'production';

    const accessTokenTime = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TIME',
    );

    const parsedAccessTokenTime = parseInt(accessTokenTime, 10);

    if (!parsedAccessTokenTime) {
      throw new HttpException('JWT_ACCESS_TOKEN_TIME must be number', 500);
    }

    if (tokenType === JwtTokenType.ACCESS) {
      res.cookie('accessToken', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: parsedAccessTokenTime * 1000,
      });
    }
  }

  clearAuthToken(res: Response) {
    const isProduction =
      this.configService.getOrThrow<string>('NODE_ENV') === 'production';

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
    });
  }
}
