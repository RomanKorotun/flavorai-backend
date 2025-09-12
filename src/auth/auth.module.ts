import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignupService } from './services/signup.service';
import { AuthRepository } from './repositories/auth.repository';
import { TokenModule } from './modules/token/token.module';
import { CookieModule } from './modules/cookie/cookie.module';
import { SigninService } from './services/signin.service';
import { SignoutService } from './services/signout.service';
import { JwtAccessStrategy } from './strategies/jwt-access-strategy';

@Module({
  imports: [TokenModule, CookieModule],
  controllers: [AuthController],
  providers: [
    SignupService,
    SigninService,
    SignoutService,
    AuthRepository,
    JwtAccessStrategy,
  ],
})
export class AuthModule {}
