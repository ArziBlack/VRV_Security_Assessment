import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  // Create Admin Users
  const admins = [
    {
      name: "Admin User 1",
      email: "admin1@example.com",
      role: Role.ADMIN,
      privileges: ["MANAGE_USERS", "VIEW_REPORTS"], // Example privileges
      country: "USA",
      phone: "+1234567890",
      homeAddress: "123 Admin St, Admin City",
      state: "California",
    },
    {
      name: "Admin User 2",
      email: "admin2@example.com",
      role: Role.ADMIN,
      privileges: ["MANAGE_USERS", "EDIT_SETTINGS"], // Example privileges
      country: "Canada",
      phone: "+1987654321",
      homeAddress: "456 Admin Rd, Admin Town",
      state: "Ontario",
    },
  ];

  for (const admin of admins) {
    const newAdmin = await prisma.user.create({
      data: {
        name: admin.name,
        email: admin.email,
        password: passwordHash,
        role: admin.role,
        country: admin.country,
        phone: admin.phone,
        homeAddress: admin.homeAddress,
        state: admin.state,
        admin: {
          create: {
            privileges: admin.privileges,
          },
        },
      },
    });
    console.log(`Admin created: ${newAdmin.name} (${newAdmin.email})`);
  }

  // Create Member Users
  const members = [
    {
      name: "Member User 1",
      email: "member1@example.com",
      role: Role.MEMBER,
      country: "USA",
      phone: "+1234567890",
      homeAddress: "789 Member St, Member City",
      state: "California",
    },
    {
      name: "Member User 2",
      email: "member2@example.com",
      role: Role.MEMBER,
      country: "Canada",
      phone: "+1987654321",
      homeAddress: "101 Member Rd, Member Town",
      state: "Ontario",
    },
    {
      name: "Member User 3",
      email: "member3@example.com",
      role: Role.MEMBER,
      country: "USA",
      phone: "+1122334455",
      homeAddress: "202 Member Ave, Member Village",
      state: "New York",
    },
    {
      name: "Member User 4",
      email: "member4@example.com",
      role: Role.MEMBER,
      country: "Australia",
      phone: "+1612345678",
      homeAddress: "303 Member Blvd, Member Suburb",
      state: "Victoria",
    },
  ];

  for (const member of members) {
    const newMember = await prisma.user.create({
      data: {
        name: member.name,
        email: member.email,
        password: passwordHash,
        role: member.role,
        country: member.country,
        phone: member.phone,
        homeAddress: member.homeAddress,
        state: member.state,
      },
    });
    console.log(`Member created: ${newMember.name} (${newMember.email})`);
  }

  // Create Moderator User (Example)
  const moderator = await prisma.user.create({
    data: {
      name: "Moderator User",
      email: "moderator@example.com",
      password: passwordHash,
      role: Role.SECURITY_ANALYST, // Moderator can be mapped to a custom role or just use the existing enum
      country: "Germany",
      phone: "+491234567890",
      homeAddress: "101 Moderator St, Moderator City",
      state: "Bavaria",
      moderator: {
        create: {
          assignedAreas: ["Network Security", "Penetration Testing"],
        },
      },
    },
  });

  console.log(`Moderator created: ${moderator.name} (${moderator.email})`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
