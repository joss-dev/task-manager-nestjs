import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título de la tarea', minLength: 3 })
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @Transform(({ value }: { value: string }) => value.trim())
  title: string;

  @ApiPropertyOptional({ description: 'Descripción de la tarea', minLength: 1 })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(1, { message: 'La descripción no puede estar vacía' })
  @Transform(({ value }: { value: string }) => value.trim())
  description?: string;
}
