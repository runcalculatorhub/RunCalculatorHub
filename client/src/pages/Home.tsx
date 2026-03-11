import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { Search, Zap, Smartphone, CalendarCheck, ArrowRight, LineChart, HelpCircle } from "lucide-react";

export default function Home() {
  useSEO({
    title: "Run Calculator Hub - Running Tools & Pace Calculators",
    description: "Simple, fast running tools for real runners. Pace calculators, race time predictors, split calculators, and pace charts.",
  });
  const featuredTools = tools.filter((t) => t.featured);

  return (
    <div>
      <section className="relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-blue-50/50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            Free running calculators & tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-5 tracking-tight" data-testid="hero-heading">
            Simple Running Tools<br className="hidden sm:block" /> for Real Runners
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8" data-testid="hero-subheading">
            Pace calculators, race time predictors, split tables, and pace charts — everything you need to plan your next run or race.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/tools">
              <Button size="lg" className="rounded-full px-8 text-base h-12" data-testid="cta-start-tools">
                Start With Tools
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/pace-charts">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12 bg-white" data-testid="cta-pace-charts">
                See Pace Charts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 -mt-4 mb-12" data-testid="search-section">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search tools, charts, calculators..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-card-border bg-white text-foreground placeholder:text-muted-foreground text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
            data-testid="search-input"
            readOnly
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16" data-testid="popular-tools-section">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Popular Tools</h2>
          <p className="text-muted-foreground">The most-used running calculators and tools</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} compact />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/tools">
            <Button variant="outline" className="rounded-full px-6 bg-white" data-testid="view-all-tools">
              View All Tools
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16" data-testid="why-section">
        <div className="bg-white rounded-2xl border border-card-border p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Why Runners Use Run Calculator Hub</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Zap,
                title: "Fast Calculations",
                desc: "Get instant results with no loading or sign-up required. Just enter your data and go.",
              },
              {
                icon: Smartphone,
                title: "Mobile-Friendly",
                desc: "Every tool is designed to work perfectly on your phone — ideal for race day or the track.",
              },
              {
                icon: CalendarCheck,
                title: "Built for Race Planning",
                desc: "From training paces to race splits, everything is designed to help you plan and execute your goals.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center" data-testid={`why-card-${i}`}>
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16" data-testid="links-section">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: LineChart, title: "Pace Charts", desc: "Reference charts for all major distances", path: "/pace-charts" },
            { icon: Search, title: "All Tools", desc: "Browse our complete collection of running tools", path: "/tools" },
            { icon: HelpCircle, title: "FAQ", desc: "Answers to common running questions", path: "/faq" },
          ].map((item, i) => (
            <Link key={i} href={item.path}>
              <div className="group bg-white rounded-xl border border-card-border p-5 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all flex items-start gap-4" data-testid={`quick-link-${i}`}>
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
