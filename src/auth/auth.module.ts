import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';

@Module({
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, JwtModule],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secretoTheCoffee',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
