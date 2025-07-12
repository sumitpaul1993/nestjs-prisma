import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
const request = require('supertest');
import { AppModule } from './../src/app.module';
import { DatabaseService } from 'src/database/database.service';
import { RoleConstants } from 'src/role/constants/role.constants';
import { MenuPermissionConstants } from 'src/menu/constants/menuPermission.constants';
// import * as PDFDocument from 'pdfkit';
const PDFDocument = require('pdfkit');
import * as tmp from 'tmp';
import * as fs from 'fs';

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
   * check /document POST
  */
  it('/document (POST)', async () => {
    let loginUser = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: 'sumitadmin@yopmail.com',
      password: "Sumit2025"
    });

    const pdfBuffer = await createPdfBuffer('Test PDF upload via buffer');
    const tempFile = tmp.fileSync({ postfix: '.pdf' });
    fs.writeFileSync(tempFile.name, pdfBuffer);

    let { status, body } = await request(app.getHttpServer()).post(
      '/document',
    ).set(
      'Authorization', `Bearer ${loginUser.body.access_token}`
    ).attach('file', tempFile.name);

    expect(status).toBe(201)
    expect(true)

  })

  /**
   * check /document GET
  */
  it('/document (GET)', async () => {
    let loginUser = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: 'sumitadmin@yopmail.com',
      password: "Sumit2025"
    });

    let { status, body } = await request(app.getHttpServer()).get(
      '/document',
    ).set(
      'Authorization', `Bearer ${loginUser.body.access_token}`
    )
    expect(status).toBe(200)
    body.forEach(data => {
      expect(data).toHaveProperty('id');
      expect(typeof data.id).toBe('string');

      expect(data).toHaveProperty('original_name');
      expect(typeof data.original_name).toBe('string');
    });

  })

  /**
   * check /document/:id GET
  */
  it('/document/:id (GET)', async () => {
    let loginUser = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: 'sumitadmin@yopmail.com',
      password: "Sumit2025"
    });

    let getFirstDoc = await prisma.document.findFirst({
      select: { id: true }
    })

    let { status, body } = await request(app.getHttpServer()).get(
      '/document/' + getFirstDoc?.id,
    ).set(
      'Authorization', `Bearer ${loginUser.body.access_token}`
    )
    expect(status).toBe(200);

    expect(body).toHaveProperty('file_name');
    expect(typeof body.file_name).toBe('string');

    expect(body).toHaveProperty('base_url');
    expect(typeof body.base_url).toBe('string');

    expect(body).toHaveProperty('full_link');
    expect(typeof body.full_link).toBe('string');
  })

  /**
   * check /document/:id DELETE
  */
  it('/document/:id (DELETE)', async () => {
    let loginUser = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: 'sumitadmin@yopmail.com',
      password: "Sumit2025"
    });

    let getFirstDoc = await prisma.document.findFirst({
      select: { id: true }
    })

    let { status, body } = await request(app.getHttpServer()).delete(
      '/document/' + getFirstDoc?.id,
    ).set(
      'Authorization', `Bearer ${loginUser.body.access_token}`
    )
    expect(status).toBe(200);

    expect(true);
  })


});


function createPdfBuffer(text: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.text(text || 'Default PDF');
    doc.end();
  });
}
