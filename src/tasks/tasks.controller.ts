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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UserId } from '../common/decorators/user-id.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { TaskOwnerGuard } from './guards/task-owner/task-owner.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created', type: Task })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @UserId() userId: string,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  findAll(@UserId() userId: string): Promise<Task[]> {
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task found', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Task ID' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete (soft delete) a task by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'Task ID' })
  @ApiResponse({ status: 204, description: 'Task deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
