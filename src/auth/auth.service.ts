import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.usersService.findOneByEmailWithPassword(
      LoginUserDto.email,
    );
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      LoginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user.id };

    const token = await this.jwtService.signAsync(payload);

    return { message: 'Login successful', token };
  }

  async register(createUserDto: RegisterUserDto) {
    const existingEmail = await this.usersService.findOneByEmail(
      createUserDto.email,
    );
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    const existingUserName = await this.usersService.findOneByUserName(
      createUserDto.userName,
    );
    if (existingUserName) {
      throw new BadRequestException('Username already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const userCreated = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully', userCreated };
  }
}
