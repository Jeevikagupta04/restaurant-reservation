import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.js";

export const seedAdmin = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@jeevika.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@1234";

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      await Admin.create({
        name: "Jeevika Manager",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      console.log(`[SEED] Admin user successfully seeded: ${adminEmail}`);
    } else {
      console.log(`[SEED] Admin user already exists: ${adminEmail}`);
    }
  } catch (error) {
    console.error(`[SEED ERROR] Failed to seed admin user: ${error.message}`);
  }
};
