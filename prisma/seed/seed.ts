import { PrismaClient } from '@prisma/client'
import { createAdminUser } from './data/adminUser.seed';
import { MenuPermissionSeed } from './data/menuPermission.seed';
import { RoleSeed } from './data/role.seed';

const prisma = new PrismaClient()

async function main() {
    // role seed
    await Promise.all(
        RoleSeed.map(
            async (d) =>
                await prisma.role.create({
                    data: d,
                }),
        )
    );

    // menu permission seed
    await Promise.all(
        MenuPermissionSeed.map(
            async (d) => {
                let menuInsert = await prisma.menu.create({
                    data: {
                        name: d.name,
                        slug: d.slug
                    },
                })
                d.permission.map(
                    async (c: any) => {
                        c.menu_id = menuInsert.id
                        await prisma.permission.create({
                            data: c
                        })
                    }
                )
            }
        )
    );

    // admin user seed
    await createAdminUser()
}


// run seeder
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

