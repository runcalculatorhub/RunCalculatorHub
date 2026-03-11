import { Link } from "wouter";
import { Activity } from "lucide-react";

const SITE_NAME = "Run Calculator Hub";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16" data-testid="footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simple, fast running tools built for real runners.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Calculators</h4>
            <ul className="space-y-2">
              {[
                { label: "Marathon Pace", path: "/marathon-pace-calculator" },
                { label: "Half Marathon Pace", path: "/half-marathon-pace-calculator" },
                { label: "5K Pace", path: "/5k-pace-calculator" },
                { label: "Running Pace", path: "/running-pace-calculator" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Tools</h4>
            <ul className="space-y-2">
              {[
                { label: "Race Predictor", path: "/race-time-predictor" },
                { label: "Training Paces", path: "/training-pace-calculator" },
                { label: "Pace Converter", path: "/running-pace-converter" },
                { label: "Split Calculator", path: "/split-calculator" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "All Tools", path: "/tools" },
                { label: "Pace Charts", path: "/pace-charts" },
                { label: "About", path: "/about" },
                { label: "FAQ", path: "/faq" },
              ].map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>
                    <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors" data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Built for runners, by runners.
          </p>
        </div>
      </div>
    </footer>
  );
}
