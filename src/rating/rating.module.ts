import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingRepository } from './repositories/rating.repository';
import { RateRecipeService } from './services/rateRecipe.service';

import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [RatingController],
  providers: [RateRecipeService, RatingRepository],
})
export class RatingModule {}
