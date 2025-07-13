import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "@/components/FeedbackDialog";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="container mx-auto px-4 py-16 md:py-24"
        aria-label="Introduction to LumiDaily"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-secondary/30 px-4 py-2 rounded-full border border-secondary/40">
              <p className="text-base font-accent">
                Wellness-First Productivity
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading">
              Transform productivity into a{" "}
              <span className="text-primary">calming practice</span>
            </h1>
            <p className="text-xl">
              LumiDaily combines daily task management with work sessions, music
              integration, and note-taking for a more mindful approach to
              getting things done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/app" aria-label="Get started with LumiDaily">
                <Button size="lg">Try Now - It&apos;s Free</Button>
              </Link>
              <Link
                href="#use-cases"
                aria-label="Learn more about LumiDaily use cases"
              >
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Actual Video - Made larger */}
            <div className="relative paper-texture paper-shadow rounded-xl overflow-hidden w-full max-w-2xl mx-auto">
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
      </section>

      {/* Use Cases Section */}
      <section
        id="use-cases"
        className="bg-secondary/10 py-16 md:py-24 border-y border-secondary/20"
        aria-label="LumiDaily use cases"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              How LumiDaily enhances your daily workflow
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Three essential features working together to create a mindful and
              productive workspace.
            </p>
          </div>

          {/* Use Case 1: Daily Task & Work Sessions */}
          <div className="mb-12">
            <div className="bg-background paper-shadow rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-2xl font-heading">
                  Daily Task & Work Sessions
                </h3>
              </div>
              <p className="mb-3">
                Organize your tasks and maintain focused work sessions with
                Pomodoro-style timers.
              </p>
              <p>
                Complete tasks with clarity and track your daily progress in one
                unified workspace.
              </p>
            </div>
          </div>

          {/* Use Case 2: Music Enhanced Working */}
          <div className="mb-12">
            <div className="bg-background paper-shadow rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 bg-secondary rounded-full"></div>
                </div>
                <h3 className="text-2xl font-heading">
                  Music Enhanced Working
                </h3>
              </div>
              <p className="mb-3">
                Control your focus music without leaving your productivity
                workspace.
              </p>
              <p>
                Built-in YouTube integration keeps your workflow uninterrupted
                while enjoying your favorite tracks.
              </p>
            </div>
          </div>

          {/* Use Case 3: Taking Notes & Ideas */}
          <div>
            <div className="bg-background paper-shadow rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 bg-accent rounded-full"></div>
                </div>
                <h3 className="text-2xl font-heading">
                  Taking Notes While Working
                </h3>
              </div>
              <p className="mb-3">
                Capture ideas and insights instantly without switching between
                applications.
              </p>
              <p>
                Preserve your creative flow while maintaining focus on your
                current work session.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/app" aria-label="Try LumiDaily's available features">
              <Button size="lg">Experience These Features Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Wellness Approach Section */}
      <section
        className="container mx-auto px-4 py-16 md:py-24"
        aria-label="LumiDaily's wellness approach"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            A <span className="text-primary">wellness-first</span> approach to
            productivity
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            LumiDaily is designed to help you be productive without the stress
            and burnout that often comes with traditional productivity tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="relative paper-texture paper-shadow rounded-xl p-8 border border-foreground/10">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 bg-secondary/30 rounded-full flex items-center justify-center">
                    <span className="font-accent">1</span>
                  </div>
                  <h3 className="text-xl font-heading">
                    Reduce Digital Overwhelm
                  </h3>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 bg-secondary/30 rounded-full flex items-center justify-center">
                    <span className="font-accent">2</span>
                  </div>
                  <h3 className="text-xl font-heading">
                    Build Sustainable Habits
                  </h3>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-10 w-10 bg-secondary/30 rounded-full flex items-center justify-center">
                    <span className="font-accent">3</span>
                  </div>
                  <h3 className="text-xl font-heading">
                    Enhance Focus & Concentration
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-secondary/30 rounded-full flex items-center justify-center">
                    <span className="font-accent">4</span>
                  </div>
                  <h3 className="text-xl font-heading">
                    Promote Work-Life Balance
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading">
              Designed for your well-being
            </h3>
            <p className="text-lg">
              Traditional productivity tools often push you to do more, faster.
              LumiDaily takes a different approach with a calming,
              paper-inspired interface that reduces digital fatigue and makes
              productivity feel more meaningful.
            </p>
            <p className="text-lg">
              By combining focus sessions with task planning and mindfulness
              practices, LumiDaily helps you build sustainable productivity
              habits that enhance your work without sacrificing your well-being.
            </p>
            <Link
              href="/app"
              aria-label="Experience LumiDaily's wellness approach"
            >
              <Button variant="secondary" size="lg">
                Experience the Difference
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Use Cases Section */}
      <section
        className="bg-accent/10 py-16 md:py-24 border-y border-accent/20"
        aria-label="Upcoming LumiDaily use cases"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent/30 px-4 py-2 rounded-full border border-accent/40 mb-4">
              <p className="text-base font-accent">Coming Soon</p>
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              More ways to enhance your productivity
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              We&apos;re constantly working to add new use cases that will make
              LumiDaily even more valuable for your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Upcoming Use Case 4 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-primary rounded-full"></div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-heading">
                  Daily Reflection & Gratitude
                </h3>
              </div>
              <p className="text-sm">
                End each day with structured reflection to maintain perspective,
                acknowledge accomplishments, and plan for tomorrow with clarity.
              </p>
            </div>

            {/* Upcoming Use Case 5 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-secondary rounded-full"></div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-heading">
                  Productivity Pattern Analysis
                </h3>
              </div>
              <p className="text-sm">
                Analyze optimal work times and energy patterns to schedule
                important tasks during peak productivity periods.
              </p>
            </div>

            {/* Upcoming Use Case 6 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-accent rounded-full"></div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-heading">Team Synchronization</h3>
              </div>
              <p className="text-sm">
                Enable synchronized Pomodoro sessions for teams to align focus
                periods and respect each other&apos;s deep work time.
              </p>
            </div>

            {/* Upcoming Use Case 7 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-primary rounded-full"></div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-heading">Burnout Prevention</h3>
              </div>
              <p className="text-sm">
                Detect risk patterns and enforce healthy breaks to maintain
                sustainable productivity long-term.
              </p>
            </div>

            {/* Upcoming Use Case 8 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-secondary rounded-full"></div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-heading">
                  Cross-Device Work Continuity
                </h3>
              </div>
              <p className="text-sm">
                Sync tasks and sessions across platforms to maintain workflow
                continuity regardless of device.
              </p>
            </div>

            {/* Upcoming Use Case 9 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-accent rounded-full"></div>
              </div>
              <div className="mb-2">
                <h3 className="text-xl font-heading">
                  Focus Quality Improvement
                </h3>
              </div>
              <p className="text-sm">
                Track distraction patterns and provide focus scoring to
                gradually improve concentration abilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer's Note Section */}
      <section
        className="container mx-auto px-4 py-16 md:py-24"
        aria-label="About the developer"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            A personal project for mindful productivity
          </h2>
          <p className="text-lg mb-6">
            LumiDaily was born from my own struggle with traditional
            productivity tools that often left me feeling more stressed than
            productive. I wanted to create something that would help people work
            effectively while maintaining their well-being.
          </p>
          <p className="text-lg mb-8">
            As an independent developer, I&apos;m committed to building features
            that truly serve users&apos; needs. Your feedback and early adoption
            help shape the direction of this project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/app" aria-label="Join as an early adopter">
              <Button size="lg">Join as Early Adopter</Button>
            </Link>
            <FeedbackDialog>
              <Button variant="outline" size="lg">
                Share Your Feedback
              </Button>
            </FeedbackDialog>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="container mx-auto px-4 py-8 md:py-12"
        aria-label="Footer"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl mb-4">LumiDaily</h3>
            <p className="opacity-70">
              Transform productivity into a calming, effective practice with our
              wellness-focused approach.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Available Now</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/app"
                  className="hover:text-primary transition-colors"
                >
                  Pomodoro Timer
                </Link>
              </li>
              <li>
                <Link
                  href="/app"
                  className="hover:text-primary transition-colors"
                >
                  Task Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/app"
                  className="hover:text-primary transition-colors"
                >
                  Music Integration
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Support Development</h4>
            <ul className="space-y-2">
              <li>
                <FeedbackDialog>
                  <button className="hover:text-primary transition-colors text-left">
                    Contact & Feedback
                  </button>
                </FeedbackDialog>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl">LumiDaily</span>
            <span className="text-base opacity-70">© 2025</span>
          </div>
          <div className="text-sm opacity-70">
            Crafted with care by an independent developer
          </div>
        </div>
      </footer>
    </div>
  );
}
