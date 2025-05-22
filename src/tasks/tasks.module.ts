import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './repository/tasks.repository';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TASK_REPOSITORY } from '../tasks/constants/task-repository.token';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { TaskFactory } from './factory/task.factory';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), AuthModule, EventsModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskFactory,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
