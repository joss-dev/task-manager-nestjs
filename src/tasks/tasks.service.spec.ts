import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskFactory } from './factory/task.factory';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from './constants/task-repository.token';

const mockTaskRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByIdWithUser: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

const mockTaskFactory = () => ({
  create: jest.fn(),
});

const mockEventEmitter = () => ({
  emit: jest.fn(),
});

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: ReturnType<typeof mockTaskRepository>;
  let userRepository: ReturnType<typeof mockUserRepository>;
  let taskFactory: ReturnType<typeof mockTaskFactory>;
  let eventEmitter: ReturnType<typeof mockEventEmitter>;

  beforeEach(async () => {
    taskRepository = mockTaskRepository();
    userRepository = mockUserRepository();
    taskFactory = mockTaskFactory();
    eventEmitter = mockEventEmitter();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TASK_REPOSITORY, useValue: taskRepository },
        { provide: getRepositoryToken(User), useValue: userRepository },
        { provide: TaskFactory, useValue: taskFactory },
        { provide: EventEmitter2, useValue: eventEmitter },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task and emit event', async () => {
      const user = { id: 'user-id' } as User;
      const dto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test desc',
      };
      const task = { ...dto, user } as Task;
      const savedTask = { ...task, id: 'task-id' } as Task;

      userRepository.findOne.mockResolvedValue(user);
      taskFactory.create.mockReturnValue(task);
      taskRepository.create.mockResolvedValue(savedTask);

      const result = await service.create(dto, user.id);

      expect(userRepository.findOne).toHaveBeenCalled();
      expect(taskFactory.create).toHaveBeenCalledWith(dto, user);
      expect(taskRepository.create).toHaveBeenCalledWith(task);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'task.created',
        expect.any(Object),
      );
      expect(result).toEqual(savedTask);
    });

    it('should throw if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      await expect(
        service.create({ title: 't', description: 'd' }, 'user-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const tasks = [{ id: '1' }, { id: '2' }] as Task[];
      taskRepository.findAll.mockResolvedValue(tasks);
      const result = await service.findAll();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return the task if found', async () => {
      const task = { id: 'task-id' } as Task;
      taskRepository.findOne.mockResolvedValue(task);
      const result = await service.findOne('task-id');
      expect(result).toEqual(task);
    });

    it('should throw if task not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('bad-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the task, emitting an event', async () => {
      const updated = { id: 'task-id', user: { id: 'user-id' } } as Task;
      const dto: UpdateTaskDto = { title: 'Updated' };
      taskRepository.update.mockResolvedValue(updated);

      const result = await service.update('task-id', dto);

      expect(taskRepository.update).toHaveBeenCalledWith('task-id', dto);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'task.updated',
        expect.any(Object),
      );
      expect(result).toEqual(updated);
    });
  });

  describe('remove', () => {
    it('should delete the task', async () => {
      taskRepository.delete.mockResolvedValue(undefined);
      await service.remove('task-id');
      expect(taskRepository.delete).toHaveBeenCalledWith('task-id');
    });
  });
});
