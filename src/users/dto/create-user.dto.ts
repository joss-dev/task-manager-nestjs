import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Username', minLength: 3 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(3, {
    message: 'Username must be at least 3 characters long',
  })
  userName: string;

  @ApiProperty({ description: 'User email' })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({ description: 'User password', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
