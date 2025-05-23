import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiPropertyOptional({ description: 'Username', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @IsOptional()
  @MinLength(6)
  userName?: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
