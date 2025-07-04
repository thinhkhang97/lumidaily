"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getTodaysQuote } from "@/data/quotes";

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
      const randomQuote = getTodaysQuote();
      setQuote(randomQuote);
    }
  }, [fixedQuote]);

  return (
    <Card className={className}>
      <CardContent>
        <p className="font-accent text-center text-lg">{quote}</p>
      </CardContent>
    </Card>
  );
}
