"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; count?: number } | null>(null);

  const handleReset = async () => {
    setResetting(true);
    setResult(null);

    try {
      const response = await fetch("/api/admin/reset", {
        method: "POST",
        headers: {
          "Authorization": "Bearer admin-secret",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: data.message
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to reset database"
        });
      }
    } catch {
      setResult({
        success: false,
        message: "Error connecting to server"
      });
    } finally {
      setResetting(false);
    }
  };

  const handleImport = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/admin/import-dachshunds", {
        method: "POST",
        headers: {
          "Authorization": "Bearer admin-secret",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          count: data.count
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to import dachshunds"
        });
      }
    } catch {
      setResult({
        success: false,
        message: "Error connecting to server"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">🐕 Dachsbook Admin</h1>
        <p className="text-muted-foreground mb-8">
          Use this page to set up your dachshund database for the first time.
        </p>

        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Import Dachshunds</h2>
          <p className="text-muted-foreground mb-6">
            Click the button below to populate your database with adorable dachshund photos.
            This only needs to be done once when setting up the site.
          </p>

          <div className="space-y-4">
            <Button
              onClick={handleReset}
              disabled={resetting || loading}
              size="lg"
              variant="outline"
              className="mr-4"
            >
              {resetting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset Database"
              )}
            </Button>

            <Button
              onClick={handleImport}
              disabled={loading || resetting}
              size="lg"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Importing Dachshunds...
                </>
              ) : (
                "Import Dachshund Photos"
              )}
            </Button>
          </div>

          {result && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              result.success 
                ? "bg-green-50 border border-green-200 text-green-800" 
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              {result.success ? (
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <div className="text-left">
                <p className="font-medium">{result.message}</p>
                {result.success && result.count && result.count > 0 && (
                  <p className="text-sm mt-1">
                    Successfully imported {result.count} dachshunds! 
                    Your site is now ready for voting.
                  </p>
                )}
              </div>
            </div>
          )}

          {result?.success && (
            <div className="mt-6 space-y-2">
              <p className="font-medium text-green-700">🎉 Setup Complete!</p>
              <p className="text-sm text-muted-foreground">
                Your dachshunds are ready. Users can now visit the site and start voting!
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-left bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">After Import:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Users can visit the homepage and click &ldquo;Start Voting&rdquo;</li>
            <li>• They&apos;ll see two dachshund photos and click their favorite</li>
            <li>• Rankings will automatically update based on votes</li>
            <li>• No technical knowledge needed from users!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}