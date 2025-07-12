import { Test, TestingModule } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
const request = require('supertest');
import { AppModule } from './../src/app.module';
import { DatabaseService } from 'src/database/database.service';
import { RoleConstants } from 'src/role/constants/role.constants';
import { MenuPermissionConstants } from 'src/menu/constants/menuPermission.constants';

describe('RoleController (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;
  let dummyEmail: string = `${Date.now()}testing@yopmail.com`;

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

  /**
   * check /role/permission PUT [Error -> without authentication]
  */
  it('/role/permission PUT [Error -> without authentication]', async () => {
    let { status, body } = await request(app.getHttpServer()).put(
      '/role/permission',
    ).send({
      "roleId": "string",
      "menuPermission": [
        {
          "menuId": "string",
          "permission": [
            {
              "permissionId": "string"
            }
          ]
        }
      ]
    });
    expect(status).toBe(401)

    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('string');
    expect(body.message).toEqual("unauthorized")

    expect(body).toHaveProperty('error')
    expect(typeof body.error).toBe('string');

    expect(body).toHaveProperty('statusCode')
    expect(typeof body.statusCode).toBe('number');
    expect(body.statusCode).toEqual(401)
  })

  /**
   * check /role/permission PUT [Error -> without admin authentication]
  */
  it('/role/permission PUT [Error -> without admin authentication]', async () => {
    // create editor user
    let editorRole = await prisma.role.findFirst({
      where: {
        slug: RoleConstants.editor.slug
      },
      select: {
        id: true
      }
    })

    await request(app.getHttpServer()).post(
      '/auth/register',
    ).send({
      email: dummyEmail,
      password: "Sumit2025",
      name: "Success (Editor Role)",
      roleId: editorRole?.id
    });

    let loginUser = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: dummyEmail,
      password: "Sumit2025"
    });

    let { status, body } = await request(app.getHttpServer()).put(
      '/role/permission',
    ).set(
      'Authorization', `Bearer ${loginUser.body.access_token}`
    ).send({
      "roleId": "string",
      "menuPermission": [
        {
          "menuId": "string",
          "permission": [
            {
              "permissionId": "string"
            }
          ]
        }
      ]
    });
    expect(status).toBe(401)

    expect(body).toHaveProperty('message')
    expect(typeof body.message).toBe('string');
    expect(body.message).toEqual("forbidden")

    expect(body).toHaveProperty('error')
    expect(typeof body.error).toBe('string');

    expect(body).toHaveProperty('statusCode')
    expect(typeof body.statusCode).toBe('number');
    expect(body.statusCode).toEqual(401)

  })

  /**
   * check /role/permission PUT [success]
  */
  it('/role/permission PUT [success]', async () => {
    let editorRole = await prisma.role.findFirst({
      where: {
        slug: RoleConstants.editor.slug
      },
      select: {
        id: true
      }
    })

    let loginUser = await request(app.getHttpServer()).post(
      '/auth/login',
    ).send({
      email: 'sumitadmin@yopmail.com',
      password: "Sumit2025"
    });

    let permissionSet: {
      menuId: string
      permission: {
        permissionId: string
      }[]
    }[] = []

    let getPermissions = await prisma.menu.findMany({
      where: {
        slug: MenuPermissionConstants.document.menuSlug
      },
      select: {
        id: true,
        permission: {
          select: {
            id: true
          }
        }
      }
    })

    for (let i of getPermissions) {
      let a: any = {
        menuId: i.id,
        permission: []
      }
      for (let j of i.permission) {
        a.permission.push({
          permissionId: j.id
        })
      }
      permissionSet.push(a)
    }
    // console.log(permissionSet, "getPermissions")
    let { status, body } = await request(app.getHttpServer()).put(
      '/role/permission',
    ).set(
      'Authorization', `Bearer ${loginUser.body.access_token}`
    ).send({
      roleId: editorRole?.id,
      menuPermission: permissionSet
    });

    expect(status).toBe(200);
    expect(true)

  })

});
