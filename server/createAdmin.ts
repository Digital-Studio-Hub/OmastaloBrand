import bcrypt from "bcryptjs";
import { db } from "./db";
import { users } from "@shared/schema";

async function createAdmin() {
  const email = process.argv[2] || "admin@omastalo.co.za";
  const password = process.argv[3] || "admin123"; // Default password - should be changed
  const username = process.argv[4] || "admin";

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [user] = await db
      .insert(users)
      .values({
        email,
        username,
        password: hashedPassword,
        isAdmin: true,
      })
      .returning();

    console.log("Admin user created successfully:");
    console.log(`Email: ${user.email}`);
    console.log(`Username: ${user.username}`);
    console.log(`ID: ${user.id}`);
    console.log("\nPlease change the password after first login!");
    process.exit(0);
  } catch (error: any) {
    if (error.code === "23505") {
      console.error("Error: User with this email or username already exists");
    } else {
      console.error("Error creating admin user:", error);
    }
    process.exit(1);
  }
}

createAdmin();
