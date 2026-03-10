import { useParams } from "wouter";
import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import { getChartBySlug, paceChartConfigs } from "@/data/pace-charts";
import { generatePaceChart } from "@/utils/calculations";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Lightbulb, Calculator } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    chart.minPaceMin,
    chart.maxPaceMin,
  );

  const otherCharts = paceChartConfigs.filter((c) => c.id !== chart.id);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs
        crumbs={[
          { label: "Pace Charts", path: "/pace-charts" },
          { label: chart.title },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="chart-title">
        {chart.title}
      </h1>

      <p className="text-base text-muted-foreground leading-relaxed mb-4" data-testid="chart-description">
        See your estimated {chart.distanceLabel.toLowerCase()} finish time based on average pace per mile.
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {chart.intro}
      </p>

      <Link href={chart.calculatorPath}>
        <span className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline cursor-pointer mb-6" data-testid="link-calculator">
          <Calculator className="w-4 h-4" />
          {chart.calculatorLabel}
        </span>
      </Link>

      <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8" data-testid="tip-box">
        <Lightbulb className="w-4.5 h-4.5 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-amber-800">{chart.tip}</p>
      </div>

      <div className="bg-white rounded-xl border border-card-border overflow-hidden mb-10" data-testid="pace-chart-table">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/5 border-b border-card-border">
                <TableHead className="text-xs font-semibold text-foreground uppercase tracking-wider">Pace Per Mile</TableHead>
                <TableHead className="text-xs font-semibold text-foreground uppercase tracking-wider">Finish Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i} className="border-b border-card-border/50 hover:bg-accent/30 transition-colors">
                  <TableCell className="text-sm font-medium text-foreground py-2.5">{row.pacePerMile}</TableCell>
                  <TableCell className="text-sm text-foreground py-2.5">{row.finishTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-4">Related Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          <Link href={chart.calculatorPath}>
            <div className="group flex items-center gap-3 bg-white rounded-xl border border-card-border p-4 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all" data-testid="related-calculator">
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground">{chart.distanceLabel} Pace Calculator</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </Link>
          <Link href="/race-time-predictor">
            <div className="group flex items-center gap-3 bg-white rounded-xl border border-card-border p-4 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all" data-testid="related-predictor">
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-foreground">Race Time Predictor</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </div>
          </Link>
        </div>
      </section>

      <FAQAccordion faqs={chart.faqs} />
    </div>
  );
}
