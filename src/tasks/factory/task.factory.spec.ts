import { TaskFactory } from './task.factory';
import { CreateTaskDto } from '../dto/create-task.dto';
import { User } from '../../users/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('TaskFactory', () => {
  let factory: TaskFactory;

  beforeEach(() => {
    factory = new TaskFactory();
  });

  it('should throw if title is missing or too short', () => {
    const user = { id: 'user-id' } as User;
    const invalidTitles = [null, '', '  ', 'ab'];
    for (const title of invalidTitles) {
      const dto = { title } as CreateTaskDto;
      expect(() => factory.create(dto, user)).toThrow(BadRequestException);
    }
  });

  it('should create a Task with trimmed title and description', () => {
    const user = { id: 'user-id' } as User;
    const dto: CreateTaskDto = {
      title: '  Tarea importante  ',
      description: '  Descripción  ',
    };
    const task = factory.create(dto, user);
    expect(task.title).toBe('Tarea importante');
    expect(task.description).toBe('Descripción');
    expect(task.user).toBe(user);
    expect(task.isCompleted).toBe(false);
  });

  it('should set description to empty string if not provided', () => {
    const user = { id: 'user-id' } as User;
    const dto: CreateTaskDto = { title: 'Título válido' };
    const task = factory.create(dto, user);
    expect(task.description).toBe('');
  });
});
