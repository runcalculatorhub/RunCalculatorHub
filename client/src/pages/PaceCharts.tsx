import { Link } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { paceChartConfigs } from "@/data/pace-charts";
import { ArrowRight, LineChart } from "lucide-react";

export default function PaceCharts() {
  useSEO({
    title: "Pace Charts",
    description: "Comprehensive pace charts for 5K, 10K, half marathon, and marathon distances. Find your target finish time at any pace.",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs crumbs={[{ label: "Pace Charts" }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="pace-charts-title">
          Pace Charts
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Reference pace charts for every major race distance. Find the pace you need to hit your goal finish time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="pace-charts-grid">
        {paceChartConfigs.map((chart) => (
          <Link key={chart.id} href={`/pace-charts/${chart.slug}`}>
            <div
              className="group bg-white rounded-xl border border-card-border p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 h-full flex flex-col"
              data-testid={`chart-card-${chart.id}`}
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
                  <LineChart className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-foreground text-lg leading-tight">{chart.title}</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {chart.description}
              </p>
              <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                View Chart
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
