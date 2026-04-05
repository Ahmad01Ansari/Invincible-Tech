"use client";

import { Container } from "../ui/Container";
import { Accordion, type AccordionItem } from "../ui/Accordion";
import { Badge } from "../ui/Badge";

const HOME_FAQS: AccordionItem[] = [
  {
    question: "What makes Invinsible Tech different from other agencies?",
    answer: "We don't just build software; we engineer enterprise solutions. Our unique combination of AI modeling, deep RPA automation expertise, and modern web frameworks allows us to solve complex bottlenecks that standard dev shops simply can't handle."
  },
  {
    question: "How long does a custom ERP or Automation project take?",
    answer: "Project timelines vary strictly by scope. A targeted RPA bot implementation might take 3-4 weeks, whereas a comprehensive multi-module custom ERP system generally spans 3 to 6 months of focused development."
  },
  {
    question: "Do you provide ongoing support after deployment?",
    answer: "Absolutely. We offer dedicated SLA support packages for all enterprise deployments, including bug fixes, security patches, Server management, and iterative feature development."
  },
  {
    question: "Will you integrate with our existing legacy systems?",
    answer: "Yes. Legacy system modernization and integration is one of our core competencies. We frequently build bridges between modern cloud infrastructure and older, localized architectures without requiring a full halt to your current operations."
  }
];

export function FAQSection() {
  return (
    <section className="section-padding bg-obsidian">
      <Container size="narrow">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge variant="dim" className="mb-4">Common Questions</Badge>
          <h2 className="text-h2 font-display font-semibold text-text-high">
            Everything you need to know.
          </h2>
        </div>
        
        <Accordion items={HOME_FAQS} />
      </Container>
    </section>
  );
}
