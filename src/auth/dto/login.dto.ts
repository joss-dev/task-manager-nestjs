import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserDto {
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @IsOptional()
  @MinLength(6)
  userName?: string;

  @IsEmail()
  email: string;

  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
