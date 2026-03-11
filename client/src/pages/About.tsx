import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Activity, Target, Zap, Heart } from "lucide-react";

export default function About() {
  useSEO({
    title: "About Run Calculator Hub",
    description: "Run Calculator Hub provides simple, fast running tools for real runners. Learn about our mission and the tools we offer.",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs crumbs={[{ label: "About" }]} />

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="about-title">
          About Run Calculator Hub
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Simple, fast running tools built for real runners.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-card-border p-6 sm:p-8 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Our Mission</h2>
        <div className="prose prose-sm text-muted-foreground max-w-none space-y-3">
          <p>
            Run Calculator Hub was built with one goal: make running calculations fast, simple, and accessible to every runner — from first-time 5K participants to Boston Marathon qualifiers.
          </p>
          <p>
            We believe running tools should be straightforward. No sign-ups, no clutter, no endless scrolling through ads. Just enter your data, get your answer, and get back to running.
          </p>
          <p>
            Every tool on this site is designed to work perfectly on any device. Whether you're checking your pace on race morning or planning splits at your desk, Run Calculator Hub is ready.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Zap, title: "Fast", desc: "Instant calculations with no waiting or loading." },
          { icon: Target, title: "Focused", desc: "Purpose-built tools that do one thing well." },
          { icon: Heart, title: "Free", desc: "All tools are free to use, always." },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-card-border p-5 text-center" data-testid={`about-value-${i}`}>
            <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-card-border p-6 sm:p-8">
        <h2 className="text-xl font-bold text-foreground mb-4">What We Offer</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Pace calculators for marathon, half marathon, 10K, 5K, and custom distances</span>
          </li>
          <li className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Race time predictions using the proven Riegel formula</span>
          </li>
          <li className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Training pace zones (easy, tempo, interval, long run)</span>
          </li>
          <li className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Pace conversion between miles, kilometers, mph, and kph</span>
          </li>
          <li className="flex items-start gap-2">
            <Activity className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span>Comprehensive pace charts for all major race distances</span>
          </li>
        </ul>

        <div className="mt-6">
          <Link href="/tools">
            <Button className="rounded-full" data-testid="about-explore-tools">Explore All Tools</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
