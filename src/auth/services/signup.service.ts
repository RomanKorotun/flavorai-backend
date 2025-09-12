import { SignupRequestDto } from '../dto/signup-request.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { hash } from 'argon2';
import { JwtTokenType } from '../types/auth.types';
import { TokenService } from '../modules/token/token.service';
import { CookieService } from '../modules/cookie/cookie.service';
import type { Response } from 'express';

@Injectable()
export class SignupService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieService,
  ) {}
  async execute(dto: SignupRequestDto, res: Response) {
    const { userName, email, password } = dto;

    const user = await this.authRepository.findUserByEmail(email);

    if (user) {
      throw new ConflictException(`Користувач з email ${email} вже існує`);
    }

    const newUser = await this.authRepository.createUser({
      userName,
      email,
      password: await hash(password),
    });

    const accessToken = this.tokenService.tokenGenerate(
      newUser.id,
      JwtTokenType.ACCESS,
    );

    this.cookieService.setAuthToken(res, accessToken, JwtTokenType.ACCESS);

    return {
      user: newUser,
      message: 'Реєстрація успішна. Токен встановлений в cookies',
    };
  }
}
