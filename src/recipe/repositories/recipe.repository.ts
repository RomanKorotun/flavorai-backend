import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeRequestDto } from '../dto/create-recipe-request.dto';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllRecipes(title?: string) {
    return await this.prismaService.recipe.findMany({
      where: title
        ? {
            title: {
              contains: title,
              mode: 'insensitive',
            },
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findRecipesByUser(userId: number, title?: string) {
    return await this.prismaService.recipe.findMany({
      where: {
        userId,
        ...(title && {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createRecipe(userId: number, dto: CreateRecipeRequestDto) {
    return await this.prismaService.recipe.create({
      data: {
        ...dto,
        imageUrl:
          dto.imageUrl ??
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        cookTime: true,
        ingredients: true,
        instructions: true,
        category: true,
        cuisine: true,
        imageUrl: true,
        rating: true,
      },
    });
  }

  async findRecipeById(recipeId: number) {
    return await this.prismaService.recipe.findUnique({
      where: { id: recipeId },
      select: {
        id: true,
        userId: true,
      },
    });
  }
}
