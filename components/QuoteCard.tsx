"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Mock inspirational quotes
const quotes = [
  "The secret of getting ahead is getting started. - Mark Twain",
  "It always seems impossible until it's done. - Nelson Mandela",
  "Focus on being productive instead of busy. - Tim Ferriss",
  "Take a deep breath. You've got this!",
  "Small steps every day lead to big results.",
];

interface QuoteCardProps {
  className?: string;
  fixedQuote?: string;
}

export function QuoteCard({ className, fixedQuote }: QuoteCardProps) {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    if (fixedQuote) {
      setQuote(fixedQuote);
    } else {
      // Get a random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }
  }, [fixedQuote]);

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <p className="font-accent text-center text-lg">{quote}</p>
      </CardContent>
    </Card>
  );
}
