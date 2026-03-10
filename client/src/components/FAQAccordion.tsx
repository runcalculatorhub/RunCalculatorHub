import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/data/faqs";

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
}

export default function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: FAQAccordionProps) {
  return (
    <section data-testid="faq-section">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
            className="bg-white rounded-xl border border-card-border px-6 data-[state=open]:shadow-sm"
          >
            <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-4" data-testid={`faq-trigger-${index}`}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4" data-testid={`faq-content-${index}`}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
