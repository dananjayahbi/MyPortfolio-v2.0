const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const main = async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.admin.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            password: hashedPassword
        }
    });

    console.log('✅ Admin user seeded successfully');
};

main().catch((error) => {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
}).finally(async () => {
    prisma.$disconnect();
});
