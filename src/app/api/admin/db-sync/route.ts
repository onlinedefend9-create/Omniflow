import { execSync } from "child_process";
import { NextResponse } from "next/server";

/**
 * TEMPORARY ADMIN ROUTE
 * Visit this route to sync your database schema with Prisma.
 * Example: /api/admin/db-sync
 */
export async function GET() {
  // In a real production app, you would add a secret key check here
  // if (request.nextUrl.searchParams.get("key") !== process.env.ADMIN_SECRET) { ... }

  try {
    console.log("Starting Database Synchronization...");

    // 1. Generate Prisma Client
    const generateOutput = execSync("npx prisma generate").toString();
    console.log("Prisma Generate Output:", generateOutput);

    // 2. Push schema to database
    // --accept-data-loss is used here for rapid prototyping to ensure the push succeeds
    const pushOutput = execSync("npx prisma db push --accept-data-loss").toString();
    console.log("Prisma DB Push Output:", pushOutput);

    return NextResponse.json({
      success: true,
      message: "Database synchronized successfully!",
      details: {
        generate: generateOutput,
        push: pushOutput,
      },
    });
  } catch (error: any) {
    console.error("Database Synchronization Error:", error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Database synchronization failed.",
        error: error.message,
        stderr: error.stderr?.toString(),
      },
      { status: 500 }
    );
  }
}
