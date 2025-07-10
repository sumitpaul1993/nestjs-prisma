# Description
- This repository is a example of module base architecture
- Currently we are using 2 env [local: for local development & deployment, stag: for stag or dev server development & deployment]

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

## Swagger Doc Url
- http://localhost:3000/api-docs