import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/data/tools";

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export default function ToolCard({ tool, compact = false }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link href={tool.path}>
      <div
        className="group bg-white rounded-xl border border-card-border p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 h-full flex flex-col"
        data-testid={`tool-card-${tool.id}`}
      >
        <div className="flex items-start gap-4 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base leading-tight">{tool.shortTitle}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {compact ? tool.description : tool.longDescription}
        </p>
        <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
          Open Tool
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
