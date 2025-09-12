import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAccessGuard } from 'src/common/guards/jwt-access.guard';
import { RateRecipeService } from './services/rateRecipe.service';
import { RateRecipeDto } from './dto/rate-recipe.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly rateRecipeService: RateRecipeService) {}

  @UseGuards(JwtAccessGuard)
  @Post(':recipeId')
  @HttpCode(HttpStatus.OK)
  async rate(
    @CurrentUser('id') userId: number,
    @Param('recipeId', ParseIntPipe) recipeId: number,
    @Body() dto: RateRecipeDto,
  ) {
    return await this.rateRecipeService.execute(userId, recipeId, dto);
  }
}
