
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useScrollReveal from '@/hooks/useScrollReveal';

const Brand3yFAQSection = () => {
  const sectionRef = useScrollReveal();

  const faqs = [
    {
      question: "When will this be available?",
      answer: "We're in private beta now. Public launch coming Q2 2025."
    },
    {
      question: "Who is this for?",
      answer: "Marketing professionals who need competitive intelligence and brand health insights."
    },
    {
      question: "How is this different?",
      answer: "We combine multiple data sources with AI to give you insights that typically require a team of analysts."
    },
    {
      question: "What does it cost?",
      answer: "Pricing will be announced closer to launch. Waitlist members get early access to pricing."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="reveal transition-all duration-500 ease-out text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            What You're Wondering
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-blue-100 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Brand3yFAQSection;
