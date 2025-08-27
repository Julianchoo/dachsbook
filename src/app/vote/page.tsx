"use client";

import { useSession } from "@/lib/auth-client";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { Lock, Heart, Trophy, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

type Dachshund = {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  wins: number;
  losses: number;
  rating: number;
};

type DachshundPair = {
  dachshund1: Dachshund;
  dachshund2: Dachshund;
};

export default function VotePage() {
  const { data: session, isPending } = useSession();
  const [pair, setPair] = useState<DachshundPair | null>(null);
  const [loading, setLoading] = useState(false);
  const [voting, setVoting] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchRandomPair = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/dachshunds/random-pair", {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setPair(data);
      } else {
        console.error("Failed to fetch dachshund pair");
      }
    } catch (error) {
      console.error("Error fetching pair:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (winnerId: string, loserId: string) => {
    if (!session) return;
    
    setVoting(true);
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ winnerId, loserId }),
      });

      if (response.ok) {
        setTotalVotes(prev => prev + 1);
        // Fetch new pair after successful vote
        await fetchRandomPair();
      } else {
        console.error("Failed to record vote");
      }
    } catch (error) {
      console.error("Error recording vote:", error);
    } finally {
      setVoting(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchRandomPair();
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-2">🐕 Vote for Dachshunds!</h1>
            <p className="text-muted-foreground mb-6">
              You need to sign in to start voting for your favorite dachshunds
            </p>
          </div>
          <UserProfile />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            🐕 Dachshund Battle! 🐕
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Click on the dachshund you think is cuter!
          </p>
          {totalVotes > 0 && (
            <p className="text-sm text-muted-foreground">
              You&apos;ve cast {totalVotes} vote{totalVotes !== 1 ? 's' : ''} today!
            </p>
          )}
        </div>

        {loading && !pair ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-12 h-12 animate-spin text-primary" />
            <span className="ml-4 text-lg">Loading adorable dachshunds...</span>
          </div>
        ) : pair ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Dachshund 1 */}
            <div className="text-center">
              <div 
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  voting ? 'pointer-events-none' : ''
                }`}
                onClick={() => !voting && handleVote(pair.dachshund1.id, pair.dachshund2.id)}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-transparent group-hover:border-primary shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={pair.dachshund1.imageUrl}
                    alt={pair.dachshund1.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {voting && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div className="mt-4 p-4 bg-card rounded-lg border group-hover:border-primary transition-colors">
                  <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    {pair.dachshund1.name}
                  </h3>
                  {pair.dachshund1.description && (
                    <p className="text-muted-foreground mb-2">{pair.dachshund1.description}</p>
                  )}
                  <div className="flex justify-center items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      {pair.dachshund1.wins} wins
                    </span>
                    <span className="text-muted-foreground">
                      {pair.dachshund1.losses} losses
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VS Divider */}
            <div className="md:hidden flex items-center justify-center py-4">
              <div className="text-4xl font-bold text-primary animate-pulse">VS</div>
            </div>

            {/* Dachshund 2 */}
            <div className="text-center">
              <div 
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  voting ? 'pointer-events-none' : ''
                }`}
                onClick={() => !voting && handleVote(pair.dachshund2.id, pair.dachshund1.id)}
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-4 border-transparent group-hover:border-primary shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={pair.dachshund2.imageUrl}
                    alt={pair.dachshund2.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {voting && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>
                <div className="mt-4 p-4 bg-card rounded-lg border group-hover:border-primary transition-colors">
                  <h3 className="text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5" />
                    {pair.dachshund2.name}
                  </h3>
                  {pair.dachshund2.description && (
                    <p className="text-muted-foreground mb-2">{pair.dachshund2.description}</p>
                  )}
                  <div className="flex justify-center items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      {pair.dachshund2.wins} wins
                    </span>
                    <span className="text-muted-foreground">
                      {pair.dachshund2.losses} losses
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VS Divider for desktop */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-background border-4 border-primary rounded-full w-20 h-20 flex items-center justify-center">
                <div className="text-2xl font-bold text-primary animate-pulse">VS</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              No dachshunds available for voting yet.
            </p>
            <Button onClick={fetchRandomPair} disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Try Again'
              )}
            </Button>
          </div>
        )}

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={fetchRandomPair}
            disabled={loading || voting}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Skip This Pair
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}