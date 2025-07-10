import { PrismaClient } from '@prisma/client'
import { RoleSeed } from './data/role.seed';

const prisma = new PrismaClient()

async function main() {
    await Promise.all(
        RoleSeed.map(
            async (d) =>
                await prisma.role.create({
                    data: d,
                }),
        ),
    );

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

