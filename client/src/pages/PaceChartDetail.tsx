import { useParams } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import PaceTable from "@/components/PaceTable";
import FAQAccordion from "@/components/FAQAccordion";
import RelatedTools from "@/components/RelatedTools";
import { getChartBySlug, paceChartConfigs } from "@/data/pace-charts";
import { generalFaqs } from "@/data/faqs";
import { getRelatedTools } from "@/data/tools";
import { generatePaceChart } from "@/utils/calculations";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Home } from "lucide-react";

export default function PaceChartDetail() {
  const params = useParams<{ slug: string }>();
  const chart = getChartBySlug(params.slug || "");

  if (!chart) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Chart Not Found</h1>
        <p className="text-muted-foreground mb-6">The pace chart you're looking for doesn't exist.</p>
        <Link href="/pace-charts">
          <Button className="rounded-full" data-testid="button-back-charts">
            <Home className="w-4 h-4 mr-2" />
            Back to Pace Charts
          </Button>
        </Link>
      </div>
    );
  }

  useSEO({ title: chart.title, description: chart.description });

  const rows = generatePaceChart(
    chart.distanceMiles,
    chart.distanceKm,
    chart.minPace,
    chart.maxPace,
    chart.step
  );

  const otherCharts = paceChartConfigs.filter((c) => c.id !== chart.id);
  const relatedTools = getRelatedTools("pace-charts", 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs
        crumbs={[
          { label: "Pace Charts", path: "/pace-charts" },
          { label: chart.title },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="chart-title">
          {chart.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed" data-testid="chart-description">
          {chart.description}
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Free reference chart — no sign-up required</span>
        </div>
      </div>

      <PaceTable
        headers={["Finish Time", "Pace/Mile", "Pace/KM"]}
        rows={rows.map((r) => [r.finishTime, r.pacePerMile, r.pacePerKm])}
      />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Other Pace Charts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {otherCharts.map((c) => (
            <Link key={c.id} href={`/pace-charts/${c.slug}`}>
              <div className="group flex items-center gap-3 bg-white rounded-xl border border-card-border p-4 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all" data-testid={`other-chart-${c.id}`}>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{c.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-12 space-y-12">
        <FAQAccordion faqs={generalFaqs.slice(0, 4)} />
        <RelatedTools tools={relatedTools} title="Related Calculators" />
      </div>
    </div>
  );
}
