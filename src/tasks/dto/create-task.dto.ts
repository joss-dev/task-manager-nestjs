import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Task title', minLength: 3 })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @Transform(({ value }: { value: string }) => value.trim())
  title: string;

  @ApiPropertyOptional({ description: 'Task description', minLength: 1 })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(1, { message: 'Description cannot be empty' })
  @Transform(({ value }: { value: string }) => value.trim())
  description?: string;
}
