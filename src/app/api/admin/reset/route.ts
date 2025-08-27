import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dachshunds, votes } from "@/lib/schema";

export async function POST(request: NextRequest) {
  try {
    // Simple authentication check - in production you'd want proper admin auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== 'Bearer admin-secret') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all votes first (due to foreign key constraints)
    await db.delete(votes);
    
    // Delete all dachshunds
    await db.delete(dachshunds);

    return NextResponse.json({
      message: "Database reset successfully. You can now import fresh dachshunds.",
    });

  } catch (error) {
    console.error("Error resetting database:", error);
    return NextResponse.json(
      { error: "Failed to reset database" },
      { status: 500 }
    );
  }
}