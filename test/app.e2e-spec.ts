import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
const request = require('supertest');
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * check /
  */
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });


  /**
   * check /health
  */
  it('/health (GET)', async () => {
    let { status, body } = await request(app.getHttpServer()).get(
      '/health',
    );
    expect(status).toBe(200)
    expect(body.status).toEqual('Healthy')
    expect(body.environment).toEqual('test')
  })

});

describe('MenuController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * check /menu (GET)
  */
  it('/menu (GET)', async () => {
    let { status, body } = await request(app.getHttpServer()).get(
      '/menu',
    );
    expect(status).toBe(200)
    body.forEach(data => {
      expect(data).toHaveProperty('id');
      expect(typeof data.id).toBe('string');

      expect(data).toHaveProperty('name');
      expect(typeof data.name).toBe('string');

      expect(data).toHaveProperty('slug');
      expect(typeof data.slug).toBe('string');
      data.permission.forEach(subData => {
        expect(data).toHaveProperty('id');
        expect(typeof data.id).toBe('string');

        expect(data).toHaveProperty('name');
        expect(typeof data.name).toBe('string');

        expect(data).toHaveProperty('slug');
        expect(typeof data.slug).toBe('string');
      });
    });
  })

});