import { useSEO } from "@/hooks/use-seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import { generalFaqs } from "@/data/faqs";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  useSEO({
    title: "Frequently Asked Questions",
    description: "Common questions about running pace, race predictions, training paces, and using Run Calculator Hub tools.",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Breadcrumbs crumbs={[{ label: "FAQ" }]} />

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" data-testid="faq-title">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Common questions about running pace, race predictions, and using our tools.
        </p>
      </div>

      <FAQAccordion faqs={generalFaqs} title="" />

      <div className="mt-10 bg-white rounded-2xl border border-card-border p-6 sm:p-8 text-center">
        <h2 className="text-xl font-bold text-foreground mb-2">Ready to calculate?</h2>
        <p className="text-muted-foreground text-sm mb-5">
          Try our free running calculators and tools.
        </p>
        <Link href="/tools">
          <Button className="rounded-full" data-testid="faq-explore-tools">Explore Tools</Button>
        </Link>
      </div>
    </div>
  );
}
