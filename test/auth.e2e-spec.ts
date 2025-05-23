import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register and login a user', async () => {
    const user = {
      userName: `testuser_${Date.now()}`,
      email: `testuser_${Date.now()}@example.com`,
      password: 'testpassword',
    };

    // Registro
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const registerRes = await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201);

    const { message, user: registeredUser } = registerRes.body as {
      message: string;
      user: { id: string; email: string; userName: string };
    };
    expect(message).toBe('User registered successfully');
    expect(registeredUser).toBeDefined();
    expect(registeredUser).toHaveProperty('id');
    expect(registeredUser).toHaveProperty('email', user.email);
    expect(registeredUser).toHaveProperty('userName', user.userName);

    // Login
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);

    const { message: loginMessage, token } = loginRes.body as {
      message: string;
      token: string;
    };
    expect(loginMessage).toBe('Login successful');
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
