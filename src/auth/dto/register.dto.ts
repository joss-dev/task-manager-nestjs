import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(3)
  userName: string;

  @IsEmail()
  email: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
