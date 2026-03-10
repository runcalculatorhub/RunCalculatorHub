import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/data/tools";

interface RelatedToolsProps {
  tools: Tool[];
  title?: string;
}

export default function RelatedTools({ tools, title = "Related Tools" }: RelatedToolsProps) {
  return (
    <section data-testid="related-tools">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.id} href={tool.path}>
              <div className="group flex items-center gap-3 bg-white rounded-xl border border-card-border p-4 cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all" data-testid={`related-tool-${tool.id}`}>
                <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{tool.shortTitle}</span>
                  <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
