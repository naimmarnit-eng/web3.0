import "dotenv/config";

import { createId } from "@paralleldrive/cuid2";

import { db } from "@/infrastructure/db/client";

import { users } from "@/infrastructure/db/schema/users";

import { BcryptPasswordHasher } from "@/infrastructure/auth/bcrypt-password-hasher";

async function main() {
  const hasher =
    new BcryptPasswordHasher();

  const passwordHash =
    await hasher.hash("admin1234");

  await db.insert(users).values({
    id: createId(),

    email: "admin@example.com",

    passwordHash,

    name: "Admin",

    role: "ADMIN",
  });

  console.log(
    "✅ Admin user created",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });