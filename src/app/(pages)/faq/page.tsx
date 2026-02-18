"use client";

import { HelpCircle, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'My Orders' section. You'll also receive email updates with tracking information.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Contact our support team to initiate a return.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within Egypt. However, we're working on expanding our shipping options and hope to offer international shipping soon.",
  },
  {
    question: "How can I change or cancel my order?",
    answer:
      "You can change or cancel your order within 1 hour of placing it by contacting our customer support immediately. After that, the order may already be processed.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and cash on delivery. All payments are securely processed.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at support@snapcart.com during business hours (Mon-Fri, 9am-6pm).",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-accent shadow-xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 bg-primary/10 rounded-full mb-2">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Find answers to common questions about our store, shipping,
              returns, and more.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-xl overflow-hidden bg-background/50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/5 transition-colors"
                >
                  <span className="font-medium text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-muted-foreground mt-8">
            Still have questions?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
