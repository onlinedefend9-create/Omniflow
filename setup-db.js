import { execSync } from "child_process";

console.log("🚀 Starting database setup...");

try {
  console.log("📦 Generating Prisma Client...");
  execSync("npx prisma generate", { stdio: "inherit" });

  console.log("🔄 Syncing database schema...");
  // Using db push for rapid prototyping in Vibe Coding mode
  execSync("npx prisma db push", { stdio: "inherit" });

  console.log("✅ Database setup complete!");
} catch (error) {
  console.error("❌ Database setup failed:");
  console.error(error.message);
  process.exit(1);
}
