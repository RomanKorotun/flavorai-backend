import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async upsertRating(userId: number, recipeId: number, value: number) {
    return await this.prismaService.rating.upsert({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
      update: {
        value,
      },
      create: {
        userId,
        recipeId,
        value,
      },
    });
  }

  async recalculateRating(recipeId: number) {
    const ratings = await this.prismaService.rating.findMany({
      where: { recipeId },
      select: { value: true },
    });

    const average =
      ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length;

    return parseFloat(average.toFixed(2));
  }

  async updateRecipeRating(recipeId: number, rating: number) {
    return await this.prismaService.recipe.update({
      where: { id: recipeId },
      data: { rating },
    });
  }
}
