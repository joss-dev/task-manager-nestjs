import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Tasks (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;

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

    // Registro y login de usuario
    const user = {
      userName: `testuser_${Date.now()}`,
      email: `testuser_${Date.now()}@example.com`,
      password: 'testpassword',
    };
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(user)
      .expect(201);
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
    const { token } = loginRes.body as { token: string };
    jwtToken = token;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a task for authenticated user', async () => {
    const task = {
      title: 'Tarea de integración',
      description: 'Descripción de la tarea',
    };
    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(task)
      .expect(201);
    const { id, title, description, isCompleted, user } = res.body as {
      id: string;
      title: string;
      description: string;
      isCompleted: boolean;
      user: { id: string };
    };
    expect(id).toBeDefined();
    expect(title).toBe(task.title);
    expect(description).toBe(task.description);
    expect(isCompleted).toBe(false);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
  });
});
