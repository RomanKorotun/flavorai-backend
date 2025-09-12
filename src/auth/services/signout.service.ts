import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CookieService } from 'src/auth/modules/cookie/cookie.service';

@Injectable()
export class SignoutService {
  constructor(private readonly cookieService: CookieService) {}
  execute(res: Response) {
    this.cookieService.clearAuthToken(res);
    return { message: 'Logout success' };
  }
}
