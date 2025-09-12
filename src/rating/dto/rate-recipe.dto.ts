import { IsInt, Max, Min } from 'class-validator';

export class RateRecipeDto {
  @IsInt({ message: 'Оцінка повинна бути цілим числом' })
  @Min(1, { message: 'Мінімальна оцінка — 1' })
  @Max(5, { message: 'Максимальна оцінка — 5' })
  value: number;
}
