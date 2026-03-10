import ToolPageLayout from "@/components/ToolPageLayout";
import PaceTable from "@/components/PaceTable";
import { generalFaqs } from "@/data/faqs";
import {
  generatePaceChart,
  FIVE_K_MILES, FIVE_K_KM,
  TEN_K_MILES, TEN_K_KM,
  HALF_MARATHON_MILES, HALF_MARATHON_KM,
  MARATHON_MILES, MARATHON_KM,
} from "@/utils/calculations";

const charts = [
  {
    id: "5k",
    title: "5K Pace Chart",
    distanceMiles: FIVE_K_MILES,
    distanceKm: FIVE_K_KM,
    minPace: 5.5,
    maxPace: 14,
    step: 0.5,
  },
  {
    id: "10k",
    title: "10K Pace Chart",
    distanceMiles: TEN_K_MILES,
    distanceKm: TEN_K_KM,
    minPace: 5.5,
    maxPace: 14,
    step: 0.5,
  },
  {
    id: "half-marathon",
    title: "Half Marathon Pace Chart",
    distanceMiles: HALF_MARATHON_MILES,
    distanceKm: HALF_MARATHON_KM,
    minPace: 6,
    maxPace: 14,
    step: 0.5,
  },
  {
    id: "marathon",
    title: "Marathon Pace Chart",
    distanceMiles: MARATHON_MILES,
    distanceKm: MARATHON_KM,
    minPace: 6,
    maxPace: 14,
    step: 0.5,
  },
];

export default function PaceCharts() {
  return (
    <ToolPageLayout
      title="Pace Charts"
      description="Comprehensive pace charts for 5K, 10K, half marathon, and marathon distances. Find your target finish time at any pace."
      toolId="pace-charts"
      faqs={generalFaqs.slice(0, 4)}
    >
      <div className="flex flex-wrap gap-2 mb-8">
        {charts.map((chart) => (
          <a
            key={chart.id}
            href={`#${chart.id}`}
            className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-card-border hover:border-primary/20 hover:text-primary transition-colors"
            data-testid={`anchor-${chart.id}`}
          >
            {chart.title}
          </a>
        ))}
      </div>

      <div className="space-y-10">
        {charts.map((chart) => {
          const rows = generatePaceChart(
            chart.distanceMiles,
            chart.distanceKm,
            chart.minPace,
            chart.maxPace,
            chart.step
          );
          return (
            <section key={chart.id} id={chart.id}>
              <h2 className="text-2xl font-bold text-foreground mb-4" data-testid={`chart-title-${chart.id}`}>
                {chart.title}
              </h2>
              <PaceTable
                headers={["Finish Time", "Pace/Mile", "Pace/KM"]}
                rows={rows.map((r) => [r.finishTime, r.pacePerMile, r.pacePerKm])}
              />
            </section>
          );
        })}
      </div>
    </ToolPageLayout>
  );
}
