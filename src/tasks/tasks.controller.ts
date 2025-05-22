import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskOwnerGuard } from './guards/task-owner/task-owner.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @UserId() userId: string,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @UseGuards(TaskOwnerGuard)
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TaskOwnerGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskOwnerGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
