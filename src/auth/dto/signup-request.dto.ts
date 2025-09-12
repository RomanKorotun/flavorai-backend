import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export class SignupRequestDto {
  @IsNotEmpty({ message: 'Поле username не може бути пустим' })
  @IsString({ message: 'Поле username повинно бути рядком' })
  @MinLength(2, {
    message: 'Поле username повинно містити не менше 2 символів',
  })
  @MaxLength(50, {
    message: 'Поле username повинно містити не більше 50 символів',
  })
  userName: string;

  @IsNotEmpty({ message: 'Поле email не може бути пустим' })
  @IsEmail({}, { message: 'Поле email містить не вірний формат' })
  email: string;

  @IsNotEmpty({ message: 'Поле password не може бути порожнім' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Поле password повинно містити мінімум 6 символів, принаймні одну цифру та одну велику літеру',
  })
  password: string;
}
