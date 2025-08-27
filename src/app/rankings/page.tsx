"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Trophy, Medal, Award, Heart, TrendingUp, Users } from "lucide-react";

type RankedDachshund = {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  wins: number;
  losses: number;
  totalVotes: number;
  winPercentage: number;
};

export default function RankingsPage() {
  const [rankings, setRankings] = useState<RankedDachshund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch("/api/rankings", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          setRankings(data);
        } else {
          console.error("Failed to fetch rankings");
        }
      } catch (error) {
        console.error("Error fetching rankings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Loading dachshund rankings...</p>
        </div>
      </div>
    );
  }

  if (rankings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">🏆 Dachshund Rankings</h1>
          <p className="text-lg text-muted-foreground">
            No rankings available yet. Start voting to see the leaderboard!
          </p>
        </div>
      </div>
    );
  }

  const totalVotesCount = rankings.reduce((sum, d) => sum + d.totalVotes, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            🏆 Dachshund Rankings
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            The ultimate leaderboard of the cutest dachshunds!
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {rankings.length} dachshunds competing
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {totalVotesCount} total votes cast
            </span>
          </div>
        </div>

        {/* Top 3 Podium */}
        {rankings.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div className="text-center pt-8">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-400 shadow-lg mb-4">
                  <Image
                    src={rankings[1].imageUrl}
                    alt={rankings[1].name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <div className="bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-lg">{rankings[1].name}</h3>
              <p className="text-sm text-muted-foreground">{rankings[1].winPercentage}% wins</p>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl mb-4 ring-4 ring-yellow-200">
                  <Image
                    src={rankings[0].imageUrl}
                    alt={rankings[0].name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    1
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <h3 className="font-bold text-xl text-yellow-600">{rankings[0].name}</h3>
              <p className="text-sm text-muted-foreground">{rankings[0].winPercentage}% wins</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center pt-8">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-600 shadow-lg mb-4">
                  <Image
                    src={rankings[2].imageUrl}
                    alt={rankings[2].name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-lg">{rankings[2].name}</h3>
              <p className="text-sm text-muted-foreground">{rankings[2].winPercentage}% wins</p>
            </div>
          </div>
        )}

        {/* Full Rankings List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">Complete Rankings</h2>
          {rankings.map((dachshund, index) => (
            <div
              key={dachshund.id}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md ${
                index < 3 ? 'bg-gradient-to-r from-primary/5 to-transparent' : 'bg-card'
              }`}
            >
              {/* Rank */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadge(index + 1)}`}>
                {getRankIcon(index + 1)}
              </div>

              {/* Dachshund Image */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-muted">
                  <Image
                    src={dachshund.imageUrl}
                    alt={dachshund.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Dachshund Info */}
              <div className="flex-1">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  {dachshund.name}
                  {index < 3 && <Heart className="w-4 h-4 text-red-500" />}
                </h3>
                {dachshund.description && (
                  <p className="text-sm text-muted-foreground">{dachshund.description}</p>
                )}
              </div>

              {/* Stats */}
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  {dachshund.winPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {dachshund.wins}W - {dachshund.losses}L
                </div>
                <div className="text-xs text-muted-foreground">
                  {dachshund.totalVotes} votes
                </div>
              </div>
            </div>
          ))}
        </div>

        {rankings.length > 0 && (
          <div className="text-center mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-bold text-lg mb-2">🎉 Thank you for voting!</h3>
            <p className="text-muted-foreground">
              Keep voting to help determine the ultimate cutest dachshund champion!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}