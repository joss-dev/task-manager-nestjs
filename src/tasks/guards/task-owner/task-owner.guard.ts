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
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Task } from '../../entities/task.entity';

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
  params: {
    id: string;
  };
}

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    private readonly tasksService: TasksService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const taskId = request.params.id;
    console.log('request', request);
    const user = request.user;
    console.log('user:', user);

    const task: Task | null = await this.tasksService.findByIdWithUser(taskId);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    console.log('task.user.id:', task.user.id);
    console.log('user.sub:', user.sub);

    if (task.user.id !== user.sub) {
      throw new ForbiddenException('You cannot access tasks of other users');
    }

    return true;
  }
}
