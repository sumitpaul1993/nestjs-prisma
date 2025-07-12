# Description
- This repository is a example of module base architecture
- Currently we are using 2 env [local: for local development & deployment, stag: for stag or dev server development & deployment]

# Acceptance Criteria
- By running seed files system will create role, menu, permission and one admin user
- You cannot create another admin user
- you can register as editor and viewer
- editor and viewer role permission will be manage by admin only
- by default admin don't have any permission set because admin can do everything

<br>

# Prerequisite
- node version >= 20
- pnpm version 10 (Installation Doc: https://pnpm.io/installation)
- Docker

# Installation 

>## Execute Docker file to run postgres database (for linux- fedora/redhat/centos)
- sudo systemctl start docker
- docker-compose up -d 

<br>

>## For Install Packages
- pnpm install 
> or
- pnpm i 

<br>

>## For Generate Prisma Entities
- pnpm generate:local
> or
- pnpm generate:stag

<br>

>## For Run Migrations
- pnpm migrate:local 
> or 
- pnpm migrate:stag

<br>

>## For Run Seeders
- pnpm seed:local
> or 
- pnpm seed:stag

<br>

>## For Run Project
- pnpm start:local
> or 
- pnpm start:stag 

<br>

# Run Tests

>## Execute Docker file to run postgres database (for linux- fedora/redhat/centos)
- sudo systemctl start docker
- docker-compose up -d 
- create a new test db for my case am using apptdb_test (we don't need to mess with our original db)

<br>

>## For Install Packages
- pnpm install 
> or
- pnpm i 

<br>

>## For Generate Prisma Entities
- pnpm generate:test

<br>

>## For Run Migrations
- pnpm migrate:test

<br>

>## For Run Seeders
- pnpm seed:test

<br>

>## For Run Test
- pnpm test:e2e

<br>

# Test Cases

### File Name: app.e2e-spec.ts
```
Route : / (GET)
hello world test
```

```
Route : /health (GET)
application health check
```

```
Route : /menu (GET)
get menu list
```

<br>

### File Name: auth.e2e-spec.ts
```
Route : /auth/login (POST) - [Login Error]
check with wrong credentials
```

```
Route : /auth/login (POST) - [Login Success]
```

```
Route : /auth/register (POST) - [Register Error -> with existing email]
try to register with existing email id 
```

```
Route : /auth/register (POST) - [Register Error -> with admin role]
try to register with admin role in our case we will not allow register as admin because admin user will created while running seeder
```

```
Route : /auth/register (POST) - [Register success]
```

```
Route : /auth/login (POST) - [Login Success with registered user]
```

<br>

### File Name: role.e2e-spec.ts
```
Route : /role (GET)
get all roles
```

```
Route : /role/permission (PUT) [Error -> without authentication]
trying to add permission without login
```

```
Route : /role/permission (PUT) [Error -> without admin authentication]
trying to add permission without admin login
```

```
Route : /role/permission (PUT) [success]
```
<br>

### File Name: document.e2e-spec.ts
```
Route : /document (POST)
```

```
Route : /document (GET)
```

```
Route : /document/:id (GET)
```

```
Route : /document/:id (DELETE)
```

## Swagger Doc Url
- http://localhost:3000/api-docs