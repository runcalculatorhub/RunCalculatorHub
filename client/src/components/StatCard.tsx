interface StatCardProps {
  label: string;
  value: string;
  accent?: boolean;
}

export default function StatCard({ label, value, accent = false }: StatCardProps) {
  return (
    <div
      className={`rounded-xl p-4 text-center ${
        accent
          ? "bg-primary/8 border border-primary/15"
          : "bg-accent/50 border border-card-border"
      }`}
      data-testid={`stat-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">{label}</div>
      <div className={`text-xl font-bold ${accent ? "text-primary" : "text-foreground"}`}>{value}</div>
    </div>
  );
}
