import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiPropertyOptional({ description: 'Nombre de usuario', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @IsOptional()
  @MinLength(6)
  userName?: string;

  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
