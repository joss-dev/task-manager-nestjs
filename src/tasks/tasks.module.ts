import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './repository/tasks.repository';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TASK_REPOSITORY } from '../tasks/constants/task-repository.token';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TaskFactory } from './factory/task.factory';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskFactory,
    TaskRepository,
    {
      provide: TASK_REPOSITORY,
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
