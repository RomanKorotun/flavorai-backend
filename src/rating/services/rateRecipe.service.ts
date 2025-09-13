import { Injectable, NotFoundException } from '@nestjs/common';
import { RateRecipeDto } from '../../rating/dto/rate-recipe.dto';
import { RatingRepository } from '../../rating/repositories/rating.repository';
import { RecipeRepository } from 'src/recipe/repositories/recipe.repository';

@Injectable()
export class RateRecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly ratingRepository: RatingRepository,
  ) {}

  async execute(userId: number, recipeId: number, dto: RateRecipeDto) {
    const recipe = await this.recipeRepository.findRecipeById(recipeId);

    if (!recipe) {
      throw new NotFoundException('Рецепт не знайдено');
    }

    await this.ratingRepository.upsertRating(userId, recipeId, dto.value);

    const average = await this.ratingRepository.recalculateRating(recipeId);

    await this.ratingRepository.updateRecipeRating(recipeId, average);

    return { rating: average };
  }
}
