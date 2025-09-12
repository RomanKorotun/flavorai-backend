import { Module } from '@nestjs/common';

import { RecipeController } from './recipe.controller';
import { GetAllRecipesService } from './services/getAllRecipes.service';
import { RecipeRepository } from './repositories/recipe.repository';
import { GetMyRecipesService } from './services/getMyRecipes.service';
import { CreateRecipeService } from './services/createRecipe.service';
import { RatingRepository } from '../rating/repositories/rating.repository';

@Module({
  controllers: [RecipeController],
  providers: [
    GetAllRecipesService,
    GetMyRecipesService,
    CreateRecipeService,
    RecipeRepository,
    RatingRepository,
  ],
  exports: [RecipeRepository],
})
export class RecipeModule {}
