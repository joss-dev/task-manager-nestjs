import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'Username', minLength: 3 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(3)
  userName: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
