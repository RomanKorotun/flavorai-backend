import { Injectable } from '@nestjs/common';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class GetAllRecipesService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(title?: string) {
    return await this.recipeRepository.findAllRecipes(title);
  }
}
