import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TaskFactory {
  create(createTaskDto: CreateTaskDto, user: User): Task {
    if (!createTaskDto.title || createTaskDto.title.trim().length < 3) {
      throw new BadRequestException(
        'Title is required and must be at least 3 characters long',
      );
    }

    const task = new Task();
    task.title = createTaskDto.title.trim();
    task.description = createTaskDto.description?.trim() ?? '';
    task.user = user;
    task.isCompleted = false;
    return task;
  }
}
