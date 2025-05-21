import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  @Transform(({ value }: { value: string }) => value.trim())
  title?: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @Transform(({ value }: { value: string }) => value.trim())
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'El campo isCompleted debe ser un valor booleano' })
  isCompleted?: boolean;
}
