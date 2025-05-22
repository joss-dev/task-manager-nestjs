import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  userName: string;

  @Transform(({ value }) => value.trim())
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
