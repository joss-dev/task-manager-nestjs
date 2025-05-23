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

@ApiTags('Tareas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Tarea creada', type: Task })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @UserId() userId: string,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de tareas', type: [Task] })
  findAll(@UserId() userId: string): Promise<Task[]> {
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: Task })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Actualizar una tarea por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Tarea actualizada', type: Task })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskOwnerGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar (soft delete) una tarea por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  @ApiResponse({ status: 204, description: 'Tarea eliminada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.tasksService.remove(id);
  }
}
