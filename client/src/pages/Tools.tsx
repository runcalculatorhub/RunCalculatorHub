import { useSEO } from "@/hooks/use-seo";
import ToolCard from "@/components/ToolCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { tools } from "@/data/tools";

export default function Tools() {
  useSEO({
    title: "Running Tools & Calculators",
    description: "Free, fast running calculators for every distance. Marathon pace, half marathon pace, 5K, 10K, race predictor, training paces, and more.",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs crumbs={[{ label: "All Tools" }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="tools-title">
          Running Tools & Calculators
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed" data-testid="tools-description">
          Free, fast running calculators for every distance. Find the right tool for your training and racing needs.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="tools-grid">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
