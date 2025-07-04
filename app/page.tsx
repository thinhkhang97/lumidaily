import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleTimer } from "@/components/ui/circle-timer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-secondary/30 px-4 py-2 rounded-full border border-secondary/40">
              <p className="text-sm font-accent">Mindful Productivity</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading">
              Transform productivity into a{" "}
              <span className="text-primary">mindful practice</span>
            </h1>
            <p className="text-xl">
              Pomodaily combines the proven Pomodoro Technique with daily
              reflection, beautiful handwritten aesthetics, and wellness-focused
              design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/app">
                <Button size="lg">Get Started</Button>
              </Link>
              {/* <Button variant="outline" size="lg">
                Learn More
              </Button> */}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative paper-texture paper-shadow rounded-xl p-8 border border-foreground/10">
              <div className="absolute -top-4 -right-4 bg-secondary/30 p-2 rounded-full border border-secondary/40 soft-glow">
                <span className="font-accent">Lumi</span>
              </div>
              <div className="flex flex-col items-center gap-6">
                <CircleTimer
                  duration={1500}
                  currentTime={1200}
                  size={180}
                  strokeWidth={12}
                >
                  <div className="text-center">
                    <span className="text-3xl font-medium">20:00</span>
                    <p className="text-sm opacity-80">Focus Time</p>
                  </div>
                </CircleTimer>
                <div className="w-full space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary flex-shrink-0"></div>
                    <p className="text-sm line-through opacity-70">
                      Review PRD document
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-foreground/30 flex-shrink-0"></div>
                    <p className="text-sm">Design landing page wireframe</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-foreground/30 flex-shrink-0"></div>
                    <p className="text-sm">Implement responsive layout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/10 py-16 md:py-24 border-y border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              Features that promote mindfulness
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              A thoughtfully designed, paper-inspired digital experience that
              feels personal, calming, and sustainable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-primary rounded-full"></div>
              </div>
              <h3 className="text-xl font-heading mb-2">Pomodoro Timer</h3>
              <p>
                Customizable focus sessions with mindful breaks to maintain
                productivity without burnout.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-secondary rounded-full"></div>
              </div>
              <h3 className="text-xl font-heading mb-2">Daily Task Planning</h3>
              <p>
                Organize your day with session-based tracking and visual
                progress indicators.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-accent rounded-full"></div>
              </div>
              <h3 className="text-xl font-heading mb-2">Gratitude Journal</h3>
              <p>
                Integrate mindfulness into your routine with daily reflection
                and gratitude practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Lumi Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative paper-texture paper-shadow rounded-xl p-8 border border-foreground/10 max-w-md">
              <div className="absolute -top-4 -left-4 bg-secondary/40 p-3 rounded-full border border-secondary/50 soft-glow">
                <span className="font-accent">Hello!</span>
              </div>
              <div className="space-y-4 font-accent">
                <p className="text-lg">
                  &ldquo;I&rsquo;m Lumi, your paper sprite. Let&rsquo;s write
                  today&rsquo;s story together!&rdquo;
                </p>
                <p>
                  &ldquo;What brought you joy today? Let&rsquo;s add it to your
                  gratitude journal.&rdquo;
                </p>
                <p>
                  &ldquo;One more focus session, and you&rsquo;re closer to
                  achieving your goals!&rdquo;
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading">
              Meet <span className="text-secondary">Lumi</span>, your mindful
              companion
            </h2>
            <p className="text-xl">
              A delicate paper sprite glowing with soft lavender light, Lumi
              carries the magic of mindful productivity.
            </p>
            <p>
              Lumi helps you craft each day like a page in a beautiful story,
              weaving focus, rest, and reflection into moments that feel alive
              and meaningful.
            </p>
            <Button variant="secondary" size="lg">
              Learn about Lumi
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 py-16 md:py-24 border-y border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of mindful professionals, students, and wellness
            enthusiasts who have found balance with Pomodaily.
          </p>
          <Link href="/app">
            <Button size="lg">Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl">Pomodaily</span>
            <span className="text-sm opacity-70">© 2025</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
