import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { votes, dachshunds } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { winnerId, loserId } = await request.json();

    if (!winnerId || !loserId) {
      return NextResponse.json(
        { error: "Both winnerId and loserId are required" },
        { status: 400 }
      );
    }

    if (winnerId === loserId) {
      return NextResponse.json(
        { error: "Winner and loser cannot be the same" },
        { status: 400 }
      );
    }

    // Start a transaction to record vote and update ratings
    await db.transaction(async (tx) => {
      // Record the vote
      await tx.insert(votes).values({
        id: nanoid(),
        userId: session.user.id,
        winnerId,
        loserId,
      });

      // Update winner's stats
      await tx
        .update(dachshunds)
        .set({
          wins: sql`${dachshunds.wins} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(dachshunds.id, winnerId));

      // Update loser's stats
      await tx
        .update(dachshunds)
        .set({
          losses: sql`${dachshunds.losses} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(dachshunds.id, loserId));
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error recording vote:", error);
    return NextResponse.json(
      { error: "Failed to record vote" },
      { status: 500 }
    );
  }
}