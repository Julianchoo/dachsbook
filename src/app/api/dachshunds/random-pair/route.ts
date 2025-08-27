import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dachshunds } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get two random dachshunds using SQL RANDOM() function
    const randomDachshunds = await db
      .select()
      .from(dachshunds)
      .orderBy(sql`RANDOM()`)
      .limit(2);

    if (randomDachshunds.length < 2) {
      return NextResponse.json(
        { error: "Not enough dachshunds available for comparison" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      dachshund1: randomDachshunds[0],
      dachshund2: randomDachshunds[1],
    });
  } catch (error) {
    console.error("Error fetching random dachshunds:", error);
    return NextResponse.json(
      { error: "Failed to fetch dachshunds" },
      { status: 500 }
    );
  }
}