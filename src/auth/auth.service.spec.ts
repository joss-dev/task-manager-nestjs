import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

jest.mock('bcrypt');

const mockUser: User = {
  id: 'user-id',
  userName: 'user',
  email: 'test@test.com',
  password: 'hashed',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
  tasks: [],
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    usersService = {
      findOneByEmailWithPassword: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByUserName: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;
    jwtService = {
      signAsync: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw if user not found', async () => {
      usersService.findOneByEmailWithPassword.mockResolvedValue(null);
      await expect(
        service.login({
          email: 'test@test.com',
          password: '123456',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if password is invalid', async () => {
      usersService.findOneByEmailWithPassword.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(
        service.login({
          email: 'test@test.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return token if credentials are valid', async () => {
      usersService.findOneByEmailWithPassword.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue('jwt-token');
      const result = await service.login({
        email: 'test@test.com',
        password: '123456',
      });
      expect(result).toEqual({
        message: 'Login successful',
        token: 'jwt-token',
      });
    });
  });

  describe('register', () => {
    it('should throw if email exists', async () => {
      usersService.findOneByEmail.mockResolvedValue(mockUser);
      await expect(
        service.register({
          email: 'test@test.com',
          userName: 'user',
          password: '123456',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if username exists', async () => {
      usersService.findOneByEmail.mockResolvedValue(null);
      usersService.findOneByUserName.mockResolvedValue(mockUser);
      await expect(
        service.register({
          email: 'test@test.com',
          userName: 'user',
          password: '123456',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should register user if data is valid', async () => {
      usersService.findOneByEmail.mockResolvedValue(null);
      usersService.findOneByUserName.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      usersService.create.mockResolvedValue(mockUser);
      const result = await service.register({
        email: 'test@test.com',
        userName: 'user',
        password: '123456',
      });
      const calledWith = usersService.create.mock.calls[0][0];
      expect(calledWith).toEqual({
        email: 'test@test.com',
        userName: 'user',
        password: 'hashed',
      });
      expect(result).toEqual({
        message: 'User registered successfully',
        userCreated: mockUser,
      });
    });
  });
});
