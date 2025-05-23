import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Task title', minLength: 3 })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @Transform(({ value }: { value: string }) => value.trim())
  title?: string;

  @ApiPropertyOptional({ description: 'Task description', minLength: 1 })
  @IsOptional()
  @MinLength(1, { message: 'Description cannot be empty' })
  @IsString({ message: 'Description must be a string' })
  @Transform(({ value }: { value: string }) => value.trim())
  description?: string;

  @ApiPropertyOptional({ description: 'Indicates if the task is completed' })
  @IsOptional()
  @IsBoolean({ message: 'The isCompleted field must be a boolean value' })
  isCompleted?: boolean;
}
