import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetAllRecipesService } from './services/getAllRecipes.service';
import { JwtAccessGuard } from 'src/common/guards/jwt-access.guard';
import { GetMyRecipesService } from './services/getMyRecipes.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateRecipeService } from './services/createRecipe.service';
import { CreateRecipeRequestDto } from './dto/create-recipe-request.dto';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly getAllRecipesService: GetAllRecipesService,
    private readonly getMyRecipesService: GetMyRecipesService,
    private readonly createRecipeService: CreateRecipeService,
  ) {}

  @UseGuards(JwtAccessGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRecipes(@Query('title') title?: string) {
    return await this.getAllRecipesService.execute(title);
  }

  @UseGuards(JwtAccessGuard)
  @Get('my')
  @HttpCode(HttpStatus.OK)
  async getMyRecipes(
    @CurrentUser('id') userId: number,
    @Query('title') title?: string,
  ) {
    return await this.getMyRecipesService.execute(userId, title);
  }

  @UseGuards(JwtAccessGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createRecipe(
    @CurrentUser('id') userId: number,
    @Body() dto: CreateRecipeRequestDto,
  ) {
    return await this.createRecipeService.execute(userId, dto);
  }
}
