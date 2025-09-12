import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateUser {
  userName: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser({ userName, email, password }: CreateUser) {
    return await this.prismaService.user.create({
      data: { userName, email, password },
      select: { id: true, userName: true, email: true },
    });
  }
}
