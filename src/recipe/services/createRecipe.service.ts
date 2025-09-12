import { Injectable } from '@nestjs/common';
import { CreateRecipeRequestDto } from '../dto/create-recipe-request.dto';
import { RecipeRepository } from '../repositories/recipe.repository';

@Injectable()
export class CreateRecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}
  async execute(userId: number, dto: CreateRecipeRequestDto) {
    return await this.recipeRepository.createRecipe(userId, dto);
  }
}
