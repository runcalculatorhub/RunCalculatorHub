import Breadcrumbs from "./Breadcrumbs";
import FAQAccordion from "./FAQAccordion";
import RelatedTools from "./RelatedTools";
import { getRelatedTools } from "@/data/tools";
import { useSEO } from "@/hooks/use-seo";
import type { FAQ } from "@/data/faqs";
import { Sparkles } from "lucide-react";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  toolId: string;
  children: React.ReactNode;
  faqs: FAQ[];
  belowCalculator?: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
}

export default function ToolPageLayout({
  title,
  description,
  toolId,
  children,
  faqs,
  belowCalculator,
}: ToolPageLayoutProps) {
  useSEO({
    title: title,
    description: description,
  });

  const relatedTools = getRelatedTools(toolId, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs
        crumbs={[
          { label: "Tools", path: "/tools" },
          { label: title },
        ]}
      />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="tool-title">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed" data-testid="tool-description">
          {description}
        </p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Fast, simple, mobile-friendly running calculator</span>
        </div>
      </div>

      {children}

      {belowCalculator && <div className="mt-12 space-y-10">{belowCalculator}</div>}

      <div className="mt-12 space-y-12">
        <FAQAccordion faqs={faqs} />
        <RelatedTools tools={relatedTools} />
      </div>
    </div>
  );
}
