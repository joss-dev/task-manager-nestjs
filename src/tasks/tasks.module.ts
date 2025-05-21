import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './repository/tasks.repository';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITaskRepository } from '../interfaces/task-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskRepository,
    {
      provide: ITaskRepository,
      useClass: TaskRepository,
    },
  ],
})
export class TasksModule {}
