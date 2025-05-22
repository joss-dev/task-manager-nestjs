import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Título de la tarea', minLength: 3 })
  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @Transform(({ value }: { value: string }) => value.trim())
  title?: string;

  @ApiPropertyOptional({ description: 'Descripción de la tarea', minLength: 1 })
  @IsOptional()
  @MinLength(1, { message: 'La descripción no puede estar vacía' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @Transform(({ value }: { value: string }) => value.trim())
  description?: string;

  @ApiPropertyOptional({ description: 'Indica si la tarea está completada' })
  @IsOptional()
  @IsBoolean({ message: 'El campo isCompleted debe ser un valor booleano' })
  isCompleted?: boolean;
}
