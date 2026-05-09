import Link from "next/link";
export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Brand & Address */}
          <section className="flex flex-col gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3 group w-max">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-lime/50 bg-background shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all group-hover:scale-105 group-hover:border-lime group-hover:shadow-[0_0_25px_rgba(204,255,0,0.5)]">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-lime fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" />
                </svg>
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">Aura</span>
            </Link>
            <address className="text-sm not-italic text-muted-foreground">
              123 Fitness Way
              <br />
              London, UK W1T 3BQ
              <br />
              <a href="mailto:hello@fittrack.com" className="hover:text-foreground transition-colors">
                hello@fittrack.com
              </a>
            </address>
          </section>

          {/* Links */}
          <section>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Platform
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/workouts" className="hover:text-foreground transition-colors">Workouts</Link></li>
              <li><Link href="/analytics" className="hover:text-foreground transition-colors">Analytics</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </section>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center sm:text-left text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Aura. All rights reserved.</p>
          <div className="flex gap-4 justify-center sm:justify-start">
            <Link href="#" aria-label="Twitter" className="hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
              Instagram
            </Link>
            <Link href="#" aria-label="YouTube" className="hover:text-foreground transition-colors">
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
