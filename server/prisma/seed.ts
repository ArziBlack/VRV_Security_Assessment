import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin1 = await prisma.user.create({
    data: {
      name: "Admin User 1",
      email: "admin1@example.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: "Admin User 2",
      email: "admin2@example.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const member1 = await prisma.user.create({
    data: {
      name: "Member User 1",
      email: "member1@example.com",
      password: passwordHash,
      role: "MEMBER",
    },
  });

  const member2 = await prisma.user.create({
    data: {
      name: "Member User 2",
      email: "member2@example.com",
      password: passwordHash,
      role: "MEMBER",
    },
  });

  const member3 = await prisma.user.create({
    data: {
      name: "Member User 3",
      email: "member3@example.com",
      password: passwordHash,
      role: "MEMBER",
    },
  });

  const member4 = await prisma.user.create({
    data: {
      name: "Member User 4",
      email: "member4@example.com",
      password: passwordHash,
      role: "MEMBER",
    },
  });

  console.log({ admin1, admin2, member1, member2, member3, member4 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
