import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateRecipeRequestDto {
  @IsNotEmpty({ message: 'Назва рецепта не може бути порожньою' })
  @IsString({ message: 'Назва рецепта повинна бути рядком' })
  @MaxLength(50, {
    message: 'Назва рецепта не повинна перевищувати 50 символів',
  })
  title: string;

  @IsNotEmpty({ message: 'Опис рецепта не може бути порожнім' })
  @IsString({ message: 'Опис рецепта повинен бути рядком' })
  @MinLength(10, {
    message: 'Опис рецепта повинен містити щонайменше 10 символів',
  })
  description: string;

  @IsInt({ message: 'Час приготування повинен бути цілим числом' })
  @Min(1, { message: 'Час приготування повинен бути не менше 1 хвилини' })
  cookTime: number;

  @IsNotEmpty({ message: 'Інгредієнти не можуть бути порожніми' })
  @IsString({ message: 'Інгредієнти повинні бути текстом' })
  ingredients: string;

  @IsNotEmpty({ message: 'Інструкції не можуть бути порожніми' })
  @IsString({ message: 'Інструкції повинні бути текстом' })
  instructions: string;

  @IsNotEmpty({ message: 'Категорія рецепта не може бути порожньою' })
  @IsString({ message: 'Категорія повинна бути рядком' })
  category: string;

  @IsNotEmpty({ message: 'Кухня рецепта не може бути порожньою' })
  @IsString({ message: 'Кухня повинна бути рядком' })
  cuisine: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL зображення має бути коректним посиланням' })
  imageUrl?: string;
}
