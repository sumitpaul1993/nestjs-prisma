import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
const request = require('supertest');
import { AppModule } from './../src/app.module';
import { DatabaseService } from 'src/database/database.service';
import { RoleConstants } from 'src/role/constants/role.constants';
import { MenuPermissionConstants } from 'src/menu/constants/menuPermission.constants';

describe('DocumentController (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<DatabaseService>(DatabaseService);
    await app.init();
  });

  /**
   * check /role GET
  */
  it('/role (GET)', async () => {
    let { status, body } = await request(app.getHttpServer()).get(
      '/role',
    );
    expect(status).toBe(200)
    expect(body).toHaveLength(3)
    body.forEach(data => {
      expect(data).toHaveProperty('id');
      expect(typeof data.id).toBe('string');

      expect(data).toHaveProperty('name');
      expect(typeof data.name).toBe('string');

      expect(data).toHaveProperty('slug');
      expect(typeof data.slug).toBe('string');
    });
  })


});
