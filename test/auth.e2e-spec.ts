import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
const request = require('supertest');
import { AppModule } from './../src/app.module';
import { DatabaseService } from 'src/database/database.service';
import { RoleConstants } from 'src/role/constants/role.constants';

describe('AuthController - Login (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * check /auth/login (POST) - [Login Error]
  */
  it('/auth/login (POST) - [Login Error]', async () => {
    let { status, body } = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: "sumitadmin@yopmail.coms",
      password: "Sumit2025"
    });
    expect(status).toBe(406)

    expect(body).toHaveProperty('statusCode')
    expect(typeof body.statusCode).toBe('number');

    expect(body).toHaveProperty('error')
    expect(typeof body.error).toBe('string');

    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('object');
    expect(body.message).toHaveLength(1);

    body.message.forEach(data => {
      expect(data).toHaveProperty('value');
      expect(typeof data.value).toBe('string');

      expect(data).toHaveProperty('msg');
      expect(typeof data.msg).toBe('string');

      expect(data).toHaveProperty('param');
      expect(typeof data.param).toBe('string');

      expect(data).toHaveProperty('location');
      expect(typeof data.location).toBe('string');
    });

  })

  /**
   * check /auth/login (POST) - [Login Success]
  */
  it('/auth/login (POST) - [Login Success]', async () => {
    let { status, body } = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: "sumitadmin@yopmail.com",
      password: "Sumit2025"
    });
    expect(status).toBe(201)

    expect(body).toHaveProperty('access_token')
    expect(typeof body.access_token).toBe('string');

    expect(body).toHaveProperty('refresh_token')
    expect(typeof body.refresh_token).toBe('string');

  })

});

describe('AuthController - Register and Login with that registered user (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService
  let dummyEmail: string = `${Date.now()}testing@yopmail.com`

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<DatabaseService>(DatabaseService);
    await app.init();
  });

  /**
   * check /auth/register (POST) - [Register Error -> with existing email]
  */
  it('/auth/register (POST) - [Register Error -> with existing email]', async () => {
    let { status, body } = await request(app.getHttpServer()).post(
      '/auth/register',
    ).send({
      email: "sumitadmin@yopmail.com",
      password: "Sumit2025",
      name: "string",
      roleId: "string"
    });

    expect(status).toBe(406)

    expect(body).toHaveProperty('statusCode')
    expect(typeof body.statusCode).toBe('number');

    expect(body).toHaveProperty('error')
    expect(typeof body.error).toBe('string');

    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('object');
    expect(body.message).toHaveLength(1);

    body.message.forEach(data => {
      expect(data).toHaveProperty('value');
      expect(typeof data.value).toBe('string');

      expect(data).toHaveProperty('msg');
      expect(typeof data.msg).toBe('string');

      expect(data).toHaveProperty('param');
      expect(typeof data.param).toBe('string');

      expect(data).toHaveProperty('location');
      expect(typeof data.location).toBe('string');
    });

  })

  /**
   * check /auth/register (POST) - [Register Error -> with admin role]
  */
  it('/auth/register (POST) - [Register Error -> with admin role]', async () => {
    let adminRole = await prisma.role.findFirst({
      where: {
        slug: RoleConstants.admin.slug
      },
      select: {
        id: true
      }
    })

    let { status, body } = await request(app.getHttpServer()).post(
      '/auth/register',
    ).send({
      email: "sumitadmin@yopmail.co",
      password: "Sumit2025",
      name: "Error (Admin Role)",
      roleId: adminRole?.id
    });

    expect(status).toBe(406)

    expect(body).toHaveProperty('statusCode')
    expect(typeof body.statusCode).toBe('number');

    expect(body).toHaveProperty('error')
    expect(typeof body.error).toBe('string');

    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('object');
    expect(body.message).toHaveLength(1);

    body.message.forEach(data => {
      expect(data).toHaveProperty('value');
      expect(typeof data.value).toBe('string');

      expect(data).toHaveProperty('msg');
      expect(typeof data.msg).toBe('string');

      expect(data).toHaveProperty('param');
      expect(typeof data.param).toBe('string');

      expect(data).toHaveProperty('location');
      expect(typeof data.location).toBe('string');
    });

  })

  /**
   * check /auth/register (POST) - [Register success]
  */
  it('/auth/register (POST) - [Register success]', async () => {
    let editorRole = await prisma.role.findFirst({
      where: {
        slug: RoleConstants.editor.slug
      },
      select: {
        id: true
      }
    })

    let { status, body } = await request(app.getHttpServer()).post(
      '/auth/register',
    ).send({
      email: dummyEmail,
      password: "Sumit2025",
      name: "Success (Editor Role)",
      roleId: editorRole?.id
    });

    expect(status).toBe(201);
    expect(true)

  })

  /**
   * check /auth/login (POST) - [Login Success with registered user]
  */
  it('/auth/login (POST) - [Login Success with registered user]', async () => {
    let { status, body } = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: dummyEmail,
      password: "Sumit2025"
    });
    expect(status).toBe(201)

    expect(body).toHaveProperty('access_token')
    expect(typeof body.access_token).toBe('string');

    expect(body).toHaveProperty('refresh_token')
    expect(typeof body.refresh_token).toBe('string');

  })

});