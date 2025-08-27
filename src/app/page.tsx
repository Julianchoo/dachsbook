"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Trophy, Users, Vote } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold tracking-tight mb-4">
            🐕 Welcome to Dachsbook! 🐕
          </h2>
          <p className="text-2xl text-muted-foreground mb-6">
            The ultimate dachshund cuteness competition
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vote for your favorite wiener dogs in head-to-head matchups and see which dachshunds 
            rise to the top of our community rankings!
          </p>
        </div>

        {/* Hero Action */}
        <div className="space-y-6 py-8">
          {session ? (
            <div className="space-y-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 glow">
                <Link href="/vote" className="flex items-center gap-2">
                  <Vote className="w-6 h-6" />
                  Start Voting!
                </Link>
              </Button>
              <p className="text-muted-foreground">
                Ready to crown the cutest dachshund? Let&apos;s go!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground mb-4">
                Sign in to start voting for the cutest dachshunds!
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6 glow">
                <Link href="/vote" className="flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Join the Fun!
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 border rounded-lg bg-gradient-to-br from-primary/5 to-transparent">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Vote className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Voting</h3>
            <p className="text-sm text-muted-foreground">
              Simple one-click voting system. Just pick the dachshund you think is cuter!
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-gradient-to-br from-yellow-500/5 to-transparent">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Rankings</h3>
            <p className="text-sm text-muted-foreground">
              Watch the leaderboard update in real-time as votes come in from the community.
            </p>
          </div>
          
          <div className="p-6 border rounded-lg bg-gradient-to-br from-green-500/5 to-transparent">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground">
              Every vote counts! Help the community decide which dachshunds are the cutest.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="space-y-6 mt-16 text-left max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-center">How It Works</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium mb-1">Sign In</h4>
                <p className="text-sm text-muted-foreground">
                  Create an account or sign in with Google to start voting.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium mb-1">Vote</h4>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll see two dachshund photos side by side. Click on the one you think is cuter!
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium mb-1">See Results</h4>
                <p className="text-sm text-muted-foreground">
                  Check the rankings page to see which dachshunds are winning the hearts of voters!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4 mt-16 p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl">
          <h3 className="text-2xl font-bold">Ready to Find the Cutest Dachshund?</h3>
          <p className="text-muted-foreground">
            Join our community of dachshund lovers and help crown the ultimate winner!
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="glow">
              <Link href="/vote" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Start Voting
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/rankings" className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                View Rankings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
