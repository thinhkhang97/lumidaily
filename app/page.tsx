import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "@/components/FeedbackDialog";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Answers all 4 questions immediately */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              {/* What is it? */}
              <div className="inline-block bg-secondary/30 px-4 py-2 rounded-full border border-secondary/40 mb-6">
                <p className="text-base font-accent">
                  Wellness-First Productivity Tool
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl font-heading mb-6">
                Task Management + Pomodoro Timer + Music + Notes
                <span className="text-primary block mt-2">
                  All in One Workspace
                </span>
              </h1>

              {/* Who uses it + Core benefits */}
              <p className="text-lg mb-6">
                Be productive without the stress. LumiDaily combines focus tools
                in a calming interface, helping you work better while feeling
                better.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/app">
                  <Button size="lg">Try Free Now</Button>
                </Link>
                <FeedbackDialog>
                  <Button variant="outline" size="lg">
                    Give Feedback
                  </Button>
                </FeedbackDialog>
              </div>
            </div>

            {/* Video Demo */}
            <div className="flex justify-center">
              <div className="relative paper-texture paper-shadow rounded-xl overflow-hidden w-full">
                <video
                  className="w-full h-auto rounded-xl"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/video-poster.jpg"
                >
                  <source
                    src="https://hcvwdhddcekvxuyybkvz.supabase.co/storage/v1/object/public/marketing//app-full-flow.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          {/* What makes it different */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background paper-shadow rounded-xl p-6">
              <h3 className="text-lg font-heading mb-2">
                Integrated Workspace
              </h3>
              <p className="text-sm">
                Tasks, timer, music, notes - no app switching
              </p>
            </div>
            <div className="bg-background paper-shadow rounded-xl p-6">
              <h3 className="text-lg font-heading mb-2">Wellness-Focused</h3>
              <p className="text-sm">Calming design that prevents burnout</p>
            </div>
            <div className="bg-background paper-shadow rounded-xl p-6">
              <h3 className="text-lg font-heading mb-2">
                Mindful Productivity
              </h3>
              <p className="text-sm">Quality focus over quantity output</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-foreground/10">
        <div className="text-center">
          <p className="text-sm opacity-70">
            LumiDaily © 2025 - Crafted by thinhkhang97 - an independent
            developer
          </p>
        </div>
      </footer>
    </div>
  );
}
