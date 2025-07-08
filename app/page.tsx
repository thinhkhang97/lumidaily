import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleTimer } from "@/components/ui/circle-timer";

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
              <p className="text-sm font-accent">Wellness-First Productivity</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading">
              Transform productivity into a{" "}
              <span className="text-primary">calming practice</span>
            </h1>
            <p className="text-xl">
              LumiDaily combines the proven Pomodoro Technique with daily
              reflection, beautiful handwritten aesthetics, and wellness-focused
              design for a more mindful approach to getting things done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/app" aria-label="Get started with LumiDaily">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link
                href="#features"
                aria-label="Learn more about LumiDaily features"
              >
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
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
      <section
        id="features"
        className="bg-secondary/10 py-16 md:py-24 border-y border-secondary/20"
        aria-label="LumiDaily features"
      >
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
                productivity without burnout. Adjust timer durations to match
                your energy levels.
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
                progress indicators. Plan your tasks based on energy levels and
                priorities.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-accent rounded-full"></div>
              </div>
              <h3 className="text-xl font-heading mb-2">Music Integration</h3>
              <p>
                Enhance your focus with integrated YouTube music controls.
                Create playlists for different types of work sessions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Feature 4 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-heading">Daily Reflection</h3>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <p>
                End each day with structured reflection to acknowledge
                accomplishments and plan for tomorrow with clarity and purpose.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-secondary rounded-full"></div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-heading">Progress Analytics</h3>
                <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full font-medium">
                  Coming Soon
                </span>
              </div>
              <p>
                Track your productivity patterns with beautiful visualizations
                that help you understand your work habits and celebrate
                progress.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-accent rounded-full"></div>
              </div>
              <h3 className="text-xl font-heading mb-2">Offline-First</h3>
              <p>
                Work without distractions - all your data is stored locally on
                your device with optional sync capabilities coming soon.
              </p>
            </div>
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
              Traditional productivity tools often push you to do more, faster,
              without considering your mental and emotional well-being.
              LumiDaily takes a different approach.
            </p>
            <p className="text-lg">
              Our calming, paper-inspired interface reduces digital fatigue. The
              handwritten aesthetic creates a personal, human touch that makes
              productivity feel less mechanical and more meaningful.
            </p>
            <p className="text-lg">
              By combining focus sessions with reflection and mindfulness
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

      {/* Future Features Section */}
      <section
        className="bg-accent/10 py-16 md:py-24 border-y border-accent/20"
        aria-label="Upcoming LumiDaily features"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent/30 px-4 py-2 rounded-full border border-accent/40 mb-4">
              <p className="text-sm font-accent">Roadmap</p>
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              Exciting features on the horizon
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              We&apos;re constantly working to make LumiDaily even better.
              Here&apos;s what&apos;s coming next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Future Feature 1 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-accent rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-heading">Team Collaboration</h3>
                <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full font-medium">
                  Q1 2025
                </span>
              </div>
              <p>
                Synchronized group focus sessions, accountability partners, and
                virtual co-working spaces to enhance team productivity.
              </p>
            </div>

            {/* Future Feature 2 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-primary rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-heading">Lumi Assistant</h3>
                <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                  Q2 2025
                </span>
              </div>
              <p>
                AI-powered productivity insights, personalized focus
                recommendations, and daily story writing based on your
                accomplishments.
              </p>
            </div>

            {/* Future Feature 3 */}
            <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10 gentle-hover">
              <div className="h-12 w-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                <div className="h-6 w-6 bg-secondary rounded-full"></div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-heading">Mobile Apps</h3>
                <span className="bg-secondary/20 text-secondary text-xs px-2 py-1 rounded-full font-medium">
                  Q3 2025
                </span>
              </div>
              <p>
                Native iOS and Android applications with cross-device sync,
                offline capabilities, and mobile-specific optimizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Lumi Section - Hidden until implemented 
      <section
        className="bg-secondary/10 py-16 md:py-24 border-y border-secondary/20"
        aria-label="Meet Lumi, your productivity companion"
      >
        <div className="container mx-auto px-4">
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
                    &ldquo;What brought you joy today? Let&rsquo;s add it to
                    your daily reflection.&rdquo;
                  </p>
                  <p>
                    &ldquo;One more focus session, and you&rsquo;re closer to
                    achieving your goals while maintaining balance!&rdquo;
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
                and meaningful. Soon, Lumi will offer personalized insights
                based on your productivity patterns.
              </p>
              <Link
                href="/docs/Lumi_Story.markdown"
                aria-label="Learn more about Lumi"
              >
                <Button variant="secondary" size="lg">
                  Learn about Lumi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Testimonials Section */}
      {/* <section
        className="container mx-auto px-4 py-16 md:py-24"
        aria-label="User testimonials"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            What our users are saying
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Join a community of mindful professionals, students, and wellness
            enthusiasts who have found balance with LumiDaily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10">
            <p className="mb-4 font-accent">
              &ldquo;LumiDaily has transformed how I work. The combination of
              the Pomodoro technique with mindfulness features helps me stay
              focused without burning out.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20"></div>
              <div>
                <p className="font-medium">Sarah K.</p>
                <p className="text-sm opacity-70">Marketing Manager</p>
              </div>
            </div>
          </div>

          <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10">
            <p className="mb-4 font-accent">
              &ldquo;As a freelancer, I struggled with work-life balance.
              LumiDaily&apos;s approach to productivity has helped me create
              healthier boundaries while still getting everything done.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary/20"></div>
              <div>
                <p className="font-medium">Marcus T.</p>
                <p className="text-sm opacity-70">Freelance Developer</p>
              </div>
            </div>
          </div>

          <div className="bg-background paper-shadow rounded-xl p-6 border border-foreground/10">
            <p className="mb-4 font-accent">
              &ldquo;The handwritten aesthetic and calm design of LumiDaily
              makes productivity feel less like a chore and more like a mindful
              practice. I love the daily reflection feature!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/20"></div>
              <div>
                <p className="font-medium">Elena J.</p>
                <p className="text-sm opacity-70">Graduate Student</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section
        className="bg-primary/10 py-16 md:py-24 border-y border-primary/20"
        aria-label="Call to action"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of mindful professionals, students, and wellness
            enthusiasts who have found balance with LumiDaily.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/app" aria-label="Get started with LumiDaily now">
              <Button size="lg">Get Started Now</Button>
            </Link>
            <Link
              href="#features"
              aria-label="Learn more about LumiDaily features"
            >
              <Button variant="outline" size="lg">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="container mx-auto px-4 py-8 md:py-12"
        aria-label="Footer"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-xl mb-4">LumiDaily</h3>
            <p className="opacity-70">
              Transform productivity into a calming, effective practice with our
              wellness-focused approach.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Pomodoro Timer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Task Planning
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Music Integration
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Daily Reflection
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Productivity Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl">LumiDaily</span>
            <span className="text-sm opacity-70">© 2025</span>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
