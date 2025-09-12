import { Injectable, NotFoundException } from '@nestjs/common';
import { verify } from 'argon2';
import { TokenService } from 'src/auth/modules/token/token.service';
import { CookieService } from 'src/auth/modules/cookie/cookie.service';
import { Response } from 'express';
import { SigninRequestDto } from '../dto/signin-request.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { JwtTokenType } from '../types/auth.types';

@Injectable()
export class SigninService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieService,
    private authRepository: AuthRepository,
  ) {}

  async execute(dto: SigninRequestDto, res: Response) {
    const { email, password } = dto;

    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Користувач не знайдений');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new NotFoundException('Користувач не знайдений');
    }

    const accessToken = this.tokenService.tokenGenerate(
      user.id,
      JwtTokenType.ACCESS,
    );

    this.cookieService.setAuthToken(res, accessToken, JwtTokenType.ACCESS);

    return {
      user: { id: user.id, name: user.userName, email: user.email },
      message: 'Аутентифікаця успішна. Токен встановлений в cookies',
    };
  }
}
