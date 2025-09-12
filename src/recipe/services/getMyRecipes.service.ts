import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class GetMyRecipesService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(userId: number, title?: string) {
    return await this.recipeRepository.findRecipesByUser(userId, title);
  }
}
