import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { dachshunds } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    // Get all dachshunds and calculate percentages in JavaScript to avoid SQL complexity
    const allDachshunds = await db
      .select()
      .from(dachshunds)
      .orderBy(desc(dachshunds.wins));

    // Calculate win percentages and total votes in JavaScript
    const rankings = allDachshunds.map(dachshund => {
      const totalVotes = dachshund.wins + dachshund.losses;
      const winPercentage = totalVotes > 0 
        ? Math.round((dachshund.wins / totalVotes) * 100 * 100) / 100 // Round to 2 decimal places
        : 0;
      
      return {
        id: dachshund.id,
        name: dachshund.name,
        imageUrl: dachshund.imageUrl,
        description: dachshund.description,
        wins: dachshund.wins,
        losses: dachshund.losses,
        totalVotes,
        winPercentage,
      };
    });

    // Sort by win percentage first, then by total votes
    rankings.sort((a, b) => {
      if (b.winPercentage !== a.winPercentage) {
        return b.winPercentage - a.winPercentage;
      }
      return b.totalVotes - a.totalVotes;
    });

    return NextResponse.json(rankings);
  } catch (error) {
    console.error("Error fetching rankings:", error);
    return NextResponse.json(
      { error: "Failed to fetch rankings" },
      { status: 500 }
    );
  }
}