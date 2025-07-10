import { PrismaClient } from '@prisma/client'
import { RoleConstants } from '../../../src/role/constants/role.constants'
const prisma = new PrismaClient()

export const createAdminUser = async () => {
    const adminRole:any = await prisma.role.findFirst({
        where: {
            slug: RoleConstants.admin.slug
        }
    });

    const AdminUserSeed = {
        name: "Sumit Paul",
        email: "sumitadmin@yopmail.com",
        password: "$2b$10$4q1Lf2VrioFbaVeSk8P/2e4wPHe1U8e6/q9SzEYEQA1yzu7HZREru", // Sumit2025
        role_id: adminRole?.id
    }

    await prisma.user.create({
        data: {
            name: "Sumit Paul",
            email: "sumitadmin@yopmail.com",
            password: "$2b$10$4q1Lf2VrioFbaVeSk8P/2e4wPHe1U8e6/q9SzEYEQA1yzu7HZREru", // Sumit2025
            role_id: adminRole.id
        }
    })
}
