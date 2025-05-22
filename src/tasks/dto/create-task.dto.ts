import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @Transform(({ value }: { value: string }) => value.trim())
  title: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(1, { message: 'La descripción no puede estar vacía' })
  @Transform(({ value }: { value: string }) => value.trim())
  description?: string;
}
