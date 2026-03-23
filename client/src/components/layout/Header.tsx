import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const SITE_NAME = "Run Calculator Hub";

const navLinks = [
  { label: "Tools", path: "/tools" },
  { label: "Pace Charts", path: "/pace-charts" },
  { label: "Blog", path: "/blog" },
  { label: "About", path: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border" data-testid="header">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">{SITE_NAME}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    location === link.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/tools">
              <Button size="sm" className="rounded-full px-5" data-testid="cta-explore-tools">
                Explore Tools
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white" data-testid="mobile-nav">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                    location === link.path
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/tools">
                <Button className="w-full rounded-full" size="sm" onClick={() => setMobileOpen(false)} data-testid="mobile-cta-explore">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
