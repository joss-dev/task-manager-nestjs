import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nombre de usuario', minLength: 3 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  userName: string;

  @ApiProperty({ description: 'Email del usuario' })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 })
  @Transform(({ value }: { value: string }) => value.trim())
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
