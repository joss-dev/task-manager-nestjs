import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TasksService } from '../../tasks.service';
import { Request } from 'express';
import { Task } from '../../entities/task.entity';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    private readonly tasksService: TasksService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const taskId = request.params.id;
    const user = request.user;

    const task: Task | null = await this.tasksService.findByIdWithUser(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user.id !== user.sub) {
      throw new ForbiddenException('You cannot access tasks of other users');
    }

    return true;
  }
}
