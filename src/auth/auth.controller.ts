import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignupService } from './services/signup.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import type { Response } from 'express';
import { SigninRequestDto } from './dto/signin-request.dto';
import { SigninService } from './services/signin.service';
import { SignoutService } from './services/signout.service';
import { JwtAccessGuard } from 'src/common/guards/jwt-access.guard';
import type { User } from '@prisma/client';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly signoutService: SignoutService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignupRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.signupService.execute(dto, res);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() dto: SigninRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.signinService.execute(dto, res);
  }

  @UseGuards(JwtAccessGuard)
  @Get('current')
  @HttpCode(HttpStatus.OK)
  current(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }

  @UseGuards(JwtAccessGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.signoutService.execute(res);
  }
}
